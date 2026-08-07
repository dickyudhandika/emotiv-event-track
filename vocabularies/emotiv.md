# Vocabulary: EMOTIV

Site: https://www.emotiv.com
Updated: 2026-08-07
Values: 21

## Vocabulary

| # | Value | Role | Pages | Example CTAs | Event |
|---|---|---|---|---|---|
| 1 | `nav` | global navigation | all | Shop Now | `cta_click` |
| 2 | `hero` | first fold | all | Buy now, User & Product Research | `cta_click` |
| 3 | `banner` | promo band / 2nd hero | pages with promo | promo CTA | `cta_click` |
| 4 | `applications` | use-case cards | homepage | Access Research Hub, card clicks | `cta_click` |
| 5 | `pathway` | audience selector | homepage | Unlock What Customers Really Want, Play Now, Start Building | `cta_click` |
| 6 | `platform` | platform pitch | homepage | Start Building | `cta_click` |
| 7 | `product` | hardware/accessory grid | homepage, comparison, accessories | View Specs, Shop now, See Accessory | `cta_click` |
| 8 | `news` | article cards | homepage, blog index | Read latest news, Learn more | `content_click` |
| 9 | `footer` | footer band + newsletter | all | User & Product Research, Academic Research | `cta_click` |
| 10 | `productnav` | product sub-nav | product pages | Overview, Case studies, Tech Specs, Buy | `cta_click` |
| 11 | `features` | spec feature grid | product pages | feature card clicks | `cta_click` |
| 12 | `casestudies` | case study cards | product pages | See case study ×3 | `content_click` |
| 13 | `testimonials` | researcher quotes | product pages | Validation Studies | `cta_click` |
| 14 | `leadmagnet` | whitepaper download + form | product pages | Download whitepaper | `form_submit` |
| 15 | `specs` | specifications accordion | product pages, comparison | Specifications | `cta_click` |
| 16 | `usecases` | solution use-case cards | solution pages (enterprise, academic, developer) | Customer Experiences, Workplace Wellness | `cta_click` |
| 17 | `gettingstarted` | developer onboarding 3-step | /developer | Create an Emotiv account, Register your app | `cta_click` |
| 18 | `tiers` | developer partner tiers | /developer | Register, Contact us | `cta_click` |
| 19 | `community` | developer Learn & Connect | /developer | Explore, Go to Github | `content_click` |
| 20 | `download` | software download links | emotivpro, developer | App Store, Download | `cta_click` |
| 21 | `footernav` | footer link columns | all | Academic Research, Epoc X, Knowledge Base | `content_click` |

## Legacy (kept for other pages, not in count)

| Export | Value | Event | Used for |
|---|---|---|---|
| `trackPricing` | `pricing` | `cta_click` | pricing sections (emotivpro) |
| `trackHowItWorks` | `howitworks` | `cta_click` | how-it-works sections |
| `trackFaq` | `faq` | `faq_toggle` | FAQ accordions |

## Product label variants (same `product` section, explicit labels)

`trackProduct` reads `props.title` — label = product name per instance. Apply once on the card root inside the component definition; every instance's own `title` flows through.

| Instance title | Resulting label |
|---|---|
| `Epoc X` | Epoc X |
| `MN8` | MN8 |
| `Flex 2.0` | Flex 2.0 |
| `Insight` | Insight |

Requires the component prop convention: heading prop must be `title` (see `RULES.md`).

## Notes

- Sitemap audit: 958 URLs → 8 templates (homepage, product, comparison, solution, blog index, blog articles, neuroscience hub, knowledge base, legal). Blog/neuroscience/KB/legal reuse `hero`/`news`/`content`/`footer` — no new values.
- `gettingstarted`/`tiers`/`community` kept separate — team compares them against each other.
- Exports live in `templates/umami.tsx` (25 exports total).
