'use client';

import { useState } from 'react';
import SectionHeading from '@/components/common/SectionHeading';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { FAQS } from '@/content/faqs';

/**
 * Homepage FAQ preview — sourced from client/src/content/faqs.ts, where every
 * answer is traceable to a specific client answer.
 *
 * The previous local `faqs` array in this file contained invented answers about
 * tasting sessions, "book at least 2–4 weeks ahead" lead times and "we respond
 * within 2 hours". The client confirmed none of those; they did state an
 * expected response time of "Immediate", which the new content reflects.
 */
export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Show the first five only; /faq carries the full set.
  const faqs = FAQS.slice(0, 5);

  return (
    <section className="section-spacing bg-white">
      <div className="page-container">
        <SectionHeading
          eyebrow="FAQ"
          title="FREQUENTLY ASKED QUESTIONS"
          description="Straight answers on what we cater, where we cater, how menus work and how quotations are prepared."
        />

        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <RevealOnScroll key={faq.question} delay={i * 60}>
              <div
                className={`border rounded-(--radius-card) overflow-hidden transition-colors duration-200 ${
                  openIndex === i
                    ? 'border-brand-yellow/60 bg-pale-yellow/20'
                    : 'border-soft-border bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex items-center justify-between w-full px-5 py-4 text-left text-sm font-medium text-chef-black hover:bg-pale-yellow/30 transition-colors"
                  aria-expanded={openIndex === i}
                >
                  <span>{faq.question}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`flex-shrink-0 ml-3 transition-transform duration-200 ${
                      openIndex === i ? 'rotate-180 text-chilli-red' : 'text-muted-charcoal'
                    }`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-muted-charcoal leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
