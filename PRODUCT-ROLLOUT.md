# Product Property Rollout — `data-umami-event-product`

Goal: `cta_click` gets a `product` property so the dashboard answers **"which product are people interested in"** — independent of page. Section = WHERE they clicked, product = WHAT they wanted, URL Path filter (built-in, free) = which page it happened on.

Decisions (2026-09-08):

1. Event name: **keep `cta_click`** — history + funnels survive.
2. Values: **page slugs, underscored** — `epoc_x`, `epoc_x_pro`, `mn8`, `flex`, `insight`, `emotivpro`.
3. Mechanism: **override exports** (2026-09-08 revision — user asked to upgrade `templates/umami.tsx` instead of raw attributes; overrides are picker-visible, typo-proof, one system). Static per-product exports, wired on instances.
4. Scope: **Option B — all touchpoints** (hero, sub-nav, accessories, nav dropdown, footer nav, slider, snackbar), so "Insight interest" = true total, not one page's slice.

Shared-component rule: nav/footer/sliders are ONE component on all pages. Attributes live inside the component → same value everywhere — which is CORRECT for product semantics (`product=insight` on a footer "Insight" link is true on every page). One edit covers the whole site.

---

## Phase 1 — `/insight` page (fixes the funnel gap)

Current state: hero + sub-nav **untracked entirely**; accessories/snackbar tracked but no `product`.

| # | Element (Framer layer) | Action | Attributes to set |
|---|---|---|---|
| 1 | Hero "Pre-order" button → `shop.emotiv.com/insight` (layer under `Hero - old`, all breakpoint variants) | **NEW plant** | `data-umami-event` = `cta_click`<br>`data-umami-event-section` = `hero`<br>`data-umami-event-product` = `insight` |
| 2 | Product sub-nav anchor links (`Overview`, `Features`, … → `./insight#features` etc.) | **NEW plant** | `data-umami-event` = `cta_click`<br>`data-umami-event-section` = `productnav`<br>`data-umami-event-product` = `insight` |
| 3 | Accessory card → `./insight-charging-cable` (already tracked) | rewire | `trackAccessoriesInsight` |
| 4 | Accessory card → `./insight-sensor-tips` (already tracked) | rewire | `trackAccessoriesInsight` |
| 5 | Snackbar promo → shop `mn8-studio-annual-non-commercial-bundle` (already tracked) | add prop | + `data-umami-event-product` = `mn8` ⚠️ pending decision |

## Phase 2 — shared components (one edit, all pages)

| # | Element | Action | Attributes |
|---|---|---|---|
| 6 | Nav dropdown product links: Epoc X, Epoc X PRO, MN8, Flex, Insight, EmotivPRO (currently **untracked**) | NEW plant inside nav component | `cta_click` + `section=nav` + `product=<slug>` per link |
| 7 | Footer nav product column links (Epoc X, MN8, Flex, Insight, EmotivPRO — already `content_click` `footernav`) | add prop inside footer component | + `product=<slug>` per link |
| 8 | ~~Homepage hero carousel "See X" buttons (Variant B)~~ — **RETIRED 2026-09-09** (A/B ended, control won; Variant B route no longer served) | — | see A/B log in `WIRING.md` / `pages/homepage.md` |
| 9 | Homepage product slider cards | ⚠️ **BLOCKED for attributes** — one shared component, per-instance attributes impossible. **2026-09-09 decision: homepage carries NO `product` prop (rev-2)** — skip. Per-product `trackProductSee…` exports exist if a product carousel ever ships again. |

## Phase 3 — other product pages

Repeat phase-1 rows 1–2 pattern on `/epoc-x`, `/epoc-x-pro`, `/mn8`, `/flex`, `/emotivpro` (hero buttons + sub-nav + related accessory cards).

### `/epoc-x` mapping (2026-09-08, live-HTML verified)

| Element (live HTML evidence) | Export to wire | Status today |
|---|---|---|
| Hero "Buy" + "Buy Emotiv Epoc X" (desktop, ×2 → `shop.emotiv.com/epoc-x/`) | `trackHeroEpocX` | ✅ done (2026-09-09) |
| Hero "Buy now" ×2 (mobile variants) | `trackHeroEpocX` | ✅ done (2026-09-09) |
| Sub-nav "Case studies" (`#casestudy`), "EmotivPRO" (`#emotivpro`), "Tech Specs" (`#techspec`) | `trackProductNavEpocX` | ✅ done (2026-09-09) |
| Accessory card → `./epoc-x-rubber-comfort-pads` (×2, tracked `product` section) | `trackAccessoriesEpocX` | ✅ done (2026-09-09) |
| Accessory card → `./epoc-x-usb-receiver-universal` (×2, tracked) | `trackAccessoriesEpocX` | ✅ done (2026-09-09) |
| Cross-sell cards (other products) | DEFERRED — not in /epoc-x scope (2026-09-08: focus epoc-x first) | ⏸ deferred (cross-sell out of scope) |
| Snackbar MN8 bundle (×5) | GLOBAL — stays `trackSnackbar`, no product (rev 2) | ✅ correct as-is |
| Nav/footer product links | phase 2 (shared components) | ❌ untracked — phase 2 pending |

Note: hero has BOTH desktop ("Buy"/"Buy Emotiv Epoc X") and mobile ("Buy now" ×2) button variants — wire all 4. Accessory names in Framer use `<a name="Flex Saline Sensors">` wrappers (stale name attr, harmless).

---

### Phase 3 mappings — live-audited 2026-09-17

All rows below re-verified against live HTML on 2026-09-17 with a positional DOM scan (nav/footer subtrees removed). Where the earlier draft's counts disagreed with the live page, the live value is used and the correction is noted.

### `/epoc-x-pro` mapping (2026-09-17, live-HTML verified)

| Element | Export to wire | Status |
|---|---|---|
| Hero "Reserve Yours Today" ×2 (39% through page) | `trackHeroEpocXPro` | ❌ pending |
| Banner "Reserve Epoc X Pro" ×3 + "Reserve EPOC X PRO" ×1 (90%) | `trackBannerEpocXPro` | ❌ pending |
| No sub-nav, accessories, case studies, or specs CTAs | — | n/a |

### `/flex` mapping (2026-09-17, live-HTML verified)

| Element | Export to wire | Status |
|---|---|---|
| Sub-nav ×5 (Overview, Features, EmotivPRO, For Researchers, Tech Specs) | `trackProductNavFlex` | ❌ pending |
| Hero buy ×4 (Buy ×2 + Buy now ×2) | `trackHeroFlex` | ❌ pending |
| EmotivPRO cross-sell ×5 (Learn about EmotivPRO ×3, PRO License ×2) | `trackProductNavFlex` | ❌ pending |
| 6 accessory cards | `trackAccessoriesFlex` | ❌ pending |
| See All Accessories ×2 (95%) | `trackAccessoriesAllFlex` | ❌ pending |

### `/insight` mapping (2026-09-17, live-HTML verified)

| Element | Export to wire | Status |
|---|---|---|
| Hero Pre-Order ×6 (all breakpoints) | `trackHeroInsight` | ❌ pending |
| Sub-nav ×3 (Overview, Tech Specs, Features) + Learn more ×2 | `trackProductNavInsight` | ❌ pending |
| 3 case study cards | `trackCaseStudies` (plain, no product) | ❌ pending |
| 2 accessory cards (Charging Cable, Sensor Tips) | `trackAccessoriesInsight` | ❌ pending |
| See All Accessories ×2 (73%) | `trackAccessoriesAllInsight` | ❌ pending |

### `/mn8` mapping (2026-09-17, live-HTML verified)

| Element | Export to wire | Status |
|---|---|---|
| Sub-nav ×3 (Overview, Features, Tech Specs) + Learn more ×2 | `trackProductNavMn8` | ❌ pending |
| Hero buy ×4 (Buy ×2 + Buy now ×2) | `trackHeroMn8` | ❌ pending |
| Store links ×16 (Apple Store ×2, Google Play ×8, MacOS ×3, Windows ×3) | `trackDownload` (no product) | ❌ pending |
| EmotivPRO cross-sell ×2 | `trackProductNavMn8` | ❌ pending |
| MN8 Sensor Pack card ×3 (91%) | `trackAccessoriesMn8` | ❌ pending |
| See All Accessories ×2 (94%) | `trackAccessoriesAllMn8` | ❌ pending |
| Third-party wellness apps (Mindful Garden, Hearts & Heal) | out of scope | ⏸ deferred |

### `/studio` mapping (2026-09-17, live-HTML verified)

| Element | Export to wire | Status |
|---|---|---|
| 2 "Get Pricing" cross-sell links (→ Epoc X, → MN8) | `trackProductNavStudio` | ❌ pending |

### `/emotivpro` mapping (2026-09-17, live-HTML verified)

| Element | Export to wire | Status |
|---|---|---|
| Hero + pricing buy CTAs (22 instances: Shop now ×12, Buy now ×8, Buy ×2) | `trackHeroEmotivpro` | ❌ pending |
| Sub-nav ×3 + Learn more ×2 + View licensing + Compare Plans ×4 + Start now for free ×3 | `trackProductNavEmotivpro` | ❌ pending |
| App store badges ×8 (3 destinations) | `trackDownloadEmotivpro` | ❌ pending |
| "Read study" ×6 | `trackCaseStudies` (no product) | ❌ pending |
| "Read the Full Tutorial" ×2 | `trackNews` (no product) | ❌ pending |

### `/emotiv-brainviz` mapping (2026-09-17, live-HTML verified)

| Element | Export to wire | Status |
|---|---|---|
| Buy CTAs ×5 (29% ×2, 48% ×2, 63% ×1) | `trackHeroBrainviz` | ❌ pending |
| Sub-nav ×3 (Overview, Features, Tech Specs) + Try BrainViz for Free ×2 | `trackProductNavBrainviz` | ❌ pending |

### `/emotiv-bci` mapping (2026-09-17, live-HTML verified)

| Element | Export to wire | Status |
|---|---|---|
| Download EmotivBCI ×3 (10%) + BCI-OSC Buy now (40%) | `trackHeroBci` | ❌ pending |
| Sub-nav ×3 + hardware cross-sell ×6 + Performance Metrics + Explore BCI-OSC + Node-RED + Register + Become Developer ×3 | `trackProductNavBci` | ❌ pending |
| Launcher "Download" ×1 | `trackDownloadBci` | ❌ pending |
| Third-party app badges (Mindful Garden ×3, Hearts & Heal ×3) | `trackDownload` (no product) | ❌ pending |
| 4 case study cards (30-37%) | `trackCaseStudies` (no product) | ❌ pending |
| Academy/article links (89-92%) | `trackNews` (no product) | ❌ pending |

### `/emotiv-launcher` mapping (2026-09-17, live-HTML verified)

| Element | Export to wire | Status |
|---|---|---|
| Download Now For Free ×2 + hero Learn More ×2 + EmotivPRO cross-sell ×1 | `trackProductNavLauncher` | ❌ pending |
| 4 platform installers (macOS, Windows x64, Ubuntu, Raspberry Pi) | `trackDownloadLauncher` | ❌ pending |

### `brainwear.app` mapping (2026-09-17, live-HTML verified)

| Element | Export to wire | Status |
|---|---|---|
| Get Brainwear ×5 + bottom Shop now ×2 | `trackHeroBrainwear` | ❌ pending |
| Hero Learn More ×5 + body How it Works ×4 + FAQ ×2 | `trackProductNavBrainwear` | ❌ pending |
| App Store ×4 + Google Play ×4 | `trackDownloadBrainwear` | ❌ pending |

Note: brainwear.app is a separate Framer project — `umami.tsx` must be pasted into its Code Overrides separately. No shared components with emotiv.com.

---

## Verification (after each phase publish)

1. `curl -sL "https://www.emotiv.com/insight?v=<n>" | grep -o 'data-umami-event-product="[^"]*"' | sort | uniq -c` — attributes live.
2. Console spy on live page, click hero button:
   `window._spy=[]; const _t=window.umami.track; window.umami.track=(n,p)=>(_spy.push({n,p}),_t(n,p));`
   → expect `{ n: "cta_click", p: { section: "hero", product: "insight", label: "Pre-order" } }`
3. Umami Cloud API (after 1 day of traffic):
   `GET /v1/websites/338c5f5a-72c4-4a8d-b513-5f156b91824e/event-data/values?event=cta_click&propertyName=product` → `insight` appears with counts.
4. Funnel re-check: Events → filter URL Path `/insight`, or new funnel `viewed /insight → cta_click product=insight → purchase`.

## Decisions (answered 2026-09-08)

| # | Question | Decision |
|---|---|---|
| D1 | Accessory values | REVISED 2026-09-08 (user QA): **`section=accessories` + `product=parent`**, label names the item. No accessory product slugs. ~~own slugs~~ |
| D2 | Snackbar mn8-bundle value | ✅ `mn8` |
| D3 | Slider cards | ✅ Skip for now — but note: with overrides (per-instance wiring) the shared-component blocker is GONE. Per-product `trackProduct…` exports can be wired on each slider card instance later if clean product counts are wanted. |

## New exports in templates/umami.tsx (2026-09-08, see file — accessory exports consolidated 2026-09-08)

| Group | Exports | Section | Product |
|---|---|---|---|
| Product heroes | `trackHeroInsight/EpocX/EpocXPro/Mn8/Flex/Emotivpro` | `hero` | per product |
| Product sub-navs | `trackProductNavInsight/…` ×6 | `productnav` | per product |
| Hero carousel (Var B) | `trackProductSeeEpocX/Insight/Mn8/Flex` ×4 | `product` | per product |
| Accessories (any product page) | `trackAccessories` (plain), `trackAccessoriesEpocX`, `trackAccessoriesInsight` | `accessories` | parent product (label names the item) |
| Nav/Footer/Snackbar (global) | REMOVED 2026-09-09 (rev 2) — global components never carry product | — | — |

Wire the product-variant export INSTEAD of the plain one (same section value → dashboards stay comparable).