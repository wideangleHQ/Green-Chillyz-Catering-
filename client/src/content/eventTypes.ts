/**
 * Enquiry form "Event Type" options.
 *
 * Each value is a member of the `EventType` enum in
 * `server/prisma/schema.prisma`, and each label is the client's own wording
 * from their answer to "Which types of catering services do you currently
 * provide?".
 *
 * Keep this list in sync with the Prisma enum — a value that is not in the
 * enum will be rejected by backend validation.
 */

import type { EventType } from '@/types';

export const EVENT_TYPES: { value: EventType; label: string }[] = [
  { value: 'WEDDING', label: 'Wedding Catering' },
  { value: 'RECEPTION', label: 'Reception Catering' },
  { value: 'ENGAGEMENT', label: 'Engagement Catering' },
  { value: 'HALDI_MEHENDI', label: 'Haldi & Mehendi Catering' },
  { value: 'BIRTHDAY', label: 'Birthday Party Catering' },
  { value: 'ANNIVERSARY', label: 'Anniversary Catering' },
  { value: 'CORPORATE', label: 'Corporate Catering' },
  { value: 'OFFICE_BUSINESS', label: 'Office & Business Events' },
  { value: 'PRIVATE_EVENT', label: 'Private Party Catering' },
  { value: 'HOUSE_PARTY', label: 'House Party Catering' },
  { value: 'OUTDOOR', label: 'Outdoor Catering' },
  { value: 'INSTITUTIONAL', label: 'Institutional Catering' },
  { value: 'OTHER', label: 'Any Type of Catering' },
];

export const EVENT_TYPE_LABELS: Record<EventType, string> = Object.fromEntries(
  EVENT_TYPES.map((t) => [t.value, t.label]),
) as Record<EventType, string>;
