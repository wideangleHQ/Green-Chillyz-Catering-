'use client';

import ScrollExpand from '@/components/common/ScrollExpand';
import AccordionGallery, { type AccordionGalleryItem } from '@/components/common/AccordionGallery';
import secondSectionBg from '@/assets/Second Section.png';

import anyScaleImg from '@/assets/Why Choose Us/Any Scale.png';
import customizedMenuImg from '@/assets/Why Choose Us/Customized Menu.png';
import cleanSetupImg from '@/assets/Why Choose Us/Clean Setup.png';
import acrossBhubaneswarImg from '@/assets/Why Choose Us/Across Bhubaneswar.png';

const accordionItems: AccordionGalleryItem[] = [
  {
    image: anyScaleImg,
    label: 'Any Scale',
    description:
      'We generally cater from 50 guests upwards. Every event is quoted individually, per person, after we understand what you need.',
  },
  {
    image: customizedMenuImg,
    label: 'Customised Menus',
    description:
      'Odia, North Indian, South Indian, Bengali, Chinese, Continental, Mughlai, Italian — and if it is not on this list, ask. “Any Type as You Love to Eat”. Both predefined packages and fully customised menus.',
  },
  {
    image: cleanSetupImg,
    label: 'Setup Through To Cleanup',
    description:
      'Buffet and table setup, serving staff, plates, cutlery, crockery, live counters, dessert and beverage counters, event coordination and cleanup.',
  },
  {
    image: acrossBhubaneswarImg,
    label: 'Across Bhubaneswar & Odisha',
    description:
      'Entire Bhubaneswar and Entire Odisha. Outside our primary area, travel requirement, permission and permit apply.',
  },
];

export default function CateringExpandSection() {
  return (
    <section className="relative bg-brand-yellow">
      <ScrollExpand
        src={secondSectionBg}
        alt="Green Chillyz Catering live counters and buffet presentation"
        title="WHY CHOOSE US"
        scrollHint="Scroll to explore"
        useWindowScroll={true}
        startWidth={30}
        startHeight={30}
        startRadius={24}
        endRadius={0}
        mediaZoom={1.35}
        scrollDistance={1.3}
        holdDistance={0.15}
        smoothing={0.1}
        overlayScrim={0.88}
        enabled={true}
      >
        <div className="w-full page-container max-w-6xl my-auto flex flex-col justify-center items-center text-center py-3 sm:py-5 md:py-8 pointer-events-auto">
          {/* Section Eyebrow */}
          <span className="inline-block text-[11px] sm:text-xs md:text-sm font-black tracking-[0.2em] sm:tracking-[0.25em] uppercase text-brand-yellow mb-1 sm:mb-2">
            WHY CHOOSE US
          </span>

          {/* Main Section Heading */}
          <h2
            className="font-display text-white leading-[1.08] mb-1.5 sm:mb-2 md:mb-3"
            style={{ fontSize: 'clamp(1.5rem, 4.2vw + 0.35rem, 3.75rem)' }}
          >
            CATERING HANDLED END TO END
          </h2>

          {/* Supporting Statement */}
          <p className="text-xs sm:text-sm md:text-base text-sand-200 leading-relaxed max-w-2xl mx-auto font-medium mb-3 sm:mb-5 md:mb-8 line-clamp-2 sm:line-clamp-none">
            We Deal and Serve to Your Guest as Like Our Guest till to The End of The Event.
          </p>

          {/* Interactive AccordionGallery Component */}
          <div className="w-full mt-1 sm:mt-2">
            <AccordionGallery
              items={accordionItems}
              defaultIndex={-1}
              expandRatio={0.52}
              trigger="hover"
              accentColor="#F2C900"
              overlayColor="#17191A"
              textColor="#FFFFFF"
              grayscale={false}
              showLabels={true}
              duration={0.6}
              height={380}
              gap={12}
              radius={16}
              orientation="horizontal"
            />
          </div>
        </div>
      </ScrollExpand>
    </section>
  );
}
