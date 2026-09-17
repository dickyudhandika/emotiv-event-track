# EPOC X PRO `/epoc-x-pro` — Event Coverage

Status: 🟡 **planned** — live audit 2026-09-17; hero + banner untracked, globals live. No sub-nav, no accessories, no case studies, no specs.

Current page traffic: pending (Umami website `338c5f5a`).

| # | Value | Role | Where on page | Example CTAs | Event | Status |
|---|---|---|---|---|---|---|
| 1 | `nav` | global navigation (shared comp) | header | Shop Now | `cta_click` | ✅ live |
| 2 | `hero` | first fold reserve CTA | hero (39%) | Reserve Yours Today (×2) | `cta_click` + `product=epoc_x_pro` | ❌ wire `trackHeroEpocXPro` |
| 3 | `banner` | bottom reserve CTA band | banner (90%, last before footer) | Reserve Epoc X Pro (×3), Reserve EPOC X PRO (×1) | `cta_click` + `product=epoc_x_pro` | ❌ wire `trackBannerEpocXPro` |
| 4 | `footer` | footer band CTAs (shared) | footer | User & Product Research, Academic Research | `cta_click` | ✅ live |
| 5 | `footernav` | footer link columns (shared) | footer | Academic Research, Epoc X, KB | `content_click` | ✅ live |
| 6 | `snackbar` | floating promo banner (GLOBAL — no product) | bottom overlay | MN8 bundle promo | `cta_click` | ✅ live |

## Decisions

**Two roles, one value each — no rev-4 changes here.** This page has no cross-sell and no body links to re-bucket, so `productnav`/`crosssell`/`related` do not appear. It is the simplest page in the set and the recommended **first wire target** as an end-to-end test: two exports, six buttons, one destination.

**`banner` is a second conversion role.** The hero (39%) and the banner (90%) are the same destination and the same action, but they are two regions on one page — rule 4 in `RULES.md` (`hero` + `banner`) applies. Keeping them separate is what makes "first-fold reserve vs bottom-band reserve" answerable; merging them would throw that away.

**Labels differ only by case.** The banner carries `Reserve Epoc X Pro` (×3) and `Reserve EPOC X PRO` (×1) — auto-capture keeps them as-is, which is fine; the label is descriptive here, not load-bearing (one destination, one product).

## Wiring steps

1. Hero "Reserve Yours Today" (×2) → `trackHeroEpocXPro` (all breakpoints — Framer renders each label 2-4×).
2. Banner "Reserve Epoc X Pro" (×3) + "Reserve EPOC X PRO" (×1) → `trackBannerEpocXPro`.
3. Publish.

## Verification

```bash
curl -sL "https://www.emotiv.com/epoc-x-pro?v=$(date +%s)" | grep -oE 'data-umami-event-section="[^"]*"' | sort | uniq -c
```
Expected page-local additions: `hero` ≥2, `banner` ≥4.

```bash
curl -sL "https://www.emotiv.com/epoc-x-pro?v=$(date +%s)" | grep -oE 'data-umami-event-product="[^"]*"' | sort | uniq -c
```
Expected: `epoc_x_pro` with count ≥ 6 (2 hero + 4 banner).

Console spy (click a hero button):
```js
window._spy = [];
const _t = window.umami.track;
window.umami.track = (n, p) => (_spy.push({ n, p }), _t(n, p));
```
Expected: `{ n: "cta_click", p: { section: "hero", product: "epoc_x_pro", label: "Reserve Yours Today" } }`.
