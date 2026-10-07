/**
 * SINGLE SOURCE OF TRUTH — confirmed business profile.
 *
 * Every value in this file comes from the client-submitted
 * "Website Information Form" export:
 *   Green_Chillyz_Catering___Website_Information_Form_20260930212918.csv
 * (submission timestamp 2026-09-25 18:00:16, submitted by the Owner).
 *
 * Rules for this file:
 *  1. Do NOT add a value that the client did not supply. Missing facts stay
 *     absent and are recorded as gaps in docs/src/16-client-information-form-audit.md.
 *  2. Do NOT add prices, ratings, awards, licence numbers, founding years or
 *     event counts — none were supplied.
 *  3. Business operating hours were answered ambiguously by the client
 *     ("Catering and Services") and are therefore deliberately omitted.
 *     Do not reintroduce them without written confirmation.
 */

/** WhatsApp click-to-chat number, digits only, no leading "+". */
export const CONFIRMED_WHATSAPP_NUMBER = '919090022220';

export const SITE = {
  name: 'Green Chillyz Catering',

  /**
   * Client supplied: "Any Type of Catering and Memorable Services".
   * Used verbatim (normalised only for casing) as the public descriptor.
   */
  descriptor: 'Any Type of Catering and Memorable Services',

  /** Client answered "Bhubaneswar" when asked for the primary service city. */
  primaryCity: 'Bhubaneswar',

  /** Client answered: "Entire Bhubaneswar and Entire Odisha". */
  serviceArea: 'Entire Bhubaneswar and Entire Odisha',

  /**
   * Client answered "Yes" to catering outside the primary area, with the
   * conditions: "Travel Requirement, Permission, Permit."
   */
  outOfAreaConditions: 'Travel requirement, permission and permit apply.',

  contact: {
    /** Client answered: enquiries are handled by the Manager. */
    handlerRole: 'Manager',
    /** Client answered: "M Jaya Prasad Rao". Role supplied as "Owner". */
    personName: 'M Jaya Prasad Rao',
    personRole: 'Owner',
    phoneE164: '+919090022220',
    phoneDisplay: '+91 90900 22220',
    /** Client answered "Yes" that the number is WhatsApp Business enabled. */
    whatsappBusiness: true,
    email: 'greenchillyzcatering@gmail.com',
    address: {
      street: 'Plot No. 2132/5140, BJB Nagar, Lewis Road',
      city: 'Bhubaneswar',
      region: 'Odisha',
      postalCode: '751014',
      countryCode: 'IN',
    },
    mapsUrl: 'https://maps.app.goo.gl/JEsZjtCpf6pxHvFL7',
    /**
     * Client answered "Immediate" for expected response time and
     * "WhatsApp + Phone" for preferred communication channels.
     * NOTE: no business operating hours were confirmed — do not display hours.
     */
    responseTime: 'Immediate',
    preferredChannels: ['WhatsApp', 'Phone'] as const,
  },

  social: {
    instagram: 'https://www.instagram.com/greenchillyzcatering_official/',
    facebook: 'https://www.facebook.com/GreenchillyzCateringofficial/',
    youtube: 'https://www.youtube.com/channel/UCa-NNE9hqPO5FMW59Qy-glg',
  },

  /**
   * Client supplied (question: "minimum number of guests you generally
   * cater for" / "maximum number of guests you can currently handle").
   *
   * ⚠️ The maximum of 200,000 is reproduced exactly as submitted and is
   * implausible for a single service. It is published as a client-confirmed
   * figure and flagged as a P0 clarification item in
   * docs/src/11-scope-and-conflicts.md. Do NOT "round" it to a tidier
   * number without written confirmation.
   */
  guestCapacity: {
    min: 50,
    max: 200000,
  },

  /** Client answered: quotation is calculated "Per Person". */
  pricingModel: 'Per Person',

  /**
   * Client answered "Display Pricing Only After Enquiry" and
   * "Price Will Be Vary As Per Customization".
   * → No price may be rendered anywhere on the public site.
   */
  pricingPublic: false,
} as const;

/** Full postal address as a single line, for structured data and <address>. */
export const SITE_ADDRESS_LINE = `${SITE.contact.address.street}, ${SITE.contact.address.city}, ${SITE.contact.address.region} ${SITE.contact.address.postalCode}`;
