# Information Architecture & Sitemap

## Principle

Navigate by **occasion** ("I need catering for my wedding"), not by internal
service taxonomy. Keep the top nav shallow; push depth into content blocks
rather than extra pages.

## Live sitemap

```
/                 Home
/about            About Green Chillyz Catering
/services         Catering Services — all 13 confirmed services as anchored sections
/menus            Cuisines, Food Options, Packages & Customisation, Pricing approach
/gallery          Confirmed photography categories (images pending)
/faq              Confirmed answers, grouped by category
/contact          Get a Quote — enquiry form, contact details, booking process
```

Seven routes, all statically prerendered. No login, no account, no checkout.

## Routes removed on 2026-09-30

| Removed            | Reason                                                                              |
| ------------------ | ----------------------------------------------------------------------------------- |
| `/services/[slug]/`| No per-service detail was supplied. Thirteen pages would be thin content with invented copy. Services are anchored sections on `/services` instead. Sec. 12. |
| `/testimonials`    | No testimonials were supplied. An empty trust page advertises the absence of proof, and the existing skeleton cards with filled stars were a fabricated rating. Sec. 12. |

Both routes were removed before launch, so no live URL breaks.

## Page vs. section decisions

| Item                                                | Treatment                        | Rationale                                                    |
| --------------------------------------------------- | -------------------------------- | ------------------------------------------------------------ |
| Each of the 13 confirmed services                   | Anchored section on `/services`  | Service names confirmed, per-service detail not. Dedicated pages would be thin content. |
| Cuisines                                            | Section on `/menus`              | 8 confirmed cuisines plus a catch-all. No dish data exists.   |
| Food options                                        | Section on `/menus`              | 4 confirmed options — grouped naturally with cuisines         |
| Live food stations                                  | Section on `/menus` + `/services`| Confirmed only as a statement; no named stations to showcase. |
| Packages                                            | Section on `/menus`              | "Both Packages + Customized Menus" confirmed; no inclusions or prices supplied. |
| Booking process                                     | Section on `/contact`            | Supports the Quote CTA; not a destination itself.            |
| On-site facilities                                 | Homepage section + `/services`  | Confirmed, and central to the value proposition.              |
| Photography                                         | `/gallery`                       | 11 confirmed categories. No images supplied, so no lightbox. |
| Testimonials                                        | **Absent**                       | None supplied. Adding a section would fabricate proof.        |
| Blog                                                | Not planned                      | No content pipeline or approval.                               |
| Location pages                                     | **Deliberately not created**     | Keyword-only city pages would be a doorway-page pattern.      |

## Navigation rules

- Primary nav: Home, About, Services, Menus, Gallery, FAQ, Contact
- "Get a Quote" is a persistent header button, not buried in Contact
- WhatsApp is a persistent floating action, not nav-dependent
- Footer services link to `/services#slug` anchors
- No login or account nav item (out of scope, Sec. 11)
- No testimonials nav item — there is no destination
