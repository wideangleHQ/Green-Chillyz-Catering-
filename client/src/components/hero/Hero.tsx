'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/config/routes';
import { SITE } from '@/config/site';
import { buildWhatsAppUrl, WHATSAPP_QUOTE_MESSAGE } from '@/config/whatsapp';
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

          {/* CTAs: Primary WhatsApp quote chat and explore services */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={buildWhatsAppUrl(WHATSAPP_QUOTE_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white bg-chilli-red rounded-(--radius-button) border-2 border-chilli-red hover:bg-brand-yellow hover:text-chef-black hover:border-brand-yellow transition-all duration-200 shadow-md hover:scale-[1.02] min-h-[44px]"
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Get a Quote on WhatsApp
            </a>
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
