# Decision Log

Newest at the bottom. Format:

```markdown
## YYYY-MM-DD Short title

**Decision.** What was decided.
**Why.** Why.
**Instead of.** Rejected alternative.
**Costs.** What this makes harder later.
```

## 2026-09-09 Catering site is lead-generation-first, not ecommerce

**Decision.** The primary conversion is a quote enquiry, not a checkout.
**Why.** Catering is a high-value, negotiated, human-sales-driven purchase; forcing a cart/checkout model mismatches how the business actually sells.
**Instead of.** An ecommerce-style menu-and-cart flow.
**Costs.** No self-serve online purchase path; sales team remains the closing step.

## 2026-09-09 Catering brand is kept separate from restaurant/QSR messaging

**Decision.** Catering pages never reuse restaurant ratings, restaurant menus, or QSR loyalty content as trust proof.
**Why.** Buyers are evaluating an event caterer, not a quick-service diner; conflating the two undermines premium positioning.
**Instead of.** Sharing testimonials/ratings across both properties.
**Costs.** Catering-specific testimonials and photography must be collected independently.

## 2026-09-09 Unverified trust claims and pricing are not published

**Decision.** Founding year, event count, FSSAI details, and per-plate pricing stay off the live site until the client confirms them.
**Why.** The audit's figures are recommendations/estimates, not confirmed facts (Sec. 11); publishing them risks false claims.
**Instead of.** Shipping the audit's suggested badges/pricing as-is.
**Costs.** Some trust/pricing sections launch thinner than ideal until confirmations arrive.

## 2026-09-09 QSR features (games, coins, franchise, outlet dashboards) stay out of catering scope

**Decision.** These remain part of the broader GreenChillyz Group platform.
**Why.** They serve a different product and audience; importing them would blur positioning and inflate scope.
**Instead of.** A unified GreenChillyz Group super-app approach.
**Costs.** No shared login/rewards between the two properties unless a future integration is explicitly scoped.

## 2026-09-16 Enquiry form is the lead source of truth; WhatsApp is the sales channel

**Decision.** Green Chillyz Catering uses the website enquiry form as the primary lead capture mechanism. Submitted enquiries are validated and persisted in PostgreSQL via `POST /api/v1/enquiries` before anything else happens. Only after that write succeeds does the customer see a success state with a "Continue on WhatsApp" CTA carrying a pre-filled, structured enquiry message. WhatsApp is a communication channel and not the source of truth for lead records.
**Why.** Matches the documented booking process (Sec. 06) and keeps a queryable, durable lead record independent of whether the customer actually sends the WhatsApp message.
**Instead of.** Building a WhatsApp-first flow (deep-link before any backend write) or a full WhatsApp Business API integration for silent server-side sending — both rejected as premature: the former risks losing leads who close WhatsApp before sending, the latter requires infrastructure (API access, templates, approval) not justified at this stage.
**Costs.** No automated notification to the sales team yet (email/SMS) — they must check the database or wait for the customer's WhatsApp message. A duplicate-submission guard (60s window, same phone+event type+date) and a per-route rate limit (5/min) cover abuse for now; no honeypot or client-supplied idempotency key. The WhatsApp number is now client-confirmed — see 2026-09-30.

## 2026-09-30 The client's Website Information Form is the single source of truth

**Decision.** The 85-column export submitted 2026-09-25 by the Owner is authoritative. Every field is classified Confirmed / Not Provided / Needs Clarification in Sec. 16. Where the audit report (Sec. 14), the catalog proposal (Sec. 15) or earlier handbook text disagreed with it, the submission wins.
**Why.** Earlier documents contained consultant estimates, one-off proposals and two different invented phone numbers. The client supplied first-party answers and stated the data is approved for website use.
**Instead of.** Merging the submission with prior documents to fill gaps.
**Costs.** Large numbers of previously published claims had to be deleted rather than corrected — see the entries below.

## 2026-09-30 No price, dish name, testimonial, rating, credential or unconfirmed figure is published

**Decision.** Removed site-wide: ~35 invented dish names, 8 invented live stations, "500–5,000+ guests", "decades of experience", founding year, "500+ events", FSSAI references, food-safety and ingredient-sourcing claims, and a "premium" positioning the client never used. The client's "Display Pricing Only After Enquiry" is honoured — no price appears anywhere, including JSON-LD.
**Why.** Each was an assertion the client never made. Publishing them would put unverifiable claims in front of customers committing large sums, and a fabricated food-safety or rating claim carries real regulatory and reputational risk.
**Instead of.**Softening the wording to make the claims "safer", or keeping them pending confirmation.
**Costs.** Menus, gallery and trust sections are visibly thinner than a typical catering site until the client supplies a menu document, photos and testimonials.

## 2026-09-30 Testimonials page and homepage trust section removed entirely

**Decision.** `/testimonials`, its nav entry and the homepage testimonials section were deleted.
**Why.** No testimonials were supplied. The existing cards showed five filled stars above empty skeleton bars, which reads to any visitor as a verified 5-star review. An empty trust page also advertises the absence of proof. Neither is acceptable, so the section was removed rather than padded.
**Instead of.**Shipping an honest "testimonials coming soon" panel to preserve page length.
**Costs.** No social proof on the site at all. Restoring it needs real, permission-cleared catering testimonials with the customer's name and event type.

## 2026-09-30 `/services/[slug]` detail pages removed; `/services` carries all services

**Decision.** The 13 confirmed services are anchored sections on a single `/services` page. The dynamic detail route and its `generateStaticParams` were removed.
**Why.** The client supplied service names but no per-service detail. Thirteen near-identical pages would have been thin content — the exact SEO outcome the audit warns against — and the per-service descriptions could only have been invented.
**Instead of.**Generating pages from the shared service list with generic descriptions.
**Costs.** No per-service keyword targeting. If the client later supplies service-specific content (menus, formats, minimums), the detail route can be reintroduced from the same data file.

## 2026-09-30 Enquiry form collects exactly the six fields the client listed

**Decision.** Name, Phone, Event Type, Event Date, Guest Count, Event Location. `email` and `message` are no longer rendered by the form but remain accepted-and-optional on the API.
**Why.** The client answered the form-field question with exactly six fields. The API keeps the two optional fields so the existing nullable columns are not dropped and any in-flight client keeps working.
**Instead of.**Keeping an email field because lead quality usually benefits from it, or removing them from the schema for tidiness.
**Costs.** No customer email address is captured, so quotations can only be sent over WhatsApp, phone, email-to-the-customer's-own-address or in person. Worth revisiting with the client.

## 2026-09-30 Confirmed WhatsApp and email notifications are documented, not simulated

**Decision.** The client confirmed that a submission should trigger a WhatsApp notification and an email notification to `greenchillyzcatering@gmail.com`. Only the enquiry save is implemented. No notification module, stub, or success log line was added. The required env vars are listed but commented out in `.env.example`.
**Why.** No WhatsApp Business Platform credentials or SMTP provider exist, and inventing credentials or logging a fake "notification sent" would tell the client a lead was delivered when it was not. The link the customer clicks is a `wa.me` deep link — the customer must press send, and it notifies nobody server-side. The UI says "Send on WhatsApp", not "we will notify you".
**Why not now.** Adding a mailer or WhatsApp client with placeholder credentials is worse than an honest gap: it produces false confidence and a silent failure mode at exactly the moment a lead arrives.
**Costs.** The business is not auto-alerted. Staff must check the database or wait for the customer's own message. **Blocking items are logged in Sec. 11 (open questions 4 and 5).**

## 2026-09-30 Maximum guest count kept in the data layer, not published as a capacity claim

**Decision.** `SITE.guestCapacity.max = 200000` and the API's `@Max(200000)` match the submission exactly. Public pages state only "from 50 guests upwards" and invite customers to submit their guest count for confirmation.
**Why.** The submitted maximum is not credible for a single event and reads as a typo. Publishing a five-figure capacity the business cannot service is a worse error than publishing a conservative subset of the truth. Nothing submitted is lost, and nothing implausible is promised.
**Instead of.**Silently rounding the figure to a tidier number, or publishing 200,000.
**Costs.** A high maximum is not used as a marketing asset. **Blocked on clarification item 1 in Sec. 16 §9.**

## 2026-09-30 Business operating hours are not published

**Decision.** No opening hours appear on the contact page or in JSON-LD.
**Why.** The client's answer to the hours question was "Catering and Services" — not an actual schedule. The client did confirm enquiries outside business hours are accepted, which is a different fact and is not presented as hours.
**Instead of.**Publishing plausible hours such as "Mon–Sun, 9am–10pm".
**Costs.** A local-SEO signal and a customer expectation are missing. **Blocked on clarification item 3.**
