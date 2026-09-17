# Emotiv BrainViz `/emotiv-brainviz` — Event Coverage

Status: 🟡 **planned** — live audit 2026-09-17, re-mapped to rev-4 values; hero + top sub-nav untracked, globals live.

Current page traffic: pending (Umami website `338c5f5a`).

| # | Value | Role | Where on page | Example CTAs | Event | Status |
|---|---|---|---|---|---|---|
| 1 | `nav` | global navigation (shared comp) | header | Shop Now | `cta_click` | ✅ live |
| 2 | `productnav` | **top** sub-nav strip (anchors + its button) | sticky sub-nav (27-28%) | Overview, Features, Tech Specs, Buy (×2) | `cta_click` + `product=brainviz` | ❌ wire `trackProductNavBrainviz` |
| 3 | `hero` | buy CTAs | hero (48%) + "BrainViz at Play" (63%) | Buy now (×2), Buy Now (×1) | `cta_click` + `product=brainviz` | ❌ wire `trackHeroBrainviz` |
| 4 | `crosssell` | Launcher — **learn intent** | hero band (49%) | Try BrainViz for Free (×2 → `./emotiv-launcher`) | `content_click` + `product=brainviz` | ❌ wire `trackCrosssellInfoBrainviz` |
| 5 | `footer` | footer band CTAs (shared) | footer | User & Product Research | `cta_click` | ✅ live |
| 6 | `footernav` | footer link columns (shared) | footer | Academic Research, Epoc X | `content_click` | ✅ live |
| 7 | `snackbar` | floating promo banner (GLOBAL — no product) | bottom overlay | Buy (×5, `campaign=snackbar`) | `cta_click` | ✅ live |

## Decisions

**Hero is ×3, not ×5.** The 5 purchase instances split by container: **2 sit in the top sub-nav strip** (`utm_campaign=top-sub-navbar`) → `productnav`; **3 sit in the body** (48% `Buy now` ×2, 63% `Buy Now` ×1) → `hero`. Verified by ancestor container against live `/epoc-x`, where the nav `Buy` sits under `productnav`.

The 63% instance sits under the heading "Emotiv BrainViz at Play" — a second band, not the first fold. It is still a direct purchase for this page's product, so it maps to `hero`, same reasoning as the EmotivPRO pricing area: keeps conversion comparable. Flagging the positional nuance so the label set stays interpretable.

**Rev-4 change.** `Try BrainViz for Free` (×2 → `./emotiv-launcher`) was `productnav`; now `crosssell`, **learn intent**. Two reasons: it points at a different product (Launcher), and the wording is a trial offer rather than a purchase — so it must not inflate BrainViz's buy-intent number. `productnav` is now the top strip only.

**Not wired:** `contact us` (×3 → `./contact`) is boilerplate support navigation inside a spec table — no product, no conversion, low signal. Flagged rather than silently planted.

## Wiring steps

1. Top sub-nav strip (Overview, Features, Tech Specs) + sub-nav Buy (×2) → `trackProductNavBrainviz`.
2. Body buy CTAs (×3, all breakpoints) → `trackHeroBrainviz`.
3. "Try BrainViz for Free" (×2) → `trackCrosssellInfoBrainviz`.
4. Publish.

## Verification

```bash
curl -sL "https://www.emotiv.com/emotiv-brainviz?v=$(date +%s)" | grep -oE 'data-umami-event-section="[^"]*"' | sort | uniq -c
```
Expected page-local additions: `productnav` ≥5, `hero` ≥3, `crosssell` ≥2.

```bash
curl -sL "https://www.emotiv.com/emotiv-brainviz?v=$(date +%s)" | grep -oE 'data-umami-event-product="[^"]*"' | sort | uniq -c
```
Expected: `brainviz` only.
