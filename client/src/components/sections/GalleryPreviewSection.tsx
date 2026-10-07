import Link from 'next/link';
import SectionHeading from '@/components/common/SectionHeading';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { ROUTES } from '@/config/routes';
import { GALLERY_CATEGORIES } from '@/content/gallery';

/**
 * Homepage gallery preview.
 *
 * The client confirmed they HAVE photography covering these categories but did
 * not supply the files (the "share a link to your photos" question was left
 * blank). This section therefore lists the confirmed categories and links to
 * the gallery page, instead of rendering labelled "Photo 1..8" placeholder
 * blocks under the heading "Moments We've Created" — which implied delivered
 * events the client has not evidenced.
 */
export default function GalleryPreviewSection() {
  return (
    <section className="section-spacing major-section bg-chef-black">
      <div className="page-container">
        <SectionHeading
          eyebrow="Event Gallery"
          title="PHOTOGRAPHY WE CAN SHARE"
          description="Our photography covers the categories below. Images are being prepared for this site — in the meantime, ask us for examples of any of these on your enquiry."
          dark
        />

        <RevealOnScroll>
          <ul className="flex flex-wrap justify-center gap-2.5">
            {GALLERY_CATEGORIES.map((category) => (
              <li
                key={category.slug}
                className="px-4 py-2 text-sm text-sand-200 bg-white/5 border border-white/15 hover:border-brand-yellow hover:text-brand-yellow rounded-full transition-colors"
              >
                {category.label}
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        <RevealOnScroll delay={300}>
          <div className="text-center mt-10">
            <Link
              href={ROUTES.gallery}
              className="inline-flex items-center px-6 py-3 text-sm font-semibold text-brand-yellow border-2 border-brand-yellow rounded-(--radius-button) hover:bg-brand-yellow hover:text-chef-black transition-colors"
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              View Gallery
              <svg className="ml-2 w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
