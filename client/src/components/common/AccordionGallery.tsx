'use client';

import { useState, useRef, type CSSProperties } from 'react';
import type { StaticImageData } from 'next/image';
import './AccordionGallery.css';

export interface AccordionGalleryItem {
  image: string | StaticImageData;
  label: string;
  description?: string;
  badge?: string;
  link?: string;
}

export interface AccordionGalleryProps {
  items: AccordionGalleryItem[];
  defaultIndex?: number;
  expandRatio?: number;
  trigger?: 'click' | 'hover';
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  grayscale?: boolean;
  showLabels?: boolean;
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  height?: number | string;
  gap?: number;
  radius?: number;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  style?: CSSProperties;
}

export default function AccordionGallery({
  items = [],
  defaultIndex = -1,
  trigger = 'hover',
  accentColor = '#F2C900',
  overlayColor = '#17191A',
  textColor = '#FFFFFF',
  grayscale = false,
  showLabels = true,
  height = 460,
  gap = 12,
  radius = 16,
  orientation = 'horizontal',
  className = '',
  style,
}: AccordionGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number>(defaultIndex);
  const galleryRef = useRef<HTMLDivElement>(null);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setActiveIndex(-1);
    }
  };

  const scrollToSlide = (index: number) => {
    setActiveIndex(index);
    if (galleryRef.current) {
      const itemEl = galleryRef.current.children[index] as HTMLElement;
      if (itemEl) {
        itemEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  const handleScroll = () => {
    if (!galleryRef.current) return;
    const container = galleryRef.current;
    const scrollLeft = container.scrollLeft;
    const firstItem = container.children[0] as HTMLElement;
    if (!firstItem) return;
    const itemWidth = firstItem.clientWidth;
    const index = Math.round(scrollLeft / (itemWidth + gap));
    if (index >= 0 && index < items.length && index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const cssVars = {
    '--ag-accent': accentColor,
    '--ag-overlay': overlayColor,
    '--ag-text': textColor,
    '--ag-gap': `${gap}px`,
    '--ag-radius': `${radius}px`,
    height: typeof height === 'number' ? `${height}px` : height,
    ...style,
  } as CSSProperties;

  const currentSlideIndex = Math.max(0, activeIndex);

  return (
    <div className="w-full flex flex-col items-center">
      <div
        ref={galleryRef}
        onScroll={handleScroll}
        onMouseLeave={handleMouseLeave}
        className={`accordion-gallery accordion-gallery--${orientation} ${className}`.trim()}
        style={cssVars}
        role="region"
        aria-label="Accordion Gallery"
      >
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          const resolvedSrc =
            typeof item.image === 'object' && item.image !== null && 'src' in item.image
              ? item.image.src
              : item.image;

          return (
            <div
              key={item.label || index}
              className={`accordion-gallery__item ${
                isActive ? 'accordion-gallery__item--active' : ''
              } ${grayscale ? 'accordion-gallery__item--grayscale' : ''}`}
              onClick={() => handleInteraction(index)}
              onMouseEnter={trigger === 'hover' ? () => handleInteraction(index) : undefined}
              onFocus={() => handleInteraction(index)}
              tabIndex={0}
              role="button"
              aria-expanded={isActive}
              aria-label={item.label}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleInteraction(index);
                }
              }}
            >
              {/* Background Image Container */}
              <div className="accordion-gallery__image-wrap">
                {resolvedSrc ? (
                  <img
                    src={resolvedSrc}
                    alt={item.label}
                    className="accordion-gallery__image"
                    draggable={false}
                  />
                ) : null}
                <div className="accordion-gallery__overlay" />
              </div>

              {/* Main Content Area */}
              <div className={`accordion-gallery__content ${isActive ? 'accordion-gallery__content--active' : ''}`}>
                {/* Inactive / Thumbnail State: Heading Only */}
                <div className="accordion-gallery__collapsed-content" aria-hidden={isActive}>
                  <h3 className="accordion-gallery__collapsed-title">{item.label}</h3>
                </div>

                {/* Active / Hover State: Full Text */}
                <div className="accordion-gallery__expanded-content" aria-hidden={!isActive}>
                  {item.badge ? (
                    <span className="accordion-gallery__badge">{item.badge}</span>
                  ) : null}
                  <h3 className="accordion-gallery__title">{item.label}</h3>
                  {item.description ? (
                    <p className="accordion-gallery__description">{item.description}</p>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Slider Pagination Dots Indicator */}
      <div className="accordion-gallery__dots md:hidden flex items-center justify-center gap-2 mt-3" aria-hidden="true">
        {items.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => scrollToSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlideIndex === idx ? 'w-6 bg-brand-yellow shadow-sm' : 'w-2 bg-white/40'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
