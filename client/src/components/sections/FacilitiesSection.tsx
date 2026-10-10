'use client';

import { useEffect, useRef, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';

import heroBg from '@/assets/Hero Section Bg.png';
import secondSectionBg from '@/assets/Second Section.png';

export interface FacilityCardItem {
  id: string;
  title: string;
  paragraph: string;
  image: StaticImageData;
  alt: string;
}

/**
 * 4 Confirmed Green Chillyz Catering Facility Groups.
 * Large photographic cards with clean editorial styling, default bottom gradient,
 * and cinematic hover transition revealing the supporting paragraph.
 */
const FACILITY_CARDS: FacilityCardItem[] = [
  {
    id: 'setup-tableware',
    title: 'Setup & Tableware',
    paragraph:
      'Buffet arrangements, table setup, plates, cutlery, and glassware organised to match your venue layout and guest count.',
    image: heroBg,
    alt: 'Green Chillyz banquet table setup and dining arrangement in Bhubaneswar',
  },
  {
    id: 'food-beverage',
    title: 'Food & Beverage Service',
    paragraph:
      'Live food counters, live cooking stations, and dedicated beverage or dessert counters arranged based on your selected menu and event requirements.',
    image: secondSectionBg,
    alt: 'Green Chillyz live food counters and culinary station presentation in Odisha',
  },
  {
    id: 'onsite-team',
    title: 'Our On-Site Team',
    paragraph:
      'Attentive food serving staff and on-site event coordination to ensure welcoming hospitality and smooth service flow.',
    image: heroBg,
    alt: 'Green Chillyz attentive serving staff and hospitality coordination',
  },
  {
    id: 'event-support',
    title: 'Event Support',
    paragraph:
      'End-to-end event setup, decorative food presentation, and thorough post-event cleanup arranged with care.',
    image: secondSectionBg,
    alt: 'Green Chillyz event setup, culinary decoration, and post-event cleanup',
  },
];

export default function FacilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Initialize and handle scroll-driven horizontal card movement
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setIsReducedMotion(prefersReducedMotion);
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let rafId: number;

    const updateDimensionsAndPosition = () => {
      if (!section || !track) return;

      const viewportWidth = window.innerWidth || 1024;
      const viewportHeight = window.innerHeight || 800;

      // Track horizontal scroll distance
      const trackWidth = track.scrollWidth;
      // Extra horizontal breathing room so Card 4 finishes completely inside the viewport
      const extraEndPadding = viewportWidth >= 1024 ? 96 : 48;
      const maxTranslateX = Math.max(0, trackWidth - viewportWidth + extraEndPadding);

      // Set section height to provide a natural, 1:1 scrub budget plus release buffer
      const scrollBudget = maxTranslateX * 1.15;
      const bottomReleasePadding = 80;
      section.style.height = `${viewportHeight + scrollBudget + bottomReleasePadding}px`;

      // Read current vertical progress
      const rect = section.getBoundingClientRect();
      const totalScrollable = section.offsetHeight - viewportHeight - bottomReleasePadding;

      if (totalScrollable <= 0) return;

      let progress = -rect.top / totalScrollable;
      progress = Math.max(0, Math.min(1, progress));

      // Translate track horizontally (right to left)
      const currentTranslateX = progress * maxTranslateX;
      track.style.transform = `translate3d(-${Math.round(currentTranslateX)}px, 0, 0)`;

      // Update progress bar width
      if (progressBarRef.current) {
        const percent = Math.min(100, Math.max(25, (progress * 75) + 25));
        progressBarRef.current.style.width = `${percent}%`;
      }

      // Update active card index (0 to 3)
      const cardIndex = Math.min(
        FACILITY_CARDS.length - 1,
        Math.floor(progress * FACILITY_CARDS.length),
      );
      setActiveCardIndex(cardIndex);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateDimensionsAndPosition);
    };

    const onResize = () => {
      updateDimensionsAndPosition();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // Initial setup
    updateDimensionsAndPosition();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section
      id="facilities"
      ref={sectionRef}
      className={`relative w-full bg-brand-yellow border-t border-chef-black/10 ${
        isReducedMotion ? 'py-12 sm:py-16' : ''
      }`}
      aria-labelledby="facilities-heading"
    >
      {/* =========================================================================
          STICKY VIEWPORT CONTAINER
          Pins at top-0 for the duration of the horizontal scroll, then releases cleanly
         ========================================================================= */}
      <div
        className={`w-full overflow-hidden flex flex-col justify-between ${
          isReducedMotion
            ? 'relative'
            : 'sticky top-0 h-screen h-[100svh] h-[100dvh] pt-20 sm:pt-22 lg:pt-24 pb-6 sm:pb-8'
        }`}
      >
        {/* =========================================================================
            1 & 2. STICKY HEADING & SUPPORTING PARAGRAPH
            Remains prominently visible throughout the horizontal card sequence
           ========================================================================= */}
        <div className="page-container w-full shrink-0 z-20">
          <span className="block text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-chilli-red mb-1.5 sm:mb-2">
            ON-SITE FACILITIES
          </span>
          <h2
            id="facilities-heading"
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] text-chef-black uppercase tracking-tight leading-[1.02]"
          >
            We Take Care of Every Detail.
          </h2>
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-chef-black/85 max-w-xl leading-relaxed font-normal">
            From event setup to food service, we help make your catering experience smooth and well organised.
          </p>
        </div>

        {/* =========================================================================
            3 & 4. HORIZONTAL IMAGE CARDS TRACK
            Translates horizontally from right to left driven by vertical scroll
           ========================================================================= */}
        <div
          className={`w-full flex-1 flex items-center overflow-hidden my-auto py-2 ${
            isReducedMotion ? 'overflow-x-auto py-6' : ''
          }`}
        >
          <div
            ref={trackRef}
            className={`flex items-center gap-5 sm:gap-7 lg:gap-9 px-4 sm:px-8 lg:px-12 ${
              isReducedMotion ? 'w-max' : 'will-change-transform'
            }`}
            style={isReducedMotion ? undefined : { transform: 'translate3d(0, 0, 0)' }}
          >
            {FACILITY_CARDS.map((card) => {
              const isCardActive = activeCardId === card.id;

              return (
                <div
                  key={card.id}
                  data-active={isCardActive ? 'true' : 'false'}
                  tabIndex={0}
                  role="region"
                  aria-label={`${card.title} facility group`}
                  onClick={() => setActiveCardId((prev) => (prev === card.id ? null : card.id))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveCardId((prev) => (prev === card.id ? null : card.id));
                    }
                  }}
                  style={{ containerType: 'size' }}
                  className="group relative shrink-0 w-[85vw] sm:w-[480px] md:w-[540px] lg:w-[600px] xl:w-[650px] h-[340px] sm:h-[390px] md:h-[420px] lg:h-[450px] xl:h-[470px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-md bg-sand-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-yellow focus-visible:outline-offset-2 transition-shadow duration-300"
                >
                  {/* Background Catering Photography at full visual clarity */}
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 540px, 650px"
                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />

                  {/* 1. Default Bottom Gradient: subtle black gradient only at bottom */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-44 sm:h-52 lg:h-60 bg-gradient-to-t from-chef-black/90 via-chef-black/45 to-transparent pointer-events-none transition-opacity duration-400 ease-out"
                    aria-hidden="true"
                  />

                  {/* 2. Hover / Active Full Dark Scrim: gradually darkens the entire image */}
                  <div
                    className={`absolute inset-0 bg-chef-black/65 pointer-events-none transition-opacity duration-400 ease-out ${
                      isCardActive
                        ? 'opacity-100'
                        : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'
                    }`}
                    aria-hidden="true"
                  />

                  {/* 3. Text Overlay Container (Anchored at the bottom) */}
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-9 z-10 pointer-events-none flex flex-col justify-end">
                    <div
                      className={`select-text pointer-events-auto will-change-transform ${
                        isReducedMotion
                          ? 'translate-y-0'
                          : `transition-transform duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                              isCardActive
                                ? 'translate-y-0'
                                : 'translate-y-14 sm:translate-y-16 lg:translate-y-18 group-hover:translate-y-0 group-focus-within:translate-y-0'
                            }`
                      }`}
                    >
                      {/* Facility Heading: resting near bottom-left, slightly glides upwards on hover */}
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-[2rem] xl:text-[2.2rem] text-white uppercase tracking-tight leading-[1.08] drop-shadow-md">
                        {card.title}
                      </h3>

                      {/* Supporting Paragraph: reveals smoothly beneath the heading on hover */}
                      <p
                        className={`mt-2 sm:mt-2.5 max-w-md lg:max-w-lg text-xs sm:text-sm lg:text-[15px] text-sand-100 leading-relaxed font-normal drop-shadow-sm ${
                          isReducedMotion
                            ? 'opacity-100'
                            : `transition-opacity duration-300 ease-out ${
                                isCardActive
                                  ? 'opacity-100'
                                  : 'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto delay-75'
                              }`
                        }`}
                      >
                        {card.paragraph}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            5. CONSISTENT BOTTOM STATUS & INDICATOR BAR
            Clean progress bar and slide indicator, preserving consistent spacing
           ========================================================================= */}
        <div className="page-container w-full shrink-0 pt-2 flex items-center justify-between text-xs text-chef-black/80 z-20">
          <span className="font-mono text-[11px] sm:text-xs font-bold tracking-widest text-chef-black">
            {`0${activeCardIndex + 1} / 04`}
          </span>

          <div className="w-28 sm:w-44 md:w-56 h-1.5 bg-chef-black/15 rounded-full overflow-hidden mx-3">
            <div
              ref={progressBarRef}
              className="h-full bg-chef-black rounded-full transition-all duration-75"
              style={{ width: '25%' }}
            />
          </div>

          <span className="text-[10px] sm:text-[11px] tracking-wider uppercase font-semibold text-chef-black/80 text-right">
            Scroll to explore facilities &rarr;
          </span>
        </div>
      </div>
    </section>
  );
}
