import type { Metadata } from 'next';
import SectionHeading from '@/components/common/SectionHeading';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { ROUTES } from '@/config/routes';
import { SITE } from '@/config/site';
import { buildWhatsAppUrl, WHATSAPP_QUOTE_MESSAGE } from '@/config/whatsapp';
import { SERVICES } from '@/content/services';
import { FACILITIES, ON_SITE_SUPPORT_QUOTE } from '@/content/facilities';

export const metadata: Metadata = {
  title: 'Catering Services',
  description:
    `Catering services across ${SITE.serviceArea} — wedding, reception, engagement, haldi and mehendi, ` +
    'birthday, anniversary, corporate, office, private party, house party, outdoor and institutional catering.',
  alternates: { canonical: ROUTES.services.index },
};

/**
 * Single services page covering every service the client confirmed.
 *
 * The /services/[slug] detail pages were removed on 2026-09-30: the client
 * supplied service names but no per-service detail, so those pages could only
 * have carried invented copy. Each service is now an anchored section here.
 */
export default function ServicesPage() {
  const named = SERVICES.filter((s) => !s.isCatchAll);
  const catchAll = SERVICES.find((s) => s.isCatchAll);

  return (
    <div className="pt-24 md:pt-28">
      <section className="section-spacing bg-white">
        <div className="page-container">
          <SectionHeading
            eyebrow="Catering Services"
            title="WHAT WE CATER"
            description={`${SITE.descriptor}. These are the events we currently handle — pick yours, or describe something else on the enquiry form.`}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {named.map((service, i) => (
              <RevealOnScroll key={service.slug} delay={i * 60}>
                <article
                  id={service.slug}
                  className="h-full p-6 bg-warm-ivory rounded-(--radius-card) border border-soft-border hover:border-brand-yellow transition-colors scroll-mt-28"
                >
                  <h2 className="text-lg font-bold text-chef-black mb-2">
                    {service.title}
                  </h2>
                  <p className="text-sm text-muted-charcoal leading-relaxed">
                    {service.description}
                  </p>
                </article>
              </RevealOnScroll>
            ))}
          </div>

          {catchAll && (
            <RevealOnScroll delay={200}>
              <div className="mt-5 p-6 bg-pale-yellow/50 border border-brand-yellow/40 rounded-(--radius-card)">
                <h2 className="text-lg font-bold text-chef-black mb-2">
                  {catchAll.title}
                </h2>
                <p className="text-sm text-muted-charcoal leading-relaxed">
                  {catchAll.description}
                </p>
              </div>
            </RevealOnScroll>
          )}
        </div>
      </section>

      {/* What every service includes on site */}
      <section className="section-spacing bg-warm-ivory border-y border-soft-border">
        <div className="page-container">
          <SectionHeading
            eyebrow="Included On Site"
            title="WHAT WE BRING TO THE VENUE"
            description={ON_SITE_SUPPORT_QUOTE}
          />
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {FACILITIES.map((facility) => (
              <li
                key={facility.title}
                className="p-4 bg-white border border-soft-border rounded-(--radius-card) shadow-xs text-sm font-medium text-chef-black hover:border-brand-yellow transition-colors"
              >
                {facility.title}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Scale & location */}
      <section className="section-spacing bg-white">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-warm-ivory rounded-(--radius-card) border border-soft-border">
              <h2 className="text-base font-bold text-chef-black mb-2">
                Guest capacity
              </h2>
              <p className="text-sm text-muted-charcoal leading-relaxed">
                We generally cater from {SITE.guestCapacity.min} guests upwards.
                Send your guest count on the enquiry form and we will confirm
                availability for your date.
              </p>
            </div>
            <div className="p-6 bg-warm-ivory rounded-(--radius-card) border border-soft-border">
              <h2 className="text-base font-bold text-chef-black mb-2">
                Where we cater
              </h2>
              <p className="text-sm text-muted-charcoal leading-relaxed">
                {SITE.serviceArea}. We also cater outside our primary area —
                {` ${SITE.outOfAreaConditions}`}
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href={buildWhatsAppUrl(WHATSAPP_QUOTE_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-chilli-red rounded-(--radius-button) hover:bg-brand-yellow hover:text-chef-black transition-all duration-200 shadow-sm"
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Get a Quote on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
