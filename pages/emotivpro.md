# EmotivPRO `/emotivpro` — Event Coverage

Status: 🟡 **planned** — live audit 2026-09-17, re-mapped to rev-4 values; hero + top sub-nav + pricing buys + downloads untracked, globals live.

Current page traffic: pending (Umami website `338c5f5a`).

| # | Value | Role | Where on page | Example CTAs | Event | Status |
|---|---|---|---|---|---|---|
| 1 | `nav` | global navigation (shared comp) | header | Shop Now | `cta_click` | ✅ live |
| 2 | `productnav` | **top** sub-nav strip (anchors + its button) | sticky sub-nav (9%) | Overview, Features, Pricing, Buy (×2) | `cta_click` + `product=emotivpro` | ❌ wire `trackProductNavEmotivpro` |
| 3 | `hero` | buy CTAs (hero + pricing area) | hero (17%) + pricing (43%) | Buy now (×8), Shop now (×12) | `cta_click` + `product=emotivpro` | ❌ wire `trackHeroEmotivpro` |
| 4 | `download` | app store badges (×3 destinations) | PRO Mobile / PRO Tablet (20-24%) | App Store (×2 iOS mobile), Google Play (×4 Android mobile), App Store (×2 iOS desktop) | `cta_click` + `product=emotivpro` | ❌ wire `trackDownloadEmotivpro` |
| 5 | `related` | same-page anchors (body) | hero (17%) + pricing (28%, 42%, 92%) | Learn more (×2), View licensing (×1), Compare Plans / Compare plans (×4) | `content_click` + `product=emotivpro` | ❌ wire `trackRelatedEmotivpro` |
| 6 | `crosssell` | Launcher — **buy intent** | free tier (50%) | Start now, for free (×3 → `./emotiv-launcher`) | `cta_click` + `product=emotivpro` | ❌ wire `trackCrosssellEmotivpro` |
| 7 | `casestudies` | study links (6) | "Groundbreaking research" / "Advancing Brain Care" (44-47%) | Read study (×2 IEEE, ×2 Frontiers, ×2 internal) | `content_click` (no product) | ❌ wire `trackCaseStudies` |
| 8 | `news` | tutorial article link | "Lab Streaming Layer" (82%) | Read the Full Tutorial (×2 → `./blog/emotiv-lab-streaming-layer-lsl`) | `content_click` (no product) | ❌ wire `trackNews` |
| 9 | `footer` | footer band CTAs (shared) | footer | User & Product Research | `cta_click` | ✅ live |
| 10 | `footernav` | footer link columns (shared) | footer | Academic Research, Epoc X | `content_click` | ✅ live |
| 11 | `snackbar` | floating promo banner (GLOBAL — no product) | bottom overlay | Buy (×5, `shop.emotiv.com/emotivpro/`) | `cta_click` | ✅ live |

## Decisions

**Confirmed 2026-09-16, unchanged:** all conversion buy buttons use `section=hero` + `product=emotivpro`, including the pricing-area CTAs — keeps "hero CTA conversion rate" comparable across pages. Label distinguishes `Buy now` vs `Shop now`. Live count is **20** body buy instances (Shop now ×12 at 43%, Buy now ×8 at 17%), not the plan's 5 — a 4× undercount. Wire by *destination + region*, not by a fixed number.

**Rev-4 re-bucket (2026-09-17).** Rows 5-6 changed from the first pass:

- `Learn more` (×2), `View licensing` (×1), `Compare Plans`/`Compare plans` (×4) were all `productnav`; now `related`. Every one of them is a **same-page anchor** (`#overview`, `#pricing`, `#compare-plans`) sitting in the body, not in the top strip — your rule: `productnav` = top navigation only, nothing below it. They refer no other product → `related`. Seven instances.
- `Start now, for free` (×3 → `./emotiv-launcher`) `productnav` → `crosssell`, **buy intent** (the text is an action verb, and it acquires a different product). This is the page's one true cross-sell.

**Sub-nav note:** the nav `Features` anchor points at `#compare-plans` (not a features block) — a naming quirk in the Framer source, not a mapping error. It stays `productnav` because position and same-page-ness both hold.

## Wiring steps

1. Top sub-nav strip (Overview, Features, Pricing) + sub-nav Buy (×2) → `trackProductNavEmotivpro`.
2. Hero + pricing buy CTAs (Buy now ×8, Shop now ×12) → `trackHeroEmotivpro` (all breakpoints).
3. App store badges (×3 destinations, 8 instances) → `trackDownloadEmotivpro`.
4. "Learn more" (×2), "View licensing" (×1), "Compare Plans"/"Compare plans" (×4) → `trackRelatedEmotivpro`.
5. "Start now, for free" (×3) → `trackCrosssellEmotivpro`.
6. "Read study" (×6) → `trackCaseStudies`.
7. "Read the Full Tutorial" (×2) → `trackNews`.
8. Publish.

## Verification

```bash
curl -sL "https://www.emotiv.com/emotivpro?v=$(date +%s)" | grep -oE 'data-umami-event-section="[^"]*"' | sort | uniq -c
```
Expected page-local additions: `productnav` ≥5, `hero` ≥20, `download` ≥8, `related` ≥7, `crosssell` ≥3, `casestudies` ≥6, `news` ≥2.

```bash
curl -sL "https://www.emotiv.com/emotivpro?v=$(date +%s)" | grep -oE 'data-umami-event-product="[^"]*"' | sort | uniq -c
```
Expected: `emotivpro` only (case studies + news carry no product).
