# Scope, Conflicts & Open Questions

## Terminology used throughout this handbook

| Label                 | Meaning                                                       |
| --------------------- | ------------------------------------------------------------- |
| Confirmed fact        | Explicitly answered in the client's Website Information Form (Sec. 16) |
| Proposed requirement  | Something this project should implement                        |
| Assumption            | Working assumption, not yet confirmed                         |
| Open question         | Must be answered by the client                                |
| Future opportunity    | Intentionally out of initial scope                            |
| Not Provided          | Client left the field blank. Nothing may be published instead |

## Source hierarchy

**The client's Website Information Form export (2026-09-25) is the single
source of truth.** It supersedes this handbook, the Website Audit Report
(Sec. 14) and the Premium Catalog Proposal (Sec. 15) wherever they disagree.
Those two documents are retained as historical record only and must not be used
as a source of published copy.

## Conflicts resolved by the client submission

| Topic              | Earlier claim                                  | Client's answer                        | Resolution                                     |
| ------------------ | ---------------------------------------------- | -------------------------------------- | ---------------------------------------------- |
| Email              | `info@greenchillyzcatering.com`                | `greenchillyzcatering@gmail.com`        | Client wins. `.com` address removed.           |
| Second phone       | +91-9778011110                                 | Single number: +91 90900 22220         | Unconfirmed number removed.                    |
| Response time      | "within 2 hours"                               | "Immediate"                            | Replaced site-wide.                           |
| Guest range        | "50 to 5,000+"                                 | 50 minimum (200,000 max, flagged)      | Only the minimum is published.                |
| Group / outlets    | GreenChillyz Group, 12 QSR outlets             | Not mentioned                          | Removed.                                       |
| Pricing            | ₹300/450/600/800 packages                      | "Display Pricing Only After Enquiry"    | No price published anywhere.                  |
| Services list      | 9 services incl. invented "Live Food Stations" | 13 confirmed services                  | See Sec. 05 and `client/src/content/services.ts`. |
| Menus              | ~35 named dishes                               | "All Type On Your Mind"; no document   | All dish names removed.                        |

## Conflicts still unresolved

| Topic              | Source A        | Source B                  | Status                                     |
| ------------------ | --------------- | ------------------------- | ------------------------------------------ |
| Founding year      | 2009 (audit)    | "Legacy Since 1999" (catalog) | **Unresolved** — nothing published      |
| Experience claim   | 15+ years       | 25+ (implied by 1999)    | **Unresolved** — nothing published          |
| Catering vs. QSR   | Catering locations referenced | 12 QSR outlets (group report) | Unresolved; catering pages make no outlet claim |
| Event count        | "500+ events" badge (audit)  | Not in submission        | Not published                               |
| FSSAI licence      | Referenced in audit          | Not in submission         | Not published                               |

## Open questions blocking launch

Ordered by consequence. Full checklist in Sec. 16 §9.

| #   | Question                                                                | Why it blocks                                                                 |
| --- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| 1   | Is the maximum guest count really 200,000?                              | Implausible for a single event. Only the 50 minimum is published pending this. |
| 2   | Restate the menu-customisation constraint ("N No of Menu Customization…") | The "before 2 days" part is published; the garbled token is not.              |
| 3   | What are the business operating hours?                                  | Answer was "Catering and Services". No hours on site, contact page or JSON-LD. |
| 4   | WhatsApp Business Platform approval status + WABA ID, phone number ID, token | Confirmed notification requirement cannot be delivered without it.            |
| 5   | SMTP provider and credentials (or approval to use a transactional provider) | Confirmed email notification requirement cannot be delivered without it.       |
| 6   | FSSAI licence number and expiry                                         | No food-safety claim or badge can be published without it.                     |
| 7   | Advance amount / percentage                                             | Booking-confirmation step cannot state an amount.                              |
| 8   | Cancellation, guest-count change and menu-change policies               | Not published; customers will ask.                                            |
| 9   | Any real, permission-cleared testimonials                               | Trust section is absent until then.                                           |
| 10  | Photo/video link and publication permission                             | Gallery has no images.                                                        |
| 11  | Google Business Profile link, if one exists                             | Local SEO entity not claimed.                                                 |
| 12  | Founding year and years in business                                     | Resolves the 2009 / 1999 conflict.                                           |
| 13  | Menu or package document                                                | Would allow publishing real dishes and inclusions.                            |
| 14  | A second contact person for enquiries                                   | Single point of failure on the Manager.                                       |

## Not provided — do not substitute

These fields are blank in the submission. **Do not** fill them with a plausible
value, an industry average, a placeholder, or content from a prior document.

Menu/package document · package names and inclusions · pricing · additional form
information · WhatsApp message content · additional notification emails ·
additional contact persons · photo/video link · testimonials · Google Business
Profile link · certifications · awards · advance amount · cancellation policy ·
guest-count change policy · menu-change policy · other booking terms · FAQs ·
other review link.

**Also never published:** the submitter's IP address, restaurant/QSR ratings
catering pages, invented dish or live-station names, business operating hours
(unconfirmed), founding year, years of experience, event counts, FSSAI details.

## Out of scope

- QSR / restaurant platform features: games, coins, loyalty, franchise
  dashboards, 12-outlet structure, restaurant ordering. Not catering scope.
- Payments, checkout and online booking with card capture. The client's process
  is "pay advance amount" arranged directly after a discussion.
- An admin panel UI. Enquiries persist; no authenticated interface exists.
- Auth, accounts, and user management.
