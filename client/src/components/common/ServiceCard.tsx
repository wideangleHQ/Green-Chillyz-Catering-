'use client';

import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/config/routes';

export interface ServiceCardItem {
  id: string;
  number: string;
  title: string;
  slug: string;
  image: StaticImageData;
  imageAlt: string;
  keypoints: string[];
}

interface ServiceCardProps {
  service: ServiceCardItem;
  className?: string;
}

export default function ServiceCard({ service, className = '' }: ServiceCardProps) {
  return (
    <Link
      href={`${ROUTES.services.index}#${service.slug}`}
      className={`group flex flex-col h-full bg-warm-ivory border border-soft-border rounded-xl lg:rounded-(--radius-card) overflow-hidden transition-all duration-200 hover:border-brand-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 ${className}`.trim()}
    >
      {/* 3:2 Aspect Ratio Card Photography */}
      <div className="relative w-full aspect-[3/2] overflow-hidden bg-sand-200 shrink-0">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-300 ease-out"
          loading="lazy"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(23, 25, 26, 0.25) 0%, transparent 40%)',
          }}
        />
      </div>

      {/* Compact Editorial Content Area */}
      <div className="p-2.5 xs:p-3 sm:p-3.5 lg:p-4 flex flex-col flex-1 justify-between gap-2 sm:gap-2.5">
        <div>
          {/* Service Sequence Number */}
          <span className="inline-block text-[10px] sm:text-[11px] font-bold tracking-widest text-muted-charcoal/70 uppercase mb-0.5 font-mono">
            {service.number}
          </span>

          {/* Service Title */}
          <h3 className="font-display text-sm xs:text-base sm:text-lg lg:text-xl text-chef-black tracking-tight leading-tight mb-1.5 sm:mb-2 group-hover:text-chilli-red transition-colors duration-200">
            {service.title}
          </h3>

          {/* Keypoints */}
          <ul className="space-y-1 sm:space-y-1.5">
            {service.keypoints.map((point, index) => (
              <li key={index} className="flex items-start gap-1.5 text-[11px] sm:text-xs text-muted-charcoal leading-snug">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-chilli-red mt-1 shrink-0"
                  aria-hidden="true"
                />
                <span className="line-clamp-1 xs:line-clamp-2">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Know More Anchor */}
        <div className="pt-2 border-t border-soft-border/75 flex items-center justify-between text-[11px] sm:text-xs font-semibold text-chef-black group-hover:text-chilli-red transition-colors duration-200 mt-auto">
          <span>Know more</span>
          <svg
            className="w-3.5 h-3.5 text-chilli-red group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200 shrink-0"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 12L12 4M12 4H6M12 4V10" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
