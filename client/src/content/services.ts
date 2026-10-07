/**
 * Catering services — confirmed by the client.
 *
 * Source: the client's "Which types of catering services do you currently
 * provide?" answer, which listed 12 named services plus an open-ended
 * "Other: Any Type Of Catering". The accompanying free-text answer was
 * "Any Type of Catering and Memorable Services".
 *
 * Rules applied when writing these entries:
 *  - Every service name below is the client's own wording.
 *  - Descriptions only restate capabilities the client explicitly ticked in
 *    the "Which catering services/facilities do you provide?" answer
 *    (see ./facilities.ts). No service-specific promise (plated service,
 *    tasting sessions, themed menus, minimum lead time…) was invented,
 *    because the client did not supply one.
 *  - The client's "Other" bucket is represented as an explicit catch-all
 *    rather than being silently folded into the last card.
 */

export type Service = {
  /** URL fragment / anchor id used by the services page. */
  slug: string;
  /** Exactly as the client wrote it. */
  title: string;
  /** Short card copy, grounded in the confirmed facilities list. */
  description: string;
  /** True for the client's open-ended "Any Type Of Catering" answer. */
  isCatchAll?: boolean;
};

export const SERVICES: Service[] = [
  {
    slug: 'wedding',
    title: 'Wedding Catering',
    description:
      'Buffet and table setup, serving staff, crockery, live counters and on-site coordination — managed from setup through to cleanup.',
  },
  {
    slug: 'reception',
    title: 'Reception Catering',
    description:
      'Event setup, food serving staff, plate and cutlery service, dessert and beverage counters for your reception.',
  },
  {
    slug: 'engagement',
    title: 'Engagement Catering',
    description:
      'Full catering support for your engagement — setup, service, live counters and cleanup handled by our team.',
  },
  {
    slug: 'haldi-mehendi',
    title: 'Haldi & Mehendi Catering',
    description:
      'Outdoor catering with buffet setup, food presentation, serving staff and complete event coordination.',
  },
  {
    slug: 'birthday',
    title: 'Birthday Party Catering',
    description:
      'Private party catering with table setup, serving staff, live cooking stations and dessert counters.',
  },
  {
    slug: 'anniversary',
    title: 'Anniversary Catering',
    description:
      'Memorable catering services for anniversaries — setup, service and cleanup looked after end to end.',
  },
  {
    slug: 'corporate',
    title: 'Corporate Catering',
    description:
      'Professional catering for conferences, meetings and corporate gatherings, including event setup and on-site coordination.',
  },
  {
    slug: 'office-business',
    title: 'Office & Business Events',
    description:
      'Office catering and business event service with buffet setup, serving staff and beverage counters.',
  },
  {
    slug: 'private-party',
    title: 'Private Party Catering',
    description:
      'House party and private event catering with full setup, food presentation and cleanup.',
  },
  {
    slug: 'house-party',
    title: 'House Party Catering',
    description:
      'In-home catering including table setup, crockery, live counters and serving staff.',
  },
  {
    slug: 'outdoor',
    title: 'Outdoor Catering',
    description:
      'Outdoor event catering with event setup, buffet infrastructure, live stations and event coordination.',
  },
  {
    slug: 'institutional',
    title: 'Institutional Catering',
    description:
      'Institutional catering with buffet setup, food serving staff, crockery and cleanup support.',
  },
  {
    slug: 'any-type',
    title: 'Any Type of Catering',
    description:
      'The client confirmed catering for any type of event. Describe your occasion on the enquiry form and we will confirm feasibility.',
    isCatchAll: true,
  },
];

/** Compact list used in the footer and the enquiry form dropdown. */
export const SERVICE_TITLES = SERVICES.filter((s) => !s.isCatchAll).map((s) => s.title);
