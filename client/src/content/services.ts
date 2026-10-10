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
      'Make your wedding celebration memorable with catering planned around your guests, food preferences, and event requirements. Choose from a range of cuisines and discuss a customised menu with the Green Chillyz team.',
  },
  {
    slug: 'reception',
    title: 'Reception Catering',
    description:
      'Plan reception catering around your guest count, preferred cuisines, and serving requirements. From menu customisation to buffet setup and on-site service arrangements, discuss the details of your event with our team.',
  },
  {
    slug: 'engagement',
    title: 'Engagement Catering',
    description:
      'Celebrate your engagement with a menu tailored to your occasion and guests. Share your preferred cuisines, guest count, location, and event requirements so the team can prepare a suitable quotation.',
  },
  {
    slug: 'haldi-mehendi',
    title: 'Haldi / Mehendi Catering',
    description:
      'Plan catering for your Haldi or Mehendi celebration with food choices suited to your gathering. Discuss your preferred menu, guest count, setup, and serving requirements with Green Chillyz Catering.',
  },
  {
    slug: 'birthday',
    title: 'Birthday Party Catering',
    description:
      'Make birthday celebrations easier to plan with catering arranged around your guests and preferences. Share your event details and explore suitable menu customisation and catering arrangements.',
  },
  {
    slug: 'anniversary',
    title: 'Anniversary Catering',
    description:
      'Celebrate your anniversary with catering planned around the occasion, your guests, and your preferred food choices. Discuss your requirements with the team to receive a customised quotation.',
  },
  {
    slug: 'corporate',
    title: 'Corporate Catering',
    description:
      'Arrange catering for corporate events with menus and service requirements discussed around your event. Share the expected guest count, location, menu preferences, and setup needs to plan the catering arrangements.',
  },
  {
    slug: 'office-business',
    title: 'Office / Business Events',
    description:
      'Plan catering for office gatherings, business functions, and professional events. Green Chillyz can discuss menu preferences, guest numbers, buffet arrangements, serving staff, and other relevant catering requirements.',
  },
  {
    slug: 'private-party',
    title: 'Private Party Catering',
    description:
      'Make private celebrations easier to organise with catering tailored to your gathering. Discuss your menu preferences, guest count, location, and the level of on-site catering support you require.',
  },
  {
    slug: 'outdoor',
    title: 'Outdoor Catering',
    description:
      'Plan catering for outdoor events by discussing the venue, guest count, menu, and service arrangements with the team. Additional travel requirements, permissions, and permits may apply outside the primary service area.',
  },
  {
    slug: 'house-party',
    title: 'House Party Catering',
    description:
      'Arrange catering for your house party around your guest count, food preferences, and available event space. Discuss menu options, food service, and any setup requirements before requesting your quotation.',
  },
  {
    slug: 'institutional',
    title: 'Institutional Catering',
    description:
      'Discuss catering requirements for institutional events and gatherings with the Green Chillyz team. Share the expected number of guests, location, menu preferences, and service requirements for an individually prepared quotation.',
  },
  {
    slug: 'any-type',
    title: 'Any Type of Catering',
    description:
      'Have a different event in mind? Green Chillyz offers catering for a wide range of occasions. Share your event details, preferred cuisines, guest count, and service requirements so the team can understand your needs.',
    isCatchAll: true,
  },
];

/** Compact list used in the footer and the enquiry form dropdown. */
export const SERVICE_TITLES = SERVICES.filter((s) => !s.isCatchAll).map((s) => s.title);
