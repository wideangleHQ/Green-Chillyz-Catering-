import { SITE, SITE_ADDRESS_LINE } from '@/config/site';
import { CUISINES } from '@/content/cuisines';
import { SERVICES } from '@/content/services';

/**
 * JSON-LD structured data describing the business.
 *
 * Built strictly from confirmed client answers (Website Information Form,
 * 2026-09-25). Deliberately ABSENT because the client did not supply them:
 *   - aggregateRating / review          (no testimonials, no ratings)
 *   - openingHoursSpecification        (operating hours were answered ambiguously)
 *   - priceRange                       (pricing is quoted per enquiry, never published)
 *   - foundingDate / awards / hasCredential (FSSAI and awards not supplied)
 *   - numberOfEmployees, event counts
 *
 * Reintroduce a field only when the client supplies it in writing.
 */
export default function StructuredData() {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  ).replace(/\/$/, '');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CateringService',
    '@id': `${siteUrl}/#business`,
    name: SITE.name,
    description: `${SITE.descriptor} across ${SITE.serviceArea}.`,
    url: siteUrl,
    logo: `${siteUrl}/icons/logo.png`,
    image: `${siteUrl}/icons/logo.png`,
    telephone: SITE.contact.phoneE164,
    email: SITE.contact.email,
    currenciesAccepted: 'INR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.contact.address.street,
      addressLocality: SITE.contact.address.city,
      addressRegion: SITE.contact.address.region,
      postalCode: SITE.contact.address.postalCode,
      addressCountry: SITE.contact.address.countryCode,
    },
    hasMap: SITE.contact.mapsUrl,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: SITE.serviceArea,
    },
    availableLanguage: ['en'],
    // No openingHours / priceRange / aggregateRating — see the note above.
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Catering Services',
      itemListElement: SERVICES.filter((s) => !s.isCatchAll).map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.description },
      })),
    },
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Cuisine',
        description: `Customisable catering menus in ${CUISINES.map((c) => c.name).join(', ')}.`,
      },
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'enquiries',
      telephone: SITE.contact.phoneE164,
      email: SITE.contact.email,
      areaServed: 'IN',
      availableLanguage: ['en'],
    },
  };

  return (
    <script
      type="application/ld+json"
      // Next.js docs: escape "<" to prevent JSON-LD XSS injection.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
}

/** Exported for reuse in the <title>/description of a single page if needed. */
export const BUSINESS_ADDRESS_LINE = SITE_ADDRESS_LINE;
