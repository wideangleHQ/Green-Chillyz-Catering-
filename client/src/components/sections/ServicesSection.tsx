'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/config/routes';
import { SITE } from '@/config/site';

import heroBg from '@/assets/Hero Section Bg.png';
import secondSectionBg from '@/assets/Second Section.png';

export interface ConfirmedService {
  id: string;
  slug: string;
  navTitle: string;
  title: string;
  description: string;
  images: {
    primary: StaticImageData;
    primaryAlt: string;
    secondary: StaticImageData;
    secondaryAlt: string;
  };
}

/**
 * 12 Confirmed Green Chillyz Catering Services + General Any Type of Catering.
 * Sourced authoritatively from the verified client business information.
 * Uses existing local catering photography assets with smooth alternating layout.
 */
const SERVICES_DATA: ConfirmedService[] = [
  {
    id: 'wedding',
    slug: 'wedding',
    navTitle: 'Wedding',
    title: 'Wedding Catering',
    description:
      'Make your wedding celebration memorable with catering planned around your guests, food preferences, and event requirements. Choose from a range of cuisines and discuss a customised menu with the Green Chillyz team.',
    images: {
      primary: heroBg,
      primaryAlt: 'Green Chillyz wedding catering banquet dining setup',
      secondary: secondSectionBg,
      secondaryAlt: 'Green Chillyz wedding live catering buffet and food presentation',
    },
  },
  {
    id: 'reception',
    slug: 'reception',
    navTitle: 'Reception',
    title: 'Reception Catering',
    description:
      'Plan reception catering around your guest count, preferred cuisines, and serving requirements. From menu customisation to buffet setup and on-site service arrangements, discuss the details of your event with our team.',
    images: {
      primary: secondSectionBg,
      primaryAlt: 'Green Chillyz reception buffet setup and table arrangements',
      secondary: heroBg,
      secondaryAlt: 'Green Chillyz reception dining tables and cutlery arrangement',
    },
  },
  {
    id: 'engagement',
    slug: 'engagement',
    navTitle: 'Engagement',
    title: 'Engagement Catering',
    description:
      'Celebrate your engagement with a menu tailored to your occasion and guests. Share your preferred cuisines, guest count, location, and event requirements so the team can prepare a suitable quotation.',
    images: {
      primary: heroBg,
      primaryAlt: 'Green Chillyz engagement catering setup and banquet dining',
      secondary: secondSectionBg,
      secondaryAlt: 'Green Chillyz engagement food presentation and hospitality',
    },
  },
  {
    id: 'haldi-mehendi',
    slug: 'haldi-mehendi',
    navTitle: 'Haldi / Mehendi',
    title: 'Haldi / Mehendi Catering',
    description:
      'Plan catering for your Haldi or Mehendi celebration with food choices suited to your gathering. Discuss your preferred menu, guest count, setup, and serving requirements with Green Chillyz Catering.',
    images: {
      primary: secondSectionBg,
      primaryAlt: 'Green Chillyz Haldi and Mehendi festive catering presentation',
      secondary: heroBg,
      secondaryAlt: 'Green Chillyz festive food counters and dining setup',
    },
  },
  {
    id: 'birthday',
    slug: 'birthday',
    navTitle: 'Birthday Party',
    title: 'Birthday Party Catering',
    description:
      'Make birthday celebrations easier to plan with catering arranged around your guests and preferences. Share your event details and explore suitable menu customisation and catering arrangements.',
    images: {
      primary: heroBg,
      primaryAlt: 'Green Chillyz birthday party catering dining and live cooking stations',
      secondary: secondSectionBg,
      secondaryAlt: 'Green Chillyz birthday dessert counter and buffet arrangement',
    },
  },
  {
    id: 'anniversary',
    slug: 'anniversary',
    navTitle: 'Anniversary',
    title: 'Anniversary Catering',
    description:
      'Celebrate your anniversary with catering planned around the occasion, your guests, and your preferred food choices. Discuss your requirements with the team to receive a customised quotation.',
    images: {
      primary: secondSectionBg,
      primaryAlt: 'Green Chillyz anniversary catering table setup and dining service',
      secondary: heroBg,
      secondaryAlt: 'Green Chillyz anniversary banquet food presentation',
    },
  },
  {
    id: 'corporate',
    slug: 'corporate',
    navTitle: 'Corporate',
    title: 'Corporate Catering',
    description:
      'Arrange catering for corporate events with menus and service requirements discussed around your event. Share the expected guest count, location, menu preferences, and setup needs to plan the catering arrangements.',
    images: {
      primary: heroBg,
      primaryAlt: 'Green Chillyz corporate conference catering and buffet service',
      secondary: secondSectionBg,
      secondaryAlt: 'Green Chillyz corporate meeting food counters and coordination',
    },
  },
  {
    id: 'office-business',
    slug: 'office-business',
    navTitle: 'Office / Business',
    title: 'Office / Business Events',
    description:
      'Plan catering for office gatherings, business functions, and professional events. Green Chillyz can discuss menu preferences, guest numbers, buffet arrangements, serving staff, and other relevant catering requirements.',
    images: {
      primary: secondSectionBg,
      primaryAlt: 'Green Chillyz office function catering and beverage counter',
      secondary: heroBg,
      secondaryAlt: 'Green Chillyz business gathering dining arrangements',
    },
  },
  {
    id: 'private-party',
    slug: 'private-party',
    navTitle: 'Private Party',
    title: 'Private Party Catering',
    description:
      'Make private celebrations easier to organise with catering tailored to your gathering. Discuss your menu preferences, guest count, location, and the level of on-site catering support you require.',
    images: {
      primary: heroBg,
      primaryAlt: 'Green Chillyz private gathering catering and food presentation',
      secondary: secondSectionBg,
      secondaryAlt: 'Green Chillyz private celebration buffet coordination',
    },
  },
  {
    id: 'outdoor',
    slug: 'outdoor',
    navTitle: 'Outdoor',
    title: 'Outdoor Catering',
    description:
      'Plan catering for outdoor events by discussing the venue, guest count, menu, and service arrangements with the team. Additional travel requirements, permissions, and permits may apply outside the primary service area.',
    images: {
      primary: secondSectionBg,
      primaryAlt: 'Green Chillyz outdoor event catering and live counters',
      secondary: heroBg,
      secondaryAlt: 'Green Chillyz open lawn dining setup and buffet infrastructure',
    },
  },
  {
    id: 'house-party',
    slug: 'house-party',
    navTitle: 'House Party',
    title: 'House Party Catering',
    description:
      'Arrange catering for your house party around your guest count, food preferences, and available event space. Discuss menu options, food service, and any setup requirements before requesting your quotation.',
    images: {
      primary: heroBg,
      primaryAlt: 'Green Chillyz house party dining and compact table setup',
      secondary: secondSectionBg,
      secondaryAlt: 'Green Chillyz in-home catering service and cutlery arrangement',
    },
  },
  {
    id: 'institutional',
    slug: 'institutional',
    navTitle: 'Institutional',
    title: 'Institutional Catering',
    description:
      'Discuss catering requirements for institutional events and gatherings with the Green Chillyz team. Share the expected number of guests, location, menu preferences, and service requirements for an individually prepared quotation.',
    images: {
      primary: secondSectionBg,
      primaryAlt: 'Green Chillyz institutional event catering and food service',
      secondary: heroBg,
      secondaryAlt: 'Green Chillyz large-scale dining coordination and cleanup support',
    },
  },
  {
    id: 'any-type',
    slug: 'any-type',
    navTitle: 'Any Type of Catering',
    title: 'Any Type of Catering',
    description:
      'Have a different event in mind? Green Chillyz offers catering for a wide range of occasions. Share your event details, preferred cuisines, guest count, and service requirements so the team can understand your needs.',
    images: {
      primary: heroBg,
      primaryAlt: 'Green Chillyz bespoke catering for every type of occasion',
      secondary: secondSectionBg,
      secondaryAlt: 'Green Chillyz memorable food service and live cooking counters',
    },
  },
];





export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const activeService = SERVICES_DATA[activeIndex];

  const sectionRef = useRef<HTMLElement>(null);
  const primaryImgRef = useRef<HTMLDivElement>(null);
  const secondaryImgRef = useRef<HTMLDivElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);
  const rafRef = useRef<number>(0);

  // Smooth service switching with crossfade
  const handleSelectService = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex(index);
        setIsTransitioning(false);
      }, 150);
    },
    [activeIndex],
  );

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

  // Subtle and Performant Parallax Engine (0 React re-renders during scrolling)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const updateParallax = () => {
      if (!isVisibleRef.current || !section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 800;

      // Normalized progress through section: -1 (bottom entrance) to +1 (top exit)
      const progress =
        (viewportHeight / 2 - (rect.top + rect.height / 2)) /
        (viewportHeight / 2 + rect.height / 2);
      const clampedProgress = Math.max(-1.3, Math.min(1.3, progress));

      // Image 1 (Primary): Upward subtle parallax travel (-50px)
      if (primaryImgRef.current) {
        primaryImgRef.current.style.transform = `translate3d(0, ${clampedProgress * -50}px, 0)`;
      }

      // Image 2 (Secondary): Downward subtle parallax travel (+45px)
      if (secondaryImgRef.current) {
        secondaryImgRef.current.style.transform = `translate3d(0, ${clampedProgress * 45}px, 0)`;
      }
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        updateParallax();
        rafRef.current = 0;
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          updateParallax();
        }
      },
      { rootMargin: '120px 0px 120px 0px' },
    );

    observer.observe(section);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    updateParallax();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full bg-[#FFFDF5] lg:min-h-screen flex flex-col justify-center py-12 sm:py-16 lg:py-20 overflow-hidden border-t border-soft-border/50"
      aria-labelledby="services-heading"
    >
      <div className="page-container flex flex-col justify-center my-auto">
        {/* =========================================================================
            HEADER: Minimal editorial heading without decorative pills or labels
           ========================================================================= */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <h2
            id="services-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-chef-black leading-[1.02] tracking-tight uppercase"
          >
            OUR SERVICES
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-[15px] text-muted-charcoal leading-relaxed max-w-xl font-normal">
            {SITE.descriptor} across {SITE.serviceArea}. Events are quoted individually based on guest count, menu customisation, and event requirements.
          </p>
        </div>

        {/* =========================================================================
            MAIN COMPOSITION: Asymmetric Left Two-Image Collage | Right Service Content
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Asymmetric Two-Image Collage with Parallax */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="relative w-full flex items-center justify-start min-h-[300px] sm:min-h-[400px] lg:min-h-[450px] py-4">
              {/* Image 1 (Primary / Dominant — borderless, upward parallax) */}
              <div
                ref={primaryImgRef}
                className="relative w-[60%] sm:w-[62%] h-[280px] sm:h-[370px] lg:h-[420px] rounded-xl sm:rounded-2xl overflow-hidden bg-sand-200 transition-transform duration-75 ease-out will-change-transform shrink-0 z-0"
              >
                <Image
                  src={activeService.images.primary}
                  alt={activeService.images.primaryAlt}
                  fill
                  sizes="(max-width: 1024px) 60vw, 36vw"
                  className={`object-cover object-center transition-all duration-300 ease-out ${
                    isTransitioning ? 'opacity-40 scale-105 blur-[2px]' : 'opacity-100 scale-100 blur-0'
                  }`}
                  priority={activeIndex === 0}
                />
              </div>

              {/* Image 2 (Secondary / Overlapping & Offset — borderless, downward parallax) */}
              <div
                ref={secondaryImgRef}
                className="relative w-[46%] sm:w-[48%] h-[230px] sm:h-[300px] lg:h-[340px] -ml-12 sm:-ml-16 lg:-ml-20 mt-12 sm:mt-16 lg:mt-20 rounded-xl sm:rounded-2xl overflow-hidden bg-sand-200 transition-transform duration-75 ease-out will-change-transform shrink-0 z-10"
              >
                <Image
                  src={activeService.images.secondary}
                  alt={activeService.images.secondaryAlt}
                  fill
                  sizes="(max-width: 1024px) 45vw, 26vw"
                  className={`object-cover object-center transition-all duration-300 ease-out ${
                    isTransitioning ? 'opacity-40 scale-105 blur-[2px]' : 'opacity-100 scale-100 blur-0'
                  }`}
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Service Navigation & Detail Content */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Minimal Text Navigation — 12 Categories + Any Type of Catering */}
            <div
              ref={tabListRef}
              role="tablist"
              aria-label="Catering Service Categories"
              onKeyDown={handleKeyDown}
              className="flex items-center gap-x-5 lg:gap-x-6 gap-y-2.5 pb-3 mb-6 sm:mb-8 border-b border-soft-border/80 overflow-x-auto lg:flex-wrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {SERVICES_DATA.map((service, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={service.id}
                    role="tab"
                    id={`service-tab-${service.slug}`}
                    aria-selected={isActive}
                    aria-controls={`service-panel-${service.slug}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => handleSelectService(index)}
                    className={`relative text-xs sm:text-sm md:text-[14px] font-medium transition-colors duration-200 cursor-pointer py-1 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-yellow ${
                      isActive
                        ? 'text-chef-black font-bold'
                        : 'text-muted-charcoal/70 hover:text-chef-black'
                    }`}
                  >
                    {service.navTitle}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-yellow" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Service Panel */}
            <div
              id={`service-panel-${activeService.slug}`}
              role="tabpanel"
              aria-labelledby={`service-tab-${activeService.slug}`}
              className={`transition-all duration-200 ${
                isTransitioning ? 'opacity-30 translate-y-1' : 'opacity-100 translate-y-0'
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

              {/* Get a Quote Primary CTA */}
              <div className="mb-6">
                <Link
                  href={`${ROUTES.contact}?service=${activeService.slug}`}
                  className="inline-flex items-center justify-center px-7 py-3 text-xs sm:text-sm font-bold text-white bg-chilli-red rounded-(--radius-button) hover:bg-brand-yellow hover:text-chef-black transition-all duration-200 min-h-[42px]"
                  style={{ transitionDuration: 'var(--duration-fast)' }}
                >
                  Get a Quote &rarr;
                </Link>
              </div>

              {/* Quote & Pricing Note */}
              <div className="pt-4 border-t border-soft-border/60">
                <h4 className="text-xs font-bold text-chef-black uppercase tracking-wider mb-1">
                  Every Event Is Quoted Individually
                </h4>
                <p className="text-xs text-muted-charcoal leading-relaxed max-w-lg">
                  Share your event details, expected guest count, location, menu preferences, and service requirements. Our team will discuss your needs and prepare a quotation based on the final requirements.
                </p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
