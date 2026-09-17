# EPOC X PRO `/epoc-x-pro` — Event Coverage

Status: 🟡 **planned** — live audit 2026-09-17; hero + banner untracked, globals live.

Current page traffic: pending (Umami website `338c5f5a`).

| # | Value | Role | Where on page | Example CTAs | Event | Status |
|---|---|---|---|---|---|---|
| 1 | `nav` | global navigation (shared comp) | header | Shop Now | `cta_click` | ✅ live |
| 2 | `hero` | first fold reserve CTAs | hero section (39% through page) | Reserve Yours Today (×2, desktop+mobile) | `cta_click` + `product=epoc_x_pro` | ❌ wire `trackHeroEpocXPro` |
| 3 | `banner` | bottom CTA reserve buttons | banner section (90% through page, "Designed for the Next Generation of Research") | Reserve Epoc X Pro (×3), Reserve EPOC X PRO (×1) | `cta_click` + `product=epoc_x_pro` | ❌ wire `trackBannerEpocXPro` |
| 4 | `footer` | footer band CTAs (shared) | footer | User & Product Research, Academic Research | `cta_click` | ✅ live |
| 5 | `footernav` | footer link columns (shared) | footer | Academic Research, Epoc X, KB | `content_click` | ✅ live |
| 6 | `snackbar` | floating promo banner (GLOBAL — no product) | bottom overlay | MN8 bundle promo | `cta_click` | ✅ live |

Notes: page order = hero → design → improved → feature → specs → research → **banner** → footer. Two distinct CTA regions hold the *same shop destination* (`shop.emotiv.com/epoc-x-pro`) — that is exactly why `hero` and `banner` are separate values (RULES.md gate 4). Live positions from a document-order scan: 39% (hero) and 90% (banner). Instance counts: hero 2, banner 4. No sub-nav, accessories, case studies, or specs-section CTAs.

Wiring steps:
1. Hero "Reserve Yours Today" buttons (×2, desktop + mobile) → Overrides → `trackHeroEpocXPro`.
2. Banner "Reserve Epoc X Pro" (×3) + "Reserve EPOC X PRO" (×1) → Overrides → `trackBannerEpocXPro`.
3. Publish.
4. Verify sections: `curl -sL "https://www.emotiv.com/epoc-x-pro?v=$(date +%s)" | grep -oE 'data-umami-event-section="[^"]*"' | sort | uniq -c`
   Expected page-local additions: `hero` ≥2, `banner` ≥4.
5. Verify product: `curl -sL "https://www.emotiv.com/epoc-x-pro?v=$(date +%s)" | grep -oE 'data-umami-event-product="[^"]*"' | sort | uniq -c`
   Expected: `epoc_x_pro` with count ≥ 6 (2 hero + 4 banner).
