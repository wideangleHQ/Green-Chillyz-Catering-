import SectionHeading from '@/components/common/SectionHeading';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { SITE } from '@/config/site';
import { CUISINES, CUISINE_CATCH_ALL } from '@/content/cuisines';
import { ON_SITE_SUPPORT_QUOTE } from '@/content/facilities';

/**
 * "Why choose us" strip.
 *
 * Every claim below is a restatement of a confirmed client answer. The
 * previous version of this section asserted a founding year, a "Trusted
 * Experience / Years of expertise" claim and hygiene credentials — none of
 * which the client supplied. Those are removed, not softened.
 */
const highlights = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'Any Scale',
    description: `We generally cater from ${SITE.guestCapacity.min} guests upwards. Every event is quoted individually, per person, after we understand what you need.`,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 13.87A4 4 0 017.41 6a5.11 5.11 0 011.05-1.54 5 5 0 017.08 0A5.11 5.11 0 0116.59 6 4 4 0 0118 13.87V21H6Z" />
        <line x1="6" y1="17" x2="18" y2="17" />
      </svg>
    ),
    title: 'Customised Menus',
    description: `${CUISINES.map((c) => c.name).join(', ')} — and if it is not on this list, ask. “${CUISINE_CATCH_ALL}”. Both predefined packages and fully customised menus.`,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    ),
    title: 'Setup Through To Cleanup',
    description:
      'Buffet and table setup, serving staff, plates, cutlery, crockery, live counters, dessert and beverage counters, event coordination and cleanup.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: `Across ${SITE.primaryCity} & Odisha`,
    description: `${SITE.serviceArea}. Outside our primary area, ${SITE.outOfAreaConditions.toLowerCase()}`,
  },
];

export default function WhySection() {
  return (
    <section className="section-spacing major-section bg-warm-ivory">
      <div className="page-container">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="CATERING HANDLED END TO END"
          description={ON_SITE_SUPPORT_QUOTE}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <RevealOnScroll key={item.title} delay={i * 100}>
              <div
                className="group p-6 bg-white border border-soft-border rounded-(--radius-card) hover:border-brand-yellow hover:bg-pale-yellow/25 hover:shadow-card-hover transition-all duration-200"
              >
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-(--radius-badge) bg-pale-yellow text-chef-black mb-4 group-hover:bg-brand-yellow group-hover:text-chef-black transition-colors duration-200"
                >
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-chef-black mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-charcoal leading-relaxed">
                  {item.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
