/**
 * Gallery categories — confirmed available by the client.
 *
 * Source: "Do you have visual content (photos, videos) available to share?"
 * The client ticked: Wedding Events, Reception Events, Haldi/Mehendi,
 * Corporate Events, Birthday Events, Buffet Setup, Live Food Counters,
 * Food Photography, Chefs/Kitchen, Catering Staff, Event Setup, plus
 * "All Type".
 *
 * ⚠️ The client confirmed the material EXISTS but did not supply it — the
 * "share a link to your photos/videos" question was left blank. No image URL
 * has been published. The gallery therefore renders an honest empty state
 * rather than stock or generated imagery.
 *
 * These labels mirror the `GalleryCategory` enum in server/prisma/schema.prisma.
 */
export type GalleryCategoryLabel = {
  slug: string;
  label: string;
};

export const GALLERY_CATEGORIES: GalleryCategoryLabel[] = [
  { slug: 'weddings', label: 'Weddings' },
  { slug: 'receptions', label: 'Receptions' },
  { slug: 'haldi-mehendi', label: 'Haldi & Mehendi' },
  { slug: 'corporate', label: 'Corporate Events' },
  { slug: 'birthdays', label: 'Birthday Events' },
  { slug: 'buffet-setups', label: 'Buffet Setups' },
  { slug: 'live-stations', label: 'Live Food Counters' },
  { slug: 'food-presentation', label: 'Food Photography' },
  { slug: 'kitchen-prep', label: 'Chefs & Kitchen' },
  { slug: 'service-staff', label: 'Catering Staff' },
  { slug: 'event-setup', label: 'Event Setup' },
];

/** The client's own open-ended answer for visual content. */
export const GALLERY_CATCH_ALL = 'All Type';
