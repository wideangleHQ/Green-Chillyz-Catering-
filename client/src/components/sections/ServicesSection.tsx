import Link from 'next/link';
import SectionHeading from '@/components/common/SectionHeading';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { ROUTES } from '@/config/routes';
import { SERVICES } from '@/content/services';
import { SITE } from '@/config/site';

/**
 * Homepage services preview.
 *
 * Sourced from client/src/content/services.ts — the 13 catering services the
 * client confirmed. Cards link to anchors on /services rather than to detail
 * pages, because no per-service detail was supplied.
 *
 * The previous version showed 6 services with emoji icons and linked to
 * /services/[slug] pages that have now been removed.
 */
const preview = SERVICES.filter((s) => !s.isCatchAll).slice(0, 6);

export default function ServicesSection() {
  return (
    <section className="section-spacing major-section bg-white">
      <div className="page-container">
        <SectionHeading
          eyebrow="Our Services"
          title="CATERING FOR EVERY EVENT"
          description={`${SITE.descriptor}. Tell us what you are planning and we will confirm what we can take on.`}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {preview.map((service, i) => (
            <RevealOnScroll key={service.slug} delay={i * 80}>
              <Link
                href={`${ROUTES.services.index}#${service.slug}`}
                className="group block p-6 bg-warm-ivory border border-soft-border rounded-(--radius-card) shadow-(--shadow-card) hover:shadow-(--shadow-card-hover) hover:border-brand-yellow transition-all duration-200 h-full"
              >
                <h3 className="text-lg font-semibold text-chef-black mb-2 group-hover:text-chilli-red transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-charcoal leading-relaxed">
                  {service.description}
                </p>
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={500}>
          <div className="text-center mt-10">
            <Link
              href={ROUTES.services.index}
              className="inline-flex items-center px-6 py-3 text-sm font-semibold text-chef-black border-2 border-chef-black rounded-(--radius-button) hover:bg-brand-yellow hover:border-brand-yellow hover:text-chef-black transition-colors"
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              View All Services
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
