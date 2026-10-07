/**
 * On-site catering facilities and support — confirmed by the client.
 *
 * Source: "Which catering services/facilities do you provide?" — the client
 * ticked every one of the options listed below, plus "Other: All catering
 * event related". The follow-up free-text answer was:
 *   "We Deal and Serve to Your Guest as Like Our Guest till to The End of The Event."
 * and for live stations:
 *   "We Can Provide all Type of Live Station as per Menu."
 *
 * ⚠️ Only ticked options appear here. The previous build advertised food-safety
 * standards, a "professional kitchen" and "fresh, high-quality ingredients
 * sourced daily" — none of which the client confirmed. Those claims are gone.
 */

export type Facility = { title: string; description: string };

export const FACILITIES: Facility[] = [
  {
    title: 'Buffet Setup',
    description: 'Buffet counters and service flow set up at your venue.',
  },
  {
    title: 'Table Setup',
    description: 'Dining tables and seating arranged as part of event setup.',
  },
  {
    title: 'Food Serving Staff',
    description: 'Our own serving team on site for the duration of the event.',
  },
  {
    title: 'Plates & Cutlery',
    description: 'Plates and cutlery supplied as part of the service.',
  },
  {
    title: 'Glasses & Crockery',
    description: 'Glassware and crockery provided for the event.',
  },
  {
    title: 'Live Food Counters',
    description: 'Live counters serving food directly to your guests.',
  },
  {
    title: 'Live Cooking Stations',
    description: 'On-site cooking stations prepared live through the service.',
  },
  {
    title: 'Beverage Counter',
    description: 'A beverage counter as part of the catering setup.',
  },
  {
    title: 'Dessert Counter',
    description: 'A dedicated dessert counter for the event.',
  },
  {
    title: 'Decoration & Food Presentation',
    description: 'Food presentation handled by our team on the day.',
  },
  {
    title: 'Event Setup',
    description: 'Venue setup carried out before the event begins.',
  },
  {
    title: 'Event Coordination',
    description: 'On-site coordination throughout the event.',
  },
  {
    title: 'Cleanup',
    description: 'Cleanup after the event concludes.',
  },
];

/** The client's own words for their on-site support commitment. */
export const ON_SITE_SUPPORT_QUOTE =
  'We Deal and Serve to Your Guest as Like Our Guest till to The End of The Event.';

/** The client's own words for live stations. */
export const LIVE_STATION_NOTICE =
  'We Can Provide all Type of Live Station as per Menu.';

/**
 * The client ticked "Other: All catering event related" in the facilities
 * question — recorded here so it is represented rather than dropped.
 */
export const FACILITIES_CATCH_ALL = 'All catering event related services available on request.';
