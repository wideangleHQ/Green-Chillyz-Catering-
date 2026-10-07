import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeading from '@/components/common/SectionHeading';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { ROUTES } from '@/config/routes';
import { SITE } from '@/config/site';
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
            <Link
              href={ROUTES.contact}
              className="inline-flex items-center px-8 py-3.5 text-sm font-bold text-white bg-chilli-red rounded-(--radius-button) hover:bg-chilli-red-dark transition-all duration-200 shadow-sm"
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
