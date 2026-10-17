import type { MetadataRoute } from 'next';
import { ROUTES } from '@/config/routes';
import { SITE_URL } from '@/config/siteUrl';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ROUTES.home,
    ROUTES.about,
    ROUTES.services.index,
    ROUTES.menus,
    ROUTES.faq,
    ROUTES.contact,
  ].map((path) => ({ url: `${SITE_URL}${path === '/' ? '' : path}` }));
}
