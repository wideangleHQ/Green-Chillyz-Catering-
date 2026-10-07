// class-transformer relies on Reflect.getMetadata, which NestJS normally
// registers via its own bootstrap. Tests import it explicitly.
import 'reflect-metadata';
import { describe, expect, it } from 'vitest';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { EventType } from '@prisma/client';
import { CreateEnquiryDto } from './create-enquiry.dto';

/**
 * Validation contract for POST /api/v1/enquiries.
 *
 * The form collects the six fields the client asked for: Name, Phone Number,
 * Event Type, Event Date, Guest Count, Event Location. These tests pin that
 * contract, including the guest-count bounds taken from the capacity figures
 * the client supplied and the EventType members added for the services they
 * confirmed they provide.
 */
async function validatePayload(payload: Record<string, unknown>) {
  const dto = plainToInstance(CreateEnquiryDto, payload);
  return validate(dto, { whitelist: true, forbidNonWhitelisted: false });
}

const validPayload = {
  name: 'Anita Rao',
  phone: '+919090022220',
  eventType: EventType.WEDDING,
  eventDate: '2026-12-05',
  guestCount: 250,
  location: 'Bhubaneswar',
};

describe('CreateEnquiryDto', () => {
  it('accepts the six confirmed fields with no email or message', async () => {
    const errors = await validatePayload(validPayload);
    expect(errors).toHaveLength(0);
  });

  it('requires name, phone and eventType', async () => {
    const errors = await validatePayload({
      eventDate: '2026-12-05',
      guestCount: 100,
      location: 'Bhubaneswar',
    });
    const props = errors.map((e) => e.property);
    expect(props).toEqual(expect.arrayContaining(['name', 'phone', 'eventType']));
  });

  it('rejects a guest count above the client-supplied maximum', async () => {
    const errors = await validatePayload({ ...validPayload, guestCount: 200001 });
    expect(errors.map((e) => e.property)).toContain('guestCount');
  });

  it('accepts a guest count at the client-supplied maximum', async () => {
    const errors = await validatePayload({ ...validPayload, guestCount: 200000 });
    expect(errors).toHaveLength(0);
  });

  it('rejects an event type outside the confirmed services', async () => {
    const errors = await validatePayload({ ...validPayload, eventType: 'CATERING_FOR_ANTS' });
    expect(errors.map((e) => e.property)).toContain('eventType');
  });

  it.each([
    EventType.ENGAGEMENT,
    EventType.ANNIVERSARY,
    EventType.OFFICE_BUSINESS,
    EventType.HOUSE_PARTY,
    EventType.INSTITUTIONAL,
  ])('accepts confirmed service type %s', async (eventType) => {
    const errors = await validatePayload({ ...validPayload, eventType });
    expect(errors).toHaveLength(0);
  });

  it('still accepts the optional email and message fields for backwards compatibility', async () => {
    const errors = await validatePayload({
      ...validPayload,
      email: 'anita@example.com',
      message: 'Please share a vegetarian menu option.',
    });
    expect(errors).toHaveLength(0);
  });

  it('rejects a malformed optional email', async () => {
    const errors = await validatePayload({ ...validPayload, email: 'not-an-email' });
    expect(errors.map((e) => e.property)).toContain('email');
  });

  it('rejects a non-integer guest count', async () => {
    const errors = await validatePayload({ ...validPayload, guestCount: 12.5 });
    expect(errors.map((e) => e.property)).toContain('guestCount');
  });
});
