# MN8 `/mn8` — Event Coverage

Status: 🟡 **planned** — live audit 2026-09-17, re-mapped to rev-4 values; hero + top sub-nav + cross-sell + accessories untracked, globals live.

Current page traffic: pending (Umami website `338c5f5a`).

| # | Value | Role | Where on page | Example CTAs | Event | Status |
|---|---|---|---|---|---|---|
| 1 | `nav` | global navigation (shared comp) | header | Shop Now | `cta_click` | ✅ live |
| 2 | `productnav` | **top** sub-nav strip (anchors + its button) | sticky sub-nav (7-8%) | Overview, Features, Tech Specs, Buy (×2) | `cta_click` + `product=mn8` | ❌ wire `trackProductNavMn8` |
| 3 | `hero` | first fold buy CTA | hero (10%) | Buy now (×2, `utm_campaign=hero+buy+button`) | `cta_click` + `product=mn8` | ❌ wire `trackHeroMn8` |
| 4 | `related` | same-page anchor (body) | hero/body (10%) | Learn more (×2 → `./mn8#learnmore`) | `content_click` + `product=mn8` | ❌ wire `trackRelatedMn8` |
| 5 | `download` | Emotiv app store links | "Your brain, in your pocket" / "Works on desktop too" (33-45%) | Apple Store (×2), Google Play (×8), Download for MacOS (×3), Download for Windows (×3) | `cta_click` (no product — Emotiv app) | ❌ wire `trackDownload` |
| 6 | `crosssell` | Emotiv Play (different product) | app section | Learn more about Emotiv Play (×3 → `emotivplay.com`) | `content_click` + `product=mn8` | ❌ wire `trackCrosssellInfoMn8` |
| 7 | `download` | third-party wellness apps | Mindful Garden / Hearts & Heal (54-56%) | App Store (×3 Mindful Garden), App Store (×3 Hearts & Heal) | `cta_click` (no product) | optional |
| 8 | `crosssell` | EmotivPRO — **learn intent** | EmotivPRO band (83%) | Learn About EmotivPRO (×2 → `./emotivpro`) | `content_click` + `product=mn8` | ❌ wire `trackCrosssellInfoMn8` |
| 9 | `related` | developer links (body) | page body | Become an Emotiv Developer (×3 → `./developer`) | `content_click` + `product=mn8` | ❌ wire `trackRelatedMn8` |
| 10 | `accessories` | accessory card | "More Accessories" (91%) | MN8 Sensor Pack (×3) | `cta_click` + `product=mn8` | ❌ wire `trackAccessoriesMn8` |
| 11 | `accessoriesall` | accessories index CTA | bottom of page (94%) | See All Accessories (×2 → `./accessories`) | `cta_click` + `product=mn8` | ❌ wire `trackAccessoriesAllMn8` |
| 12 | `footer` | footer band CTAs (shared) | footer | User & Product Research | `cta_click` | ✅ live |
| 13 | `footernav` | footer link columns (shared) | footer | Academic Research, Epoc X | `content_click` | ✅ live |
| 14 | `snackbar` | floating promo banner (GLOBAL — no product) | bottom overlay | Buy (×2, `campaign=snackbar`) | `cta_click` | ✅ live |

## Decisions

**Sub-nav has 4 items, not 3.** Overview, Features, Tech Specs **plus the sub-nav `Buy`** (`utm_campaign=top-sub-navbar`, ×2). The hero `Buy now` is the same destination with `utm_campaign=hero+buy+button` — position decides, matching live `/epoc-x` where the nav `Buy` sits under `productnav`. Keeps "sub-nav buy vs hero buy" comparable.

**Rev-4 re-bucket (2026-09-17), three rows changed:**

- `Learn more` (×2 → `./mn8#learnmore`, body) was `productnav`; now `related`. Your rule: `productnav` = top navigation only, nothing below it.
- `Learn more about Emotiv Play` (×3, external) was **unwired**; now `crosssell` per your decision to wire Emotiv Play links.
- `Learn About EmotivPRO` (×2) `productnav` → `crosssell` (different product); `Become an Emotiv Developer` (×3) `productnav` → `related`.

**Row 7 optional.** Mindful Garden / Hearts & Heal are third-party apps, not Emotiv products — `download` with no product if wired, low signal.

**Correction to the first pass:** this page has **no** case-study region and the sub-nav `Learn more` is a single anchor at two breakpoints — the earlier pass listed it twice under `productnav`.

## Wiring steps

1. Top sub-nav strip (Overview, Features, Tech Specs) + sub-nav Buy (×2) → `trackProductNavMn8`.
2. Hero "Buy now" (×2) → `trackHeroMn8`.
3. "Learn more" (×2) → `trackRelatedMn8`.
4. Emotiv store links (Apple Store, Google Play, Download for MacOS, Download for Windows) → `trackDownload` (plain, no product).
5. "Learn more about Emotiv Play" (×3) → `trackCrosssellInfoMn8`.
6. "Learn About EmotivPRO" (×2) → `trackCrosssellInfoMn8`.
7. "Become an Emotiv Developer" (×3) → `trackRelatedMn8`.
8. MN8 Sensor Pack card (×3) → `trackAccessoriesMn8`.
9. "See All Accessories" (×2) → `trackAccessoriesAllMn8`.
10. Publish.

## Verification

```bash
curl -sL "https://www.emotiv.com/mn8?v=$(date +%s)" | grep -oE 'data-umami-event-section="[^"]*"' | sort | uniq -c
```
Expected page-local additions: `productnav` ≥5, `hero` ≥2, `related` ≥5, `crosssell` ≥5, `download` ≥16, `accessories` ≥3, `accessoriesall` ≥2.

```bash
curl -sL "https://www.emotiv.com/mn8?v=$(date +%s)" | grep -oE 'data-umami-event-product="[^"]*"' | sort | uniq -c
```
Expected: `mn8` only (store links carry no product).
