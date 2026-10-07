import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeading from '@/components/common/SectionHeading';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { ROUTES } from '@/config/routes';
import { SITE } from '@/config/site';
import { CUISINES } from '@/content/cuisines';
import { FACILITIES, ON_SITE_SUPPORT_QUOTE } from '@/content/facilities';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${SITE.name} — ${SITE.descriptor} across ${SITE.serviceArea}, from ${SITE.guestCapacity.min} guests upwards, with customised menus and full on-site setup and service.`,
  alternates: { canonical: ROUTES.about },
};

/**
 * About page.
 *
 * ⚠️ The previous version asserted:
 *   - "part of the GreenChillyz Group… restaurant brand serves thousands daily
 *      across multiple outlets" (not confirmed by the client; the CSV contains
 *      no mention of a group or restaurants)
 *   - "intimate gatherings of 50 guests to grand celebrations exceeding 5,000"
 *      (the client submitted a maximum of 200,000, not 5,000)
 *   - "Uncompromising Hygiene — strict food safety protocols, professional
 *      kitchen standards, quality-controlled sourcing" (no FSSAI licence or
 *      kitchen/sourcing claim was supplied)
 *   - "Years of expertise" / a premium positioning (never confirmed)
 * All of the above have been removed. What remains is confirmed fact only.
 */
export default function AboutPage() {
  return (
    <div className="pt-24 md:pt-28">
      {/* Intro */}
      <section className="section-spacing bg-white">
        <div className="page-container">
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              eyebrow="About Us"
              title={SITE.name.toUpperCase()}
              description={`${SITE.descriptor} — catering across ${SITE.serviceArea}.`}
            />

            <RevealOnScroll>
              <div className="prose prose-sand max-w-none text-muted-charcoal text-base leading-relaxed space-y-4">
                <p>
                  {SITE.name} caters for events of every kind — weddings,
                  receptions, engagements, haldi and mehendi functions,
                  birthdays, anniversaries, corporate and office events, private
                  and house parties, outdoor events and institutional catering.
                  The brief is simple: whatever you are celebrating, tell us
                  about it and we will tell you what we can do.
                </p>
                <p>
                  Menus are customised to your event, guest count and
                  preferences, drawn from {CUISINES.map((c) => c.name).join(', ')}{' '}
                  cuisines and beyond. Both predefined packages and fully
                  customised menus are available, and pricing is quoted per
                  person after a discussion about what you actually need.
                </p>
                <p>{ON_SITE_SUPPORT_QUOTE}</p>
                <p>
                  We are based in {SITE.contact.address.city},{' '}
                  {SITE.contact.address.region}, and serve {SITE.serviceArea}. We
                  also cater outside our primary area, subject to travel
                  requirements, permission and permit. Enquiries are handled by
                  our {SITE.contact.handlerRole}, and you can reach us on{' '}
                  {SITE.contact.preferredChannels.join(' or ')} at{' '}
                  {SITE.contact.phoneDisplay}.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* What happens on site */}
      <section className="section-spacing bg-warm-ivory border-y border-soft-border">
        <div className="page-container">
          <SectionHeading
            eyebrow="On Site"
            title="WHAT WE BRING AND WHAT WE HANDLE"
            description="Everything below is provided by our own team, from setup through to cleanup."
          />

          <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
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

      {/* CTA */}
      <section className="section-spacing bg-brand-yellow">
        <div className="page-container text-center">
          <h2 className="font-display text-3xl md:text-4xl text-chef-black mb-4">
            TELL US ABOUT YOUR EVENT
          </h2>
          <p className="text-base text-muted-charcoal max-w-md mx-auto mb-8 font-medium">
            Send your event type, date, guest count and location — we will
            prepare a quotation per person and share it with you.
          </p>
          <Link
            href={ROUTES.contact}
            className="inline-flex items-center px-8 py-3.5 text-sm font-bold text-white bg-chilli-red rounded-(--radius-button) hover:bg-chilli-red-dark transition-all duration-200 shadow-sm"
          >
            Get a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
