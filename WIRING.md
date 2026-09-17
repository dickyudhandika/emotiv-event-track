# WIRING — What's planted & where

Per-page record of the Umami events actually wired in Framer: which override, on which element, which event, which label. This is the operational source of truth for re-verifying after redesigns and onboarding the next person. The section **vocabulary** (values → roles) lives in `vocabularies/<site>.md`; this file records the per-element **wiring**.

> Rules: override = **explicit function declaration** in `templates/umami.tsx` (factory patterns break Framer's picker). Plant point matters — slideshow → card root; accordion/CTA → button only. See `RULES.md` → Framer wiring.

## Shared everywhere

These sections are the same on every page. Not repeated per page below.

| Section | Export | Event | Planted on | Labels |
|---|---|---|---|---|
| `nav` | `trackNav` | `cta_click` | header nav links | Shop Now, Start Now |
| `hero` | `trackHero` | `cta_click` | hero CTAs | User & Product Research, Academic Research |
| `footer` | `trackFooter` | `cta_click` | footer band CTAs | User & Product Research, Academic Research |
| `footer` (newsletter) | `trackNewsletter` | `form_submit` | subscribe | Subscribe here |
| `footernav` | `trackFooterNav` | `content_click` | footer link columns | per link (Academic Research, Epoc X, …) |

Label = auto-capture + Framer dedupe (global listener). Explicit `data-umami-event-label` wins where set.

---

## Homepage `/`

**A/B test ended 2026-09-09 — control (`augiA20Il`) retained.** Variant B (`J4y1ztAFM`) retired; its route is no longer served. Homepage sessions now tagged `site-baseline` by the "site baseline tag" snippet (2026-09-10). History kept in the changelog below.

### Per-section wiring

| Section | Export | Event | Planted on | Labels |
|---|---|---|---|---|
| `applications` | `trackApplications` | `cta_click` | accordion **button only** (not card root) — shared component, all 4 cards inherit | Access Research Hub / Unlock Consumer Insights / Start Your Wellness Journey / Start Building |
| `pathway` | `trackPathway` | `cta_click` | 5 pathway card links | Unlock What Customers Really Want / Access Research Hub / Play Now / Start Your Wellness Journey / Start Building |
| `platform` | `trackPlatform` | `cta_click` | "Operating System for the Brain" → Start Building button | Start Building |
| `product` | `trackProduct` | `cta_click` | product card **component root** (slideshow) | See Epoc X / See Insight / See MN8 / See Flex 2 (slideshow; badge-prefixed) |
| `news` | `trackNews` | `content_click` | article cards + "Read latest news" | article titles |

### Plant-point notes

- **`applications`** — accordion: `trackApplications` planted on the **button layer inside the shared component**. All 4 card buttons inherit automatically. Card root click (to expand) is intentionally NOT tracked. Verified: all 4 cards fire `cta_click` / `applications` with distinct labels when expanded.
- **`product`** — slideshow: plant on the **card component root**, NOT the slideshow wrapper. Whole card is one `<a>` (no nested link on "View Specs" button — by design, avoids nested `<a>`). Label auto-captured from full card `textContent` → `Best sellerEpoc X14-Channel…` (badge-prefixed, not clean). Acceptable; clean `Epoc X` labels need explicit per-instance `data-umami-event-label` (blocked: 1 shared component, can't set per-instance) or prop-reading override (blocked: `title` is Variable not Prop).
- **`pathway`** — 5 card links, each with `trackPathway`. `closest()` resolves to one element per click, no double-fire.
- **`footernav` 42** — all footer nav column links tracked with `trackFooterNav` (`content_click`).

### Framer wiring checklist (if re-verified)

1. `templates/umami.tsx` → Code Overrides, paste current file.
2. Per section, select element → Overrides → pick matching export.
3. Publish.
4. Console spy: `window._spy=[]; const _t=window.umami.track; window.umami.track=(n,p)=>(_spy.push({n,p}),_t(n,p));` → click → check `{ n, p: { section, label } }`.

### Changelog / A/B log

- 2026-09-11: **epoc-x case studies + specs + comparison + accessoriesall wired.** Added `trackCaseStudiesEpocX` (`content_click`/`casestudies`/`epoc_x`, `Case Study` card root ×3), `trackSpecsEpocX` (`content_click`/`specs`/`epoc_x`, plant BOTH `spec - desktop/mobile - black` — static table, no toggles), `trackComparisonEpocX` (`cta_click`/`comparison`/`epoc_x`, Show full comparison → `/comparison`), `trackAccessoriesAllEpocX` (`cta_click`/`accessoriesall`/`epoc_x`, See all accessories → `/accessories`). `comparison` + `accessoriesall` are NEW section values (destination roles, distinct from `accessories` card clicks, no "nav" suffix to avoid colliding with top-nav `nav`). Audit found: testimonials/features skipped (no CTA), leadmagnet skipped (HubSpot iframe form — track via `onFormSubmitted` callback in Framer Custom Code, NOT an override; see vocab note).

- 2026-09-10: **epoc-x A/B test live.** Snippet `obcX5y7mC` retagged to `epocx-control`/`epocx-variant-b` (routeId map), scoped `^\/epoc-x\/?$`. New companion snippet "site baseline tag" injects script.js `site-baseline` on all other pages — `obcX5y7mC` was the site's ONLY script.js injector, so scoping it without the baseline killed tracking site-wide (homepage/insight scriptCount 0 during the gap). Verified: both epocx variants script ×1 correct tag; homepage/insight script ×1 `site-baseline`; homepage CTA click-chain intact. Note: pages outside `/` and `/epoc-x` were tagged `homepage-control` (the old fallback) from 2026-08-11 — usable as pageview log only, not per-page attribution.
- 2026-09-09: **A/B test concluded — control won.** Variant B route no longer served; `pages/homepage.md` updated to control-only, history moved here. Snippet `obcX5y7mC` retained (tags all homepage sessions `homepage-control`).
- 2026-08-11: A/B variant audit. Both variants verified. Fixes applied: platform CTA `trackPathway` → `trackPlatform`; footer "Academic Research" `trackFooter` added. Accordion cards 2-4 confirmed tracked (shared component). Product slideshow labels accepted as-is (badge-prefixed). Variant B hero carousel adds +4 `product` elements.
- 2026-08-10: Homepage wired. Fixed product label (`"Product"` → distinct), platform section split from pathway, applications button-only, global listener dedupe deployed.

**A/B diff (historical — Variant B retired):** Variant A (`augiA20Il`) 76 events; Variant B (`J4y1ztAFM`) 80 events = +4 (hero carousel "See X" product buttons). Control vs variant comparison: nav 2/2, hero 2/2, product 16/20, applications 1/1, pathway 5/5, platform 1/1, news 4/4, footer 3/3, footernav 42/42.

---

## Product pages

Per-page wiring, live-audited **2026-09-17** (positional DOM scan, nav/footer subtrees excluded). Full element tables + per-page verification commands in `pages/<page>.md`.

### `/epoc-x-pro`

| Section | Export | Event | Planted on | Labels |
|---|---|---|---|---|
| `hero` | `trackHeroEpocXPro` | `cta_click` | hero reserve buttons (×2, 39% through page) | Reserve Yours Today |
| `banner` | `trackBannerEpocXPro` | `cta_click` | banner reserve buttons (×4, 90% — "Designed for the Next Generation of Research") | Reserve Epoc X Pro / Reserve EPOC X PRO |

No sub-nav, accessories, case studies, or specs-section CTAs.

### `/flex`

| Section | Export | Event | Planted on | Labels |
|---|---|---|---|---|
| `hero` | `trackHeroFlex` | `cta_click` | hero buy buttons (×4: Buy ×2 + Buy now ×2) | Buy, Buy now |
| `productnav` | `trackProductNavFlex` | `cta_click` | sub-nav ×5 (Overview, Features, EmotivPRO, For Researchers, Tech Specs) + EmotivPRO cross-sell ×5 (Learn about EmotivPRO ×3, PRO License ×2) | per anchor |
| `accessories` | `trackAccessoriesFlex` | `cta_click` | 6 accessory cards (Flex Cap, Felt Sensors, Control Box 2.0, Saline Sensors, Gel Sensors, Silicone Skirt) | per card (auto-captured) |
| `accessoriesall` | `trackAccessoriesAllFlex` | `cta_click` | See All Accessories (×2, 95%) | See All Accessories |

### `/insight` (traffic: 90d pageviews 2,363)

| Section | Export | Event | Planted on | Labels |
|---|---|---|---|---|
| `hero` | `trackHeroInsight` | `cta_click` | hero pre-order (×6, all breakpoints) | Pre-Order |
| `productnav` | `trackProductNavInsight` | `cta_click` | sub-nav (Overview, Tech Specs, Features) + Learn more (×2) | per anchor |
| `casestudies` | `trackCaseStudies` | `content_click` | 3 case study cards (YSL Scientific Shopping, brain-drone race, Handi'Arcade) | per card |
| `accessories` | `trackAccessoriesInsight` | `cta_click` | 2 accessory cards (Charging Cable, Sensor Tips) | per card |
| `accessoriesall` | `trackAccessoriesAllInsight` | `cta_click` | See All Accessories (×2, 73%) | See All Accessories |

### `/mn8`

| Section | Export | Event | Planted on | Labels |
|---|---|---|---|---|
| `hero` | `trackHeroMn8` | `cta_click` | hero buy buttons (×4: Buy ×2 + Buy now ×2) | Buy, Buy now |
| `productnav` | `trackProductNavMn8` | `cta_click` | sub-nav ×3 (Overview, Features, Tech Specs) + Learn more (×2) + EmotivPRO cross-sell (×2) | per link |
| `download` | `trackDownload` | `cta_click` | store links ×16 (Apple Store ×2, Google Play ×8, MacOS ×3, Windows ×3) | Apple Store, Google Play, Download for MacOS/Windows |
| `accessories` | `trackAccessoriesMn8` | `cta_click` | MN8 Sensor Pack card (×3, 91%) | MN8 Sensor Pack |
| `accessoriesall` | `trackAccessoriesAllMn8` | `cta_click` | See All Accessories (×2, 94%) | See All Accessories |

Third-party wellness-app badges (Mindful Garden, Hearts & Heal) → out of scope, not wired.

### `/studio`

| Section | Export | Event | Planted on | Labels |
|---|---|---|---|---|
| `productnav` | `trackProductNavStudio` | `cta_click` | 2 Get Pricing cross-sell links (→ `/epoc-x`, → `/mn8`) | Get Pricing |

Sparsest page in the set — no hero buy, sub-nav, accessories, case studies, or download region.

### `/emotivpro`

| Section | Export | Event | Planted on | Labels |
|---|---|---|---|---|
| `hero` | `trackHeroEmotivpro` | `cta_click` | hero + pricing buy buttons (22 instances: Shop now ×12, Buy now ×8, Buy ×2) | Shop now, Buy now, Buy |
| `productnav` | `trackProductNavEmotivpro` | `cta_click` | sub-nav ×3 (Overview, Features, Pricing) + Learn more ×2 + View licensing + Compare Plans/Compare plans ×4 + Start now for free ×3 | per link |
| `download` | `trackDownloadEmotivpro` | `cta_click` | app store badges ×8 across 3 destinations (PRO Mobile iOS/Android, PRO Tablet) | App Store, Google Play |
| `casestudies` | `trackCaseStudies` | `content_click` | Read study ×6 (IEEE ×2, Frontiers ×2, internal ×2) | Read study |
| `news` | `trackNews` | `content_click` | Read the Full Tutorial ×2 (Lab Streaming Layer) | Read the Full Tutorial |

Decision: all conversion buys use `section=hero`, including the pricing area — keeps hero CTA conversion comparable across pages.

### `/emotiv-brainviz`

| Section | Export | Event | Planted on | Labels |
|---|---|---|---|---|
| `hero` | `trackHeroBrainviz` | `cta_click` | Buy CTAs ×5 across 3 regions (29% Buy ×2, 48% Buy now ×2, 63% Buy Now "at Play" ×1) | Buy, Buy now, Buy Now |
| `productnav` | `trackProductNavBrainviz` | `cta_click` | sub-nav ×3 (Overview, Features, Tech Specs) + Try BrainViz for Free ×2 | per link |

### `/emotiv-bci`

| Section | Export | Event | Planted on | Labels |
|---|---|---|---|---|
| `hero` | `trackHeroBci` | `cta_click` | Download EmotivBCI (×3, 10%) + BCI-OSC Buy now (40%) | Download EmotivBCI, Buy now |
| `productnav` | `trackProductNavBci` | `cta_click` | sub-nav ×3 + hardware cross-sell ×6 (Buy now ×3, Learn More ×3) + Performance Metrics + Explore BCI-OSC + Node-RED + Register + Become Developer ×3 | per link |
| `download` | `trackDownloadBci` / `trackDownload` | `cta_click` | Launcher Download (×1) / third-party badges (Mindful Garden ×3, Hearts & Heal ×3) | Download, App Store, Google Play |
| `casestudies` | `trackCaseStudies` | `content_click` | 4 case study cards (30-37%) | per card |
| `news` | `trackNews` | `content_click` | Watch Series, IFA+ Summit article, gitbook Learn More (89-92%) | per link |

Highest-risk page: ~40 page-local CTA instances across 6 regions — verify per region, not once at the end.

### `/emotiv-launcher`

| Section | Export | Event | Planted on | Labels |
|---|---|---|---|---|
| `productnav` | `trackProductNavLauncher` | `cta_click` | Download Now For Free ×2 + hero Learn More ×2 + EmotivPRO cross-sell ×1 | per link |
| `download` | `trackDownloadLauncher` | `cta_click` | 4 platform installers ×4 breakpoints (macOS, Windows x64, Ubuntu .deb, Raspberry Pi armhf) | Download |

Note: set explicit `data-umami-event-label="Learn More (EmotivPRO)"` on the cross-sell — otherwise it collides with the two hero Learn More anchors.

### `brainwear.app` (separate domain, same Umami site `338c5f5a`)

| Section | Export | Event | Planted on | Labels |
|---|---|---|---|---|
| `hero` | `trackHeroBrainwear` | `cta_click` | Get Brainwear ×5 (1%) + bottom Shop now ×2 (90%) | Get Brainwear, Shop now |
| `productnav` | `trackProductNavBrainwear` | `cta_click` | hero Learn More ×5 + body How it Works ×4 + FAQ ×2 | per link |
| `download` | `trackDownloadBrainwear` | `cta_click` | App Store ×4 + Google Play ×4 (10%) | App Store, Google Play |

Note: brainwear.app is a **separate Framer project** — it does NOT share emotiv.com's nav/footer/snackbar components, and `umami.tsx` must be pasted into its Code Overrides independently. All tracking there is page-local.

### Changelog

- 2026-09-17: **Full product library tracking rollout — repo side complete.** 9 emotiv.com product pages + brainwear.app live-audited 2026-09-17 (positional DOM scan, nav/footer excluded). 5 new product slugs (`studio`, `brainviz`, `bci`, `launcher`, `brainwear` → vocab total 11). **20 new exports** in `umami.tsx` (49 → 69): heroes ×5, sub-navs ×5 (incl. brainwear), downloads ×4, accessories ×2, accessoriesall ×3, banner ×1. Per-page wiring docs created for all 9 unmapped pages + brainwear. Plan-vs-live corrections recorded per page. **Framer wiring pending user action** — no page-local events live yet.

**Two exports ship unused (deliberate):** `trackHeroStudio` and `trackHeroLauncher`. `/studio` has no hero conversion CTA at all (its only page-local CTAs are two cross-sell links), and `/emotiv-launcher`'s hero button is an on-page `#download` anchor → `productnav`, not a purchase. Both were specified by the rollout plan; they are kept for picker parity so a future hero CTA on either page can be wired without a code change. `trackAccessoriesAllFlex` / `trackAccessoriesAllMn8` / `trackAccessoriesAllInsight` are all three in use (contrary to an intermediate reading of the audit — `flex` and `mn8` do carry a "See All Accessories" link at 95% / 94%).
