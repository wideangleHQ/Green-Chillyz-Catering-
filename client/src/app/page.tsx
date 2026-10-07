import Hero from '@/components/hero/Hero';
import CateringExpandSection from '@/components/sections/CateringExpandSection';
import ServicesSection from '@/components/sections/ServicesSection';
import MenuPreviewSection from '@/components/sections/MenuPreviewSection';
import GalleryPreviewSection from '@/components/sections/GalleryPreviewSection';
import FacilitiesSection from '@/components/sections/FacilitiesSection';
import FaqSection from '@/components/sections/FaqSection';
import CtaSection from '@/components/sections/CtaSection';

/**
 * Homepage composition.
 *
 * Section 1: Hero — Full-background static image banner with headline & CTAs.
 * Section 2: CateringExpandSection — React Bits ScrollExpand -> Dark Overlay -> Why Choose Us AccordionGallery.
 * Section 3: ServicesSection — What we cater.
 * Section 4: MenuPreviewSection — Cuisines & custom menus.
 * Section 5: GalleryPreviewSection — Event photography categories.
 * Section 6: FacilitiesSection — On-site equipment & setup.
 * Section 7: FaqSection — Direct verified answers.
 * Section 8: CtaSection — Get a Quote inquiry prompt.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <CateringExpandSection />
      <ServicesSection />
      <MenuPreviewSection />
      <GalleryPreviewSection />
      <FacilitiesSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
