# Insight `/insight` — Event Coverage

Status: 🟡 **planned** — live audit 2026-09-17; hero + sub-nav + accessories untracked, globals live.

Current page traffic: 90d pageviews 2,363 (Umami, website `338c5f5a`).

| # | Value | Role | Where on page | Example CTAs | Event | Status |
|---|---|---|---|---|---|---|
| 1 | `nav` | global navigation (shared comp) | header | Shop Now | `cta_click` | ✅ live |
| 2 | `productnav` | product sub-nav anchors | sticky sub-nav (9-10%) | Overview, Tech Specs, Features | `cta_click` + `product=insight` | ❌ wire `trackProductNavInsight` |
| 3 | `hero` | first fold pre-order CTA | hero section (10-12%) | Pre-Order (×6: 2 collapsed + 4 with campaign=hero) | `cta_click` + `product=insight` | ❌ wire `trackHeroInsight` |
| 4 | `productnav` | "Learn more" anchor | hero/features (13%) | Learn more (×2) | `cta_click` + `product=insight` | ❌ wire `trackProductNavInsight` |
| 5 | `casestudies` | case study cards (3) | "Deployment-Ready EEG" row (26-29%) | Scientific Shopping (YSL), brain-drone race, Handi'Arcade BCI controllers | `content_click` (no product — not product-specific) | ❌ wire `trackCaseStudies` |
| 6 | `accessories` | accessory cross-sell cards (2) | "More Accessories" (65-68%) | Insight Charging Cable, Insight Sensor Tips | `cta_click` + `product=insight` | ❌ wire `trackAccessoriesInsight` |
| 7 | `accessoriesall` | accessories index CTA | bottom of page (73%) | See All Accessories (×2) | `cta_click` + `product=insight` | ❌ wire `trackAccessoriesAllInsight` |
| 8 | `footer` | footer band CTAs (shared) | footer | User & Product Research | `cta_click` | ✅ live |
| 9 | `footernav` | footer link columns (shared) | footer | Academic Research, Epoc X | `content_click` | ✅ live |
| 10 | `snackbar` | floating promo banner (GLOBAL — no product) | bottom overlay | Pre-Order (×5, campaign=snackbar) | `cta_click` | ✅ live |

Notes: hero carries **6** Pre-Order instances (2 collapsed desktop/mobile pair + 4 with `utm_campaign=hero`). The plan's "1 hero button" undercounts by 5×. "See All Accessories" (×2) exists → `trackAccessoriesAllInsight` (plan called this out as a needed new export — confirmed). `Enterprise Solutions` (21%), `For Developers & Hobbyists`, `For Researchers & Educators` are audience-pathway links with no sub-nav role; **out of scope** (they are not this page's sub-nav and not conversion) — flagging rather than silently planting. `license` (×2, 40%) → `./emotivpro` is cross-sell; not wired in this pass. `Go to the user manual` (×2) + `Quick Start Guide` (×2) are content downloads; not wired in this pass.

Wiring steps:
1. Sub-nav anchors (Overview, Tech Specs, Features) → Overrides → `trackProductNavInsight`.
2. Hero "Pre-Order" (×6, all breakpoints) → Overrides → `trackHeroInsight`.
3. "Learn more" (×2) → Overrides → `trackProductNavInsight`.
4. 3 case study cards → Overrides → `trackCaseStudies` (plain, no product).
5. 2 accessory cards → Overrides → `trackAccessoriesInsight`.
6. "See All Accessories" (×2) → Overrides → `trackAccessoriesAllInsight`.
7. Publish.
8. Verify sections: `curl -sL "https://www.emotiv.com/insight?v=$(date +%s)" | grep -oE 'data-umami-event-section="[^"]*"' | sort | uniq -c`
   Expected page-local additions: `hero` ≥6, `productnav` ≥5, `casestudies` ≥3, `accessories` ≥2, `accessoriesall` ≥2.
9. Verify product: `curl -sL "https://www.emotiv.com/insight?v=$(date +%s)" | grep -oE 'data-umami-event-product="[^"]*"' | sort | uniq -c`
   Expected: `insight` only (case studies carry no product).
