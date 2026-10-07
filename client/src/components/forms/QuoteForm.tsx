'use client';

import { useRef, useState, type FormEvent } from 'react';
import { createEnquiry, type CreateEnquiryDto } from '@/services/enquiry.service';
import { ApiRequestError } from '@/lib/api/client';
import { buildWhatsAppUrl, WHATSAPP_TEL_HREF } from '@/config/whatsapp';
import { EVENT_TYPE_LABELS, EVENT_TYPES } from '@/content/eventTypes';
import { SITE } from '@/config/site';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Builds the pre-filled WhatsApp handoff message from the submitted enquiry.
 *
 * ⚠️ This text is composed in the CUSTOMER's WhatsApp app. It is not a
 * server-side notification to the business — the customer still has to press
 * send. The UI copy reflects that distinction.
 */
function buildHandoffMessage(dto: CreateEnquiryDto, referenceId: string): string {
  const lines = [
    `Hello ${SITE.name},`,
    '',
    'I would like to discuss catering for my event.',
    '',
    `Name: ${dto.name}`,
    `Phone: ${dto.phone}`,
    `Event Type: ${EVENT_TYPE_LABELS[dto.eventType] ?? dto.eventType}`,
  ];
  if (dto.eventDate) lines.push(`Event Date: ${dto.eventDate}`);
  if (dto.guestCount) lines.push(`Guest Count: ${dto.guestCount}`);
  if (dto.location) lines.push(`Event Location: ${dto.location}`);
  lines.push('', `Reference: ${referenceId}`, '', 'Thank you.');
  return lines.join('\n');
}

const inputClass =
  'w-full px-4 py-3 text-sm bg-warm-ivory border border-soft-border rounded-(--radius-button) text-chef-black placeholder:text-muted-charcoal/60 focus:outline-none focus:ring-2 focus:ring-brand-yellow/40 focus:border-brand-yellow transition-colors';
const labelClass = 'block text-sm font-medium text-chef-black mb-1.5';

export default function QuoteForm() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [whatsAppUrl, setWhatsAppUrl] = useState('');
  const [referenceId, setReferenceId] = useState('');
  // ponytail: disabling the submit button already blocks accidental double-clicks;
  // this ref adds a hard guard against a second fetch racing in on fast re-renders.
  const submittingRef = useRef(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;
    setFormState('submitting');

    const data = new FormData(e.currentTarget);
    const guestCountRaw = data.get('guestCount') as string;

    // Exactly the six fields the client asked the form to collect:
    // Name, Phone Number, Event Type, Event Date, Guest Count, Event Location.
    // Email and free-text notes are NOT collected — the client's list did not
    // include them. They remain accepted by the API for backwards
    // compatibility. See docs/src/12-decisions.md (2026-09-30).
    const dto: CreateEnquiryDto = {
      name: (data.get('name') as string).trim(),
      phone: (data.get('phone') as string).trim(),
      eventType: data.get('eventType') as CreateEnquiryDto['eventType'],
      eventDate: (data.get('eventDate') as string) || undefined,
      guestCount: guestCountRaw ? Number(guestCountRaw) : undefined,
      location: (data.get('location') as string)?.trim() || undefined,
    };

    try {
      const confirmation = await createEnquiry(dto);
      setReferenceId(confirmation.referenceId);
      setWhatsAppUrl(buildWhatsAppUrl(buildHandoffMessage(dto, confirmation.referenceId)));
      setFormState('success');
    } catch (err) {
      setErrorMessage(
        err instanceof ApiRequestError
          ? err.message
          : "We couldn't submit your enquiry right now. Please try again or contact us directly on WhatsApp.",
      );
      setFormState('error');
    } finally {
      submittingRef.current = false;
    }
  }

  if (formState === 'success') {
    return (
      <div className="text-center p-8 bg-pale-yellow/40 border border-soft-border rounded-(--radius-card)">
        <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-brand-yellow/30 text-chef-black">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-chef-black mb-2">
          Your Enquiry Is Saved
        </h3>
        <p className="text-sm text-muted-charcoal mb-1">
          Reference: <strong className="text-chef-black">{referenceId}</strong>
        </p>
        <p className="text-sm text-muted-charcoal mb-6">
          To reach us straight away, send the same details on WhatsApp — the
          message below is ready for you to send.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#25D366] rounded-(--radius-button) hover:opacity-90 transition-opacity"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Send on WhatsApp
          </a>
          <a
            href={WHATSAPP_TEL_HREF}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-chef-black border-2 border-chef-black rounded-(--radius-button) hover:bg-chef-black hover:text-white transition-colors"
          >
            Call {SITE.contact.phoneDisplay}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {formState === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-(--radius-button) text-sm text-red-700">
          {errorMessage}{' '}
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline"
          >
            Message us on WhatsApp instead
          </a>
        </div>
      )}

      {/* Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your Name <span className="text-chilli-red">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={120}
            autoComplete="name"
            className={inputClass}
            placeholder="Full name"
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone Number <span className="text-chilli-red">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            required
            minLength={7}
            maxLength={20}
            autoComplete="tel"
            className={inputClass}
            placeholder="+91 XXXXX XXXXX"
          />
        </div>
      </div>

      {/* Event Type & Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="eventType" className={labelClass}>
            Event Type <span className="text-chilli-red">*</span>
          </label>
          <select
            id="eventType"
            name="eventType"
            required
            className={`${inputClass} appearance-none`}
            defaultValue=""
          >
            <option value="" disabled>
              Select event type
            </option>
            {EVENT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="eventDate" className={labelClass}>
            Event Date <span className="text-chilli-red">*</span>
          </label>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            required
            min={new Date().toISOString().split('T')[0]}
            className={inputClass}
          />
        </div>
      </div>

      {/* Guest Count & Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="guestCount" className={labelClass}>
            Guest Count <span className="text-chilli-red">*</span>
          </label>
          <input
            id="guestCount"
            name="guestCount"
            type="number"
            inputMode="numeric"
            required
            min={1}
            max={SITE.guestCapacity.max}
            className={inputClass}
            placeholder="Approx. number of guests"
            aria-describedby="guestCount-help"
          />
          <p id="guestCount-help" className="text-xs text-muted-charcoal mt-1.5">
            We generally cater from {SITE.guestCapacity.min} guests upwards.
          </p>
        </div>
        <div>
          <label htmlFor="location" className={labelClass}>
            Event Location <span className="text-chilli-red">*</span>
          </label>
          <input
            id="location"
            name="location"
            type="text"
            required
            maxLength={200}
            className={inputClass}
            placeholder="Venue name and city"
          />
          <p className="text-xs text-muted-charcoal mt-1.5">
            We serve {SITE.serviceArea}.
          </p>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={formState === 'submitting'}
        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-white bg-chilli-red rounded-(--radius-button) hover:bg-chilli-red-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-xs"
        style={{ transitionDuration: 'var(--duration-fast)' }}
      >
        {formState === 'submitting' ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Saving...
          </>
        ) : (
          'Get My Quote'
        )}
      </button>

      <p className="text-xs text-muted-charcoal mt-2">
        Your enquiry is saved with a reference number so you can quote it when we
        speak. We will contact you about this enquiry. We respect your privacy and
        will not share your details.
      </p>
    </form>
  );
}
