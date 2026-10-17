'use client';

import { useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/config/routes';

import chineseImg from '@/assets/Food categories/Indo-Chinese Feast on a Rustic Table.png';
import bengaliImg from '@/assets/Food categories/Rustic Bengali Thali Feast.png';
import northIndianImg from '@/assets/Food categories/Rustic Indian Thali Feast.png';
import italianImg from '@/assets/Food categories/Rustic Italian Feast on a Wooden Table.png';
import southIndianImg from '@/assets/Food categories/Rustic South Indian Banana Leaf Feast.png';
import odiaImg from '@/assets/Food categories/Rustic South Indian Thali Feast.png';
import mughlaiImg from '@/assets/Food categories/Sumptuous Mughlai Feast on Copperware.png';
import continentalImg from '@/assets/Why Choose Us/Customized Menu.png';

export interface CuisineItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: StaticImageData;
  imageAlt: string;
  /** Responsive column layout span classes for editorial asymmetric composition */
  layoutClass: string;
  heightClass: string;
}

/**
 * 8 Confirmed Green Chillyz Cuisines with authorized descriptions.
 * Uses authentic Green Chillyz catering photography assets.
 */
const CUISINE_ITEMS: CuisineItem[] = [
  {
    id: 'odia',
    slug: 'odia',
    name: 'Odia',
    description: 'Explore Odia cuisine for your celebration.',
    image: odiaImg,
    imageAlt: 'Green Chillyz authentic Odia celebration banquet and dining spread',
    layoutClass: 'col-span-6 md:col-span-7',
    heightClass: 'h-[clamp(165px,44vw,210px)] md:h-[clamp(240px,38vw,350px)]',
  },
  {
    id: 'north-indian',
    slug: 'north-indian',
    name: 'North Indian',
    description: 'Discover North Indian cuisine for your event.',
    image: northIndianImg,
    imageAlt: 'Green Chillyz rich North Indian catering buffet and banquet spread',
    layoutClass: 'col-span-6 md:col-span-5',
    heightClass: 'h-[clamp(165px,44vw,210px)] md:h-[clamp(240px,38vw,350px)]',
  },
  {
    id: 'south-indian',
    slug: 'south-indian',
    name: 'South Indian',
    description: 'Explore South Indian food options for your guests.',
    image: southIndianImg,
    imageAlt: 'Green Chillyz live South Indian food counter and culinary presentation',
    layoutClass: 'col-span-6 md:col-span-4',
    heightClass: 'h-[clamp(165px,44vw,210px)] md:h-[clamp(160px,28vw,270px)]',
  },
  {
    id: 'bengali',
    slug: 'bengali',
    name: 'Bengali',
    description: 'Consider Bengali cuisine for your catering menu.',
    image: bengaliImg,
    imageAlt: 'Green Chillyz traditional Bengali feast and celebration catering',
    layoutClass: 'col-span-6 md:col-span-4',
    heightClass: 'h-[clamp(165px,44vw,210px)] md:h-[clamp(160px,28vw,270px)]',
  },
  {
    id: 'chinese',
    slug: 'chinese',
    name: 'Chinese',
    description: 'Explore Chinese cuisine as part of your menu.',
    image: chineseImg,
    imageAlt: 'Green Chillyz live Chinese food station and wok culinary counter',
    layoutClass: 'col-span-6 md:col-span-4',
    heightClass: 'h-[clamp(165px,44vw,210px)] md:h-[clamp(160px,28vw,270px)]',
  },
  {
    id: 'continental',
    slug: 'continental',
    name: 'Continental',
    description: 'Discover Continental food options for your occasion.',
    image: continentalImg,
    imageAlt: 'Green Chillyz gourmet Continental banquet dining and presentation',
    layoutClass: 'col-span-6 md:col-span-4',
    heightClass: 'h-[clamp(165px,44vw,210px)] md:h-[clamp(160px,28vw,270px)]',
  },
  {
    id: 'mughlai',
    slug: 'mughlai',
    name: 'Mughlai',
    description: 'Explore Mughlai cuisine for your event.',
    image: mughlaiImg,
    imageAlt: 'Green Chillyz royal Mughlai banquet spread and aromatic dishes',
    layoutClass: 'col-span-6 md:col-span-4',
    heightClass: 'h-[clamp(165px,44vw,210px)] md:h-[clamp(160px,28vw,270px)]',
  },
  {
    id: 'italian',
    slug: 'italian',
    name: 'Italian',
    description: 'Consider Italian cuisine for your catering menu.',
    image: italianImg,
    imageAlt: 'Green Chillyz contemporary Italian catering stations and dining setup',
    layoutClass: 'col-span-6 md:col-span-4',
    heightClass: 'h-[clamp(165px,44vw,210px)] md:h-[clamp(160px,28vw,270px)]',
  },
];

export default function MenuPreviewSection() {
  const [featuredCuisine, setFeaturedCuisine] = useState<CuisineItem>(CUISINE_ITEMS[0]);

  return (
    <section
      id="cuisines-and-menus"
      className="section-spacing bg-[#FFFDF5] border-t border-soft-border/50"
      aria-labelledby="cuisines-heading"
    >
      <div className="page-container">
        {/* =========================================================================
            1. SECTION INTRODUCTION
            Clean, editorial typography with warm ivory background & restrained accents
           ========================================================================= */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <span className="block text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-chilli-red mb-2">
            CUISINES &amp; MENUS
          </span>
          <h2
            id="cuisines-heading"
            className="font-display text-chef-black uppercase tracking-tight leading-[1.02]"
            style={{ fontSize: 'clamp(1.875rem, 4vw + 0.5rem, 3.5rem)' }}
          >
            A WORLD OF FLAVOURS, MADE FOR YOUR OCCASION.
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-muted-charcoal max-w-xl leading-relaxed font-normal">
            Explore our cuisines. Tell us what you love. We&apos;ll help you plan the menu.
          </p>
        </div>

        {/* =========================================================================
            2. ASYMMETRIC IMAGE-CARD SHOWCASE (8 CONFIRMED CUISINES)
            4 rows × 2 columns on mobile, editorial mosaic on desktop
           ========================================================================= */}
        <div className="grid grid-cols-12 gap-2.5 sm:gap-4 lg:gap-5">
          {CUISINE_ITEMS.map((cuisine) => {
            const isFeatured = featuredCuisine.slug === cuisine.slug;

            return (
              <div
                key={cuisine.id}
                role="button"
                tabIndex={0}
                aria-label={`${cuisine.name} cuisine`}
                onClick={() => setFeaturedCuisine(cuisine)}
                onMouseEnter={() => setFeaturedCuisine(cuisine)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setFeaturedCuisine(cuisine);
                  }
                }}
                className={`group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow ${
                  cuisine.layoutClass
                } ${cuisine.heightClass} ${
                  isFeatured
                    ? 'border-brand-yellow ring-1 ring-brand-yellow/80'
                    : 'border border-soft-border/70 hover:border-brand-yellow/80'
                }`}
              >
                {/* Background Food Photography */}
                <Image
                  src={cuisine.image}
                  alt={cuisine.imageAlt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />

                {/* Subtle Contrast Gradient */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-chef-black/95 via-chef-black/55 to-transparent md:from-chef-black/90 md:via-chef-black/35 md:to-transparent transition-opacity duration-300 pointer-events-none group-hover:from-chef-black/95 group-hover:via-chef-black/45"
                  aria-hidden="true"
                />

                {/* Top Corner: Clean Directional Arrow Icon */}
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 md:top-4 md:right-4 z-10 pointer-events-none">
                  <span
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-chef-black/50 backdrop-blur-xs flex items-center justify-center text-white transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-brand-yellow group-hover:text-chef-black"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5"
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

                {/* Bottom Card Content */}
                <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3.5 md:p-5 z-10">
                  <h3 className="font-display text-sm sm:text-base md:text-xl lg:text-2xl text-white tracking-wide uppercase leading-tight group-hover:text-brand-yellow transition-colors duration-200">
                    {cuisine.name}
                  </h3>

                  {/* Short Description — visible on mobile, reveals on hover on desktop */}
                  <p className="text-[11px] sm:text-xs md:text-[13px] text-sand-200 mt-0.5 sm:mt-1 opacity-100 translate-y-0 md:opacity-0 md:translate-y-1.5 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300 ease-out font-normal line-clamp-2 leading-snug">
                    {cuisine.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            3. FEATURED CUISINE SPOTLIGHT AREA
            Updates dynamically on hover / focus without layout shift
           ========================================================================= */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-5 bg-white border border-soft-border/80 rounded-xl sm:rounded-2xl transition-all duration-300">
          <div className="flex items-center gap-3.5 sm:gap-5">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-sand-200">
              <Image
                src={featuredCuisine.image}
                alt={featuredCuisine.imageAlt}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-muted-charcoal/70 block mb-0.5">
                Featured Cuisine
              </span>
              <h4 className="font-display text-xl sm:text-2xl text-chef-black uppercase tracking-tight leading-tight">
                {featuredCuisine.name}
              </h4>
              <p className="text-xs sm:text-sm text-muted-charcoal mt-0.5 max-w-xl leading-relaxed">
                {featuredCuisine.description}
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            4. MENU CUSTOMISATION NOTICE & PRIMARY CTA
            Refined information strip with clear enquiry handoff
           ========================================================================= */}
        <div className="mt-8 p-5 sm:p-6 bg-pale-yellow/60 border border-brand-yellow/40 rounded-xl sm:rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <h4 className="text-sm sm:text-base font-bold text-chef-black uppercase tracking-tight mb-1">
              EVERY MENU IS TAILORED TO YOUR EVENT.
            </h4>
            <p className="text-xs sm:text-sm text-muted-charcoal leading-relaxed max-w-xl font-normal">
              Menus are customised to your event. Finalise menu customisations at least two days before your event date.
            </p>
          </div>

          <Link
            href={ROUTES.contact}
            className="inline-flex items-center justify-center px-7 py-3.5 text-xs sm:text-sm font-bold text-white bg-chilli-red rounded-(--radius-button) hover:bg-brand-yellow hover:text-chef-black transition-all duration-200 shrink-0 min-h-[44px]"
            style={{ transitionDuration: 'var(--duration-fast)' }}
          >
            PLAN YOUR MENU &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
