# Roadmap, Requirement Traceability & Launch Checklist

## Current status

Phase 1–3 code is written. The **launch-blocking gap is client information, not
code**: 14 open questions in Sec. 16 §9, of which 6 are P0.

| Area                          | State                                                                  |
| ----------------------------- | ---------------------------------------------------------------------- |
| Core pages (7 routes)         | **Done** — all statically prerendered                                 |
| Enquiry form + persistence    | **Done** — validated front and back, reference IDs, duplicate guard   |
| WhatsApp link                 | **Done** — client-confirmed number. Customer-initiated handoff        |
| SEO metadata + canonicals     | **Done**                                                                |
| JSON-LD `CateringService`     | **Done** — no ratings, hours or price claims                           |
| Business notifications       | **Not built** — blocked on credentials (Sec. 06 §4)                    |
| Menus, packages, dishes       | **Blocked** — no document supplied; no price publishable               |
| Gallery imagery              | **Blocked** — categories confirmed, images not supplied                 |
| Testimonials                  | **Blocked** — none supplied; section removed rather than faked         |
| Analytics                     | **Not implemented** — no client-approved provider                      |
| Database connectivity         | **Untested** — no Supabase credentials in this environment             |
| Migration baseline            | **Not created** — project has never been connected to a database        |

## Phase 1–2 — completed work

| Item                       | Outcome                                                                  |
| -------------------------- | ------------------------------------------------------------------------ |
| Content audit              | Sec. 16 register: every CSV field classified                              |
| Content layer              | `client/src/config/site.ts` + `client/src/content/*.ts` as single sources |
| Services                   | 13 confirmed services; enum extended additively                           |
| Cuisines / food options    | Confirmed lists; all invented dish and live-station names removed         |
| Facilities                 | 13 confirmed facilities; unsupported hygiene claims removed                |
| Enquiry form               | Aligned to the client's six fields                                        |
| Unsupported claims         | ~35 dishes, 8 stations, founding year, experience, event count, FSSAI, "premium" removed |
| Testimonials               | Page, nav entry and homepage section removed rather than faked            |
| Per-service pages          | Removed; `/services` carries all services as anchors                      |
| Contact details            | Corrected to the confirmed number, Gmail address, address and Maps link   |

## Phase 3 — SEO and performance

Metadata, canonicals, OG tags and JSON-LD are in place. Remaining before launch:
verify sitemap and `robots.txt` output, validate JSON-LD with the Rich Results
Test, and re-check Core Web Vitals once real photography lands.

## Phase 4 — growth (not approved, not funded)

Blog, CRM integration, chatbot, marketplace profiles, paid acquisition. None of
this is scheduled or committed. Note that a "chatbot" would require the
WhatsApp Business Platform credentials that are currently blocking the basic
notification requirement.

## Action plan, re-prioritised by the client submission

| Priority | Item                                                     | Blocker                                              |
| -------- | -------------------------------------------------------- | ---------------------------------------------------- |
| **P0**   | Maximum guest count confirmation (200,000?)              | Client — Sec. 16 §9 item 1                            |
| **P0**   | Menu-customisation constraint restated                   | Client — item 2                                       |
| **P0**   | Business operating hours                                 | Client — item 3 (also needed for JSON-LD and local SEO) |
| **P0**   | WhatsApp Business Platform credentials                  | Client — item 4 (blocks confirmed notifications)      |
| **P0**   | SMTP provider and credentials                            | Client — item 5 (blocks confirmed email notifications) |
| **P0**   | HTTPS / hosting                                          | Hosting                                              |
| **P0**   | FSSAI licence number and expiry                          | Client — item 6 (blocks any food-safety claim)        |
| P1       | Menu or package document                                 | Client — item 13                                      |
| P1       | Event photography + publication permission               | Client — item 8                                       |
| P1       | Testimonials, permission-cleared                         | Client — item 7                                       |
| P1       | Advance amount, cancellation, guest-count and menu-change policies | Client — items 5–8                           |
| P1       | Google Business Profile link                             | Client — item 9                                       |
| P1       | Founding year / years in business                        | Client — item 10 (resolves 2009 vs 1999)             |
| P2       | Second contact person for enquiries                      | Client — item 12                                      |
| P2       | Privacy policy (DPDP)                                    | Counsel                                              |
| P3       | Analytics approval                                       | Client                                                |

**Removed from the plan:** publishing menu prices, adding a testimonial
carousel, adding an event-count badge, adding a founding-year claim. The client
supplied no price and no proof data, and the audit's ₹300/450/600/800 figures
were never confirmed.

## Requirement traceability

| Business need          | Website requirement                | State                                              |
| ---------------------- | ---------------------------------- | -------------------------------------------------- |
| Generate leads         | Six-field enquiry form             | **Done**                                            |
| Fast contact           | WhatsApp + tap-to-call             | **Done** — confirmed number                         |
| Explain services       | All confirmed services on one page  | **Done** — 13 services as anchors                   |
| Show capability        | Cuisines, food options, facilities | **Done** — confirmed lists only                     |
| Reduce risk perception | On-site facilities section         | **Done** — replaced unsupported hygiene claims      |
| Build trust            | Proof of experience                | **Blocked** — no testimonials, no credentials      |
| Showcase real work     | Gallery                            | **Blocked** — images not supplied                   |
| Improve SEO            | Metadata, canonicals, JSON-LD      | **Done**                                            |
| Support sales          | Lead notification                  | **Not built** — blocked on credentials              |
| Local SEO              | GBP + hours                        | **Blocked** — no GBP link, no hours                 |
| Improve growth         | Content acquisition                | Not approved, not funded                            |

## Launch checklist

### Blocking — client information

- [ ] Maximum guest count confirmed (item 1)
- [ ] Menu-customisation constraint restated (item 2)
- [ ] Business operating hours confirmed (item 3)
- [ ] WhatsApp Business Platform credentials supplied (item 4)
- [ ] SMTP provider and credentials supplied (item 5)
- [ ] FSSAI licence number and expiry (item 6)

### Blocking — content

- [ ] Menu or package document supplied, or written confirmation that the
      current cuisine-level content is sufficient (item 13)
- [ ] Event photography supplied with publication permission (item 8)
- [ ] Founding year confirmed before any experience claim is made (item 10)
- [ ] Written confirmation that the published services, cuisines, facilities
      and contact details are accurate

### Blocking — technical

- [ ] Database provisioned and `pnpm db:migrate:dev` run to create the baseline
- [ ] `DATABASE_URL` and `DIRECT_URL` set server-side only
- [ ] An enquiry submitted end-to-end against the real database
- [ ] `NEXT_PUBLIC_SITE_URL` set to the production origin
- [ ] HTTPS enabled
- [ ] `CORS_ORIGINS` set to the production origin
- [ ] Sitemap and `robots.txt` output verified from the production build
- [ ] JSON-LD validated with the Rich Results Test

### Done

- [x] 7 routes build and prerender as static content
- [x] Enquiry form validated client-side and server-side
- [x] Reference ID returned and shown; 60s duplicate guard; 5/min throttle
- [x] No price, rating, hours, credential, event count or founding year published
- [x] Invented dishes, live stations and testimonials removed
- [x] Contact details match the client submission exactly
- [x] Typecheck passes on client and server
- [x] Client build and server build pass
- [x] Server tests pass (16), including DTO validation coverage
- [x] WhatsApp link uses the client-confirmed number

### Not done — do not report as complete

- [ ] Sales team confirmed receiving leads — **no notification channel is
      implemented**; the WhatsApp handoff is customer-initiated
- [ ] Analytics events firing — no provider configured
- [ ] Accessibility audit — not performed
- [ ] Core Web Vitals measured — not performed
- [ ] Database persistence verified — no credentials available

### Open, post-launch

- [ ] Privacy policy (DPDP) with counsel
- [ ] Accessibility review of the accordion and form
- [ ] Fix the pre-existing `react-hooks/set-state-in-effect` lint error in
      `RevealOnScroll.tsx` (unrelated to the content alignment)
