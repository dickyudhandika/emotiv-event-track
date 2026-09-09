# Insight `/insight` — Event Coverage

Status: 🟡 **planned** — live audit 2026-09-08; hero + sub-nav untracked, product-prop rollout pending.

Current page traffic: 90d pageviews 2,363 (Umami, website `338c5f5a`).

| # | Value | Role | Where on page | Example CTAs | Event | Status |
|---|---|---|---|---|---|---|
| 1 | `nav` | global navigation (shared comp) | header | Shop Now, Start Now | `cta_click` | ✅ live |
| 2 | `footer` | footer band CTAs (shared) | footer | User & Product Research, Academic Research | `cta_click` | ✅ live |
| 3 | `footernav` | footer link columns (shared) | footer | Academic Research, Epoc X, KB | `content_click` | ✅ live |
| 4 | `snackbar` | floating promo banner (shared) | bottom overlay | MN8 bundle promo | `cta_click` | ✅ live |
| 5 | `hero` | first fold pre-order CTAs | hero | Pre-order ×2 (→ shop.emotiv.com/insight) | `cta_click` + `product=insight` | ❌ wire `trackHeroInsight` |
| 6 | `productnav` | product sub-nav anchors | sticky sub-nav | Overview, Features, Tech Specs | `cta_click` + `product=insight` | ❌ wire `trackProductNavInsight` |
| 7 | `accessories` | accessory cards | accessories row | Charging Cable, Sensor Tips | `cta_click` + `product=insight` | 🟡 rewire `trackAccessoriesInsight` (tracked today as `product` section) |

Wiring steps: same as `/epoc-x` with Insight exports. Plan: `PRODUCT-ROLLOUT.md` → Phase 1.
