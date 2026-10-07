'use client';

import { useState } from 'react';
import Link from 'next/link';
import SectionHeading from '@/components/common/SectionHeading';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { ROUTES } from '@/config/routes';
import { buildWhatsAppUrl, WHATSAPP_QUOTE_MESSAGE } from '@/config/whatsapp';
import { FAQS, FAQ_CATEGORY_LABELS, type FaqCategory } from '@/content/faqs';

const categoryOrder: FaqCategory[] = ['booking', 'menus', 'logistics', 'pricing'];

/**
 * FAQ page.
 *
 * All content comes from client/src/content/faqs.ts, where every answer is
 * traceable to a specific client answer.
 *
 * ⚠️ The previous local `faqs` array in this file contained answers the client
 * never gave — "book at least 2–4 weeks ahead", "we accommodate shorter
 * timelines", "our team will contact you within 2 hours", and a cancellation
 * policy that the client's form left blank. Those have been removed. Questions
 * about cancellation, guest-count changes, menu changes, advance amount and
 * business hours remain unanswered and are therefore NOT published; see
 * docs/src/11-scope-and-conflicts.md.
 */
export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="pt-24 md:pt-28">
      <section className="section-spacing bg-white">
        <div className="page-container">
          <SectionHeading
            eyebrow="FAQ"
            title="FREQUENTLY ASKED QUESTIONS"
            description="Everything on this page is an answer the business has given us directly. If your question is not here, ask us on WhatsApp or phone."
          />

          <div className="max-w-3xl mx-auto space-y-10">
            {categoryOrder.map((category) => {
              const items = FAQS.filter((faq) => faq.category === category);
              if (items.length === 0) return null;

              return (
                <div key={category}>
                  <h2 className="text-xs font-bold text-chilli-red tracking-wider uppercase mb-4">
                    {FAQ_CATEGORY_LABELS[category]}
                  </h2>
                  <div className="space-y-3">
                    {items.map((faq) => {
                      const index = FAQS.indexOf(faq);
                      const isOpen = openIndex === index;
                      return (
                        <RevealOnScroll key={faq.question}>
                          <div className={`border rounded-(--radius-card) overflow-hidden transition-colors ${
                            isOpen ? 'border-brand-yellow bg-pale-yellow/20' : 'border-soft-border bg-white hover:border-brand-yellow/50'
                          }`}>
                            <button
                              type="button"
                              onClick={() => setOpenIndex(isOpen ? null : index)}
                              className="flex items-center justify-between w-full px-5 py-4 text-left text-sm font-bold text-chef-black hover:bg-pale-yellow/30 transition-colors"
                              aria-expanded={isOpen}
                            >
                              <span>{faq.question}</span>
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`flex-shrink-0 ml-3 transition-transform ${
                                  isOpen ? 'rotate-180 text-chilli-red' : 'text-chef-black'
                                }`}
                                style={{ transitionDuration: 'var(--duration-fast)' }}
                              >
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </button>
                            {isOpen && (
                              <div className="px-5 pb-4">
                                <p className="text-sm text-muted-charcoal leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            )}
                          </div>
                        </RevealOnScroll>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="max-w-3xl mx-auto mt-12 p-8 bg-warm-ivory rounded-(--radius-card) border border-soft-border text-center shadow-xs">
            <h2 className="text-base font-bold text-chef-black mb-2">
              Still have a question?
            </h2>
            <p className="text-sm text-muted-charcoal leading-relaxed mb-6">
              Send us your event details and we will answer them as part of your
              quotation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={ROUTES.contact}
                className="inline-flex items-center px-7 py-3 text-sm font-bold text-white bg-chilli-red rounded-(--radius-button) hover:bg-chilli-red-dark transition-all duration-200 shadow-sm"
                style={{ transitionDuration: 'var(--duration-fast)' }}
              >
                Send an enquiry
              </Link>
              <a
                href={buildWhatsAppUrl(WHATSAPP_QUOTE_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-7 py-3 text-sm font-bold text-chef-black border-2 border-chef-black rounded-(--radius-button) hover:bg-chef-black hover:text-white transition-colors"
                style={{ transitionDuration: 'var(--duration-fast)' }}
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
