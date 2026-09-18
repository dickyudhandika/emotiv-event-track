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
4. Verify the payload: click a tracked element → `performance.getEntriesByType('resource').filter(r=>r.name.includes('api/send')).length` ≥ 2 → assert `api/send` body `payload.website` + `payload.data`. (A `window.umami.track` console spy observes nothing — the internal click listener bypasses it.)

### Changelog / A/B log

- 2026-09-11: **epoc-x case studies + specs + comparison + accessoriesall wired.** Added `trackCaseStudiesEpocX` (`content_click`/`casestudies`/`epoc_x`, `Case Study` card root ×3), `trackSpecsEpocX` (`content_click`/`specs`/`epoc_x`, plant BOTH `spec - desktop/mobile - black` — static table, no toggles), `trackComparisonEpocX` (`cta_click`/`comparison`/`epoc_x`, Show full comparison → `/comparison`), `trackAccessoriesAllEpocX` (`cta_click`/`accessoriesall`/`epoc_x`, See all accessories → `/accessories`). `comparison` + `accessoriesall` are NEW section values (destination roles, distinct from `accessories` card clicks, no "nav" suffix to avoid colliding with top-nav `nav`). Audit found: testimonials/features skipped (no CTA), leadmagnet skipped (HubSpot iframe form — track via `onFormSubmitted` callback in Framer Custom Code, NOT an override; see vocab note).

- 2026-09-10: **epoc-x A/B test live.** Snippet `obcX5y7mC` retagged to `epocx-control`/`epocx-variant-b` (routeId map), scoped `^\/epoc-x\/?$`. New companion snippet "site baseline tag" injects script.js `site-baseline` on all other pages — `obcX5y7mC` was the site's ONLY script.js injector, so scoping it without the baseline killed tracking site-wide (homepage/insight scriptCount 0 during the gap). Verified: both epocx variants script ×1 correct tag; homepage/insight script ×1 `site-baseline`; homepage CTA click-chain intact. Note: pages outside `/` and `/epoc-x` were tagged `homepage-control` (the old fallback) from 2026-08-11 — usable as pageview log only, not per-page attribution.
- 2026-09-09: **A/B test concluded — control won.** Variant B route no longer served; `pages/homepage.md` updated to control-only, history moved here. Snippet `obcX5y7mC` retained (tags all homepage sessions `homepage-control`).
- 2026-08-11: A/B variant audit. Both variants verified. Fixes applied: platform CTA `trackPathway` → `trackPlatform`; footer "Academic Research" `trackFooter` added. Accordion cards 2-4 confirmed tracked (shared component). Product slideshow labels accepted as-is (badge-prefixed). Variant B hero carousel adds +4 `product` elements.
- 2026-08-10: Homepage wired. Fixed product label (`"Product"` → distinct), platform section split from pathway, applications button-only, global listener dedupe deployed.

**A/B diff (historical — Variant B retired):** Variant A (`augiA20Il`) 76 events; Variant B (`J4y1ztAFM`) 80 events = +4 (hero carousel "See X" product buttons). Control vs variant comparison: nav 2/2, hero 2/2, product 16/20, applications 1/1, pathway 5/5, platform 1/1, news 4/4, footer 3/3, footernav 42/42.

---

## Product pages

Per-page wiring, live-audited **2026-09-17** (positional DOM scan, nav/footer subtrees excluded), re-mapped to **rev-4 values** same day. Full element tables + per-page verification commands in `pages/<page>.md`.

**Rev-4 split:** `productnav` = the TOP sub-nav strip ONLY (the container holding both the section anchors and the nav's own button). Body links are split by href — `crosssell` = different Emotiv product, `related` = leaves the page but refers no other product.

### `/epoc-x-pro`

| Section | Export | Event | Planted on | Labels |
|---|---|---|---|---|
| `hero` | `trackHeroEpocXPro` | `cta_click` | hero reserve buttons (x2, 39%) | Reserve Yours Today |
| `banner` | `trackBannerEpocXPro` | `cta_click` | banner reserve buttons (x4, 90%) | Reserve Epoc X Pro / Reserve EPOC X PRO |

No sub-nav, cross-sell, accessories, case studies, or specs. **Recommended first wire target** (2 exports, 6 buttons, 1 destination).

### `/flex`

| Section | Export | Event | Planted on | Labels |
|---|---|---|---|---|
| `productnav` | `trackProductNavFlex` | `cta_click` | top strip — 6 destinations / 7 instances (Overview, Features, EmotivPRO, For Researchers, Tech Specs, Buy x2) | per anchor |
| `hero` | `trackHeroFlex` | `cta_click` | hero buy (x2, 10%) | Buy now |
| `crosssell` | `trackCrosssellFlex` | `cta_click` | EmotivPRO band "PRO License" x2 (45%) | PRO License |
| `crosssell` | `trackCrosssellInfoFlex` | `content_click` | EmotivPRO band "Learn about EmotivPRO" x3 (30%) | Learn about EmotivPRO |
| `accessories` | `trackAccessoriesFlex` | `cta_click` | 6 accessory cards (61-66%) — plant on card root (slideshow rule) | per card |
| `accessoriesall` | `trackAccessoriesAllFlex` | `cta_click` | See All Accessories x2 (95%) | See All Accessories |

Sub-nav `EmotivPRO` is a SAME-PAGE anchor (`./flex#...emotivpro`) so it stays `productnav`; the EmotivPRO band lower down is the cross-sell. Same word, two roles — href separates them.

### `/insight` (traffic: 90d pageviews 2,363)

| Section | Export | Event | Planted on | Labels |
|---|---|---|---|---|
| `productnav` | `trackProductNavInsight` | `cta_click` | top strip (Overview, Tech Specs, Features) + sub-nav Pre-Order x2 | per anchor |
| `hero` | `trackHeroInsight` | `cta_click` | hero Pre-Order x4 (`campaign=pre+order+hero+button`, 12%) | Pre-Order |
| `related` | `trackRelatedInsight` | `content_click` | Learn more x2 (body anchor, 13%), 3 pathway links (21%) | per link |
| `casestudies` | `trackCaseStudies` | `content_click` | 3 case study cards (26-29%) | per card |
| `crosssell` | `trackCrosssellInfoInsight` | `content_click` | "license" x2 → `./emotivpro` (40%) | license |
| `accessories` | `trackAccessoriesInsight` | `cta_click` | 2 accessory cards (65-68%) | per card |
| `accessoriesall` | `trackAccessoriesAllInsight` | `cta_click` | See All Accessories x2 (73%) | See All Accessories |

Pre-Order splits 2 (top strip) / 4 (hero) by container — the first pass read all 6 as hero.

### `/mn8`

| Section | Export | Event | Planted on | Labels |
|---|---|---|---|---|
| `productnav` | `trackProductNavMn8` | `cta_click` | top strip (Overview, Features, Tech Specs, Buy x2) | per anchor |
| `hero` | `trackHeroMn8` | `cta_click` | hero buy x2 (`campaign=hero+buy+button`, 10%) | Buy now |
| `related` | `trackRelatedMn8` | `content_click` | Learn more x2 (body anchor), Become an Emotiv Developer x3 | per link |
| `download` | `trackDownload` | `cta_click` | Emotiv store links x16 (Apple Store x2, Google Play x8, MacOS x3, Windows x3) | per store |
| `crosssell` | `trackCrosssellInfoMn8` | `content_click` | Learn more about Emotiv Play x3; Learn About EmotivPRO x2 | per link |
| `accessories` | `trackAccessoriesMn8` | `cta_click` | MN8 Sensor Pack card x3 (91%) | MN8 Sensor Pack |
| `accessoriesall` | `trackAccessoriesAllMn8` | `cta_click` | See All Accessories x2 (94%) | See All Accessories |

Optional/unwired: Mindful Garden + Hearts & Heal badges (third-party apps, `download` no product).

### `/studio`

| Section | Export | Event | Planted on | Labels |
|---|---|---|---|---|
| `crosssell` | `trackCrosssellStudio` | `cta_click` | 2 x "Get Pricing" (73% → `./epoc-x`, 75% → `./mn8`) | **explicit**: Get Pricing — Epoc X / Get Pricing — MN8 |

**No `productnav`** — no top sub-nav strip exists on this page. Both links are the page's only locals.

### `/emotivpro`

| Section | Export | Event | Planted on | Labels |
|---|---|---|---|---|
| `productnav` | `trackProductNavEmotivpro` | `cta_click` | top strip (Overview, Features, Pricing, Buy x2) | per anchor |
| `hero` | `trackHeroEmotivpro` | `cta_click` | body buy x20 (Buy now 17%, Shop now 43%) — hero + pricing, all treated as `hero` | Buy now, Shop now |
| `download` | `trackDownloadEmotivpro` | `cta_click` | 3 store destinations x8 (iOS mobile, Android mobile, iOS desktop) | App Store, Google Play |
| `related` | `trackRelatedEmotivpro` | `content_click` | Learn more x2, View licensing x1, Compare Plans/plans x4 (all body anchors) | per link |
| `crosssell` | `trackCrosssellEmotivpro` | `cta_click` | Start now, for free x3 → `./emotiv-launcher` (50%) | Start now, for free |
| `casestudies` | `trackCaseStudies` | `content_click` | Read study x6 (2 IEEE, 2 Frontiers, 2 internal) | Read study |
| `news` | `trackNews` | `content_click` | Read the Full Tutorial x2 (82%) | Read the Full Tutorial |

Confirmed 2026-09-16: all conversion buys = `hero` regardless of position, so hero-vs-hero stays comparable across pages. Live count 20, not 5.

### `/emotiv-brainviz`

| Section | Export | Event | Planted on | Labels |
|---|---|---|---|---|
| `productnav` | `trackProductNavBrainviz` | `cta_click` | top strip (Overview, Features, Tech Specs, Buy x2) | per anchor |
| `hero` | `trackHeroBrainviz` | `cta_click` | body buys x3 (48% Buy now x2, 63% Buy Now x1) | Buy now, Buy Now |
| `crosssell` | `trackCrosssellInfoBrainviz` | `content_click` | Try BrainViz for Free x2 → `./emotiv-launcher` (49%) | Try BrainViz for Free |

`contact us` x3 not wired (boilerplate support link inside a spec table).

### `/emotiv-bci`

Highest-risk page: ~40 page-local instances across 8 values. Per-region verification recommended.

| Section | Export | Event | Planted on | Labels |
|---|---|---|---|---|
| `productnav` | `trackProductNavBci` | `cta_click` | top strip (Overview, Features, Download EmotivBCI x2) | per anchor |
| `hero` | `trackHeroBci` | `cta_click` | body "Download EmotivBCI" x1 (10%) + BCI-OSC "Buy now" x1 (40%) | Download EmotivBCI, Buy now |
| `crosssell` | `trackCrosssellBci` | `cta_click` | hardware Buy now x3 → Epoc X / Insight / MN8 (24-28%) | **explicit** per button |
| `crosssell` | `trackCrosssellInfoBci` | `content_click` | Learn More About Epoc X/Insight/MN8 x3; Emotiv Play x3 | per link |
| `related` | `trackRelatedBci` | `content_click` | Additional Modules, Explore BCI-OSC, Performance Metrics, Node-RED, Register, Developer x3, Watch Series, gitbook Learn More | per link |
| `casestudies` | `trackCaseStudies` | `content_click` | 4 case study cards (30-37%) | per card |
| `download` | `trackDownloadBci` / `trackDownload` | `cta_click` | Launcher "Download" x1 (own install) / third-party badges x12 | Download, App Store, Google Play |
| `news` | `trackNews` | `content_click` | IFA+ Summit article (91%) | IFA+ Summit 17 |

Dep-rule in play: `Download EmotivBCI` → `./emotiv-launcher` stays `hero`/`productnav` (own install path), NOT crosssell.

### `/emotiv-launcher`

| Section | Export | Event | Planted on | Labels |
|---|---|---|---|---|
| `hero` | `trackHeroLauncher` | `cta_click` | "Download Now For Free" x2 → `#download` (25%) | Download Now For Free |
| `related` | `trackRelatedLauncher` | `content_click` | hero "Learn More" x2 → `#learn-more` (26%) | Learn More |
| `crosssell` | `trackCrosssellInfoLauncher` | `content_click` | "Learn More" x1 → `./emotivpro` (41%) | **explicit**: Learn More (EmotivPRO) |
| `download` | `trackDownloadLauncher` | `cta_click` | 4 platforms x3 breakpoints = 12 (macOS, Windows x64, Ubuntu .deb, Raspberry Pi armhf) | Download |

**No `productnav`** — this page has no top sub-nav strip. Hero anchor is the primary install action → `hero`.

### `brainwear.app` (separate domain, same Umami site `338c5f5a`)

| Section | Export | Event | Planted on | Labels |
|---|---|---|---|---|
| `hero` | `trackHeroBrainwear` | `cta_click` | Get Brainwear x3 (hero) + x2 (header) + Shop now x2 (bottom) | Get Brainwear, Shop now |
| `related` | `trackRelatedBrainwear` | `content_click` | Learn More x5, How it Works / How It Works x4, FAQ x2 | per link |
| `download` | `trackDownloadBrainwear` | `cta_click` | App Store x4 + Google Play x4 | App Store, Google Play |
| `crosssell` | `trackCrosssellInfoBrainwear` | `content_click` | Explore Play x3, Discover the Experiences x2 → `emotivplay.com` | per link |
| `news` | `trackNews` | `content_click` | 3 blog article cards | per card |

No shared globals — brainwear.app does NOT use emotiv.com's nav/footer/snackbar. Paste `umami.tsx` into its own Framer project. `Get Brainwear` → `shop.emotiv.com/mn8` stays `hero` (Brainwear IS MN8's consumer brand — same product).


### Changelog

- 2026-09-17 (later): **Rev-4 value split — `crosssell` + `related` added, `productnav` redefined.** Two new section values (25 → 27) after live DOM re-inspection showed `productnav` was carrying 5 distinct roles on `/emotiv-bci` alone. `productnav` now means **the TOP sub-nav strip only** — verified against live `/epoc-x`, where its 6 `productnav` instances are 4 anchors + 2 nav `Buy` buttons inside the same top-strip container. Body links re-bucket by href: `crosssell` (different Emotiv product) and `related` (leaves the page, refers no other product). **25 new exports** in `umami.tsx` (69 → 94): `trackCrosssell<Prod>` ×9 (buy intent, `cta_click`), `trackCrosssellInfo<Prod>` ×9 (learn intent, `content_click`), `trackRelated<Prod>` ×7. All 10 page docs re-mapped; 6 of them had rows corrected against real hrefs (hero/sub-nav splits by container, unwired cross-sell links, mis-attributed rows). Framer wiring still pending user action.

- 2026-09-17: **Full product library tracking rollout — repo side complete.** 9 emotiv.com product pages + brainwear.app live-audited 2026-09-17 (positional DOM scan, nav/footer excluded). 5 new product slugs (`studio`, `brainviz`, `bci`, `launcher`, `brainwear` → vocab total 11). **20 new exports** in `umami.tsx` (49 → 69): heroes ×5, sub-navs ×5 (incl. brainwear), downloads ×4, accessories ×2, accessoriesall ×3, banner ×1. Per-page wiring docs created for all 9 unmapped pages + brainwear. Plan-vs-live corrections recorded per page. **Framer wiring pending user action** — no page-local events live yet.

**Exports shipping unused (deliberate):** `trackHeroStudio` is unused — `/studio` has no hero conversion CTA (its only page-local CTAs are the two cross-sell links, and it has no top sub-nav either). `trackHeroLauncher` is **in use** as of rev 4: Launcher's hero anchor is the site's primary install action, and with no top sub-nav on that page it maps to `hero`. Both were specified by the rollout plan and are kept for picker parity so a future hero CTA can be wired without a code change. `trackAccessoriesAllFlex` / `trackAccessoriesAllMn8` / `trackAccessoriesAllInsight` are all three in use (contrary to an intermediate reading of the audit — `flex` and `mn8` do carry a "See All Accessories" link at 95% / 94%).
