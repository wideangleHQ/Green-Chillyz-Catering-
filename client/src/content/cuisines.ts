/**
 * Cuisines and food options — confirmed by the client.
 *
 * Source: "Which cuisines do you currently offer?" and
 * "Which food options do you provide?".
 *
 * The client's answer to "Please provide your current catering menu categories
 * and important menu details" was the open-ended phrase "All Type On Your
 * Mind", and no menu/package document was uploaded. Therefore:
 *  - NO dish names are listed anywhere in this project. Every previously
 *    published dish (Dalma, Chhena Poda, Dal Makhani, Masala Dosa, Hakka
 *    Noodles …) was invented by the earlier build and has been removed.
 *  - NO live-station names are listed. The client's answer was
 *    "We Can Provide all Type of Live Station as per Menu."
 */

/** Cuisines the client confirmed they currently offer, in submitted order. */
export const CUISINES = [
  { slug: 'odia', name: 'Odia' },
  { slug: 'north-indian', name: 'North Indian' },
  { slug: 'south-indian', name: 'South Indian' },
  { slug: 'bengali', name: 'Bengali' },
  { slug: 'chinese', name: 'Chinese' },
  { slug: 'continental', name: 'Continental' },
  { slug: 'mughlai', name: 'Mughlai' },
  { slug: 'italian', name: 'Italian' },
] as const;

/** The client's own open-ended answer, reproduced verbatim. */
export const CUISINE_CATCH_ALL = 'Any Type as You Love to Eat';

/** Food options the client ticked. */
export const FOOD_OPTIONS = [
  {
    slug: 'vegetarian',
    name: 'Vegetarian',
    description: 'Pure vegetarian menus for your event.',
  },
  {
    slug: 'non-vegetarian',
    name: 'Non-Vegetarian',
    description: 'Non-vegetarian dishes alongside or instead of vegetarian courses.',
  },
  {
    slug: 'mixed',
    name: 'Both Vegetarian & Non-Vegetarian',
    description: 'A combined spread so every guest is served.',
  },
  {
    slug: 'dietary',
    name: 'Special Dietary Options',
    description:
      'The client confirmed support for special dietary requirements — share the specifics on the enquiry form.',
  },
] as const;

/**
 * Menu customisation policy. The client's answer was:
 *   "N No of Menu Customization we can Provide Before 2 Days From Event."
 * The leading token is garbled, but the "before 2 days from event" constraint is
 * legible and is therefore published. The garbled token is recorded as a
 * clarification item — see docs/src/11-scope-and-conflicts.md.
 */
export const MENU_CUSTOMISATION_NOTICE =
  'Menus are customised to your event. Finalise menu customisations at least 2 days before the event date.';
