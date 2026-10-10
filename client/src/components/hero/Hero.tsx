'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/config/routes';
import { SITE } from '@/config/site';
import heroBg from '@/assets/Hero Section Bg.png';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen min-h-[100svh] min-h-[100dvh] flex flex-col justify-between bg-chef-black overflow-hidden">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBg}
          alt="Green Chillyz Catering setup in Bhubaneswar"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_center] sm:object-center"
        />
        {/* Directional left-to-right gradient to keep text readable while highlighting chef/catering photography */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(23, 25, 26, 0.88) 0%, rgba(23, 25, 26, 0.65) 45%, rgba(23, 25, 26, 0.25) 75%, rgba(23, 25, 26, 0.08) 100%)',
          }}
        />

        {/* Soft top vignette for header legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(23, 25, 26, 0.50) 0%, rgba(23, 25, 26, 0.12) 30%, transparent 70%)',
          }}
        />

        {/* Soft bottom dark vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(23, 25, 26, 0.7) 0%, transparent 25%)',
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 page-container flex-1 flex flex-col justify-center pt-24 pb-8 sm:pt-28 sm:pb-10 md:pt-32 md:pb-12 lg:pt-36 lg:pb-14">
        <div className="max-w-3xl">
          {/* Main Headline with fluid typography */}
          <h1
            className="font-display text-white tracking-tight leading-[0.98] mb-2 sm:mb-3 md:mb-4"
            style={{ fontSize: 'clamp(2.25rem, 5.4vw, 5.5rem)' }}
          >
            UNFORGETTABLY <span className="text-brand-yellow">TASTED</span>
          </h1>

          {/* Subheading / Tagline Paragraph with fluid typography */}
          <p
            className="text-white font-bold leading-snug mb-2 sm:mb-3 md:mb-4"
            style={{ fontSize: 'clamp(1.125rem, 2.2vw, 1.75rem)' }}
          >
            Premium Catering for Every Celebration
          </p>

          {/* SEO-focused supportive text trimmed to 1-2 lines */}
          <p
            className="text-sand-200 leading-relaxed max-w-2xl mb-6 sm:mb-8 md:mb-10 font-medium"
            style={{ fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)' }}
          >
            Delivering memorable catering experiences with customised multi-cuisine menus, live food counters, and complete on-site setup across {SITE.serviceArea}.
          </p>

          {/* CTAs: Red buttons that turn yellow on hover with touch-friendly targets */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href={ROUTES.contact}
              className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white bg-chilli-red rounded-(--radius-button) border-2 border-chilli-red hover:bg-brand-yellow hover:text-chef-black hover:border-brand-yellow transition-all duration-200 shadow-md hover:scale-[1.02] min-h-[44px]"
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              Get a Quote
              <svg className="ml-2 w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
            <Link
              href={ROUTES.services.index}
              className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white bg-chilli-red rounded-(--radius-button) border-2 border-chilli-red hover:bg-brand-yellow hover:text-chef-black hover:border-brand-yellow transition-all duration-200 shadow-md hover:scale-[1.02] min-h-[44px]"
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              Explore Catering
            </Link>
          </div>

          {/* Confirmed facts strip with responsive wrapping */}
          <div className="flex flex-wrap items-center gap-x-5 sm:gap-x-6 gap-y-2 mt-6 pt-5 sm:mt-8 sm:pt-6 md:mt-10 md:pt-8 border-t border-white/15">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-sand-200">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-yellow shrink-0">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Serving {SITE.serviceArea}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-sand-200">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-yellow shrink-0">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{SITE.contact.responseTime} response on {SITE.contact.preferredChannels.join(' & ')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Cue */}
      <div className="relative z-10 w-full pb-4 text-center hidden lg:flex flex-col items-center justify-center">
        <div className="w-5 h-8 border-2 border-white/40 rounded-full flex items-start justify-center pt-1.5 shadow-sm">
          <div className="w-1 h-2 bg-chilli-red rounded-full animate-bounce" />
        </div>
        <span className="text-[10px] tracking-widest uppercase text-white/80 mt-1 font-bold">Scroll to explore</span>
      </div>
    </section>
  );
}
