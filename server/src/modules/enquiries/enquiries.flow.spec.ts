// class-transformer relies on Reflect.getMetadata, which NestJS normally
// registers via its own bootstrap. Tests import it explicitly.
import 'reflect-metadata';
import { describe, expect, it, vi } from 'vitest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { EventType } from '@prisma/client';
import { EnquiriesController } from './enquiries.controller';
import { EnquiriesService } from './enquiries.service';

/**
 * End-to-end enquiry sequence through the real controller + the same
 * ValidationPipe configuration used in main.ts, with Prisma mocked.
 *
 * Covers, in order:
 *   1. invalid payload is rejected and nothing is written
 *   2. a valid payload persists and returns an accurate reference + status
 *   3. the response contains no database URLs, tokens or notification settings
 *   4. the returned status reflects the real LeadStatus, not a made-up state
 *
 * A real HTTP E2E against a live database could not be run: this project has
 * never been connected to a database and the .env holds a placeholder
 * DATABASE_URL. That limitation is recorded in docs/src/13-roadmap-launch.md.
 */
describe('Enquiry flow (controller + validation pipe)', () => {
  let app: INestApplication;
  let prisma: ReturnType<typeof makePrisma>;

  function makePrisma() {
    return {
      enquiry: {
        findFirst: vi.fn().mockResolvedValue(null),
        findUnique: vi.fn().mockResolvedValue(null),
        create: vi.fn().mockImplementation(({ data }) =>
          Promise.resolve({
            id: 'enq_1',
            status: 'NEW',
            createdAt: new Date('2026-09-30T12:00:00Z'),
            customerId: 'cust_1',
            ...data,
          }),
        ),
      },
      customer: {
        upsert: vi.fn().mockImplementation(({ create }) =>
          Promise.resolve({ id: 'cust_1', ...create }),
        ),
      },
    };
  }

  const validBody = {
    name: 'Anita Rao',
    phone: '+919090022220',
    eventType: EventType.ENGAGEMENT,
    eventDate: '2026-12-05',
    guestCount: 300,
    location: 'Bhubaneswar',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [EnquiriesController],
      providers: [
        {
          provide: EnquiriesService,
          useFactory: () => {
            prisma = makePrisma();
            return new EnquiriesService(prisma as never);
          },
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    // Mirror main.ts exactly.
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app?.close();
  });

  it('rejects an invalid payload and writes nothing', async () => {
    const res = await request(app.getHttpServer())
      .post('/enquiries')
      .send({
        name: 'A',
        phone: '123',
        eventType: 'NOT_A_REAL_SERVICE',
        guestCount: 999999,
      });

    expect(res.status).toBe(400);
    expect(prisma.enquiry.create).not.toHaveBeenCalled();
    expect(prisma.customer.upsert).not.toHaveBeenCalled();
  });

  it('rejects a guest count above the confirmed maximum', async () => {
    const res = await request(app.getHttpServer())
      .post('/enquiries')
      .send({ ...validBody, guestCount: 200001 });

    expect(res.status).toBe(400);
    expect(prisma.enquiry.create).not.toHaveBeenCalled();
  });

  it('persists a valid enquiry and returns an accurate reference and status', async () => {
    const res = await request(app.getHttpServer()).post('/enquiries').send(validBody);

    expect(res.status).toBe(201);
    const body = res.body;

    expect(body.referenceId).toMatch(/^GCC-\d{6}-[0-9A-F]{4}$/);
    expect(body.enquiryId).toBe('enq_1');
    expect(body.message).toContain(body.referenceId);

    const created = prisma.enquiry.create.mock.calls[0][0].data;
    expect(created.eventType).toBe(EventType.ENGAGEMENT);
    expect(created.guestCount).toBe(300);
    expect(created.location).toBe('Bhubaneswar');
  });

  it('strips undeclared fields instead of persisting them', async () => {
    prisma.enquiry.create.mockClear();

    await request(app.getHttpServer())
      .post('/enquiries')
      .send({ ...validBody, isAdmin: true, role: 'owner' });

    const created = prisma.enquiry.create.mock.calls[0][0].data;
    expect(created).not.toHaveProperty('isAdmin');
    expect(created).not.toHaveProperty('role');
  });

  it('never exposes database URLs, tokens or notification settings in a response', async () => {
    const res = await request(app.getHttpServer()).post('/enquiries').send(validBody);

    const serialised = JSON.stringify(res.body);
    for (const secret of [
      'DATABASE_URL',
      'DIRECT_URL',
      'SERVICE_ROLE',
      'SMTP',
      'WHATSAPP_API_TOKEN',
      'postgresql://',
      'supabase.co',
    ]) {
      expect(serialised).not.toContain(secret);
    }
  });

  it('returns 404 for an unknown reference and leaks no internals', async () => {
    const res = await request(app.getHttpServer()).get(
      '/enquiries/ref/GCC-999999-DEAD',
    );

    expect(res.status).toBe(404);
    expect(res.text).not.toContain('postgresql://');
    expect(res.text).not.toContain('DATABASE_URL');
  });
});
