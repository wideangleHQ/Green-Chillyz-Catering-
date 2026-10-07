import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeading from '@/components/common/SectionHeading';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { ROUTES } from '@/config/routes';
import { SITE } from '@/config/site';
import {
  CUISINES,
  CUISINE_CATCH_ALL,
  FOOD_OPTIONS,
  MENU_CUSTOMISATION_NOTICE,
} from '@/content/cuisines';
import { LIVE_STATION_NOTICE } from '@/content/facilities';

export const metadata: Metadata = {
  title: 'Menus & Cuisines',
  description:
    `Customised catering menus in ${CUISINES.map((c) => c.name).join(', ')}. ` +
    `Vegetarian, non-vegetarian and special dietary options. Pricing is quoted per person after your enquiry — ${SITE.primaryCity} and across Odisha.`,
  alternates: { canonical: ROUTES.menus },
};

/**
 * Menus page.
 *
 * ⚠️ The previous version of this page published ~35 named dishes
 * (Dalma, Chhena Poda, Machha Besara, Dal Makhani, Masala Dosa, Hakka Noodles,
 * Paneer Butter Masala …) and 8 named live stations. NONE of these were
 * supplied by the client — the menu-document upload was left blank and the
 * menu-category question was answered with the open-ended phrase
 * "All Type On Your Mind". Every dish name has been removed.
 *
 * Pricing is likewise absent by client instruction: "Display Pricing Only
 * After Enquiry" / "Price Will Be Vary As Per Customization".
 */
export default function MenusPage() {
  return (
    <div className="pt-24 md:pt-28">
      {/* Cuisines */}
      <section className="section-spacing bg-white">
        <div className="page-container">
          <SectionHeading
            eyebrow="Cuisines"
            title="CUISINES WE CURRENTLY OFFER"
            description={`${CUISINES.map((c) => c.name).join(', ')} — and, in the client's words, “${CUISINE_CATCH_ALL}”.`}
          />

          <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CUISINES.map((cuisine, i) => (
              <RevealOnScroll key={cuisine.slug} delay={i * 50}>
                <li className="h-full p-5 bg-warm-ivory rounded-(--radius-card) border border-soft-border hover:border-brand-yellow transition-colors text-center">
                  <span className="text-base font-bold text-chef-black">
                    {cuisine.name}
                  </span>
                </li>
              </RevealOnScroll>
            ))}
          </ul>
        </div>
      </section>

      {/* Food options */}
      <section className="section-spacing bg-warm-ivory border-y border-soft-border">
        <div className="page-container">
          <SectionHeading
            eyebrow="Food Options"
            title="VEG, NON-VEG AND DIETARY OPTIONS"
            description="Tell us the split you need and it will be built into your quotation."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FOOD_OPTIONS.map((option, i) => (
              <RevealOnScroll key={option.slug} delay={i * 80}>
                <div className="h-full p-6 bg-white rounded-(--radius-card) border border-soft-border shadow-xs hover:border-brand-yellow transition-colors">
                  <h3 className="text-base font-bold text-chef-black mb-2">
                    {option.name}
                  </h3>
                  <p className="text-sm text-muted-charcoal leading-relaxed">
                    {option.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Packages, customisation, live stations, pricing */}
      <section className="section-spacing bg-white">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-6 bg-warm-ivory rounded-(--radius-card) border border-soft-border">
              <h2 className="text-lg font-bold text-chef-black mb-2">
                Packages &amp; customisation
              </h2>
              <p className="text-sm text-muted-charcoal leading-relaxed mb-3">
                We offer both predefined packages and fully customised menus.
                Your menu is built around your event, guest count, cuisine
                preferences and dietary requirements.
              </p>
              <p className="text-sm text-muted-charcoal leading-relaxed font-medium">
                {MENU_CUSTOMISATION_NOTICE}
              </p>
            </div>

            <div className="p-6 bg-warm-ivory rounded-(--radius-card) border border-soft-border">
              <h2 className="text-lg font-bold text-chef-black mb-2">
                Live stations
              </h2>
              <p className="text-sm text-muted-charcoal leading-relaxed">
                {LIVE_STATION_NOTICE} Name the stations you want on the enquiry
                form and they will be built into your quotation.
              </p>
            </div>

            <div className="p-6 bg-pale-yellow/50 border border-brand-yellow/40 rounded-(--radius-card) md:col-span-2">
              <h2 className="text-lg font-bold text-chef-black mb-2">
                Pricing
              </h2>
              <p className="text-sm text-muted-charcoal leading-relaxed">
                Quotations are calculated <strong>per person</strong> and are
                shared after your enquiry, because the price varies with your
                menu, event type, guest count and the facilities you need. We do
                not publish a generic rate that would not apply to your event.
                Send an enquiry and we will quote you individually.
              </p>
              <div className="mt-5">
                <Link
                  href={ROUTES.contact}
                  className="inline-flex items-center px-8 py-3.5 text-sm font-bold text-white bg-chilli-red rounded-(--radius-button) hover:bg-chilli-red-dark transition-all duration-200 shadow-sm"
                  style={{ transitionDuration: 'var(--duration-fast)' }}
                >
                  Request a Quotation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
