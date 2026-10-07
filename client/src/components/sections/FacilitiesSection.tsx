import SectionHeading from '@/components/common/SectionHeading';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import {
  FACILITIES,
  FACILITIES_CATCH_ALL,
  LIVE_STATION_NOTICE,
  ON_SITE_SUPPORT_QUOTE,
} from '@/content/facilities';

/**
 * On-site facilities and support.
 *
 * Replaces the previous "HygieneSection", which advertised "Food Safety
 * Standards", a "Professional Kitchen", "Trained Service Staff" and "Fresh,
 * high-quality ingredients sourced daily". The client confirmed NONE of those
 * — no FSSAI licence, no kitchen or sourcing claim. Advertising them would have
 * been a fabricated food-safety claim, so the section was replaced rather than
 * reworded.
 *
 * What remains is the list the client explicitly ticked in answer to
 * "Which catering services/facilities do you provide?".
 */
export default function FacilitiesSection() {
  return (
    <section className="section-spacing major-section bg-warm-ivory">
      <div className="page-container">
        <SectionHeading
          eyebrow="On-Site Facilities"
          title="EVERYTHING ON SITE, HANDLED BY US"
          description={ON_SITE_SUPPORT_QUOTE}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {FACILITIES.map((facility, i) => (
            <RevealOnScroll key={facility.title} delay={i * 40}>
              <div className="h-full p-5 bg-white border border-soft-border rounded-(--radius-card) shadow-(--shadow-card) hover:border-brand-yellow transition-colors">
                <h3 className="text-sm font-semibold text-chef-black mb-1.5">
                  {facility.title}
                </h3>
                <p className="text-xs text-muted-charcoal leading-relaxed">
                  {facility.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={200}>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-pale-yellow border border-brand-yellow/40 rounded-(--radius-card)">
              <h3 className="text-base font-semibold text-chef-black mb-2">
                Live Food Counters &amp; Cooking Stations
              </h3>
              <p className="text-sm text-muted-charcoal leading-relaxed">
                {LIVE_STATION_NOTICE}
              </p>
            </div>
            <div className="p-6 bg-white border border-soft-border rounded-(--radius-card) shadow-(--shadow-card)">
              <h3 className="text-base font-semibold text-chef-black mb-2">
                Anything Else Your Event Needs
              </h3>
              <p className="text-sm text-muted-charcoal leading-relaxed">
                {FACILITIES_CATCH_ALL} Describe what you have in mind on the
                enquiry form and we will confirm.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
