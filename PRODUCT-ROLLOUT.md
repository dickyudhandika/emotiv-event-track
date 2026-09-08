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
| 3 | Accessory card → `./insight-charging-cable` (section `product`, already tracked) | add prop | + `data-umami-event-product` = `insight_charging_cable` ⚠️ pending decision |
| 4 | Accessory card → `./insight-sensor-tips` (already tracked) | add prop | + `data-umami-event-product` = `insight_sensor_tips` ⚠️ pending decision |
| 5 | Snackbar promo → shop `mn8-studio-annual-non-commercial-bundle` (already tracked) | add prop | + `data-umami-event-product` = `mn8` ⚠️ pending decision |

## Phase 2 — shared components (one edit, all pages)

| # | Element | Action | Attributes |
|---|---|---|---|
| 6 | Nav dropdown product links: Epoc X, Epoc X PRO, MN8, Flex, Insight, EmotivPRO (currently **untracked**) | NEW plant inside nav component | `cta_click` + `section=nav` + `product=<slug>` per link |
| 7 | Footer nav product column links (Epoc X, MN8, Flex, Insight, EmotivPRO — already `content_click` `footernav`) | add prop inside footer component | + `product=<slug>` per link |
| 8 | Homepage hero carousel "See X" buttons (Variant B) — separate button instances | add prop per button | + `product=<slug>` |
| 9 | Homepage product slider cards | ⚠️ **BLOCKED for attributes** — one shared component, per-instance attributes impossible (same blocker as clean labels, WIRING.md). Options: (a) skip — rely on auto-capture label, (b) per-product override exports (`trackProductEpocX` …) = the 2nd mechanism we rejected, (c) split into per-product components. **Decision needed.** |

## Phase 3 — other product pages

Repeat phase-1 rows 1–2 pattern on `/epoc-x`, `/epoc-x-pro`, `/mn8`, `/flex`, `/emotivpro` (hero buttons + sub-nav + related accessory cards).

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
| D1 | Accessory values | ✅ Own slugs: `insight_charging_cable`, `insight_sensor_tips` |
| D2 | Snackbar mn8-bundle value | ✅ `mn8` |
| D3 | Slider cards | ✅ Skip for now — but note: with overrides (per-instance wiring) the shared-component blocker is GONE. Per-product `trackProduct…` exports can be wired on each slider card instance later if clean product counts are wanted. |

## New exports in templates/umami.tsx (2026-09-08, 31 added → 57 total)

| Group | Exports | Section | Product |
|---|---|---|---|
| Product heroes | `trackHeroInsight/EpocX/EpocXPro/Mn8/Flex/Emotivpro` | `hero` | per product |
| Product sub-navs | `trackProductNavInsight/…` ×6 | `productnav` | per product |
| Nav dropdown | `trackNavEpocX/…` ×6 | `nav` | per product (NEW — nav product links were untracked) |
| Footer nav | `trackFooterNavEpocX/…` ×6 | `footernav` | per product |
| Hero carousel (Var B) | `trackProductSeeEpocX/Insight/Mn8/Flex` ×4 | `product` | per product |
| /insight accessories | `trackProductInsightChargingCable`, `trackProductInsightSensorTips` | `product` | accessory slugs |
| Snackbar | `trackSnackbarMn8` | `snackbar` | `mn8` |

Wire the product-variant export INSTEAD of the plain one (same section value → dashboards stay comparable).