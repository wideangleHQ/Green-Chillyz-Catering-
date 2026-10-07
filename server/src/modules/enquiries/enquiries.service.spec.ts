import { describe, expect, it, vi } from 'vitest';
import { EnquiriesService } from './enquiries.service';
import type { CreateEnquiryDto } from './dto/create-enquiry.dto';

function makeDto(overrides: Partial<CreateEnquiryDto> = {}): CreateEnquiryDto {
  return {
    name: 'Rahul Sharma',
    phone: '+919090000000',
    eventType: 'WEDDING',
    ...overrides,
  } as CreateEnquiryDto;
}

function makePrismaMock() {
  return {
    enquiry: {
      findFirst: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockImplementation(({ data }) =>
        Promise.resolve({ id: 'enq_1', ...data }),
      ),
    },
    customer: {
      upsert: vi.fn().mockResolvedValue({ id: 'cust_1', phone: '+919090000000' }),
    },
  };
}

describe('EnquiriesService', () => {
  it('creates an enquiry with a GCC-prefixed reference id', async () => {
    const prisma = makePrismaMock();
    const service = new EnquiriesService(prisma as any);

    const result = await service.create(makeDto());

    expect(result.referenceId).toMatch(/^GCC-\d{6}-[0-9A-F]{4}$/);
    expect(result.enquiryId).toBe('enq_1');
    expect(prisma.customer.upsert).toHaveBeenCalledOnce();
    expect(prisma.enquiry.create).toHaveBeenCalledOnce();
  });

  it('returns the existing enquiry instead of creating a duplicate within the debounce window', async () => {
    const prisma = makePrismaMock();
    prisma.enquiry.findFirst.mockResolvedValue({
      id: 'enq_existing',
      referenceId: 'GCC-260101-ABCD',
    });
    const service = new EnquiriesService(prisma as any);

    const result = await service.create(makeDto());

    expect(result.referenceId).toBe('GCC-260101-ABCD');
    expect(result.enquiryId).toBe('enq_existing');
    expect(prisma.customer.upsert).not.toHaveBeenCalled();
    expect(prisma.enquiry.create).not.toHaveBeenCalled();
  });

  it('retries reference-id generation on a unique-constraint collision', async () => {
    const prisma = makePrismaMock();
    prisma.enquiry.create
      .mockRejectedValueOnce({ code: 'P2002' })
      .mockImplementationOnce(({ data }: any) => Promise.resolve({ id: 'enq_2', ...data }));
    const service = new EnquiriesService(prisma as any);

    const result = await service.create(makeDto());

    expect(result.enquiryId).toBe('enq_2');
    expect(prisma.enquiry.create).toHaveBeenCalledTimes(2);
  });
});
