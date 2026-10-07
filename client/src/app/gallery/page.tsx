import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeading from '@/components/common/SectionHeading';
import { ROUTES } from '@/config/routes';
import { GALLERY_CATEGORIES, GALLERY_CATCH_ALL } from '@/content/gallery';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Event photography categories available from Green Chillyz Catering — weddings, receptions, haldi and mehendi, corporate events, buffet setups, live food counters, kitchen and team.',
  alternates: { canonical: ROUTES.gallery },
};

/**
 * Gallery page.
 *
 * ⚠️ The previous version rendered a grid of grey placeholder tiles labelled
 * "Photo 1…8" plus a non-functional filter row under the heading "Our Work
 * Speaks For Itself" / "Real events, real food, real service" — asserting
 * delivered events the client has not evidenced and presenting stock grey
 * blocks as if they were photographs.
 *
 * The client confirmed the material exists but did not supply it (the photo
 * link question was left blank). The honest empty state below is what ships
 * until real, permission-cleared images are provided.
 */
export default function GalleryPage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="section-spacing bg-white">
        <div className="page-container">
          <SectionHeading
            eyebrow="Event Gallery"
            title="EVENT PHOTOGRAPHY"
            description="We have photography for the categories below. It is being prepared for this site — we would rather show nothing than show you something that is not our work."
          />

          <div className="max-w-3xl mx-auto p-8 bg-warm-ivory rounded-(--radius-card) border border-soft-border text-center shadow-xs">
            <h2 className="text-base font-bold text-chef-black mb-2">
              Images are being added
            </h2>
            <p className="text-sm text-muted-charcoal leading-relaxed mb-6">
              If you would like to see examples before you enquire, message us
              on WhatsApp or call and we will share what we have for the type of
              event you are planning.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={ROUTES.contact}
                className="inline-flex items-center px-7 py-3 text-sm font-bold text-white bg-chilli-red rounded-(--radius-button) hover:bg-chilli-red-dark transition-all duration-200 shadow-sm"
                style={{ transitionDuration: 'var(--duration-fast)' }}
              >
                Send an enquiry
              </Link>
            </div>
          </div>

          <h2 className="text-center text-sm font-bold text-chef-black mt-12 mb-5">
            Categories we can share
          </h2>
          <ul className="flex flex-wrap justify-center gap-2.5">
            {GALLERY_CATEGORIES.map((category) => (
              <li
                key={category.slug}
                className="px-4 py-2 text-sm text-muted-charcoal bg-warm-ivory border border-soft-border rounded-full hover:border-brand-yellow transition-colors"
              >
                {category.label}
              </li>
            ))}
            <li className="px-4 py-2 text-sm font-bold text-chef-black bg-pale-yellow border border-brand-yellow/60 rounded-full">
              {GALLERY_CATCH_ALL}
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
