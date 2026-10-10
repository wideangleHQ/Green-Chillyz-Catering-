import type { Metadata } from 'next';
import SectionHeading from '@/components/common/SectionHeading';
import QuoteForm from '@/components/forms/QuoteForm';
import { SITE } from '@/config/site';
import { WHATSAPP_TEL_HREF, buildWhatsAppUrl, WHATSAPP_QUOTE_MESSAGE } from '@/config/whatsapp';

export const metadata: Metadata = {
  title: 'Get a Quote',
  description: `Request a catering quotation for your event in ${SITE.primaryCity} or anywhere in Odisha. Share your event type, date, guest count and location — pricing is quoted per person.`,
  alternates: { canonical: '/contact' },
};

/**
 * Contact / Get-a-Quote page.
 *
 * Every contact detail here comes from the client's Website Information Form.
 * Changes made:
 *   - Email  info@greenchillyzcatering.com → greenchillyzcatering@gmail.com
 *     (the client supplied the Gmail address; the .com address was an earlier
 *     assumption and is not in the submission).
 *   - Removed the second phone number +91-9778011110 from the footer — the
 *     client supplied a single number and answered "Yes" to using the same
 *     number for phone and WhatsApp.
 *   - Removed "within 2 hours" from the metadata and the process steps. The
 *     client's stated expected response time is "Immediate".
 *   - Removed "Discuss, taste, and finalize your perfect menu together" — the
 *     client supplied no tasting-session policy.
 *   - No business operating hours are shown: the client's answer to that
 *     question ("Catering and Services") was ambiguous and is unresolved.
 */
export default function ContactPage() {
  return (
    <div className="pt-24 md:pt-28">
      {/* Quote Form */}
      <section className="section-spacing bg-white">
        <div className="page-container">
          <SectionHeading
            eyebrow="Get a Quote"
            title="TELL US ABOUT YOUR EVENT"
            description="Share your event type, date, guest count and location. We need the detail information about your event before we can prepare a quotation."
          />

          <div className="max-w-2xl mx-auto">
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* Contact details */}
      <section className="section-spacing bg-warm-ivory border-t border-soft-border">
        <div className="page-container">
          <SectionHeading
            eyebrow="Prefer to Talk?"
            title="REACH US DIRECTLY"
            description={`Enquiries are handled by our ${SITE.contact.handlerRole}. Expected response time: ${SITE.contact.responseTime}.`}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {/* WhatsApp */}
            <a
              href={buildWhatsAppUrl(WHATSAPP_QUOTE_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-white border border-soft-border rounded-(--radius-card) shadow-xs hover:border-brand-yellow transition-all duration-200 text-center group"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] mb-3 group-hover:scale-105 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-chef-black mb-1">WhatsApp</h3>
              <p className="text-xs text-muted-charcoal">{SITE.contact.phoneDisplay}</p>
            </a>

            {/* Phone */}
            <a
              href={WHATSAPP_TEL_HREF}
              className="flex flex-col items-center p-6 bg-white border border-soft-border rounded-(--radius-card) shadow-xs hover:border-brand-yellow transition-all duration-200 text-center group"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-yellow/30 text-chef-black mb-3 group-hover:scale-105 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-chef-black mb-1">Call Us</h3>
              <p className="text-xs text-muted-charcoal">{SITE.contact.phoneDisplay}</p>
            </a>

            {/* Email */}
            <a
              href={`mailto:${SITE.contact.email}`}
              className="flex flex-col items-center p-6 bg-white border border-soft-border rounded-(--radius-card) shadow-xs hover:border-brand-yellow transition-all duration-200 text-center group"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-yellow/30 text-chef-black mb-3 group-hover:scale-105 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-chef-black mb-1">Email</h3>
              <p className="text-xs text-muted-charcoal break-all">{SITE.contact.email}</p>
            </a>
          </div>

          {/* Booking process — every step traceable to a client answer */}
          <div className="mt-14 max-w-4xl mx-auto">
            <h3 className="text-lg font-bold text-chef-black text-center mb-2">
              How It Works
            </h3>
            <p className="text-xs text-muted-charcoal text-center mb-8 font-medium">
              Quotation calculated {SITE.pricingModel.toLowerCase()}. Confirmed
              booking on advance payment after final discussion.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'Share Details',
                  desc: 'Send your event type, date, guest count and location via the form, WhatsApp or phone.',
                },
                {
                  step: '02',
                  title: 'We Discuss',
                  desc: 'We review the detail information about your event and finalise the menu and facilities you need.',
                },
                {
                  step: '03',
                  title: 'Quotation Shared',
                  desc: 'Your per-person quotation is shared after the final discussion — by WhatsApp, email, PDF or in person.',
                },
                {
                  step: '04',
                  title: 'Booking Confirmed',
                  desc: 'Your booking is confirmed on payment of the advance amount, following the final discussion.',
                },
              ].map((item) => (
                <div key={item.step} className="text-center p-4 bg-white border border-soft-border rounded-(--radius-card)">
                  <span className="inline-block text-2xl font-display text-chilli-red mb-2">
                    {item.step}
                  </span>
                  <h4 className="text-sm font-bold text-chef-black mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-charcoal leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Address + socials */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="p-6 bg-white border border-soft-border rounded-(--radius-card) shadow-xs text-center">
              <h3 className="text-sm font-bold text-chef-black mb-2">Our Address</h3>
              <address className="text-sm text-muted-charcoal not-italic leading-relaxed">
                {SITE.contact.address.street}
                <br />
                {SITE.contact.address.city}, {SITE.contact.address.region}{' '}
                {SITE.contact.address.postalCode}
              </address>
              <a
                href={SITE.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-4 text-sm font-bold text-chilli-red hover:underline"
              >
                View on Google Maps
                <svg className="ml-1.5 w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            </div>

            <div className="p-6 bg-white border border-soft-border rounded-(--radius-card) shadow-xs text-center">
              <h3 className="text-sm font-bold text-chef-black mb-2">
                Follow Us
              </h3>
              <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
                {[
                  { label: 'Instagram', href: SITE.social.instagram },
                  { label: 'Facebook', href: SITE.social.facebook },
                  { label: 'YouTube', href: SITE.social.youtube },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-chef-black hover:text-chilli-red transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-charcoal mt-4">
                Serving {SITE.serviceArea}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
