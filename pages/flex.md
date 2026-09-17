# Flex `/flex` — Event Coverage

Status: 🟡 **planned** — live audit 2026-09-17, re-mapped to rev-4 values 2026-09-17; hero + top sub-nav + cross-sell + 6 accessories untracked, globals live.

Current page traffic: pending (Umami website `338c5f5a`).

| # | Value | Role | Where on page | Example CTAs | Event | Status |
|---|---|---|---|---|---|---|
| 1 | `nav` | global navigation (shared comp) | header | Shop Now | `cta_click` | ✅ live |
| 2 | `productnav` | **top** product sub-nav | sticky sub-nav (7-8%) | Overview, Features, EmotivPRO, For Researchers, Tech Specs, Buy | `cta_click` + `product=flex` | ❌ wire `trackProductNavFlex` |
| 3 | `hero` | first fold buy CTA | hero (10%) | Buy now (×2) | `cta_click` + `product=flex` | ❌ wire `trackHeroFlex` |
| 4 | `crosssell` | EmotivPRO — **buy intent** | EmotivPRO band (45%) | PRO License (×2) | `cta_click` + `product=flex` | ❌ wire `trackCrosssellFlex` |
| 5 | `crosssell` | EmotivPRO — **learn intent** | EmotivPRO band (30%, "Every purchase includes the EmotivPRO Lite software.") | Learn about EmotivPRO (×3) | `content_click` + `product=flex` | ❌ wire `trackCrosssellInfoFlex` |
| 6 | `accessories` | accessory cards (6) | "More Accessories" slideshow (61-66%) | Flex Cap, Flex Felt Sensors, Flex Control Box 2.0, Flex Saline Sensors, Flex Gel Sensors, Flex Silicone Skirt Pack | `cta_click` + `product=flex` | ❌ wire `trackAccessoriesFlex` on each card |
| 7 | `accessoriesall` | accessories index CTA | bottom of page (95%) | See All Accessories (×2) | `cta_click` + `product=flex` | ❌ wire `trackAccessoriesAllFlex` |
| 8 | `footer` | footer band CTAs (shared) | footer | User & Product Research | `cta_click` | ✅ live |
| 9 | `footernav` | footer link columns (shared) | footer | Academic Research, Epoc X | `content_click` | ✅ live |
| 10 | `snackbar` | floating promo banner (GLOBAL — no product) | bottom overlay | MN8 bundle promo | `cta_click` | ✅ live |

## Decisions

**Rev-4 split (2026-09-17).** Top sub-nav is **6 destinations / 7 instances**: the 5 on-page anchors **plus the sub-nav `Buy`** (×2, `utm_campaign=top-sub-navbar`). Note `Buy` (sub-nav) and `Buy now` (hero, `utm_campaign=hero+buy+button`) are the **same destination but different roles** — position decides, matching the `/epoc-x` precedent where the nav `Buy` is already live under `productnav`. That gives "nav buy vs hero buy" as a real comparison.

The sub-nav `EmotivPRO` anchor points at `./flex#emotiv-flex-saline-emotivpro` — a **same-page anchor**, so it is genuinely `productnav`, not crosssell. The *separate* EmotivPRO band lower down (rows 4-5) is the cross-sell. Same word, two roles — the href is what separates them.

Accessory cards stay `accessories` — this product's own ecosystem, not cross-sell. "See All Accessories" → `accessoriesall` (matches `/epoc-x`), even though its href (`./accessories`) is another page.

## Wiring steps

1. Top sub-nav (Overview, Features, EmotivPRO, For Researchers, Tech Specs, Buy) → `trackProductNavFlex`.
2. Hero "Buy now" (×2) → `trackHeroFlex`.
3. EmotivPRO band "PRO License" (×2) → `trackCrosssellFlex`.
4. EmotivPRO band "Learn about EmotivPRO" (×3) → `trackCrosssellInfoFlex`.
5. Each of the 6 accessory cards → `trackAccessoriesFlex` (plant on card root per the slideshow rule in `RULES.md`).
6. "See All Accessories" (×2) → `trackAccessoriesAllFlex`.
7. Publish.

## Verification

```bash
curl -sL "https://www.emotiv.com/flex?v=$(date +%s)" | grep -oE 'data-umami-event-section="[^"]*"' | sort | uniq -c
```
Expected page-local additions: `productnav` ≥6, `hero` ≥2, `crosssell` ≥5, `accessories` ≥6, `accessoriesall` ≥2.

```bash
curl -sL "https://www.emotiv.com/flex?v=$(date +%s)" | grep -oE 'data-umami-event-product="[^"]*"' | sort | uniq -c
```
Expected: `flex` only.

Cross-sell intent split:
```bash
curl -sL "https://www.emotiv.com/flex?v=$(date +%s)" | grep -oE 'data-umami-event="(cta_click|content_click)"[^>]*data-umami-event-section="crosssell"' | grep -oE 'cta_click|content_click' | sort | uniq -c
```
Expected: `cta_click` ≥2 (PRO License), `content_click` ≥3 (Learn about EmotivPRO).
