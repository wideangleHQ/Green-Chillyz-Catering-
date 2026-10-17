import type { Metadata } from 'next';
import Image, { type StaticImageData } from 'next/image';
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

import chineseImg from '@/assets/Food categories/Indo-Chinese Feast on a Rustic Table.png';
import bengaliImg from '@/assets/Food categories/Rustic Bengali Thali Feast.png';
import northIndianImg from '@/assets/Food categories/Rustic Indian Thali Feast.png';
import italianImg from '@/assets/Food categories/Rustic Italian Feast on a Wooden Table.png';
import southIndianImg from '@/assets/Food categories/Rustic South Indian Banana Leaf Feast.png';
import odiaImg from '@/assets/Food categories/Rustic South Indian Thali Feast.png';
import mughlaiImg from '@/assets/Food categories/Sumptuous Mughlai Feast on Copperware.png';
import continentalImg from '@/assets/Why Choose Us/Customized Menu.png';

export const metadata: Metadata = {
  title: 'Menus & Cuisines',
  description:
    `Customised catering menus in ${CUISINES.map((c) => c.name).join(', ')}. ` +
    `Vegetarian, non-vegetarian and special dietary options. Pricing is quoted per person after your enquiry — ${SITE.primaryCity} and across Odisha.`,
  alternates: { canonical: ROUTES.menus },
};

interface CuisineVisual {
  description: string;
  image: StaticImageData;
  imageAlt: string;
}

const CUISINE_VISUALS: Record<string, CuisineVisual> = {
  odia: {
    description: 'Traditional Odia banquet feast with authentic regional preparations and celebration specialities.',
    image: odiaImg,
    imageAlt: 'Green Chillyz authentic Odia celebration banquet feast and dining spread',
  },
  'north-indian': {
    description: 'Rich royal gravies, clay-oven tandoori breads, fragrant rice dishes, and classic thali feasts.',
    image: northIndianImg,
    imageAlt: 'Green Chillyz rich North Indian catering buffet and banquet spread',
  },
  'south-indian': {
    description: 'Crispy live dosas, steamed idlis, fragrant sambar, fresh coconut chutneys, and feast thalis.',
    image: southIndianImg,
    imageAlt: 'Green Chillyz live South Indian food counter and culinary presentation',
  },
  bengali: {
    description: 'Signature celebration dishes, mustard curries, fragrant rice courses, and traditional sweets.',
    image: bengaliImg,
    imageAlt: 'Green Chillyz traditional Bengali feast and celebration catering',
  },
  chinese: {
    description: 'Wok-tossed noodles, Indo-Chinese appetisers, flavorful gravies, and live wok cooking counters.',
    image: chineseImg,
    imageAlt: 'Green Chillyz live Chinese food station and wok culinary counter',
  },
  continental: {
    description: 'Gourmet banquet spreads, pasta live counters, fresh salads, and multi-course dining selections.',
    image: continentalImg,
    imageAlt: 'Green Chillyz gourmet Continental banquet dining and presentation',
  },
  mughlai: {
    description: 'Royal Dum Biryani, slow-cooked kormas, succulent seekh kebabs, and authentic Mughlai delicacies.',
    image: mughlaiImg,
    imageAlt: 'Green Chillyz royal Mughlai banquet spread and aromatic dishes',
  },
  italian: {
    description: 'Hand-crafted pizzas, creamy pastas, herb garlic breads, and Mediterranean dining favourites.',
    image: italianImg,
    imageAlt: 'Green Chillyz contemporary Italian catering stations and dining setup',
  },
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {CUISINES.map((cuisine, i) => {
              const visual = CUISINE_VISUALS[cuisine.slug];
              return (
                <RevealOnScroll key={cuisine.slug} delay={i * 60}>
                  <div className="group relative h-[280px] sm:h-[320px] lg:h-[360px] rounded-2xl overflow-hidden border border-soft-border/80 hover:border-brand-yellow/80 hover:shadow-card-hover transition-all duration-300">
                    {/* Background Food Photography */}
                    {visual && (
                      <Image
                        src={visual.image}
                        alt={visual.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    )}

                    {/* Gradient Overlay for Legibility */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-chef-black/95 via-chef-black/45 to-transparent transition-opacity duration-300 group-hover:from-chef-black/95 group-hover:via-chef-black/55"
                      aria-hidden="true"
                    />

                    {/* Top Right Corner Arrow */}
                    <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-10 pointer-events-none">
                      <span
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-chef-black/50 backdrop-blur-xs flex items-center justify-center text-white transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-brand-yellow group-hover:text-chef-black"
                        aria-hidden="true"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 12L12 4M12 4H6M12 4V10" />
                        </svg>
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 flex flex-col justify-end">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-brand-yellow mb-1">
                        Cuisine
                      </span>
                      <h3 className="font-display text-lg sm:text-xl lg:text-2xl text-white tracking-wide uppercase leading-tight group-hover:text-brand-yellow transition-colors duration-200">
                        {cuisine.name}
                      </h3>
                      {visual && (
                        <p className="text-xs sm:text-sm text-sand-200 mt-1.5 leading-snug line-clamp-2 font-normal">
                          {visual.description}
                        </p>
                      )}
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>

          {/* Special Customisation Banner */}
          <div className="mt-8 sm:mt-10 p-5 sm:p-7 bg-[#FFFDF5] border border-brand-yellow/50 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 shadow-xs">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-chilli-red block mb-1">
                Bespoke Catering
              </span>
              <h3 className="font-display text-xl sm:text-2xl text-chef-black uppercase tracking-tight">
                “{CUISINE_CATCH_ALL}”
              </h3>
              <p className="text-xs sm:text-sm text-muted-charcoal mt-1.5 leading-relaxed font-normal">
                Have a special family recipe, regional festive specialty, or custom fusion menu in mind? We design bespoke menus tailored to your guests and occasion.
              </p>
            </div>
            <Link
              href={ROUTES.contact}
              className="inline-flex items-center justify-center px-7 py-3 text-xs sm:text-sm font-bold text-white bg-chilli-red rounded-(--radius-button) hover:bg-brand-yellow hover:text-chef-black transition-all duration-200 shrink-0 min-h-[44px]"
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              REQUEST CUSTOM MENU &rarr;
            </Link>
          </div>
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
