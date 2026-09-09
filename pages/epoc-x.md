# EPOC X `/epoc-x` — Event Coverage

Status: 🟡 **planned** — live audit 2026-09-08; hero + sub-nav untracked, accessories rewire pending. Scope locked: epoc-x first (insight cross-sell deferred).

Current page traffic: 90d pageviews 9,705 (Umami, website `338c5f5a`).

| # | Value | Role | Where on page | Example CTAs | Event | Status |
|---|---|---|---|---|---|---|
| 1 | `nav` | global navigation (shared comp) | header | Shop Now, Start Now | `cta_click` | ✅ live |
| 2 | `footer` | footer band CTAs (shared) | footer | User & Product Research, Academic Research | `cta_click` | ✅ live |
| 3 | `footernav` | footer link columns (shared) | footer | Academic Research, Epoc X, KB | `content_click` | ✅ live |
| 4 | `snackbar` | floating promo banner (shared) | bottom overlay | MN8 bundle promo | `cta_click` | ✅ live |
| 5 | `hero` | first fold buy CTAs | hero (desktop ×2 + mobile ×2) | Buy, Buy Emotiv Epoc X, Buy now | `cta_click` + `product=epoc_x` | ❌ wire `trackHeroEpocX` |
| 6 | `productnav` | product sub-nav anchors | sticky sub-nav | Case studies, EmotivPRO, Tech Specs | `cta_click` + `product=epoc_x` | ❌ wire `trackProductNavEpocX` |
| 7 | `accessories` | accessory cross-sell cards | accessories row | Rubber Comfort Pads, USB Receiver Universal | `cta_click` + `product=epoc_x` | 🟡 rewire `trackAccessoriesEpocX` (tracked today as `product` section, no product prop) |
| 8 | cross-sell | other products' accessory cards | accessories row | Insight cable, sensor tips | — | ⏸ deferred |

Wiring steps: paste `templates/umami.tsx` → wire rows 5–7 → publish → live-verify. Plan: `PRODUCT-ROLLOUT.md` → `/epoc-x` mapping.
