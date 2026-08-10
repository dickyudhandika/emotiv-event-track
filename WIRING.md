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

Live: `nav 2, hero 2, applications 1, pathway 10, platform 1, product 16, news 4, footer 2, footernav 42` = **79 tracked elements**.

| Section | Export | Event | Planted on | Labels |
|---|---|---|---|---|
| `applications` | `trackApplications` | `cta_click` | accordion **button only** (not card root) | Access Research Hub / Unlock Consumer Insights / Start Your Wellness Journey / Start Building |
| `pathway` | `trackPathway` | `cta_click` | card root **and** inner link (2 zones, distinct clicks) | card title + CTA text |
| `platform` | `trackPlatform` | `cta_click` | "Operating System for the Brain" → Start Building | Start Building |
| `product` | `trackProduct` | `cta_click` | product card **component root** (slideshow) | Epoc X / MN8 / Flex 2.0 / Insight (auto-capture, badge-prefixed) |
| `news` | `trackNews` | `content_click` | article cards + "Read latest news" | article titles |

### Plant-point notes

- **`applications`** — accordion: plant on the **button** only. Card root click (to expand) is intentionally NOT tracked. 1 element live.
- **`product`** — slideshow: plant on the **card component root**, NOT the slideshow wrapper (wrapper doesn't reach card `<a>`s). Label auto-captured from card text → `Best sellerEpoc X14-Channel…` (distinct, badge-prefixed). Clean `Epoc X` needs explicit per-instance label.
- **`pathway`** — 5 cards × (root + link) = 10. `closest()` resolves to one element per physical click, no double-fire. Two distinct click zones.
- **`footernav` 42** — kept per-link intentionally (want footer click data).

### Framer wiring checklist (if re-verified)

1. `templates/umami.tsx` → Code Overrides, paste current file.
2. Per section, select element → Overrides → pick matching export.
3. Publish.
4. Console spy: `window._spy=[]; const _t=window.umami.track; window.umami.track=(n,p)=>(_spy.push({n,p}),_t(n,p));` → click → check `{ n, p: { section, label } }`.

### Changelog

- 2026-08-10: Homepage wired. Fixed product label (`"Product"` → distinct), platform section split from pathway, applications button-only, global listener dedupe deployed.
