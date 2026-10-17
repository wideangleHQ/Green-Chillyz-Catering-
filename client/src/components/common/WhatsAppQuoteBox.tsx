'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { EVENT_TYPES } from '@/content/eventTypes';
import { SITE } from '@/config/site';
import { buildWhatsAppUrl, WHATSAPP_TEL_HREF } from '@/config/whatsapp';

export default function WhatsAppQuoteBox() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');

  // Match initial event type with query param if present
  const initialType = useMemo(() => {
    if (!serviceParam) return EVENT_TYPES[0].label;
    const match = EVENT_TYPES.find(
      (t) =>
        t.value.toLowerCase().replace(/_/g, '-') === serviceParam.toLowerCase() ||
        t.label.toLowerCase().includes(serviceParam.toLowerCase()),
    );
    return match ? match.label : EVENT_TYPES[0].label;
  }, [serviceParam]);

  const [selectedEvent, setSelectedEvent] = useState<string>(initialType);

  const whatsAppMessage = useMemo(() => {
    return `Hello ${SITE.name},\n\nI would like to get a catering quotation for ${selectedEvent}.\n\nPlease share menu options, packages, and pricing details. Thank you!`;
  }, [selectedEvent]);

  const whatsAppUrl = useMemo(() => {
    return buildWhatsAppUrl(whatsAppMessage);
  }, [whatsAppMessage]);

  return (
    <div className="w-full bg-white border border-soft-border rounded-xl sm:rounded-2xl shadow-sm sm:shadow-md overflow-hidden p-3.5 sm:p-5 md:p-6">
      {/* Top Banner / Value Proposition */}
      <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3 p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#25D366]/10 border border-[#25D366]/20">
        <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#25D366] text-white shrink-0 shadow-xs">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-xs sm:text-sm font-bold text-chef-black">Direct WhatsApp Quotation</h4>
            <span className="text-[10px] text-[#25D366] font-bold flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              Online
            </span>
          </div>
          <p className="text-[10px] sm:text-xs text-muted-charcoal">
            Skip long forms. Connect directly with our catering team on WhatsApp for an immediate response.
          </p>
        </div>
      </div>

      {/* Quick Select: Event Type */}
      <div className="mb-2.5 sm:mb-3">
        <label className="block text-[10px] sm:text-[11px] font-bold text-chef-black uppercase tracking-wider mb-1.5">
          1. Select Your Event Type
        </label>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 max-h-[96px] sm:max-h-[120px] overflow-y-auto pr-1">
          {EVENT_TYPES.map((t) => {
            const isSelected = selectedEvent === t.label;
            return (
              <button
                key={t.value}
                type="button"
                onClick={() => setSelectedEvent(t.label)}
                className={`text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg font-semibold transition-all duration-150 cursor-pointer min-h-[30px] sm:min-h-[34px] flex items-center justify-center shrink-0 ${
                  isSelected
                    ? 'bg-chef-black text-brand-yellow ring-2 ring-brand-yellow shadow-xs'
                    : 'bg-warm-ivory text-chef-black/85 border border-soft-border hover:border-brand-yellow hover:bg-pale-yellow/50'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Message Preview Box */}
      <div className="mb-2.5 sm:mb-3.5 p-2 sm:p-2.5 rounded-xl bg-warm-ivory border border-soft-border/80">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] sm:text-[11px] font-bold text-muted-charcoal uppercase tracking-wider">
            2. Prepared WhatsApp Message
          </span>
          <span className="text-[10px] text-[#25D366] font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
            Ready to Send
          </span>
        </div>
        <p className="text-[10px] sm:text-xs text-chef-black font-mono whitespace-pre-line leading-relaxed bg-white p-2 sm:p-2.5 rounded-lg border border-soft-border">
          {whatsAppMessage}
        </p>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#128C7E] rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] cursor-pointer min-h-[44px] text-center"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Chat on WhatsApp Now
        </a>

        <a
          href={WHATSAPP_TEL_HREF}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-chef-black bg-warm-ivory border border-soft-border hover:bg-brand-yellow hover:text-chef-black rounded-xl transition-all duration-200 active:scale-[0.98] cursor-pointer min-h-[44px] text-center"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          Call {SITE.contact.phoneDisplay}
        </a>
      </div>

      {/* Assurance / Facts Footer */}
      <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-soft-border/70 grid grid-cols-3 gap-2 text-center">
        <div>
          <span className="block text-[9px] sm:text-[10px] font-bold text-chef-black uppercase tracking-wider">
            Fast Response
          </span>
          <span className="text-[10px] sm:text-xs text-muted-charcoal">
            {SITE.contact.responseTime}
          </span>
        </div>
        <div>
          <span className="block text-[9px] sm:text-[10px] font-bold text-chef-black uppercase tracking-wider">
            Custom Menus
          </span>
          <span className="text-[10px] sm:text-xs text-muted-charcoal">
            Customised packages
          </span>
        </div>
        <div>
          <span className="block text-[9px] sm:text-[10px] font-bold text-chef-black uppercase tracking-wider">
            Service Area
          </span>
          <span className="text-[10px] sm:text-xs text-muted-charcoal">
            {SITE.primaryCity} &amp; Odisha
          </span>
        </div>
      </div>
    </div>
  );
}
