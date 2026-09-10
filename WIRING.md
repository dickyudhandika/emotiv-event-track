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

- 2026-09-10: **epoc-x A/B test live.** Snippet `obcX5y7mC` retagged to `epocx-control`/`epocx-variant-b` (routeId map), scoped `^\/epoc-x\/?$`. New companion snippet "site baseline tag" injects script.js `site-baseline` on all other pages — `obcX5y7mC` was the site's ONLY script.js injector, so scoping it without the baseline killed tracking site-wide (homepage/insight scriptCount 0 during the gap). Verified: both epocx variants script ×1 correct tag; homepage/insight script ×1 `site-baseline`; homepage CTA click-chain intact. Note: pages outside `/` and `/epoc-x` were tagged `homepage-control` (the old fallback) from 2026-08-11 — usable as pageview log only, not per-page attribution.
- 2026-09-09: **A/B test concluded — control won.** Variant B route no longer served; `pages/homepage.md` updated to control-only, history moved here. Snippet `obcX5y7mC` retained (tags all homepage sessions `homepage-control`).
- 2026-08-11: A/B variant audit. Both variants verified. Fixes applied: platform CTA `trackPathway` → `trackPlatform`; footer "Academic Research" `trackFooter` added. Accordion cards 2-4 confirmed tracked (shared component). Product slideshow labels accepted as-is (badge-prefixed). Variant B hero carousel adds +4 `product` elements.
- 2026-08-10: Homepage wired. Fixed product label (`"Product"` → distinct), platform section split from pathway, applications button-only, global listener dedupe deployed.

**A/B diff (historical — Variant B retired):** Variant A (`augiA20Il`) 76 events; Variant B (`J4y1ztAFM`) 80 events = +4 (hero carousel "See X" product buttons). Control vs variant comparison: nav 2/2, hero 2/2, product 16/20, applications 1/1, pathway 5/5, platform 1/1, news 4/4, footer 3/3, footernav 42/42.
