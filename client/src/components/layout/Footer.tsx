import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/config/routes';
import { SITE } from '@/config/site';
import { WHATSAPP_TEL_HREF, buildWhatsAppUrl, WHATSAPP_GENERIC_MESSAGE } from '@/config/whatsapp';
import { SERVICES } from '@/content/services';
import cateringLogo from '@/assets/Logos/Catering Logo.png';

const footerNav = {
  // Anchors into the single services page — /services/[slug] detail pages were
  // removed because the client supplied no per-service detail (see routes.ts).
  services: SERVICES.filter((s) => !s.isCatchAll)
    .slice(0, 5)
    .map((s) => ({ label: s.title, href: `${ROUTES.services.index}#${s.slug}` })),
  explore: [
    { label: 'About Us', href: ROUTES.about },
    { label: 'Menus & Cuisines', href: ROUTES.menus },
    { label: 'Gallery', href: ROUTES.gallery },
    { label: 'FAQ', href: ROUTES.faq },
    { label: 'Get a Quote', href: ROUTES.contact },
  ],
};

const socialLinks = [
  { label: 'Instagram', href: SITE.social.instagram },
  { label: 'Facebook', href: SITE.social.facebook },
  { label: 'YouTube', href: SITE.social.youtube },
];

const phoneIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const mailIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
  </svg>
);

const whatsappIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-chef-black text-sand-300">
      <div className="page-container section-spacing">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Image
              src={cateringLogo}
              alt={SITE.name}
              width={160}
              height={52}
              className="h-12 md:h-14 w-auto object-contain mb-4"
            />
            <p className="text-sm leading-relaxed text-sand-400 max-w-xs">
              {SITE.descriptor} across {SITE.serviceArea}.
            </p>
            <ul className="flex items-center gap-4 mt-5">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="text-sm text-sand-300 hover:text-brand-yellow transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold text-brand-yellow tracking-wider uppercase mb-4">
              Catering Services
            </h3>
            <ul className="space-y-2.5">
              {footerNav.services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-sand-300 hover:text-brand-yellow transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-bold text-brand-yellow tracking-wider uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {footerNav.explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-sand-300 hover:text-brand-yellow transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold text-brand-yellow tracking-wider uppercase mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3">
              <li>
                {/* Single confirmed number. The client confirmed the same number
                    is used for phone calls and WhatsApp. */}
                <a
                  href={WHATSAPP_TEL_HREF}
                  className="flex items-center gap-2.5 text-sm text-sand-300 hover:text-brand-yellow transition-colors"
                >
                  {phoneIcon}
                  {SITE.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className="flex items-center gap-2.5 text-sm text-sand-300 hover:text-brand-yellow transition-colors"
                >
                  {mailIcon}
                  {SITE.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-sand-300 hover:text-brand-yellow transition-colors"
                >
                  {SITE.contact.address.street}, {SITE.contact.address.city}
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppUrl(WHATSAPP_GENERIC_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#25D366] rounded-(--radius-button) hover:bg-[#20BD5A] transition-colors"
                >
                  {whatsappIcon}
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Address + service area */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-xs text-sand-400">
              {SITE.contact.address.street}, {SITE.contact.address.city},{' '}
              {SITE.contact.address.region} {SITE.contact.address.postalCode} &middot; Serving{' '}
              {SITE.serviceArea}
            </p>
            <p className="text-xs text-sand-400">
              &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
