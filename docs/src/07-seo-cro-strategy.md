# SEO & CRO Strategy

**Rule for this document:** nothing here may be implemented in a way that
publishes an unconfirmed business fact. No ratings, no hours, no prices, no
credentials, no event counts, no founding year. Where a recommendation depends
on information the client has not supplied, it is marked **Blocked**.

## Implemented

| Item                | Detail                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------ |
| Title template      | `%s | Green Chillyz Catering`; default "Green Chillyz Catering — Catering in Bhubaneswar"    |
| Meta descriptions   | Per route, built from confirmed cuisines / services / service area                           |
| `metadataBase`      | From `NEXT_PUBLIC_SITE_URL`; every route sets an explicit `alternates.canonical`            |
| Heading hierarchy   | One H1 per page; H2 for section groupings; H3 within cards                                     |
| Open Graph          | `type`, `siteName`, `locale: en_IN`, `url` on the root layout; inherited by child routes     |
| JSON-LD             | `CateringService` in the root layout — see below                                              |
| Internal links      | Services link to `/services#slug`; every page CTAs to `/contact`; footer covers all 7 routes |
| Static rendering    | All 7 routes prerendered as static content                                                    |

## JSON-LD

`client/src/components/common/StructuredData.tsx` renders a single
`CateringService` entity, rendered as a native `<script type="application/ld+json">`
in the root layout per the Next.js JSON-LD guide, with `<` escaped to prevent
injection.

Published: name, description, url, telephone, email, currency, postal address,
`hasMap`, `areaServed`, `availableLanguage`, `hasOfferCatalog` (the 12 named
services), and a `contactPoint`.

**Deliberately absent** because the client did not supply them:

| Field                    | Why omitted                                    |
| ------------------------ | ---------------------------------------------- |
| `aggregateRating`        | No ratings or testimonials supplied            |
| `review`                 | Same                                          |
| `openingHoursSpecification` | Operating hours unanswered — **Blocked**    |
| `priceRange`             | "Display Pricing Only After Enquiry"          |
| `foundingDate`           | Unresolved 2009 / 1999 conflict               |
| `hasCredential` / awards | No FSSAI licence or awards supplied           |

Do not add any of these without written client confirmation. Validate the output
with the Rich Results Test before launch.

## Target keyword themes

"catering Bhubaneswar", "wedding catering Bhubaneswar", "event catering
Odisha", plus the confirmed service and cuisine names. These are themes, not a
guarantee of rankings.

**Removed:** "Premium Catering Odisha" as a target — "premium" is not a claim
the client can support, and targeting it invites the copy back into the site.

## Local SEO

| Item                        | Status                                                                  |
| --------------------------- | ----------------------------------------------------------------------- |
| NAP consistency             | **Done** — single source of truth in `client/src/config/site.ts`; used by header, footer, contact page and JSON-LD |
| `CateringService` schema    | **Done** — no rating, hours or price claims                            |
| Service-area statement      | **Done** — "Entire Bhubaneswar and Entire Odisha"                       |
| Google Business Profile     | **Blocked** — no GBP link supplied                                     |
| Review generation           | **Blocked** — no testimonials, and no GBP to generate on                |
| Business hours              | **Blocked** — answer was ambiguous; also needed for local ranking        |
| Location landing pages      | **Not created, deliberately** — one Bhubaneswar/Odisha entity, not many |

**Do not create thin location pages.** Keyword-only pages per city or per pincode
would be a doorway-page pattern and would also assert service capability the
client has not confirmed.

## Technical SEO

| Item                        | Status                                                            |
| --------------------------- | ----------------------------------------------------------------- |
| Canonical URLs              | **Done** — explicit per route                                     |
| Structured data             | **Done** — single accurate `CateringService`                     |
| OG tags                     | **Done** — see above; no OG image asset exists yet                 |
| XML sitemap / robots.txt    | Verify generated output at build before launch                    |
| Breadcrumbs                 | Not implemented — unnecessary for a 7-route flat site             |
| Core Web Vitals             | No images are currently published, so there is no LCP image budget. Re-test once real photos land |
| Image alt text              | Apply when images arrive; category labels are already the source |

## CRO — what converts here

Primary CTA is "Get a Quote" on every route, pointing to the six-field form on
`/contact`. Secondary CTAs are WhatsApp and click-to-call, both using the
client-confirmed +91 90900 22220. The success state shows a reference ID and an
explicitly customer-initiated WhatsApp handoff.

## CRO — patterns to avoid

- Generic "Contact Us" instead of "Get a Quote"
- Phone number buried in the footer only
- A form larger than the six fields the client asked for (Sec. 06)
- Claiming the form submission notified the business — it does not
- Implying a quote can be issued without the detail information the client requires
- Restaurant/QSR messaging on catering pages
- Generic stock imagery instead of real events

## Blocked / deferred

| Item                          | Blocked on                                                  |
| ----------------------------- | ----------------------------------------------------------- |
| Google Business Profile + reviews | Client supplying the GBP link                        |
| Real social proof             | Client supplying permission-cleared testimonials             |
| Event photography in the gallery | Client supplying images and publication permission       |
| Dish-level menu pages        | Client supplying a menu or package document                 |
| `openingHours` in schema      | Client confirming business hours                             |
| Analytics                     | Client approving a provider; none is configured             |
| Blog / content marketing      | Phase 4; not funded and not approved                         |

## Audit-identified SEO issues (baseline — June 2026)

| Category             | Issue                                                                          | Severity | Now    |
| -------------------- | ------------------------------------------------------------------------------ | -------- | ------ |
| Meta Title           | Missing or generic                                                            | High     | Done   |
| Meta Description     | Missing event-specific keywords                                                | High     | Done   |
| Heading Structure    | H1 not optimised for "catering Bhubaneswar"                                    | High     | Done   |
| Keyword Optimisation | Missing service keywords                                                        | High     | Done   |
| Internal Linking     | Confusion between /events/ and homepage                                        | Medium   | Resolved — no `/events` route exists |
| Image Optimisation   | Images lack alt text; no images published                                       | High     | N/A until images arrive |
| Local SEO            | GBP unoptimised; no GBP link supplied                                           | High     | **Blocked** |
| Technical SEO        | No SSL evidence; domain inconsistency (www. vs. non-www.)                      | High     | **Blocked** — hosting concern |

## Audit-identified conversion gaps

| Opportunity            | Status                    | Note                                                            |
| ---------------------- | ------------------------- | ---------------------------------------------------------------- |
| Inquiry form           | **Done**                  | Six fields, validated front and back (Sec. 06)                   |
| WhatsApp link          | **Done**                  | Confirmed number. Customer-initiated, not a server notification  |
| CTA placement          | **Done**                  | Header + hero + footer + every page                              |
| Business notifications | **Not implemented**       | **Blocked** — no WhatsApp/SMS credentials (Sec. 06 §4)           |
| Trust signals          | **Limited by client input** | No FSSAI, no testimonials, no event count supplied            |
| Testimonials           | **Absent**                | **Blocked** — none supplied                                     |
| Availability calendar  | **Not implemented**       | Requires date-availability data the business does not yet hold  |
| Pricing guide download | **Not implemented**       | Would imply published pricing — contradicts the client's instruction |

### Conversion points the audit flagged that are deliberately unchanged

1. **No visible pricing.** The client instructed that pricing be displayed only
   after enquiry. The quotation section explains the per-person basis and why a
   figure is not published, rather than hiding the absence.
2. **No availability calendar.** The form collects an event date; the business
   confirms availability during the discussion. A calendar would imply a booking
   system that does not exist.
3. **Restaurant ratings are not shown anywhere.** Catering pages never borrow
   restaurant trust signals (Sec. 12, 2026-09-09).
