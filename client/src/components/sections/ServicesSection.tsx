'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { SITE } from '@/config/site';
import { buildWhatsAppUrl } from '@/config/whatsapp';

import cateringCategoryImg1 from '@/assets/Categories/Green Chillyz Catering _ 1.png';
import cateringCategoryImg2 from '@/assets/Categories/Green Chillyz Catering _ 2.png';

export interface ConfirmedService {
  id: string;
  slug: string;
  navTitle: string;
  title: string;
  description: string;
}

/**
 * Two Fixed Catering Photographs for the entire section.
 * Both images remain identical and static across all 13 categories.
 * Native resolution: 1122 x 1402 (Aspect ratio: exactly 4:5).
 */
const FIXED_CATERING_IMAGES = {
  primary: {
    src: cateringCategoryImg1,
    alt: 'Green Chillyz grand illuminated royal catering buffet banquet presentation with golden arches and chafer service',
  },
  secondary: {
    src: cateringCategoryImg2,
    alt: 'Green Chillyz professional catering chef in black toque serving live biryani and authentic delicacies to banquet guests',
  },
} as const;

/**
 * 12 Confirmed Green Chillyz Catering Services + General Any Type of Catering.
 * Sourced authoritatively from the verified client business information.
 */
const SERVICES_DATA: ConfirmedService[] = [
  {
    id: 'wedding',
    slug: 'wedding',
    navTitle: 'Wedding',
    title: 'Wedding Catering',
    description:
      'Make your wedding celebration memorable with catering planned around your guests, food preferences, and event requirements. Choose from a range of cuisines and discuss a customised menu with the Green Chillyz team.',
  },
  {
    id: 'reception',
    slug: 'reception',
    navTitle: 'Reception',
    title: 'Reception Catering',
    description:
      'Plan reception catering around your guest count, preferred cuisines, and serving requirements. From menu customisation to buffet setup and on-site service arrangements, discuss the details of your event with our team.',
  },
  {
    id: 'engagement',
    slug: 'engagement',
    navTitle: 'Engagement',
    title: 'Engagement Catering',
    description:
      'Celebrate your engagement with a menu tailored to your occasion and guests. Share your preferred cuisines, guest count, location, and event requirements so the team can prepare a suitable quotation.',
  },
  {
    id: 'haldi-mehendi',
    slug: 'haldi-mehendi',
    navTitle: 'Haldi / Mehendi',
    title: 'Haldi / Mehendi Catering',
    description:
      'Plan catering for your Haldi or Mehendi celebration with food choices suited to your gathering. Discuss your preferred menu, guest count, setup, and serving requirements with Green Chillyz Catering.',
  },
  {
    id: 'birthday',
    slug: 'birthday',
    navTitle: 'Birthday Party',
    title: 'Birthday Party Catering',
    description:
      'Make birthday celebrations easier to plan with catering arranged around your guests and preferences. Share your event details and explore suitable menu customisation and catering arrangements.',
  },
  {
    id: 'anniversary',
    slug: 'anniversary',
    navTitle: 'Anniversary',
    title: 'Anniversary Catering',
    description:
      'Celebrate your anniversary with catering planned around the occasion, your guests, and your preferred food choices. Discuss your requirements with the team to receive a customised quotation.',
  },
  {
    id: 'corporate',
    slug: 'corporate',
    navTitle: 'Corporate',
    title: 'Corporate Catering',
    description:
      'Arrange catering for corporate events with menus and service requirements discussed around your event. Share the expected guest count, location, menu preferences, and setup needs to plan the catering arrangements.',
  },
  {
    id: 'office-business',
    slug: 'office-business',
    navTitle: 'Office / Business',
    title: 'Office / Business Events',
    description:
      'Plan catering for office gatherings, business functions, and professional events. Green Chillyz can discuss menu preferences, guest numbers, buffet arrangements, serving staff, and other relevant catering requirements.',
  },
  {
    id: 'private-party',
    slug: 'private-party',
    navTitle: 'Private Party',
    title: 'Private Party Catering',
    description:
      'Make private celebrations easier to organise with catering tailored to your gathering. Discuss your menu preferences, guest count, location, and the level of on-site catering support you require.',
  },
  {
    id: 'outdoor',
    slug: 'outdoor',
    navTitle: 'Outdoor',
    title: 'Outdoor Catering',
    description:
      'Plan catering for outdoor events by discussing the venue, guest count, menu, and service arrangements with the team. Additional travel requirements, permissions, and permits may apply outside the primary service area.',
  },
  {
    id: 'house-party',
    slug: 'house-party',
    navTitle: 'House Party',
    title: 'House Party Catering',
    description:
      'Arrange catering for your house party around your guest count, food preferences, and available event space. Discuss menu options, food service, and any setup requirements before requesting your quotation.',
  },
  {
    id: 'institutional',
    slug: 'institutional',
    navTitle: 'Institutional',
    title: 'Institutional Catering',
    description:
      'Discuss catering requirements for institutional events and gatherings with the Green Chillyz team. Share the expected number of guests, location, menu preferences, and service requirements for an individually prepared quotation.',
  },
  {
    id: 'any-type',
    slug: 'any-type',
    navTitle: 'Any Type of Catering',
    title: 'Any Type of Catering',
    description:
      'Have a different event in mind? Green Chillyz offers catering for a wide range of occasions. Share your event details, preferred cuisines, guest count, and service requirements so the team can understand your needs.',
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const activeService = SERVICES_DATA[activeIndex];

  const sectionRef = useRef<HTMLElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);

  // Category selection updates only the active index and text content; images remain 100% static
  const handleSelectService = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setActiveIndex(index);
      setIsTransitioning(true);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 150);

      // Smoothly scroll active tab into view in the horizontal scroller
      if (tabListRef.current) {
        const buttons = tabListRef.current.querySelectorAll<HTMLButtonElement>('[role="tab"]');
        const activeBtn = buttons[index];
        if (activeBtn) {
          activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    },
    [activeIndex],
  );

  const scrollTabList = (direction: 'left' | 'right') => {
    if (!tabListRef.current) return;
    const offset = direction === 'left' ? -200 : 200;
    tabListRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  // Keyboard navigation for accessible text tabs
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (activeIndex + 1) % SERVICES_DATA.length;
      handleSelectService(nextIndex);
      focusTab(nextIndex);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (activeIndex - 1 + SERVICES_DATA.length) % SERVICES_DATA.length;
      handleSelectService(prevIndex);
      focusTab(prevIndex);
    } else if (e.key === 'Home') {
      e.preventDefault();
      handleSelectService(0);
      focusTab(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      const lastIndex = SERVICES_DATA.length - 1;
      handleSelectService(lastIndex);
      focusTab(lastIndex);
    }
  };

  const focusTab = (index: number) => {
    if (!tabListRef.current) return;
    const buttons = tabListRef.current.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    if (buttons[index]) {
      buttons[index].focus();
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full bg-[#FFFDF5] lg:min-h-screen flex flex-col justify-center py-12 sm:py-16 lg:py-20 overflow-hidden border-t border-soft-border/50"
      aria-labelledby="services-heading"
    >
      <div className="page-container flex flex-col justify-center my-auto w-full">
        {/* =========================================================================
            1. SECTION HEADING (Top of Section)
           ========================================================================= */}
        <div className="mb-6 sm:mb-8 text-left">
          <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-chilli-red mb-2">
            What We Cater
          </span>
          <h2
            id="services-heading"
            className="font-display text-chef-black leading-[1.02] tracking-tight uppercase"
            style={{ fontSize: 'clamp(1.875rem, 4vw + 0.5rem, 3.25rem)' }}
          >
            OUR SERVICES
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-[15px] text-muted-charcoal leading-relaxed max-w-2xl font-normal">
            {SITE.descriptor} across {SITE.serviceArea}. Events are quoted individually based on guest count, menu customisation, and event requirements.
          </p>
        </div>

        {/* =========================================================================
            2. CATEGORY BUTTONS — In A Single Horizontal Line Immediately Below Heading
               (flex-wrap: nowrap, controlled horizontal scroll without page overflow)
           ========================================================================= */}
        <div className="relative w-full mb-8 sm:mb-10 lg:mb-12">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Scroll Left Arrow */}
            <button
              type="button"
              aria-label="Scroll categories left"
              onClick={() => scrollTabList('left')}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-warm-ivory border border-soft-border text-chef-black hover:bg-brand-yellow shrink-0 cursor-pointer active:scale-95 transition-all shadow-xs"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Horizontal Category Tab List: 13 buttons in 1 row without wrapping */}
            <div
              ref={tabListRef}
              role="tablist"
              aria-label="Catering Service Categories"
              onKeyDown={handleKeyDown}
              className="flex items-center flex-nowrap gap-1.5 sm:gap-2 lg:gap-2.5 pb-2 border-b border-soft-border/80 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth touch-pan-x w-full"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {SERVICES_DATA.map((service, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={service.id}
                    type="button"
                    role="tab"
                    id={`service-tab-${service.slug}`}
                    aria-selected={isActive}
                    aria-controls={`service-panel-${service.slug}`}
                    tabIndex={0}
                    onClick={() => handleSelectService(index)}
                    className={`relative text-xs sm:text-sm lg:text-[13px] xl:text-sm font-semibold transition-all duration-200 cursor-pointer min-h-[44px] px-3 sm:px-3.5 py-2 flex items-center justify-center shrink-0 whitespace-nowrap rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow active:scale-[0.98] ${
                      isActive
                        ? 'text-chef-black bg-pale-yellow border border-brand-yellow/50 shadow-xs'
                        : 'text-muted-charcoal/80 bg-warm-ivory/60 border border-transparent hover:text-chef-black hover:bg-pale-yellow/40 hover:border-soft-border'
                    }`}
                  >
                    {service.navTitle}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-brand-yellow rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Scroll Right Arrow */}
            <button
              type="button"
              aria-label="Scroll categories right"
              onClick={() => scrollTabList('right')}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-warm-ivory border border-soft-border text-chef-black hover:bg-brand-yellow shrink-0 cursor-pointer active:scale-95 transition-all shadow-xs"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* =========================================================================
            3. CONTENT & IMAGES AREA (Below the complete category-button row)
               - Desktop: Images paired side-by-side (col-span-7) + Active service details (col-span-5)
               - Mobile: Active service details first (order-1), Fixed Images in lower part (order-2)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Images Presentation: Two Fixed Catering Photographs Paired Side-by-Side
              - On Desktop: Positioned on the left side (order-1) below the category buttons
              - On Mobile: Positioned in the lower part of the section (order-2) after category info
              - Exact 4:5 native aspect ratio, visually balanced, zero cropping of chef & buffets
          */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-center w-full">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5 w-full">
              {/* Image 1: Primary Catering Photograph (Grand illuminated royal buffet) */}
              <div className="relative aspect-[4/5] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-sand-200 shadow-sm transition-transform duration-300 hover:scale-[1.01]">
                <Image
                  src={FIXED_CATERING_IMAGES.primary.src}
                  alt={FIXED_CATERING_IMAGES.primary.alt}
                  fill
                  sizes="(max-width: 640px) 46vw, (max-width: 1024px) 45vw, 28vw"
                  className="object-cover object-center"
                  priority
                />
              </div>

              {/* Image 2: Secondary Catering Photograph (Chef live serving guests biryani) */}
              <div className="relative aspect-[4/5] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-sand-200 shadow-sm transition-transform duration-300 hover:scale-[1.01]">
                <Image
                  src={FIXED_CATERING_IMAGES.secondary.src}
                  alt={FIXED_CATERING_IMAGES.secondary.alt}
                  fill
                  sizes="(max-width: 640px) 46vw, (max-width: 1024px) 45vw, 28vw"
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Active Service Panel: Text and Interaction
              - On Desktop: Right column (order-2) beside the paired photographs
              - On Mobile: Above the images (order-1), right below the category buttons
          */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col justify-center relative z-20">
            <div
              id={`service-panel-${activeService.slug}`}
              role="tabpanel"
              aria-labelledby={`service-tab-${activeService.slug}`}
              className={`transition-all duration-200 ${
                isTransitioning ? 'opacity-40 translate-y-1' : 'opacity-100 translate-y-0'
              }`}
            >
              {/* Service Title */}
              <h3 className="font-display text-2xl sm:text-3xl lg:text-[2.25rem] text-chef-black tracking-tight leading-tight mb-3">
                {activeService.title}
              </h3>

              {/* Service Description — exact verified copy */}
              <p className="text-sm sm:text-[15px] text-muted-charcoal leading-relaxed max-w-lg mb-6 sm:mb-7 font-normal">
                {activeService.description}
              </p>

              {/* Action Buttons: Get a Quote Primary CTA & Prev/Next for Mobile/Tablet */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                <a
                  href={buildWhatsAppUrl(
                    `Hello ${SITE.name}, I would like to get a catering quotation for ${activeService.title}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#128C7E] rounded-(--radius-button) transition-all duration-200 min-h-[44px] cursor-pointer active:scale-[0.98] shadow-sm text-center"
                  style={{ transitionDuration: 'var(--duration-fast)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Get Quote on WhatsApp
                </a>

                {/* Mobile / Tablet Quick Next / Prev Switchers */}
                <div className="flex items-center gap-2 lg:hidden">
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectService((activeIndex - 1 + SERVICES_DATA.length) % SERVICES_DATA.length)
                    }
                    aria-label="Previous catering service"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-chef-black bg-warm-ivory border border-soft-border rounded-(--radius-button) hover:bg-brand-yellow transition-all duration-200 min-h-[44px] cursor-pointer active:scale-[0.98]"
                  >
                    &larr; Prev
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectService((activeIndex + 1) % SERVICES_DATA.length)}
                    aria-label="Next catering service"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-chef-black bg-warm-ivory border border-soft-border rounded-(--radius-button) hover:bg-brand-yellow transition-all duration-200 min-h-[44px] cursor-pointer active:scale-[0.98]"
                  >
                    Next &rarr;
                  </button>
                </div>
              </div>

              {/* Quote & Pricing Note */}
              <div className="pt-4 border-t border-soft-border/60">
                <h4 className="text-xs font-bold text-chef-black uppercase tracking-wider mb-1">
                  Every Event Is Quoted Individually
                </h4>
                <p className="text-xs text-muted-charcoal leading-relaxed max-w-lg">
                  Share your event details, expected guest count, location, menu preferences, and service requirements.
                  Our team will discuss your needs and prepare a quotation based on the final requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
