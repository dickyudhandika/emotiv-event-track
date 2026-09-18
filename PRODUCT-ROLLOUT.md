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

### Phase 3 mappings — live-audited 2026-09-17, re-mapped to rev-4 values

All rows below re-verified against live HTML on 2026-09-17 with a positional DOM scan (nav/footer subtrees removed), then re-bucketed the same day under the **rev-4 value split**: `productnav` = the TOP sub-nav strip only; `crosssell` = different Emotiv product; `related` = leaves the page but refers no other product. Where the earlier draft disagreed with the live page, the live value is used and the correction noted.

### `/epoc-x-pro` mapping

| Element | Export to wire | Status |
|---|---|---|
| Hero "Reserve Yours Today" ×2 (39%) | `trackHeroEpocXPro` | ❌ pending |
| Banner "Reserve Epoc X Pro" ×3 + "Reserve EPOC X PRO" ×1 (90%) | `trackBannerEpocXPro` | ❌ pending |
| No sub-nav, cross-sell, accessories, case studies, or specs CTAs | — | n/a |

### `/flex` mapping

| Element | Export to wire | Status |
|---|---|---|
| Top strip ×6 (Overview, Features, EmotivPRO, For Researchers, Tech Specs, Buy ×2) | `trackProductNavFlex` | ❌ pending |
| Hero buy ×2 (10%) | `trackHeroFlex` | ❌ pending |
| EmotivPRO "PRO License" ×2 (45%) — buy intent | `trackCrosssellFlex` | ❌ pending |
| EmotivPRO "Learn about EmotivPRO" ×3 (30%) — learn intent | `trackCrosssellInfoFlex` | ❌ pending |
| 6 accessory cards (61-66%) | `trackAccessoriesFlex` | ❌ pending |
| See All Accessories ×2 (95%) | `trackAccessoriesAllFlex` | ❌ pending |

Correction: sub-nav is 6 items incl. nav `Buy`; hero is ×2 not ×4 (the `Buy` ×2 sit in the top strip → `productnav`). EmotivPRO cross-sell splits into two exports by intent.

### `/insight` mapping

| Element | Export to wire | Status |
|---|---|---|
| Top strip (Overview, Tech Specs, Features) + sub-nav Pre-Order ×2 | `trackProductNavInsight` | ❌ pending |
| Hero Pre-Order ×4 (`campaign=pre+order+hero+button`, 12%) | `trackHeroInsight` | ❌ pending |
| Learn more ×2 (body anchor, 13%) + 3 pathway links (21%) | `trackRelatedInsight` | ❌ pending |
| 3 case study cards (26-29%) | `trackCaseStudies` (plain, no product) | ❌ pending |
| "license" ×2 → `./emotivpro` (40%) | `trackCrosssellInfoInsight` | ❌ pending |
| 2 accessory cards (65-68%) | `trackAccessoriesInsight` | ❌ pending |
| See All Accessories ×2 (73%) | `trackAccessoriesAllInsight` | ❌ pending |

Corrections: Pre-Order ×6 splits 2 (top strip) / 4 (hero) by container; `license` and the 3 pathway links move from unwired to `crosssell` / `related`.

### `/mn8` mapping

| Element | Export to wire | Status |
|---|---|---|
| Top strip (Overview, Features, Tech Specs, Buy ×2) | `trackProductNavMn8` | ❌ pending |
| Hero buy ×2 (`campaign=hero+buy+button`, 10%) | `trackHeroMn8` | ❌ pending |
| Learn more ×2 (body anchor) + Become an Emotiv Developer ×3 | `trackRelatedMn8` | ❌ pending |
| Store links ×16 (Apple Store ×2, Google Play ×8, MacOS ×3, Windows ×3) | `trackDownload` (no product) | ❌ pending |
| Emotiv Play ×3 + EmotivPRO ×2 — learn intent | `trackCrosssellInfoMn8` | ❌ pending |
| MN8 Sensor Pack card ×3 (91%) | `trackAccessoriesMn8` | ❌ pending |
| See All Accessories ×2 (94%) | `trackAccessoriesAllMn8` | ❌ pending |
| Third-party wellness apps (Mindful Garden, Hearts & Heal) | optional — `trackDownload` no product | ⏸ deferred |

Corrections: sub-nav is 4 items incl. nav `Buy`; hero is ×2 not ×4; body "Learn more" and Developer links are `related`, Emotiv Play + EmotivPRO are `crosssell`.

### `/studio` mapping

| Element | Export to wire | Status |
|---|---|---|
| 2 "Get Pricing" links (73% → `./epoc-x`, 75% → `./mn8`) + explicit label each | `trackCrosssellStudio` | ❌ pending |

Correction: both are `crosssell` (different products), not `productnav` — `/studio` has **no** top sub-nav at all.

### `/emotivpro` mapping

| Element | Export to wire | Status |
|---|---|---|
| Top strip (Overview, Features, Pricing, Buy ×2) | `trackProductNavEmotivpro` | ❌ pending |
| Body buy ×20 (Buy now ×8 at 17%, Shop now ×12 at 43%) | `trackHeroEmotivpro` | ❌ pending |
| App store badges ×8 (3 destinations) | `trackDownloadEmotivpro` | ❌ pending |
| Learn more ×2, View licensing ×1, Compare Plans/plans ×4 (body anchors) | `trackRelatedEmotivpro` | ❌ pending |
| "Start now, for free" ×3 → `./emotiv-launcher` (50%) — buy intent | `trackCrosssellEmotivpro` | ❌ pending |
| "Read study" ×6 | `trackCaseStudies` (no product) | ❌ pending |
| "Read the Full Tutorial" ×2 | `trackNews` (no product) | ❌ pending |

Corrections: the 7 body anchors move from `productnav` to `related`; `Start now, for free` moves to `crosssell`. Buy count is 20 (`Buy` ×2 are in the top strip, so `productnav`).

### `/emotiv-brainviz` mapping

| Element | Export to wire | Status |
|---|---|---|
| Top strip (Overview, Features, Tech Specs, Buy ×2) | `trackProductNavBrainviz` | ❌ pending |
| Body buy ×3 (48% Buy now ×2, 63% Buy Now ×1) | `trackHeroBrainviz` | ❌ pending |
| Try BrainViz for Free ×2 → `./emotiv-launcher` (49%) — learn intent | `trackCrosssellInfoBrainviz` | ❌ pending |

Corrections: buy ×5 splits 2 (top strip) / 3 (hero); free-trial link is `crosssell` learn-intent, not `productnav`. `contact us` ×3 not wired.

### `/emotiv-bci` mapping

| Element | Export to wire | Status |
|---|---|---|
| Top strip (Overview, Features, Download EmotivBCI ×2) | `trackProductNavBci` | ❌ pending |
| Body "Download EmotivBCI" ×1 + BCI-OSC "Buy now" ×1 | `trackHeroBci` | ❌ pending |
| Hardware Buy now ×3 → Epoc X / Insight / MN8 + explicit label each | `trackCrosssellBci` | ❌ pending |
| Learn More About Epoc X/Insight/MN8 ×3 + Emotiv Play ×3 | `trackCrosssellInfoBci` | ❌ pending |
| Additional Modules, Explore BCI-OSC, Performance Metrics, Node-RED, Register, Developer ×3, Watch Series, gitbook | `trackRelatedBci` | ❌ pending |
| 4 case study cards (30-37%) | `trackCaseStudies` (no product) | ❌ pending |
| Launcher "Download" ×1 | `trackDownloadBci` | ❌ pending |
| Third-party badges ×12 (Mindful Garden, Hearts & Heal) | `trackDownload` (no product) | ❌ pending |
| IFA+ Summit article (91%) | `trackNews` (no product) | ❌ pending |

Corrections: Download EmotivBCI is ×3 total (2 top strip / 1 body). Hardware cross-sell ×6 was one `productnav` row → split into `trackCrosssellBci` (buys) + `trackCrosssellInfoBci` (learns). Five residue roles moved to `related`. Dep-rule: `Download EmotivBCI` → Launcher stays on the page's own sections, NOT crosssell.

### `/emotiv-launcher` mapping

| Element | Export to wire | Status |
|---|---|---|
| "Download Now For Free" ×2 → `#download` (25%) | `trackHeroLauncher` | ❌ pending |
| Hero "Learn More" ×2 → `#learn-more` (26%) | `trackRelatedLauncher` | ❌ pending |
| "Learn More" ×1 → `./emotivpro` (41%) + explicit label | `trackCrosssellInfoLauncher` | ❌ pending |
| 4 platform installers ×3 breakpoints = 12 (macOS, Windows, Ubuntu, Raspberry Pi) | `trackDownloadLauncher` | ❌ pending |

Corrections: no `productnav` on this page (no top sub-nav). Hero anchor maps to `hero`; body anchor to `related`; EmotivPRO link to `crosssell`.

### `brainwear.app` mapping

| Element | Export to wire | Status |
|---|---|---|
| Get Brainwear ×5 (×3 hero + ×2 header) + bottom Shop now ×2 | `trackHeroBrainwear` | ❌ pending |
| Learn More ×5 + How it Works / How It Works ×4 + FAQ ×2 | `trackRelatedBrainwear` | ❌ pending |
| App Store ×4 + Google Play ×4 | `trackDownloadBrainwear` | ❌ pending |
| Explore Play ×3 + Discover the Experiences ×2 → `emotivplay.com` | `trackCrosssellInfoBrainwear` | ❌ pending |
| 3 blog article cards | `trackNews` (no product) | ❌ pending |
| Legal / privacy links (footer) | boilerplate — not wired | ⏸ deferred |

Corrections: no `productnav` (no sub-nav, no `<nav>` at all). `Get Brainwear` stays `hero` (Brainwear IS MN8's consumer brand — same-product clause). Article band + legal footer were missing from the first pass.

Note: brainwear.app is a separate Framer project — `umami.tsx` must be pasted into its Code Overrides separately. No shared components with emotiv.com.

## Verification (after each phase publish)

1. `curl -sL "https://www.emotiv.com/insight?v=<n>" | grep -o 'data-umami-event-product="[^"]*"' | sort | uniq -c` — attributes live.
2. Payload check on live page, click hero button:
   `performance.getEntriesByType('resource').filter(r=>r.name.includes('api/send')).length` → ≥ 2, then assert the `api/send` body carries `payload.website` + `payload.data` = `{ section: "hero", product: "insight", label: "Pre-order" }`. (Do not use a `window.umami.track` console spy — the internal click listener bypasses it and the spy stays empty while events send.)
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