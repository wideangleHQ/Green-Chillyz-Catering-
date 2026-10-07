# Design, UX, Accessibility & Performance

## Design direction

> Premium Catering Brand + Hospitality + Modern Digital Experience

Avoid reading as: a generic restaurant site, a cheap local-business template, a food-delivery app, an ecommerce grocery store, or an overly corporate B2B site.

Favor: large food/event photography, elegant typography, strong whitespace, clear visual hierarchy, subtle motion, strong CTA placement, mobile-first layout.

## Official Brand Colour Palette & Tokens

| Token | CSS Variable | Hex | Intended Usage |
| :--- | :--- | :--- | :--- |
| **Brand Yellow** | `--color-brand-yellow` | `#F2C900` | Primary brand backgrounds, hero accents, highlighted sections, decorative elements |
| **Chilli Red** | `--color-chilli-red` | `#E52329` | Primary CTA buttons, badges, promotional labels, underlines, active states |
| **Chef Black** | `--color-chef-black` | `#17191A` | Primary headings, navigation, dark sections, footer, overlays |
| **Warm Ivory** | `--color-warm-ivory` | `#FFFDF5` | Main light backgrounds and spacious content sections |
| **Pure White** | `--color-pure-white` | `#FFFFFF` | Cards, forms, image surfaces, content panels |
| **Muted Charcoal** | `--color-muted-charcoal` | `#55534A` | Secondary text, captions, descriptions, muted UI elements |
| **Soft Border** | `--color-soft-border` | `#E7E2D5` | Subtle dividers, card borders, form outlines |
| **Pale Yellow** | `--color-pale-yellow` | `#FFF4B8` | Soft highlight backgrounds, selected states, subtle decorative surfaces |

### Colour Usage Rules
- **45–55%** Pure White & Warm Ivory surfaces for clean, breathable layouts.
- **20–30%** Brand Yellow & Pale Yellow across selected backgrounds and signature highlights.
- **15–20%** Chef Black & Muted Charcoal for strong typography, dark hero/footer sections, and navigation.
- **5–10%** Chilli Red for high-priority CTA buttons, active states, and required form asterisks.

## Responsive behaviour

| Element             | Desktop                 | Mobile                                                      |
| ------------------- | ----------------------- | ----------------------------------------------------------- |
| Header/nav          | Full nav visible        | Hamburger, Get-a-Quote button always visible                |
| Hero                | Side-by-side text/image | Stacked, text over image with gradient overlay              |
| Service/event cards | Grid (3–4 col)          | 1-col stack, swipeable optional                             |
| Gallery             | Masonry/grid            | Swipeable single-column, lightbox                           |
| Menus               | Tabbed multi-column     | Accordion/tabs, one section open at a time                  |
| Forms               | Multi-column            | Single column, large touch targets                          |
| WhatsApp button     | Corner floating         | Corner floating, above thumb-reach zone, never covering CTA |
| Footer              | Multi-column            | Accordion sections                                          |

Mobile is the priority surface — the audit flags mobile experience as a major current weakness.

## Accessibility

Semantic HTML, full keyboard navigation, visible focus states, WCAG-AA contrast, alt text on every image, labeled form fields with inline error messaging, touch targets ≥44px, respect `prefers-reduced-motion`, logical heading hierarchy (single H1 per page), screen-reader-tested primary flows (nav, form submission).

## Performance

Compressed images in modern formats (WebP/AVIF), responsive `srcset`, lazy loading below the fold, font-loading optimization, critical CSS for above-the-fold content, CDN for static assets, browser caching, Core Web Vitals (LCP/CLS/INP) tracked post-launch. Because this site is photography-heavy, image strategy is a first-class technical requirement, not an afterthought.
