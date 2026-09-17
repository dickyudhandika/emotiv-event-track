# MN8 `/mn8` — Event Coverage

Status: 🟡 **planned** — live audit 2026-09-17; hero + sub-nav + accessories untracked, globals live.

Current page traffic: pending (Umami website `338c5f5a`).

| # | Value | Role | Where on page | Example CTAs | Event | Status |
|---|---|---|---|---|---|---|
| 1 | `nav` | global navigation (shared comp) | header | Shop Now | `cta_click` | ✅ live |
| 2 | `productnav` | product sub-nav anchors | sticky sub-nav (7-8%) | Overview, Features, Tech Specs | `cta_click` + `product=mn8` | ❌ wire `trackProductNavMn8` |
| 3 | `hero` | first fold buy CTA | hero section (8-10%) | Buy (×2), Buy now (×2) | `cta_click` + `product=mn8` | ❌ wire `trackHeroMn8` |
| 4 | `productnav` | "Learn more" anchor | hero/body (10%) | Learn more (×2) | `cta_click` + `product=mn8` | ❌ wire `trackProductNavMn8` |
| 5 | `download` | app + desktop store links | "Your brain, in your pocket" / "Works on desktop too" (33-45%) | Apple Store (×2), Google Play (×8), Download for MacOS (×3), Download for Windows (×3) | `cta_click` (no product — Emotiv app, not MN8-specific) | ❌ wire `trackDownload` |
| 6 | `download` | third-party wellness apps | Mindful Garden / Hearts & Heal (54-56%) | App Store (×3), App Store (×3) | `cta_click` | ⏸ out of scope (third-party apps) |
| 7 | `productnav` | EmotivPRO cross-sell | EmotivPRO band (83%, "Every purchase includes EmotivPRO Lite software.") | Learn About EmotivPRO (×2) | `cta_click` + `product=mn8` | ❌ wire `trackProductNavMn8` |
| 8 | `accessories` | accessory card | "More Accessories" (91%) | MN8 Sensor Pack | `cta_click` + `product=mn8` | ❌ wire `trackAccessoriesMn8` |
| 9 | `accessoriesall` | accessories index CTA | bottom of page (94%) | See All Accessories (×2) | `cta_click` + `product=mn8` | ❌ wire `trackAccessoriesAllMn8` |
| 10 | `footer` | footer band CTAs (shared) | footer | User & Product Research | `cta_click` | ✅ live |
| 11 | `footernav` | footer link columns (shared) | footer | Academic Research, Epoc X | `content_click` | ✅ live |
| 12 | `snackbar` | floating promo banner (GLOBAL — no product) | bottom overlay | Buy (×2, campaign=snackbar) | `cta_click` | ✅ live |

Notes: sub-nav is **3** anchors (Overview, Features, Tech Specs) plus a separate "Learn more" anchor — the plan listed 4 sub-nav items *and* "Learn more", over-counting. "See All Accessories" (×2, 94%) → `accessoriesall`. `Become an Emotiv Developer` (×3) is shared-component navigation → stays global. `Learn more about Emotiv Play` (×3, external) is cross-sell to a separate site — not in scope for the `productnav` plant (see open question on cross-sell model).

Wiring steps:
1. Sub-nav anchors (Overview, Features, Tech Specs) + "Learn more" → Overrides → `trackProductNavMn8`.
2. Hero "Buy" (×2) + "Buy now" (×2) → Overrides → `trackHeroMn8`.
3. Store links (Apple Store, Google Play, Download for MacOS, Download for Windows) → Overrides → `trackDownload` (plain, no product).
4. "Learn About EmotivPRO" (×2) → Overrides → `trackProductNavMn8`.
5. MN8 Sensor Pack card → Overrides → `trackAccessoriesMn8`.
6. "See All Accessories" (×2) → Overrides → `trackAccessoriesAllMn8`.
7. Publish.
8. Verify sections: `curl -sL "https://www.emotiv.com/mn8?v=$(date +%s)" | grep -oE 'data-umami-event-section="[^"]*"' | sort | uniq -c`
   Expected page-local additions: `hero` ≥4, `productnav` ≥6, `download` ≥16, `accessories` ≥1, `accessoriesall` ≥2.
9. Verify product: `curl -sL "https://www.emotiv.com/mn8?v=$(date +%s)" | grep -oE 'data-umami-event-product="[^"]*"' | sort | uniq -c`
   Expected: `mn8` only (store links carry no product).
