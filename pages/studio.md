# Emotiv Studio `/studio` — Event Coverage

Status: 🟡 **planned** — live audit 2026-09-17; 2 cross-sell links untracked, globals live.

Current page traffic: pending (Umami website `338c5f5a`).

| # | Value | Role | Where on page | Example CTAs | Event | Status |
|---|---|---|---|---|---|---|
| 1 | `nav` | global navigation (shared comp) | header | Shop Now | `cta_click` | ✅ live |
| 2 | `productnav` | cross-sell "Get Pricing" links | customer/feature blocks (73-75%) | Get Pricing → Epoc X, Get Pricing → MN8 | `cta_click` + `product=studio` | ❌ wire `trackProductNavStudio` |
| 3 | `footer` | footer band CTAs (shared) | footer | User & Product Research | `cta_click` | ✅ live |
| 4 | `footernav` | footer link columns (shared) | footer | Academic Research, Epoc X | `content_click` | ✅ live |
| 5 | `snackbar` | floating promo banner (GLOBAL — no product) | bottom overlay | MN8 bundle promo | `cta_click` | ✅ live |

Notes: `/studio` is the sparsest page in the set — the **only** two page-local CTAs are the "Get Pricing" links (one to `/epoc-x`, one to `/mn8`). No hero buy button, no sub-nav anchors, no accessories, no case studies, no download region — plan's description confirmed by live scan. `productnav` is used for these because they are cross-sell navigation off a software page, matching the `/flex` and `/mn8` cross-sell precedent. Page-local clicks carry `product=studio` (the page they are on), **not** the destination product — consistent with the current model where the URL Path filter supplies the destination page. See `PRODUCT-ROLLOUT.md` open question on `destination` prop if destination-side analysis is ever wanted.

Wiring steps:
1. "Get Pricing" (×2) → Overrides → `trackProductNavStudio`.
2. Publish.
3. Verify sections: `curl -sL "https://www.emotiv.com/studio?v=$(date +%s)" | grep -oE 'data-umami-event-section="[^"]*"' | sort | uniq -c`
   Expected page-local addition: `productnav` = 2.
4. Verify product: `curl -sL "https://www.emotiv.com/studio?v=$(date +%s)" | grep -oE 'data-umami-event-product="[^"]*"' | sort | uniq -c`
   Expected: `2 data-umami-event-product="studio"`.
