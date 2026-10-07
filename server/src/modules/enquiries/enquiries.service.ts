import { Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes } from 'crypto';
import type { Enquiry } from '@prisma/client';
import { PrismaService } from '../../infrastructure/database';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';

// ponytail: 60s window is a naive in-memory-free duplicate guard (one query,
// no idempotency-key infra). Good enough for a low-volume lead form; revisit
// with a client-supplied idempotency key if double-submits become a real issue.
const DUPLICATE_WINDOW_MS = 60_000;

export interface EnquiryConfirmation {
  referenceId: string;
  enquiryId: string;
  message: string;
}

@Injectable()
export class EnquiriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEnquiryDto): Promise<EnquiryConfirmation> {
    const name = dto.name.trim();
    const phone = dto.phone.trim();
    const email = dto.email?.trim();
    const location = dto.location?.trim() || undefined;
    const message = dto.message?.trim() || undefined;

    // Duplicate-submission guard: same phone + event type + event date within
    // the last minute is treated as a repeat click, not a new lead.
    const recentDuplicate = await this.prisma.enquiry.findFirst({
      where: {
        eventType: dto.eventType,
        eventDate: dto.eventDate ? new Date(dto.eventDate) : null,
        customer: { phone },
        createdAt: { gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (recentDuplicate) {
      return this.toConfirmation(recentDuplicate.referenceId, recentDuplicate.id);
    }

    const customer = await this.prisma.customer.upsert({
      where: { phone },
      update: { name, email },
      create: { name, phone, email },
    });

    const enquiry = await this.createWithUniqueReference(customer.id, dto, location, message);

    return this.toConfirmation(enquiry.referenceId, enquiry.id);
  }

  async findByReference(referenceId: string) {
    const enquiry = await this.prisma.enquiry.findUnique({
      where: { referenceId },
      include: { customer: true },
    });

    if (!enquiry) {
      throw new NotFoundException(`No enquiry found for reference ${referenceId}`);
    }

    return enquiry;
  }

  /** Retries on the rare referenceId collision (random suffix, not sequential). */
  private async createWithUniqueReference(
    customerId: string,
    dto: CreateEnquiryDto,
    location: string | undefined,
    message: string | undefined,
    attempt = 0,
  ): Promise<Enquiry> {
    try {
      return await this.prisma.enquiry.create({
        data: {
          customerId,
          eventType: dto.eventType,
          eventDate: dto.eventDate ? new Date(dto.eventDate) : undefined,
          guestCount: dto.guestCount,
          location,
          message,
          referenceId: generateReferenceId(),
        },
      });
    } catch (err) {
      const isUniqueViolation =
        err instanceof Object && 'code' in err && (err as { code: string }).code === 'P2002';
      if (isUniqueViolation && attempt < 3) {
        return this.createWithUniqueReference(customerId, dto, location, message, attempt + 1);
      }
      throw err;
    }
  }

  private toConfirmation(referenceId: string, enquiryId: string): EnquiryConfirmation {
    return {
      referenceId,
      enquiryId,
      message: `Enquiry received. Reference: ${referenceId}.`,
    };
  }
}

/** e.g. GCC-260916-A4F2 — date-scoped, random suffix avoids counting queries. */
function generateReferenceId(): string {
  const datePart = new Date()
    .toISOString()
    .slice(2, 10)
    .replace(/-/g, '');
  const suffix = randomBytes(2).toString('hex').toUpperCase();
  return `GCC-${datePart}-${suffix}`;
}
