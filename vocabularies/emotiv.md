# Vocabulary: EMOTIV

Site: https://www.emotiv.com
Updated: 2026-09-17
Section values: 27 (comparison, accessoriesall, crosssell, related added)
Product values: 11

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
| 10 | `productnav` | product sub-nav — **TOP navigation only** | product pages | Overview, Case studies, Tech Specs, Buy | `cta_click` |
| 11 | `features` | spec feature grid | product pages | feature card clicks | `cta_click` |
| 12 | `casestudies` | case study cards | product pages | See case study ×3, card links | `content_click` (+ `product` on product pages) |
| 13 | `testimonials` | researcher quotes | product pages | Validation Studies | `cta_click` |
| 14 | `leadmagnet` | whitepaper download + form | product pages | Download whitepaper | `form_submit` |
| 15 | `specs` | specifications accordion / table | product pages, comparison | Specifications; any click in static spec section | `content_click` (static table) / `cta_click` (interactive) — see note |
| 16 | `usecases` | solution use-case cards | solution pages (enterprise, academic, developer) | Customer Experiences, Workplace Wellness | `cta_click` |
| 17 | `gettingstarted` | developer onboarding 3-step | /developer | Create an Emotiv account, Register your app | `cta_click` |
| 18 | `tiers` | developer partner tiers | /developer | Register, Contact us | `cta_click` |
| 19 | `community` | developer Learn & Connect | /developer | Explore, Go to Github | `content_click` |
| 20 | `download` | software download links | emotivpro, developer | App Store, Download | `cta_click` |
| 21 | `footernav` | footer link columns | all | Academic Research, Epoc X, Knowledge Base | `content_click` |
| 22 | `snackbar` | floating promo banner | all | MN8 bundle promo | `cta_click` |
| 23 | `accessories` | accessory cross-sell cards | product pages (epoc-x, insight, …) | accessory card clicks | `cta_click` |
| 24 | `comparison` | comparison page CTA | product pages | Show full comparison | `cta_click` |
| 25 | `accessoriesall` | accessories index CTA | product pages | See all accessories | `cta_click` |
| 26 | `crosssell` | link to a **different** Emotiv product | product pages (body) | Buy now → Epoc X, Learn about EmotivPRO, Get Pricing | `cta_click` (buy) / `content_click` (learn) |
| 27 | `related` | in-body link referring **no other product** | product pages (body) | Learn More About Performance Metrics, Register, Node-RED, contact us | `content_click` |

## Value split — `productnav` / `crosssell` / `related` (2026-09-17, rev 4)

**The problem this fixes:** before rev 4, `productnav` was a junk drawer. On `/emotiv-bci` it carried the top sub-nav anchors *and* hardware cross-sell *and* Performance Metrics *and* the Node-RED link *and* developer links — 5 different roles in one value, so "productnav" meant "section anchors" on one page and "any link that leaves" on another. Cross-page comparison was already broken.

**Href test — mechanical, no judgment call:**

| Test | Value |
|---|---|
| href is `#anchor` or `./<same-page>#anchor`, and sits in the TOP sub-nav region | `productnav` |
| href is a different Emotiv product's page or its shop URL | `crosssell` |
| href is anything else in the body (docs, toolkit, solution page, support) | `related` |
| href is this page's OWN shop URL / own add-on / own anchors in body | **unchanged** — `hero` / `download` / `accessories` |

**Same-product destinations are NOT cross-sell.** `brainwear.app`'s "Get Brainwear" → `shop.emotiv.com/mn8` stays `hero` (it is brainwear's own product). BCI-OSC "Buy now" → `shop.emotiv.com/bci-osc` stays `hero` (this page's own add-on). Without that clause the rule eats its own conversion.

**Dependency links are NOT cross-sell either.** A link to a different product that is nonetheless this page's own install/primary path stays with the page's primary section. `Download EmotivBCI` → `/emotiv-launcher` stays `hero` + `product=bci`: the Launcher is how you install BCI, so the click answers "did someone want BCI", which is the page's whole purpose. `/emotiv-launcher`'s own `Download Now For Free` → `#download` stays `hero` for the same reason. If these were labelled crosssell, the primary conversion metric on both pages would read zero. **Rule: the page's own conversion funnel always outranks the destination test.**

**Two events on crosssell** (decided 2026-09-17): buy-intent → `cta_click` (`trackCrosssell<Prod>`), browse-intent → `content_click` (`trackCrosssellInfo<Prod>`). Same section value, so no vocabulary cost, but `event=cta_click + section=crosssell` yields pure buy-intent without label parsing — that split is the comparison crosssell exists for.

**Labels on crosssell:** when several buttons share text but point at different products (three `Buy now` → Epoc X / Insight / MN8), auto-capture collapses them to one string. Set an explicit `data-umami-event-label` per instance (`Buy now — Epoc X`). No `destination` prop (rejected 2026-09-16, reaffirmed 2026-09-17).

## Product vocabulary (2026-09-17, rev 4 — 11 slugs, live-audited)

`product` = WHAT the click is about (product identity). `section` = WHERE it happened. Page = free via URL path filter. Applied via per-product static exports (`track<Section><Product>`).

**Rule: product prop is for PAGE-LOCAL content only (hero, productnav, crosssell, related, accessories, download, homepage carousel). GLOBAL/shared components — nav, footer, footernav, snackbar — NEVER carry product** (they're one component across all pages; a product value would be a lie on every other page). Globals stay section-only, product answered via URL Path filter.

| # | Value | Identity | Appears on (rev 4) |
|---|---|---|---|
| 1 | `epoc_x` | EPOC X headset | hero, productnav, casestudies, specs, comparison, accessoriesall, accessories, product-section |
| 2 | `epoc_x_pro` | EPOC X PRO headset | hero, banner |
| 3 | `mn8` | MN8 ear-EEG | hero, productnav, related, crosssell, download, accessories, accessoriesall |
| 4 | `flex` | Flex 2 headset | hero, productnav, crosssell, accessories, accessoriesall |
| 5 | `insight` | Insight 5-channel headset | hero, productnav, related, crosssell, accessories, accessoriesall |
| 6 | `emotivpro` | EMOTIVPRO software | hero, productnav, related, crosssell, download, casestudies, news |
| 7 | `studio` | Emotiv Studio software | crosssell (**no productnav — page has no sub-nav**) |
| 8 | `brainviz` | Emotiv BrainViz software | hero, productnav, crosssell |
| 9 | `bci` | EmotivBCI software | hero, productnav, crosssell, related, download, casestudies, news |
| 10 | `launcher` | Emotiv Launcher software | hero, related, crosssell, download (**no productnav — page has no sub-nav**) |
| 11 | `brainwear` | Brainwear by Emotiv (brainwear.app) | hero, related, crosssell, download, news |

Rules: values match page slugs, underscored — 11 products (6 hardware + 5 software/brand). Accessories do NOT get product slugs: they fire `section=accessories` + `product=<parent>` and the auto-captured label names the item. Bundle promos map to the product, not the bundle name. Snackbar bundle promo stays section-only (global component). Software products (`studio`, `brainviz`, `bci`, `launcher`) use `section=download` for installer/app-store links, `hero`/`related` for page-local CTAs, and `crosssell` when they point at a sibling product. `brainwear` is a separate domain (brainwear.app) sharing the same Umami site ID — tracked with the same vocabulary, no shared components with emotiv.com. `/studio` and `/emotiv-launcher` genuinely have **no top sub-nav strip**, so they carry no `productnav`; `trackHeroStudio` ships unused for that reason (see `WIRING.md` changelog).

## Legacy (kept for other pages, not in count)

| Export | Value | Event | Used for |
|---|---|---|---|
| `trackPricing` | `pricing` | `cta_click` | pricing sections (emotivpro) |
| `trackHowItWorks` | `howitworks` | `cta_click` | how-it-works sections |
| `trackFaq` | `faq` | `faq_toggle` | FAQ accordions |

## Accordion cards (`applications`)

"Versatile by design" is an accordion — 4 card rows, one expanded at a time, each expanding card has a distinct CTA button. **Plant `trackApplications` (`cta_click`) on the button (`with Link` layer) only, not the card root `Container`** — planting on root risks double-fire via `closest()`.

| Card | Button (auto-captured label) |
|---|---|
| Access Research Hub | Access Research Hub |
| The End of Guessing | Unlock Consumer Insights |
| Master Your Mind | Start Your Wellness Journey |
| Build with Sentience | Start Building |

Only the expanded card shows its button, so the event fires on the open card's CTA — correct `cta_click` intent. Collapsed-card click that opens a card isn't tracked (no button yet).

## Product label variants (same `product` section)

Product identity comes from **auto-capture with Framer dedupe** — `trackProduct` injects event + section only, and the global listener derives the label from the card's deduped text (name leads the card, so `Epoc X`, `MN8`, `Flex 2.0`, `Insight` are distinct). See `RULES.md` → Labels → Framer dedupe.

If auto-capture's combined text is undesirable, set an explicit `data-umami-event-label="Epoc X"` per card instance in Framer (wins over auto-capture).

## Notes

- **Value cap raise (2026-09-17):** 27 values, past the documented ~10-20 cap in `RULES.md` rule 6. Justification, per the rule's own escape hatch ("past that you're slicing components, not regions"): `crosssell` and `related` were added to *stop* `productnav` slicing unrelated things together, not to slice finer. Before rev 4, `productnav` alone carried 5 distinct roles on `/emotiv-bci`. Net: 3 body values now describe what 1 value was conflating. Further additions still need the 3 gates + a written justification.
- Sitemap audit: 958 URLs → 8 templates (homepage, product, comparison, solution, blog index, blog articles, neuroscience hub, knowledge base, legal). Blog/neuroscience/KB/legal reuse `hero`/`news`/`content`/`footer` — no new values.
- `gettingstarted`/`tiers`/`community` kept separate — team compares them against each other.
- Exports live in `templates/umami.tsx` (94 exports total).

`specs` nuance (2026-09-11): on epoc-x the `specs` section = a container with 4 sub-blocks — spec table, What's-in-the-Box, Manuals (User Manual + Quick Start Guide links), Validation Studies. `trackSpecsEpocX` stamped `content_click`/`specs`/`epoc_x` on all 8 (4 blocks × desktop/mobile), so **any click in the whole region** — including the manual-download and validation-study CTAs — reports under `specs`. That's a conscious choice (option A, decided 2026-09-11): broad engagement value, not per-action. If manual/validation clicks ever need separating, split into own values; today specs = one region signal.

`leadmagnet` / HubSpot (2026-09-11): the whitepaper download is a **HubSpot embedded form rendered in a cross-origin iframe** — the submit button is NOT in the parent DOM, so `data-umami-event` overrides CANNOT reach it. Track via HubSpot's `onFormSubmitted` callback in the Framer Custom Code embed: `onFormSubmitted: function(){ window.umami && window.umami.track('form_submit', { section: 'leadmagnet', product: 'epoc_x' }) }`. Fires on successful submit (better than click — a click isn't a conversion).
