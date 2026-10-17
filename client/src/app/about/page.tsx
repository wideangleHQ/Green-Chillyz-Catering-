import type { Metadata } from 'next';
import SectionHeading from '@/components/common/SectionHeading';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { ROUTES } from '@/config/routes';
import { SITE } from '@/config/site';
import { buildWhatsAppUrl, WHATSAPP_QUOTE_MESSAGE } from '@/config/whatsapp';
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
          <a
            href={buildWhatsAppUrl(WHATSAPP_QUOTE_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-chilli-red rounded-(--radius-button) hover:bg-brand-yellow hover:text-chef-black transition-all duration-200 shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Get a Quote on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
