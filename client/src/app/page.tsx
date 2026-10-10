import Hero from '@/components/hero/Hero';
import CateringExpandSection from '@/components/sections/CateringExpandSection';
import ServicesSection from '@/components/sections/ServicesSection';
import MenuPreviewSection from '@/components/sections/MenuPreviewSection';
import FacilitiesSection from '@/components/sections/FacilitiesSection';
import FaqSection from '@/components/sections/FaqSection';

/**
 * Homepage composition.
 *
 * Section 1: Hero — Full-background static image banner with headline & CTAs.
 * Section 2: CateringExpandSection — React Bits ScrollExpand -> Dark Overlay -> Why Choose Us AccordionGallery.
 * Section 3: ServicesSection — What we cater.
 * Section 4: MenuPreviewSection — Cuisines & custom menus.
 * Section 5: FacilitiesSection — On-site equipment & setup.
 * Section 6: FaqSection — Direct verified answers.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <CateringExpandSection />
      <ServicesSection />
      <MenuPreviewSection />
      <FacilitiesSection />
      <FaqSection />
    </>
  );
}
