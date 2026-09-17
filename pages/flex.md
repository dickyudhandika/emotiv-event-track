# Flex `/flex` — Event Coverage

Status: 🟡 **planned** — live audit 2026-09-17; hero + sub-nav + 6 accessories untracked, globals live.

Current page traffic: pending (Umami website `338c5f5a`).

| # | Value | Role | Where on page | Example CTAs | Event | Status |
|---|---|---|---|---|---|---|
| 1 | `nav` | global navigation (shared comp) | header | Shop Now | `cta_click` | ✅ live |
| 2 | `productnav` | product sub-nav anchors | sticky sub-nav (7-8% through page) | Overview, Features, EmotivPRO, For Researchers, Tech Specs | `cta_click` + `product=flex` | ❌ wire `trackProductNavFlex` |
| 3 | `hero` | first fold buy CTA | hero section (8-10%) | Buy (×2), Buy now (×2) | `cta_click` + `product=flex` | ❌ wire `trackHeroFlex` |
| 4 | `productnav` | EmotivPRO cross-sell | EmotivPRO band (30%, "Every purchase includes the EmotivPRO Lite software.") | Learn about EmotivPRO (×3), PRO License (×2) | `cta_click` + `product=flex` | ❌ wire `trackProductNavFlex` |
| 5 | `accessories` | accessory cross-sell cards (6) | "More Accessories" slideshow (61-66%) | Flex Cap, Flex Felt Sensors, Flex Control Box 2.0, Flex Saline Sensors, Flex Gel Sensors, Flex Silicone Skirt Pack | `cta_click` + `product=flex` | ❌ wire `trackAccessoriesFlex` on each card |
| 6 | `accessoriesall` | accessories index CTA | bottom of page (95%) | See All Accessories (×2) | `cta_click` + `product=flex` | ❌ wire `trackAccessoriesAllFlex` |
| 7 | `footer` | footer band CTAs (shared) | footer | User & Product Research | `cta_click` | ✅ live |
| 8 | `footernav` | footer link columns (shared) | footer | Academic Research, Epoc X | `content_click` | ✅ live |
| 9 | `snackbar` | floating promo banner (GLOBAL — no product) | bottom overlay | MN8 bundle promo | `cta_click` | ✅ live |

Notes: **6** accessory cards — confirmed. Sub-nav has **5** anchors (Overview, Features, EmotivPRO, For Researchers, Tech Specs); the plan listed 4 and omitted `For Researchers`. "See All Accessories" (×2, 95% through page) → `accessoriesall`, matching the `/epoc-x` precedent (`trackAccessoriesAllEpocX`). The EmotivPRO cross-sell ("Learn about EmotivPRO" ×3, "PRO License" ×2) is a CTA band rather than a sub-nav anchor, but maps to `productnav` because it is cross-sell navigation, not this page's own conversion.

Wiring steps:
1. Sub-nav anchors (Overview, Features, EmotivPRO, For Researchers, Tech Specs) → Overrides → `trackProductNavFlex`.
2. Hero "Buy" (×2) + "Buy now" (×2) → Overrides → `trackHeroFlex`.
3. "Learn about EmotivPRO" (×3) + "PRO License" (×2) → Overrides → `trackProductNavFlex`.
4. Each of the 6 accessory cards → Overrides → `trackAccessoriesFlex` (plant on card root per the slideshow rule in `RULES.md`).
5. "See All Accessories" (×2) → Overrides → `trackAccessoriesAllFlex`.
6. Publish.
7. Verify sections: `curl -sL "https://www.emotiv.com/flex?v=$(date +%s)" | grep -oE 'data-umami-event-section="[^"]*"' | sort | uniq -c`
   Expected page-local additions: `hero` ≥4, `productnav` ≥10, `accessories` ≥6, `accessoriesall` ≥2.
8. Verify product: `curl -sL "https://www.emotiv.com/flex?v=$(date +%s)" | grep -oE 'data-umami-event-product="[^"]*"' | sort | uniq -c`
   Expected: `flex` only, count ≥ 22.
