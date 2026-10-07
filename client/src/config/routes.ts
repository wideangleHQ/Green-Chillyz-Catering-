// Canonical route paths. Use these constants instead of string literals
// so that renaming a route is a single-file change.
//
// NOTE ON REMOVED ROUTES
//   /testimonials      — removed 2026-09-30, together with the homepage
//                        testimonials section. The client supplied no
//                        testimonials and no ratings. An empty trust page or
//                        section advertises the absence of proof, and a
//                        skeleton card with filled stars is a fabricated
//                        rating. See docs/src/12-decisions.md.
//   /services/[slug]   — removed 2026-09-30. The client supplied service names
//                        but no per-service detail, so the detail pages would
//                        have been thin/duplicated content. /services now
//                        carries every confirmed service with anchor links.

export const ROUTES = {
  home: '/',
  about: '/about',
  services: {
    index: '/services',
  },
  menus: '/menus',
  gallery: '/gallery',
  faq: '/faq',
  contact: '/contact',
} as const;

// Navigation items for the primary menu (IA from docs)
export type NavItem = {
  label: string;
  href: string;
};

export const PRIMARY_NAV: NavItem[] = [
  { label: 'Home', href: ROUTES.home },
  { label: 'About', href: ROUTES.about },
  { label: 'Services', href: ROUTES.services.index },
  { label: 'Menus', href: ROUTES.menus },
  { label: 'Gallery', href: ROUTES.gallery },
  { label: 'FAQ', href: ROUTES.faq },
  { label: 'Contact', href: ROUTES.contact },
];
