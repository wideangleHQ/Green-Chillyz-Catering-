# Content Model — Services, Menus, Gallery, Testimonials, Trust

**Authority:** the client's Website Information Form export (2026-09-25) —
field-by-field register in Sec. 16. Where this document previously described
recommended content, the client's answer now governs.

## Catering services

The client confirmed 13 services: 12 named types plus an open-ended "Any Type
of Catering". Each is one member of the `EventType` enum in
`server/prisma/schema.prisma`, mirrored with display labels in
`client/src/content/eventTypes.ts`.

| Service               | Slug              | Enum member       |
| --------------------- | ----------------- | ----------------- |
| Wedding Catering      | `wedding`         | `WEDDING`         |
| Reception Catering    | `reception`       | `RECEPTION`       |
| Engagement Catering   | `engagement`      | `ENGAGEMENT`      |
| Haldi & Mehendi       | `haldi-mehendi`   | `HALDI_MEHENDI`   |
| Birthday Party        | `birthday`        | `BIRTHDAY`        |
| Anniversary           | `anniversary`     | `ANNIVERSARY`     |
| Corporate Catering    | `corporate`       | `CORPORATE`       |
| Office & Business     | `office-business` | `OFFICE_BUSINESS` |
| Private Party         | `private-party`   | `PRIVATE_EVENT`   |
| House Party           | `house-party`     | `HOUSE_PARTY`     |
| Outdoor               | `outdoor`         | `OUTDOOR`         |
| Institutional         | `institutional`   | `INSTITUTIONAL`   |
| Any Type of Catering  | `any-type`        | `OTHER`           |

`ENGAGEMENT`, `ANNIVERSARY`, `OFFICE_BUSINESS`, `HOUSE_PARTY` and
`INSTITUTIONAL` were added on 2026-09-30. The addition is additive: no existing
member was renamed or removed, so stored enquiries keep their values.

`PRIVATE_EVENT` is retained as the member for "Private Party Catering" rather
than being renamed, to avoid rewriting existing rows.

**Per-service detail pages were removed.** The client supplied service names but
no per-service detail, so `/services/[slug]` pages could only have carried
invented copy. `/services` now carries every confirmed service as an anchored
section, and all internal links point at those anchors.

## Cuisines & food options

**Cuisines (confirmed):** Odia, North Indian, South Indian, Bengali, Chinese,
Continental, Mughlai, Italian. The client's own open-ended answer —
"Any Type as You Love to Eat" — is published as a catch-all.

**Food options (confirmed):** Vegetarian, Non-Vegetarian, Both, Special Dietary
("All Type").

**Menu customisation (confirmed):** yes, and customisations must be finalised at
least 2 days before the event date. The client's answer contained a garbled
leading token; see Sec. 11 for the clarification request.

Live stations: the client's answer was "We Can Provide all Type of Live Station
as per Menu." — published verbatim, with **no named stations**.

## Menus & packages

**Pricing is never published.** The client answered "Display Pricing Only After
Enquiry" and "Price Will Be Vary As Per Customization". Quotation basis is
confirmed as **per person**. No per-plate figure, package price or price range
appears anywhere on the site or in JSON-LD.

**No dish names are published.** The client's answer to "please provide your
current catering menu categories and important menu details" was the open-ended
phrase "All Type On Your Mind", and the menu/package document upload was left
blank. The previous build published ~35 invented dishes and 8 invented live
stations; all were removed. Package names and inclusions are likewise blank
and are not invented.

Offering: "Both Packages + Customized Menus" — packages and fully customised
menus are both available, with no package details published until a document is
supplied.

The `Menu`, `Package`, `MenuCourse` and `MenuTier` models remain deferred in
`schema.prisma` for the same reason.

## Facilities

The client ticked every option offered, plus "Other: All catering event
related". Confirmed: Buffet Setup, Table Setup, Food Serving Staff, Plates &
Cutlery, Glasses & Crockery, Live Food Counters, Live Cooking Stations, Beverage
Counter, Dessert Counter, Decoration & Food Presentation, Event Setup, Event
Coordination, Cleanup.

On-site support, in the client's words: "We Deal and Serve to Your Guest as
Like Our Guest till to The End of The Event."

The previous "Hygiene & Quality" section claimed food-safety standards, a
professional kitchen, trained staff and daily ingredient sourcing. None of that
was confirmed and no FSSAI licence was supplied, so the section was **replaced**
with a facilities section rather than reworded.

## Gallery

The client confirmed photography exists for: weddings, receptions, haldi and
mehendi, corporate events, birthdays, buffet setups, live food counters, food
photography, chefs/kitchen, catering staff, event setup, "All Type".

The photo/video link question was left blank, so **no image is published**. The
gallery page lists the confirmed categories and states that images are being
added. The previous grid of grey tiles labelled "Photo 1…8" under the heading
"Our Work Speaks For Itself" implied delivered events the client has not
evidenced, and has been removed.

## Testimonials & trust

**No testimonials and no ratings were supplied.** The previous homepage section
rendered three cards, each with five filled stars above empty grey skeleton bars
— to any visitor that reads as a 5-star review from a named customer.

The testimonials page, the primary-nav entry and the homepage section have all
been **removed**. An empty trust page advertises the absence of proof, and a
skeleton card with filled stars is a fabricated rating. There is currently no
testimonial content anywhere on the site, and `aggregateRating` is absent from
the JSON-LD.

Testimonials must be collected independently for the catering business. Never
reuse restaurant/QSR reviews as catering trust proof (Sec. 12, 2026-09-09).

## Trust signals that ARE published

Only what the client confirmed: service area, minimum guest count, cuisines,
facilities, on-site support, immediate response on WhatsApp and phone, and the
per-person quotation process. No founding year, no years-of-experience figure,
no event count, no awards, no FSSAI badge, no ratings.
