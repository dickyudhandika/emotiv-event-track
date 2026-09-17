# Emotiv Studio `/studio` — Event Coverage

Status: 🟡 **planned** — live audit 2026-09-17, re-mapped to rev-4 values; 2 cross-sell links untracked, globals live.

Current page traffic: pending (Umami website `338c5f5a`).

| # | Value | Role | Where on page | Example CTAs | Event | Status |
|---|---|---|---|---|---|---|
| 1 | `nav` | global navigation (shared comp) | header | Shop Now | `cta_click` | ✅ live |
| 2 | `crosssell` | "Get Pricing" links — **buy intent** | 73-75% | Get Pricing → Epoc X, Get Pricing → MN8 | `cta_click` + `product=studio` + explicit label | ❌ wire `trackCrosssellStudio` |
| 3 | `footer` | footer band CTAs (shared) | footer | User & Product Research | `cta_click` | ✅ live |
| 4 | `footernav` | footer link columns (shared) | footer | Academic Research, Epoc X | `content_click` | ✅ live |
| 5 | `snackbar` | floating promo banner (GLOBAL — no product) | bottom overlay | MN8 bundle promo | `cta_click` | ✅ live |

## Decisions

**Sparsest page in the set.** `/studio` has exactly **two** page-local links: both `Get Pricing`, at 73% and 75%, pointing at `./epoc-x` and `./mn8` respectively. Nothing else on the page leaves it.

**Both are `crosssell`, and there is no `productnav`.** `/studio` has **no top sub-nav strip** — no container matching the top-nav pattern exists in the live DOM (same situation as `/emotiv-launcher`). Under your rule, `productnav` = top navigation only, so this page simply has none. Both links point at *different* products, so the href test makes them `crosssell`.

**Buy intent.** The text is `Get Pricing` — an action toward a purchase — so `cta_click` (`trackCrosssellStudio`), not the learn-intent export.

**Labels required.** Both buttons read `Get Pricing` but go to different products; auto-capture collapses them to one string. Set `data-umami-event-label` per instance: `Get Pricing — Epoc X`, `Get Pricing — MN8`.

Page-local clicks carry `product=studio` (the page they are on), not the destination product — consistent with the model where the URL Path filter supplies the page and the explicit label carries the destination. No `destination` prop (rejected 2026-09-16, reaffirmed 2026-09-17).

## Wiring steps

1. "Get Pricing" → `/epoc-x` (73%) → `trackCrosssellStudio` + `data-umami-event-label="Get Pricing — Epoc X"`.
2. "Get Pricing" → `/mn8` (75%) → `trackCrosssellStudio` + `data-umami-event-label="Get Pricing — MN8"`.
3. Publish.

## Verification

```bash
curl -sL "https://www.emotiv.com/studio?v=$(date +%s)" | grep -oE 'data-umami-event-section="[^"]*"' | sort | uniq -c
```
Expected page-local addition: `crosssell` = 2, and **no** `productnav`.

```bash
curl -sL "https://www.emotiv.com/studio?v=$(date +%s)" | grep -oE 'data-umami-event-product="[^"]*"' | sort | uniq -c
```
Expected: `2 data-umami-event-product="studio"`.

```bash
curl -sL "https://www.emotiv.com/studio?v=$(date +%s)" | grep -oE 'data-umami-event-label="[^"]*"' | sort | uniq -c
```
Expected: `Get Pricing — Epoc X` and `Get Pricing — MN8`.
