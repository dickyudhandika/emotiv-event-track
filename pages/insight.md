# Insight `/insight` — Event Coverage

Status: 🟡 **planned** — live audit 2026-09-17, re-mapped to rev-4 values; hero + top sub-nav + cross-sell + accessories untracked, globals live.

Current page traffic: 90d pageviews 2,363 (Umami, website `338c5f5a`).

| # | Value | Role | Where on page | Example CTAs | Event | Status |
|---|---|---|---|---|---|---|
| 1 | `nav` | global navigation (shared comp) | header | Shop Now | `cta_click` | ✅ live |
| 2 | `productnav` | **top** sub-nav strip (anchors + its button) | sticky sub-nav (9-10%) | Overview, Tech Specs, Features, Pre-Order (×2) | `cta_click` + `product=insight` | ❌ wire `trackProductNavInsight` |
| 3 | `hero` | first fold pre-order CTA | hero (12%) | Pre-Order (×4, `utm_campaign=pre+order+hero+button`) | `cta_click` + `product=insight` | ❌ wire `trackHeroInsight` |
| 4 | `related` | same-page anchor (body) | features (13%) | Learn more (×2 → `./insight#features`) | `content_click` + `product=insight` | ❌ wire `trackRelatedInsight` |
| 5 | `casestudies` | case study cards (3) | "Deployment-Ready EEG" (26-29%) | YSL neuromarketing, brain-drone race, Handi'Arcade controllers | `content_click` (no product) | ❌ wire `trackCaseStudies` |
| 6 | `related` | solution-page pathway links | body (21%) | Enterprise Solutions, For Developers & Hobbyists, For Researchers & Educators | `content_click` + `product=insight` | ❌ wire `trackRelatedInsight` |
| 7 | `crosssell` | EmotivPRO link — **learn intent** | license band (40%) | license (×2 → `./emotivpro`) | `content_click` + `product=insight` | ❌ wire `trackCrosssellInfoInsight` |
| 8 | `related` | own product docs | spec/support (57-58%) | Go to the user manual (×2, gitbook), Quick Start Guide (×2) | `content_click` + `product=insight` | optional |
| 9 | `accessories` | accessory cards (2) | "More Accessories" (65-68%) | Insight Charging Cable, Insight Sensor Tips | `cta_click` + `product=insight` | ❌ wire `trackAccessoriesInsight` |
| 10 | `accessoriesall` | accessories index CTA | bottom of page (73%) | See All Accessories (×2 → `./accessories`) | `cta_click` + `product=insight` | ❌ wire `trackAccessoriesAllInsight` |
| 11 | `footer` | footer band CTAs (shared) | footer | User & Product Research | `cta_click` | ✅ live |
| 12 | `footernav` | footer link columns (shared) | footer | Academic Research, Epoc X | `content_click` | ✅ live |
| 13 | `snackbar` | floating promo banner (GLOBAL — no product) | bottom overlay | Pre-Order (×5, `campaign=snackbar`) | `cta_click` | ✅ live |

## Decisions

**Hero is ×4, not ×6.** The 6 Pre-Order instances split by container: **2 sit in the top sub-nav strip** (`utm_campaign=top-sub-navbar`) → `productnav`; **4 sit in the hero body** (`utm_campaign=pre+order+hero+button`) → `hero`. Verified by ancestor container, matching live `/epoc-x`, where the nav `Buy` is already live under `productnav`. Position decides, so "sub-nav pre-order vs hero pre-order" becomes a real comparison.

**Rev-4 re-bucket (2026-09-17), three rows changed:**

- `Learn more` (×2 → `./insight#features`, body) was `productnav`; now `related`. Your rule: `productnav` = the top navigation only, nothing below it. A body anchor refers no other product → `related`.
- `license` (×2 → `./emotivpro`) was **unwired**; now `crosssell` (learn intent — noun label, not a buy verb).
- The 3 audience-pathway links were **unwired**; now `related` with `product=insight`.

**Row 8 optional.** Own-product docs are same-product support → `related` if wired, low signal. Flagged, not silently planted.

## Wiring steps

1. Top sub-nav strip (Overview, Tech Specs, Features) + sub-nav Pre-Order (×2) → `trackProductNavInsight`.
2. Hero Pre-Order (×4, `campaign=pre+order+hero+button`) → `trackHeroInsight`.
3. "Learn more" (×2) → `trackRelatedInsight`.
4. 3 case study cards → `trackCaseStudies` (plain, no product).
5. 3 pathway links (Enterprise Solutions, For Developers & Hobbyists, For Researchers & Educators) → `trackRelatedInsight`.
6. "license" (×2) → `trackCrosssellInfoInsight`.
7. 2 accessory cards → `trackAccessoriesInsight`.
8. "See All Accessories" (×2) → `trackAccessoriesAllInsight`.
9. Publish.

## Verification

```bash
curl -sL "https://www.emotiv.com/insight?v=$(date +%s)" | grep -oE 'data-umami-event-section="[^"]*"' | sort | uniq -c
```
Expected page-local additions: `productnav` ≥5, `hero` ≥4, `related` ≥5, `crosssell` ≥2, `casestudies` ≥3, `accessories` ≥6, `accessoriesall` ≥2.

```bash
curl -sL "https://www.emotiv.com/insight?v=$(date +%s)" | grep -oE 'data-umami-event-product="[^"]*"' | sort | uniq -c
```
Expected: `insight` only (case studies carry no product).
