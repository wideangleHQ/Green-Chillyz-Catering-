'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image, { type StaticImageData } from 'next/image';

import heroBg from '@/assets/Hero Section Bg.png';
import secondSectionBg from '@/assets/Second Section.png';

interface GallerySlide {
  id: string;
  image: StaticImageData;
  title: string;
  alt: string;
}

/**
 * Genuine Green Chillyz Catering event photography assets.
 * Full-viewport photography capturing banqueting, live buffet setups, and hospitality.
 */
const GALLERY_SLIDES: GallerySlide[] = [
  {
    id: 'grand-banquet',
    image: heroBg,
    title: 'Banquet & Evening Reception Dining',
    alt: 'Green Chillyz grand wedding banquet dining arrangement and illuminated table setup in Bhubaneswar',
  },
  {
    id: 'live-buffet',
    image: secondSectionBg,
    title: 'Gourmet Buffet & Live Stations',
    alt: 'Green Chillyz live food counters and authentic buffet food presentation in Odisha',
  },
  {
    id: 'celebration-setup',
    image: heroBg,
    title: 'Celebration Dining & Hospitality',
    alt: 'Green Chillyz celebration dining tables, cutlery, and attentive catering coordination',
  },
  {
    id: 'authentic-spread',
    image: secondSectionBg,
    title: 'Culinary Spread & Food Presentation',
    alt: 'Green Chillyz extensive catering spread with live cooking stations and dining hospitality',
  },
];

export default function GalleryPreviewSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const totalSlides = GALLERY_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Accessible keyboard controls when focused
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    }
  };

  // Mobile touch swiping
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Calm 5s autoplay, pauses on hover and respects reduced motion
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || isHovered) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  return (
    <section
      id="event-gallery"
      role="region"
      aria-label="Event Photography Gallery"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-screen h-[100svh] h-[100dvh] bg-chef-black overflow-hidden flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
    >
      {/* =========================================================================
          1. FULL-VIEWPORT PHOTOGRAPHY SLIDESHOW (BACKGROUND CANVAS)
          Smooth crossfade, full bleed, zero layout shifts, cover cropping
         ========================================================================= */}
      <div className="absolute inset-0 z-0">
        {GALLERY_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;

          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${totalSlides}: ${slide.title}`}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
              />

              {/* Gentle Top Vignette */}
              <div
                className="absolute inset-x-0 top-0 h-32 sm:h-40 bg-gradient-to-b from-chef-black/60 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Deep Bottom Vignette for High Contrast Legibility */}
              <div
                className="absolute inset-x-0 bottom-0 h-[65%] sm:h-[55%] bg-gradient-to-t from-chef-black/95 via-chef-black/60 to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          2. MINIMAL PREV / NEXT NAVIGATION CONTROLS
          Semi-transparent, touch-friendly circular buttons positioned vertically centered
         ========================================================================= */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous photograph"
        className="absolute left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-chef-black/40 hover:bg-chef-black/80 text-white backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow hover:scale-105 active:scale-95 shadow-md"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 -translate-x-0.5"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10 13L5 8L10 3" />
        </svg>
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next photograph"
        className="absolute right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-chef-black/40 hover:bg-chef-black/80 text-white backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow hover:scale-105 active:scale-95 shadow-md"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 translate-x-0.5"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 13L11 8L6 3" />
        </svg>
      </button>

      {/* Spacer to push integrated text to bottom */}
      <div className="relative z-10 w-full pt-6 sm:pt-8" />

      {/* =========================================================================
          3. INTEGRATED BOTTOM EVENT TEXT & UNOBTRUSIVE SLIDE INDICATORS
          Positioned cleanly at the bottom within the same viewport
         ========================================================================= */}
      <div className="relative z-20 w-full page-container pb-6 sm:pb-8 md:pb-10 lg:pb-12 text-center pointer-events-auto">
        {/* Subtle Slide Indicators */}
        <div
          className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-5"
          role="tablist"
          aria-label="Slideshow position"
        >
          {GALLERY_SLIDES.map((slide, index) => {
            const isActive = index === currentIndex;

            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to photograph ${index + 1}`}
                onClick={() => goToSlide(index)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'w-7 sm:w-9 bg-brand-yellow'
                    : 'w-1.5 sm:w-2 bg-white/45 hover:bg-white/80'
                }`}
              />
            );
          })}
        </div>

        {/* Understated Event Types Supporting Text Line */}
        <p className="text-xs sm:text-sm md:text-[15px] lg:text-base font-medium text-sand-200 leading-relaxed max-w-4xl mx-auto md:whitespace-nowrap">
          Weddings &middot; Receptions &middot; Engagements &middot; Haldi &amp; Mehendi &middot; Birthdays &middot; Anniversaries &middot; Corporate Events &middot; Private Parties
        </p>
      </div>
    </section>
  );
}
