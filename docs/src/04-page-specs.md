# Page Specifications

Every page follows: Purpose · Primary user · Business objective · SEO objective · CTAs · Sections · Mobile notes.

**Authority:** the client's Website Information Form export (2026-09-25) — see
Sec. 16. Section names below that no longer exist are marked as removed, with
the reason. Copy shown here is the confirmed basis for each section; wording
lives in `client/src/content/*.ts`.

## Live routes

| Route        | Purpose                                          | Primary CTA        |
| ------------ | ------------------------------------------------ | ------------------ |
| `/`          | Positioning, service discovery, trust, conversion | Get a Quote        |
| `/about`     | What the business is and does                   | Get a Quote        |
| `/services`  | All 13 confirmed services + on-site facilities  | Get a Quote        |
| `/menus`     | Cuisines, food options, customisation, pricing approach | Request a Quotation |
| `/gallery`   | Confirmed photography categories, awaiting images | Send an enquiry    |
| `/faq`       | Confirmed answers, grouped by category           | Send an enquiry    |
| `/contact`   | Enquiry form + contact details + process         | Submit form        |

All routes are statically prerendered.

## Homepage

```
Header → Hero → Why Green Chillyz → Catering Services → Cuisines & Menus →
Event Gallery → On-Site Facilities → FAQ → Get a Quote → Footer
```

| Section            | Objective                                     | Confirmed basis                                              | Mobile behaviour                                   |
| ------------------ | --------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------- |
| Hero               | Identity + service categories in 3 seconds    | Client descriptor, service area, 50-guest minimum, immediate response | Stack CTAs vertically                             |
| Why Green Chillyz  | Establish credibility from facts              | Capacity, customised menus, facilities, service area         | 2-col grid → 1-col stack                          |
| Catering Services  | Route by service type                         | 6 of 13 confirmed services, links to `/services#slug`         | Card grid → 1-col stack                           |
| Cuisines & Menus   | Show capability without publishing a price    | 8 cuisines + catch-all, 4 food options, customisation notice  | 2-col → 1-col                                     |
| Event Gallery      | Signal real work                              | 11 confirmed photography categories; no images published     | Wrapping chip row                                 |
| On-Site Facilities | De-risk the booking decision                  | 13 confirmed facilities + live-station statement              | 2-col → 3-col grid                               |
| FAQ                | Pre-empt objections before contact            | 5 of the confirmed answers                                    | Accordion                                         |
| Get a Quote        | Primary conversion                            | Enquiry form lives on `/contact`                              | Full-width stacked button                         |
| Footer             | Secondary nav + confirmed contact + socials   | Call / WhatsApp                                               | Stacked                                            |

**Removed sections** and why:

| Removed             | Reason                                                                                  |
| ------------------- | --------------------------------------------------------------------------------------- |
| Event Types         | Duplicated the services section; the client did not distinguish a separate set of occasions |
| Signature Menus     | No dish names were supplied — see Sec. 05                                                 |
| Live Food Stations  | Invented station names. The confirmed statement is published in On-Site Facilities instead  |
| Testimonials        | No testimonials supplied. Filled stars above empty skeleton bars read as fake 5-star reviews |
| Hygiene & Quality   | Claimed food-safety standards, a professional kitchen and daily ingredient sourcing. None confirmed; no FSSAI licence supplied. Replaced by On-Site Facilities |

**Hero copy** is derived from the client's own descriptor — "Any Type of
Catering and Memorable Services" — plus the confirmed service area. The earlier
"Premium Catering for Weddings, Celebrations & Corporate Events" was never
client-approved and the word "premium" is not a claim the client can support.

## `/services`

Single page carrying all 13 confirmed services as anchored sections, followed by
the on-site facilities list, guest minimum, service area and the out-of-area
conditions.

**Per-service detail pages were removed.** The client supplied service names but
no per-service detail, so `/services/[slug]` pages would have been thirteen
thin pages with invented copy. If the client later supplies service-specific
content, the route can be reintroduced from `client/src/content/services.ts`.

## `/menus`

Cuisines → Food options → Packages & customisation → Live stations → Pricing
approach → CTA.

Pricing section states the **per-person** basis and explains that prices are
shared after enquiry because they vary with customisation. No figure is
published, per the client's instruction.

## `/gallery`

The client confirmed photography exists for 11 categories, but supplied no
images. The page lists the confirmed categories and states that images are being
added, with a CTA to ask for examples directly. No placeholder tiles and no
filter UI, since a filter over zero images is non-functional.

**Do not** add stock or generated imagery to fill this page.

## `/faq`

Accordion grouped by Booking & Process / Menus & Cuisines / Guests, Locations &
Facilities / Pricing & Payment. Every answer traces to a client answer
elsewhere in the form; see Sec. 06 §6.

**Not published** because the client left them blank: cancellation, guest-count
changes, menu changes, advance amount, booking lead time, tasting sessions,
business hours.

## `/contact`

Enquiry form (Sec. 06) → WhatsApp / phone / email cards → booking process
summary → address with Maps link → social links.

The process summary is four steps, each a direct restatement of a client answer:
share details → we discuss → quotation shared → booking confirmed on advance
payment.

**No business hours are shown** — the client's answer to that question was
ambiguous and is unresolved.

## Analytics events

**Not implemented.** No analytics provider is configured and the client has not
approved one. Adding tracking would collect visitor data beyond the enquiry
fields the client consented to. Treat any event list in this document as
proposed and requiring explicit approval before implementation.
