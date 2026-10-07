import Link from 'next/link';
import SectionHeading from '@/components/common/SectionHeading';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { ROUTES } from '@/config/routes';
import {
  CUISINES,
  CUISINE_CATCH_ALL,
  FOOD_OPTIONS,
  MENU_CUSTOMISATION_NOTICE,
} from '@/content/cuisines';

/**
 * Homepage menu preview.
 *
 * ⚠️ The previous version of this section listed invented dish names
 * (Dalma, Chhena Poda, Dal Makhani, Masala Dosa, Chaat Counter…) and invented
 * live-station names. The client supplied NO menu document — the menu-category
 * question was answered with the open-ended phrase "All Type On Your Mind".
 * Those dish lists have been removed rather than reworded.
 *
 * What is shown instead is only what the client confirmed: the cuisines they
 * offer, the food options they provide, and the customisation policy.
 */

const cuisineColumns = [CUISINES.slice(0, 4), CUISINES.slice(4)];

export default function MenuPreviewSection() {
  return (
    <section className="section-spacing major-section bg-warm-ivory">
      <div className="page-container">
        <SectionHeading
          eyebrow="Cuisines & Menus"
          title="ANY CUISINE YOU HAVE IN MIND"
          description={`Menus are customised to your event, guest count and preferences. Currently offering ${CUISINES.map((c) => c.name).join(', ')} — and “${CUISINE_CATCH_ALL}”.`}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cuisineColumns.map((column, i) => (
            <RevealOnScroll key={i} delay={i * 120}>
              <div className="p-6 bg-white rounded-(--radius-card) border border-soft-border h-full shadow-card">
                <h3 className="text-lg font-semibold text-chef-black mb-4">
                  {i === 0 ? 'Cuisines' : 'More Cuisines'}
                </h3>
                <ul className="space-y-2.5">
                  {column.map((cuisine) => (
                    <li
                      key={cuisine.slug}
                      className="flex items-center gap-2.5 text-sm text-muted-charcoal"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-chilli-red flex-shrink-0" />
                      {cuisine.name}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={240}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {FOOD_OPTIONS.map((option) => (
              <div
                key={option.slug}
                className="p-4 bg-white rounded-(--radius-card) border border-soft-border hover:border-brand-yellow transition-colors shadow-xs"
              >
                <p className="text-sm font-semibold text-chef-black">
                  {option.name}
                </p>
                <p className="text-xs text-muted-charcoal mt-1 leading-relaxed">
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={400}>
          <div className="mt-8 p-6 bg-pale-yellow border border-brand-yellow/40 rounded-(--radius-card) flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-base font-semibold text-chef-black">
                Every menu is customised to your event
              </p>
              <p className="text-sm text-muted-charcoal mt-1">{MENU_CUSTOMISATION_NOTICE}</p>
            </div>
            <Link
              href={ROUTES.menus}
              className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-chilli-red rounded-(--radius-button) hover:bg-chilli-red-dark transition-colors shadow-xs flex-shrink-0"
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              Explore Menus
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
