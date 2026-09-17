# Emotiv BrainViz `/emotiv-brainviz` — Event Coverage

Status: 🟡 **planned** — live audit 2026-09-17; hero + sub-nav untracked, globals live.

Current page traffic: pending (Umami website `338c5f5a`).

| # | Value | Role | Where on page | Example CTAs | Event | Status |
|---|---|---|---|---|---|---|
| 1 | `nav` | global navigation (shared comp) | header | Shop Now | `cta_click` | ✅ live |
| 2 | `productnav` | sub-nav anchors | sticky sub-nav (27-28%) | Overview, Features, Tech Specs | `cta_click` + `product=brainviz` | ❌ wire `trackProductNavBrainviz` |
| 3 | `hero` | buy CTAs | hero (29%, 48%) + "BrainViz at Play" (63%) | Buy (×2), Buy now (×2), Buy Now (×1) | `cta_click` + `product=brainviz` | ❌ wire `trackHeroBrainviz` |
| 4 | `productnav` | free-trial CTA | hero band (49%) | Try BrainViz for Free (×2) | `cta_click` + `product=brainviz` | ❌ wire `trackProductNavBrainviz` |
| 5 | `footer` | footer band CTAs (shared) | footer | User & Product Research | `cta_click` | ✅ live |
| 6 | `footernav` | footer link columns (shared) | footer | Academic Research, Epoc X | `content_click` | ✅ live |
| 7 | `snackbar` | floating promo banner (GLOBAL — no product) | bottom overlay | Buy (×5, campaign=snackbar) | `cta_click` | ✅ live |

Notes: hero has **5** buy instances across three regions (29% `Buy` ×2, 48% `Buy now` ×2, 63% `Buy Now` ×1) — the plan said 2. The `Buy now`/`Buy Now` at 63% sits under the heading "Emotiv BrainViz at Play", a second band, not the first fold; it is still a direct purchase for this page's product so it maps to `hero` (same reasoning as EmotivPRO pricing): keeps conversion comparable. Flagging the positional nuance so the label set stays interpretable. `contact us` (×3, `./contact`) is boilerplate support navigation — not wired.

Wiring steps:
1. Sub-nav anchors (Overview, Features, Tech Specs) → Overrides → `trackProductNavBrainviz`.
2. Buy CTAs (×5, all breakpoints) → Overrides → `trackHeroBrainviz`.
3. "Try BrainViz for Free" (×2) → Overrides → `trackProductNavBrainviz`.
4. Publish.
5. Verify sections: `curl -sL "https://www.emotiv.com/emotiv-brainviz?v=$(date +%s)" | grep -oE 'data-umami-event-section="[^"]*"' | sort | uniq -c`
   Expected page-local additions: `hero` ≥5, `productnav` ≥5.
6. Verify product: `curl -sL "https://www.emotiv.com/emotiv-brainviz?v=$(date +%s)" | grep -oE 'data-umami-event-product="[^"]*"' | sort | uniq -c`
   Expected: `brainviz` only.
