import { CONFIRMED_WHATSAPP_NUMBER, SITE } from './site';

// Single source of truth for the WhatsApp click-to-chat number.
// The fallback is the number the client supplied in their Website Information
// Form (2026-09-25) and confirmed as a WhatsApp Business number.
// Override per-environment with NEXT_PUBLIC_WHATSAPP_NUMBER if the business
// number changes — see .env.example.
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? CONFIRMED_WHATSAPP_NUMBER;

export const WHATSAPP_TEL_HREF = `tel:+${WHATSAPP_NUMBER}`;

/**
 * Builds a wa.me click-to-chat link.
 *
 * ⚠️ This link only OPENS WhatsApp for the customer to press send. It does not
 * deliver anything to the business. There is no WhatsApp Business API
 * integration in this project — see docs/src/06-enquiry-system.md.
 */
export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Default prefilled message for general site-wide WhatsApp CTAs. */
export const WHATSAPP_GENERIC_MESSAGE =
  "Hi Green Chillyz Catering, I'd like to know more about your catering services.";

/** Default prefilled message used from the "Get a Quote" call to action. */
export const WHATSAPP_QUOTE_MESSAGE =
  "Hi Green Chillyz Catering, I'd like to discuss catering for my event.";

/**
 * The client's own stated descriptor, used as the WhatsApp body opener so the
 * message reads in the client's language rather than invented marketing copy.
 */
export const WHATSAPP_OPENER = `Hello ${SITE.name},`;
