/**
 * FAQ content — every answer below is traceable to a specific client answer in
 * the Website Information Form export. Nothing is paraphrased into a promise
 * the client did not make.
 *
 * Questions the client left blank or answered ambiguously are deliberately
 * ABSENT rather than guessed — cancellation policy, guest-count change policy,
 * menu-change terms, advance-payment amount/percentage, tasting sessions,
 * booking lead time, business operating hours, and FAQ content itself were all
 * either empty or unconfirmed. See
 * docs/src/11-scope-and-conflicts.md for the open questions they raise.
 */

import { CUISINES, CUISINE_CATCH_ALL, FOOD_OPTIONS } from './cuisines';
import { FACILITIES, LIVE_STATION_NOTICE } from './facilities';
import { SERVICES } from './services';
import { SITE } from '@/config/site';

export type FaqCategory = 'booking' | 'menus' | 'logistics' | 'pricing';

export type Faq = {
  category: FaqCategory;
  question: string;
  answer: string;
};

const serviceList = SERVICES.filter((s) => !s.isCatchAll)
  .map((s) => s.title)
  .join(', ');

const cuisineList = CUISINES.map((c) => c.name).join(', ');

const facilityList = FACILITIES.map((f) => f.title).join(', ');

const foodOptionList = FOOD_OPTIONS.map((f) => f.name).join(', ');

export const FAQ_CATEGORY_LABELS: Record<FaqCategory, string> = {
  booking: 'Booking & Process',
  menus: 'Menus & Cuisines',
  logistics: 'Guests, Locations & Facilities',
  pricing: 'Pricing & Payment',
};

export const FAQS: Faq[] = [
  // ─── Menus ──────────────────────────────────────────────────────────────────
  {
    category: 'menus',
    question: 'Which cuisines do you offer?',
    answer: `We offer ${cuisineList}. If you have something else in mind, ask us — the answer given to us was “${CUISINE_CATCH_ALL}”.`,
  },
  {
    category: 'menus',
    question: 'Can the menu be customised?',
    answer:
      'Yes. Both predefined packages and fully customised menus are available. Menus are built around your event, guest count and preferences. Menu customisations need to be finalised at least 2 days before the event date.',
  },
  {
    category: 'menus',
    question: 'Can you cater for both vegetarian and non-vegetarian guests?',
    answer: `Yes. We provide ${foodOptionList}. Tell us the split you need on the enquiry form and it will be reflected in your quotation.`,
  },
  {
    category: 'menus',
    question: 'Can you handle special dietary requirements?',
    answer:
      'Yes — special dietary options are supported. Share the specific requirements in your enquiry so they can be planned into the menu.',
  },
  {
    category: 'menus',
    question: 'Do you offer live food counters and cooking stations?',
    answer: `Yes. ${LIVE_STATION_NOTICE}`,
  },

  // ─── Logistics ──────────────────────────────────────────────────────────────
  {
    category: 'logistics',
    question: 'Which events do you cater?',
    answer: `${serviceList}. You can also simply describe any other type of occasion in your enquiry — we cater for any type of event and memorable service.`,
  },
  {
    category: 'logistics',
    question: 'How many guests can you cater for?',
    answer: `We generally cater from ${SITE.guestCapacity.min} guests upwards. Share your guest count on the enquiry form and we will confirm what we can take on for your date.`,
  },
  {
    category: 'logistics',
    question: 'Where do you provide catering?',
    answer: `${SITE.serviceArea}.`,
  },
  {
    category: 'logistics',
    question: 'Do you cater outside your main service area?',
    answer: `Yes. For locations outside our primary area, ${SITE.outOfAreaConditions.toLowerCase()}`,
  },
  {
    category: 'logistics',
    question: 'What is included on site?',
    answer: `${facilityList}. Our team handles the event from setup to the end of the service, including cleanup.`,
  },

  // ─── Pricing ────────────────────────────────────────────────────────────────
  {
    category: 'pricing',
    question: 'How is the quotation calculated?',
    answer: `Per person. The final figure depends on the menu, event type, guest count and the facilities you need — so each quotation is prepared after a discussion about your event.`,
  },
  {
    category: 'pricing',
    question: 'Why are prices not listed on this website?',
    answer:
      'Because price varies with customisation. Prices are shared after your enquiry so the quotation reflects your actual menu and guest count rather than a figure that does not apply to you.',
  },

  // ─── Booking ────────────────────────────────────────────────────────────────
  {
    category: 'booking',
    question: 'How do I request a quotation?',
    answer:
      'Reach us directly on WhatsApp or phone with your event type, date, guest count and location. We need the detail information about your event before a quotation can be prepared.',
  },
  {
    category: 'booking',
    question: 'How is the quotation prepared and shared?',
    answer:
      'The quotation is prepared after a final discussion about your requirements, and can be shared by WhatsApp, email, as a PDF, or in person — whichever suits you.',
  },
  {
    category: 'booking',
    question: 'How is a booking confirmed?',
    answer:
      'A booking is confirmed once the advance amount is paid, after the final discussion.',
  },
  {
    category: 'booking',
    question: 'Who will respond to my enquiry?',
    answer: `Enquiries are handled by our ${SITE.contact.handlerRole}. Our expected response time is ${SITE.contact.responseTime.toLowerCase()}, and ${SITE.contact.preferredChannels.join(' and ')} are the preferred channels.`,
  },
];
