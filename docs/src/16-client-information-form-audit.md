# Client Information Form — Field-by-Field Audit

**Source (single source of truth).** `Green_Chillyz_Catering___Website_Information_Form_20260930212918.csv`
— 1 header row + 1 data row, 85 columns, submitted 2026-09-25 18:00:16 by
M Jaya Prasad Rao (Owner). The client stated the submitted data is approved
for website use.

This is the only client submission in the project. There is no second
submission, so nothing is merged and no "latest supersedes" rule applies.

This register supersedes the figures in Sec. 14 (Website Audit Report) and
Sec. 15 (Premium Catalog Proposal) wherever they disagree. Those documents are
retained as historical record only.

## Status labels

| Label                 | Meaning                                                       |
| --------------------- | ------------------------------------------------------------- |
| **Confirmed**         | Explicitly answered by the client. Safe to publish verbatim.  |
| **Not Provided**      | Field left blank. Nothing may be published in its place.      |
| **Not Applicable**    | Field does not apply to this business.                        |
| **Needs Clarification** | Answered, but garbled, implausible or ambiguous. Not published as fact. |
| **Conflict**          | A prior project document states something different.          |
| **Do Not Publish**    | Confidential or non-business.                                 |

---

## 1. Services

| Field                                              | Client answer                                                                    | Status                     |
| -------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------- |
| Types of catering services currently provided        | Wedding, Reception, Engagement, Haldi/Mehendi, Birthday Party, Anniversary, Corporate, Office/Business Events, Private Party, Outdoor, House Party, Institutional, **Any Type of Catering** | **Confirmed** |
| Free-text descriptor                                 | "Any Type of Catering and Memorable Services"                                     | **Confirmed** — used verbatim |
| Minimum guests generally catered for                 | 50                                                                                | **Confirmed** |
| Maximum guests currently handle                       | 200000                                                                             | **Needs Clarification** — see below |
| Primary service city                                 | Bhubaneswar                                                                        | **Confirmed** |
| Service area                                         | "Entire Bhubaneswar and Entire Odisha"                                            | **Confirmed** |
| Cater outside the primary area                       | Yes — "Travel Requirement, Permission, Permit."                                    | **Confirmed** |

### ⚠️ Maximum guest count of 200,000

Reproduced in the code (`SITE.guestCapacity.max`) but **deliberately not
rendered as a public capacity claim**. The public pages state only the confirmed
minimum ("from 50 guests upwards") and invite the customer to send their guest
count for confirmation.

Rationale: 200,000 guests is not a credible single-event figure for this
business and reads as a typo on a marketing site. Publishing a five-figure
capacity that the business cannot service is a worse error than publishing a
conservative subset of the truth. The figure is preserved in the data layer so
nothing the client submitted is lost, and the API validation bound is set to
200000 to match the submission. **Confirm the real maximum with the client
before it appears anywhere public.**

---

## 2. Cuisines, menus & packages

| Field                                | Client answer                                              | Status                        |
| ------------------------------------ | ---------------------------------------------------------- | ----------------------------- |
| Cuisines currently offered            | Odia, North Indian, South Indian, Bengali, Chinese, Continental, Mughlai, Italian | **Confirmed**               |
| Other cuisines                        | "Any Type as You Love to Eat"                               | **Confirmed**                 |
| Customised menus offered              | Yes                                                         | **Confirmed**                 |
| Menu-customisation constraint         | "N No of Menu Customization we can Provide Before 2 Days From Event." | **Needs Clarification** — leading token garbled; the "before 2 days" constraint is legible and is published |
| Menu categories & important details   | "All Type On Your Mind"                                     | **Confirmed** as open-ended   |
| Menu / package document upload        | *(blank)*                                                    | **Not Provided**              |
| Food options                          | Vegetarian, Non-Vegetarian, Both, Special Dietary ("All Type") | **Confirmed**                |
| Packages offered                      | "Both Packages + Customized Menus"                          | **Confirmed**                 |
| Package names, inclusions, pricing    | *(blank)*                                                    | **Not Provided**              |
| Quotation calculation basis           | "Per Person"                                                | **Confirmed**                 |
| Pricing to display publicly           | "Display Pricing Only After Enquiry"; "Price Will Be Vary As Per Customization" | **Confirmed — never publish a price** |

**Consequence:** no dish name appears anywhere on the site. The previous build
published roughly 35 invented dishes and 8 invented live stations; all removed.

---

## 3. Facilities & on-site support

Every option in this question was ticked — **Confirmed**: Buffet Setup, Food
Serving Staff, Table Setup, Plates & Cutlery, Glasses/Crockery, Live Food
Counters, Live Cooking Stations, Beverage Counter, Dessert Counter,
Decoration/Food Presentation, Event Setup, Event Coordination, Cleanup, plus
"Other: All catering event related".

| Field                | Client answer                                                                                   | Status         |
| -------------------- | ----------------------------------------------------------------------------------------------- | -------------- |
| On-site support      | "We Deal and Serve to Your Guest as Like Our Guest till to The End of The Event."                 | **Confirmed**  |
| Live food stations   | "We Can Provide all Type of Live Station as per Menu."                                             | **Confirmed**  |
| FSSAI licence number | *(blank)*                                                                                         | **Not Provided** — must not be published |
| Hygiene/ingredient claims | *(blank)*                                                                                     | **Not Provided** — the previous "Hygiene & Quality" section was removed entirely |

---

## 4. Enquiry form, quotation & booking

| Field                        | Client answer                                                                    | Status                     |
| ---------------------------- | -------------------------------------------------------------------------------- | -------------------------- |
| Form fields to collect       | Name, Phone Number, Event Type, Event Date, Guest Count, Event Location           | **Confirmed** — implemented |
| Additional form information  | *(blank)*                                                                          | **Not Provided**           |
| Contact channels customers use | Phone, WhatsApp, Website Form, Email, Social Media, Reference                   | **Confirmed**               |
| Event detail needed to quote | "Required the Detail Information About The Event."                                 | **Confirmed**               |
| When the quotation is prepared | "After Final Disussion"                                                         | **Confirmed** (sic)         |
| How the quotation is shared   | WhatsApp, Email, PDF, In Person, Any Medium                                      | **Confirmed**               |
| How a booking is confirmed    | "Pay Advance Amount for Booking Confirm after Final Discuss."                    | **Confirmed**               |
| Advance amount / percentage   | *(blank)*                                                                          | **Not Provided**           |
| Cancellation policy           | *(blank)*                                                                          | **Not Provided**           |
| Guest-count change policy     | *(blank)*                                                                          | **Not Provided**           |
| Menu-change policy            | *(blank)*                                                                          | **Not Provided**           |
| Other booking terms           | *(blank)*                                                                          | **Not Provided**           |
| FAQs                         | *(blank)*                                                                          | **Not Provided** — see Sec. 06 for the FAQ built from direct answers |

**Field-count note.** The client listed six fields. The form collects exactly
those six. `email` and `message` remain accepted-but-optional on the API for
backwards compatibility and because the nullable database columns already
exist; they are not rendered. See Sec. 12 (2026-09-30).

---

## 5. Notifications (⚠️ confirmed requirement, not implemented)

| Field                          | Client answer                                          | Status          |
| ------------------------------ | ------------------------------------------------------ | --------------- |
| What happens after submission    | "Save Enquiry + WhatsApp + Email Notification"          | **Confirmed**   |
| Notification channels           | Both WhatsApp + Email, Website/Admin Panel              | **Confirmed**   |
| Notification email address     | greenchillyzcatering@gmail.com                          | **Confirmed**   |
| Expected response time          | "Immediate"                                             | **Confirmed**   |
| Preferred communication        | WhatsApp + Phone                                        | **Confirmed**   |
| Enquiries outside business hours | Yes                                                    | **Confirmed**   |

**Only the enquiry save is implemented.** The WhatsApp and email notifications
are a confirmed client requirement that cannot be delivered with the current
infrastructure — see Sec. 06 for the precise missing integrations and Sec. 11
for the open questions. The site does not claim a notification was sent.

---

## 6. Contact details

| Field                     | Client answer                                                                  | Status                  |
| ------------------------- | ------------------------------------------------------------------------------ | ----------------------- |
| WhatsApp number           | +91 90900 22220                                                                | **Confirmed**           |
| WhatsApp Business enabled | Yes                                                                            | **Confirmed**           |
| Who handles enquiries     | Manager                                                                        | **Confirmed**           |
| All notifications to one number | Yes                                                                        | **Confirmed**           |
| Primary contact person    | M Jaya Prasad Rao — Owner                                                       | **Confirmed**           |
| Primary phone / WhatsApp  | +91 90900 22220                                                                | **Confirmed**           |
| Primary email             | greenchillyzcatering@gmail.com                                                  | **Confirmed**           |
| Address                   | Plot No- 2132/5140, Bjb Nagar Lewis Road, Bhubaneswar, Odisha 751014, IN       | **Confirmed**           |
| Google Maps link          | https://maps.app.goo.gl/JEsZjtCpf6pxHvFL7                                       | **Confirmed**           |
| Business operating hours  | "Catering and Services"                                                         | **Needs Clarification** — not published |
| Other contact persons     | *(blank)*                                                                       | **Not Provided**        |
| Other notification emails | *(blank)*                                                                       | **Not Provided**        |
| WhatsApp message content  | *(blank)*                                                                       | **Not Provided**        |

### Conflicts resolved by this submission

| Topic              | Earlier project claim                | Client's answer              | Resolution                                        |
| ------------------ | ------------------------------------ | ---------------------------- | ------------------------------------------------- |
| Email address      | `info@greenchillyzcatering.com`      | `greenchillyzcatering@gmail.com` | Client answer wins; `.com` address is not in the submission and was removed |
| Second phone number| +91-9778011110                        | Only +91 90900 22220        | Unconfirmed — removed from the footer             |
| Response time      | "within 2 hours"                      | "Immediate"                  | Client answer wins                                |
| Guest range        | "50 to 5,000+"                        | 50 minimum (200,000 max, flagged) | Only the minimum is published                |
| Group / outlets    | GreenChillyz Group, 12 QSR outlets    | Not mentioned                | Removed — the submission says nothing about a group |
| Founding year      | 2009 / "Legacy Since 1999"            | Not mentioned                | **Conflict, unresolved** — nothing published     |
| Experience         | 15+ / 25+ years                       | Not mentioned                | **Conflict, unresolved** — nothing published     |
| Event count        | "500+ events" badge                   | Not mentioned                | Not published                                     |
| FSSAI licence      | referenced in audit                   | Not mentioned                | Not published                                     |

---

## 7. Visual content & social

| Field                        | Client answer                                                   | Status                   |
| ---------------------------- | --------------------------------------------------------------- | ------------------------ |
| Visual content available      | Wedding, Reception, Haldi/Mehendi, Corporate, Birthday, Buffet Setup, Live Food Counters, Food Photography, Chefs/Kitchen, Catering Staff, Event Setup, All Type | **Confirmed** as categories only |
| Link to photos/videos         | *(blank)*                                                        | **Not Provided** — no image is published |
| Instagram                     | https://www.instagram.com/greenchillyzcatering_official/         | **Confirmed**            |
| Facebook                      | https://www.facebook.com/GreenchillyzCateringofficial/            | **Confirmed**            |
| YouTube                       | https://www.youtube.com/channel/UCa-NNE9hqPO5FMW59Qy-glg         | **Confirmed**            |
| Other website / review link   | *(blank)*                                                        | **Not Provided** — no Google Business Profile is claimed |
| Testimonials                  | *(blank)*                                                        | **Not Provided** — none published |

---

## 8. ⛔ Never publish

| Field                                    | Reason                                                    |
| ---------------------------------------- | --------------------------------------------------------- |
| Submitter's IP address                    | Personal data of the form submitter. Excluded from every page, JSON-LD and API response. |
| Founding year / years of experience       | Unresolved conflict with earlier documents                 |
| Event counts, awards                       | Never supplied                                            |
| FSSAI licence details                     | Never supplied                                             |
| Per-plate or package pricing               | Client instruction: quote only after enquiry               |
| Restaurant/QSR ratings as catering trust   | Different business (decision log, 2026-09-09)              |
| Invented dish or live-station names        | No menu document was supplied                              |
| Business operating hours                   | Answer was garbled; unconfirmed                            |

---

## 9. Outstanding clarification checklist

Send this to the client. Items 1–3 are needed before launch.

1. **Maximum guest count.** Is 200,000 correct, or was it a typo? What is the
   real maximum for a single event?
2. **Menu customisation answer.** The reply began "N No of Menu
   Customization…" — please restate the constraint in full.
3. **Business operating hours.** The reply was "Catering and Services" — the
   opening and closing hours were not captured. Needed for structured data and
   for the contact page.
4. **FSSAI licence number and expiry** — required before any food-safety claim
   or licence badge is published.
5. **Advance amount** — amount or percentage, and the payment terms.
6. **Cancellation policy**, guest-count change policy, menu-change policy.
7. **Testimonials** — any real, permission-cleared customer quotes you want
   published, with the customer's first name and event type.
8. **Event photos/videos** — a share link, or the files themselves, and
   confirmation you have permission to publish them.
9. **Google Business Profile link**, if it exists, plus any review count you
   want surfaced.
10. **Founding year and years in business** — the existing documents disagree
    (2009 vs "Legacy Since 1999"). Confirm one.
11. **Menu document or package sheet** — to publish real dishes, inclusions
    and structure.
12. **A second contact person** for enquiries, if the Manager is unavailable.
13. **Notification approval** — the WhatsApp Business Platform approval status
    and SMTP provider, so the confirmed notification workflow can be built.
    See Sec. 06.
