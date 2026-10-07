# Enquiry System, WhatsApp & Booking

**Status:** enquiry save is implemented and tested. The WhatsApp and email
notifications the client confirmed are **not implemented** — see
[Notification gap](#4-notification-gap-confirmed-requirement-not-built).

## 1. Get-a-Quote form

The client answered "Which customer information should the website enquiry form
collect?" with exactly six fields. The form collects those six and nothing else.

| Field           | Required? | Notes                                                    |
| --------------- | --------- | -------------------------------------------------------- |
| Name            | Required  | 2–120 chars                                              |
| Phone           | Required  | 7–20 chars; client's preferred follow-up channel         |
| Event Type      | Required  | One of the 13 confirmed services; drives internal routing |
| Event Date      | Required  | HTML `min` = today                                       |
| Guest Count     | Required  | 1–200000 (see Sec. 16 §1 for the 200000 caveat)          |
| Event Location  | Required  | Venue name and city                                       |

`email` and `message` are **accepted but not collected**. The client did not
list them; the nullable columns already exist; removing them would be a
destructive migration for no benefit. See Sec. 12 (2026-09-30).

Form states implemented: idle → validation errors (native HTML5, field-level,
labelled) → loading → success (reference ID shown) → error (retryable, with a
WhatsApp fallback link).

Duplicate prevention is **two-layer**: the submit button is disabled and a
`submittingRef` guard blocks a racing second fetch in the browser; the server
independently returns the existing enquiry for an identical phone number within
60 seconds.

## 2. Implemented flow

```
Customer → QuoteForm (client/src/components/forms/QuoteForm.tsx)
  → POST /api/v1/enquiries        (5 req/min throttle)
  → ValidationPipe strips unknown fields, class-validator enforces the contract
  → Customer upserted by phone, Enquiry created (status NEW)
  → Duplicate phone + same event details within 60s → existing enquiry returned
  → { referenceId: "GCC-YYMMDD-XXXX", enquiryId, status, message }
  → Success state: "Your Enquiry Is Saved" + reference ID
  → Customer-initiated WhatsApp handoff (see §3)
```

Rate limiting: global `RATE_LIMIT_TTL` / `RATE_LIMIT_MAX` per IP, plus a
stricter 5/min throttle on the enquiry endpoint.

No authentication. The only public read endpoint is
`GET /api/v1/enquiries/ref/:referenceId`, which returns that single enquiry and
nothing else. Database URLs, the service-role key and any notification settings
are never included in a response or a log line.

## 3. WhatsApp handoff — what it is and is not

After a successful save the form offers a pre-filled `wa.me` link containing the
customer's own enquiry details and the reference ID.

**This opens WhatsApp in the customer's app. The customer must press send.**
Nothing is transmitted server-side, and the business is not notified by this
link. The UI is worded accordingly ("Send on WhatsApp", not "We'll notify you
on WhatsApp").

The customer quoted in the form is prefilled from confirmed client answers: name,
event type label, event date, guest count, location, reference.

**Not implemented:** server-side delivery of that message to the business. That
requires the integration described below.

## 4. Notification gap (confirmed requirement, not built)

The client confirmed that on submission the business should receive a **WhatsApp
notification and an email notification**, in addition to the enquiry being saved
and visible in the website/admin panel. Notification recipient confirmed as
`greenchillyzcatering@gmail.com`.

| Channel      | Requirement         | Implementation                                                              |
| ------------ | ------------------- | -------------------------------------------------------------------------- |
| Save enquiry | Confirmed           | **Done** — PostgreSQL via Prisma                                            |
| WhatsApp     | Confirmed           | **Not built.** Requires an approved WhatsApp Business Platform account and a Cloud API token. The client confirmed WhatsApp Business is enabled on the number, but no WABA ID, phone number ID or access token has been supplied. |
| Email        | Confirmed           | **Not built.** No mailer dependency is installed and no SMTP provider or credentials exist. |
| Admin panel  | Confirmed           | **Not built.** Enquiries are currently reachable only via SQL or the API. |

No placeholder, stub, or "successfully notified" log line has been added. Doing
so would tell the client a lead was delivered when it was not — the single most
damaging possible failure in a lead-capture system. The gap is recorded in
Sec. 11 and Sec. 16 §5, and the required env vars are listed but commented out
in `.env.example`.

To close the gap, the client must supply either:
- **WhatsApp:** an approved WhatsApp Business Platform account, WABA ID, phone
  number ID and a long-lived access token; **or**
- **Email:** SMTP host, port, username, password and a verified sender address
  (or approval to use a transactional email provider).

## 5. Quotation & booking process

Every step is a direct restatement of a client answer (Sec. 16 §4).

| Step | Client answer                                                              |
| ---- | -------------------------------------------------------------------------- |
| 1. Share details | Event detail needed: "Required the Detail Information About The Event."     |
| 2. Discuss | Quotation prepared "After Final Disussion"                                   |
| 3. Share quotation | WhatsApp, Email, PDF, In Person, Any Medium; calculated **per person**     |
| 4. Confirm booking | "Pay Advance Amount for Booking Confirm after Final Discuss."              |

Menu customisations must be finalised at least 2 days before the event date.

**Not published** because the client left them blank: advance amount or
percentage, cancellation policy, guest-count change policy, menu-change policy,
other booking terms. No booking lead time and no tasting-session policy are
claimed anywhere.

## 6. FAQ content

The client's "any FAQs you would like to add" field was left blank. The FAQ page
and the homepage FAQ section are nonetheless populated, using **only** answers
the client gave elsewhere in the form — cuisines, customisation, dietary
options, live stations, service list, guest minimum, service area, out-of-area
conditions, facilities, per-person pricing, why prices are not published, how to
request a quotation, how it is shared, how a booking is confirmed, and who
responds.

Previously published FAQ answers about tasting sessions, "book 2–4 weeks ahead",
"we accommodate shorter timelines" and "we respond within 2 hours" were
invented and have been removed.

## 7. Data & privacy

Collected: name, phone, event type, event date, guest count, location. This is
the minimum needed to prepare a quotation and is exactly the client's stated
list. No free-text notes, no marketing opt-in, no third-party analytics
currently. The submitter's IP address is **never** published or exposed through
any endpoint.
