'use client';

import ScrollExpand from '@/components/common/ScrollExpand';
import AccordionGallery, { type AccordionGalleryItem } from '@/components/common/AccordionGallery';
import secondSectionBg from '@/assets/Second Section.png';
import heroBg from '@/assets/Hero Section Bg.png';

const accordionItems: AccordionGalleryItem[] = [
  {
    image: secondSectionBg,
    badge: 'Capacity',
    label: 'Any Scale',
    description:
      'We generally cater from 50 guests upwards. Every event is quoted individually, per person, after we understand what you need.',
  },
  {
    image: heroBg,
    badge: 'Cuisines',
    label: 'Customised Menus',
    description:
      'Odia, North Indian, South Indian, Bengali, Chinese, Continental, Mughlai, Italian — and if it is not on this list, ask. “Any Type as You Love to Eat”. Both predefined packages and fully customised menus.',
  },
  {
    image: secondSectionBg,
    badge: 'Full Service',
    label: 'Setup Through To Cleanup',
    description:
      'Buffet and table setup, serving staff, plates, cutlery, crockery, live counters, dessert and beverage counters, event coordination and cleanup.',
  },
  {
    image: heroBg,
    badge: 'Coverage',
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
        holdDistance={0.7}
        smoothing={0.1}
        overlayScrim={0.88}
        enabled={true}
      >
        <div className="w-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center px-4 py-6 md:py-8 pointer-events-auto">
          {/* Section Eyebrow */}
          <span className="inline-block text-xs md:text-sm font-black tracking-[0.25em] uppercase text-brand-yellow mb-2 drop-shadow-sm">
            WHY CHOOSE US
          </span>

          {/* Main Section Heading */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-2 md:mb-3 drop-shadow-lg">
            CATERING HANDLED END TO END
          </h2>

          {/* Supporting Statement */}
          <p className="text-sm md:text-base text-sand-200 leading-relaxed max-w-2xl mx-auto font-medium drop-shadow-sm mb-6 md:mb-8">
            We Deal and Serve to Your Guest as Like Our Guest till to The End of The Event.
          </p>

          {/* Interactive AccordionGallery Component */}
          <div className="w-full mt-2">
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
