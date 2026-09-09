# Homepage `/` — Event Coverage

Status: ✅ **live** — verified 2026-08-11 (DOM scan + console spy), both A/B variants (`augiA20Il` / `J4y1ztAFM`). Re-verified 2026-09-09: rev-2 compliant — zero product props site-wide, globals clean (nav/footer/snackbar no product). Homepage intentionally carries NO product prop.

| # | Value | Role | Where on page | Example CTAs | Event | Count (A / B) |
|---|---|---|---|---|---|---|
| 1 | `nav` | global navigation | header | Shop Now, Start Now | `cta_click` | 2 / 2 |
| 2 | `hero` | first fold | hero | User & Product Research, Academic Research | `cta_click` | 2 / 2 |
| 3 | `product` | product slideshow cards (+ hero carousel Variant B) | product slider | See Epoc X, See Insight, See MN8, See Flex 2 | `cta_click` — NO `product` prop (rev-2: homepage intentionally un-nested) | 16 / 20 |
| 4 | `applications` | use-case accordion cards | "Versatile by design" | Access Research Hub, Start Building | `cta_click` | 1 (shared comp → all 4 buttons) |
| 5 | `pathway` | audience selector cards | pathway section | Play Now, Start Building | `cta_click` | 5 / 5 |
| 6 | `platform` | platform pitch CTA | "Operating System for the Brain" | Start Building | `cta_click` | 1 / 1 |
| 7 | `news` | article cards | latest news | article titles, Read latest news | `content_click` | 4 / 4 |
| 8 | `footer` | footer band CTAs | footer | User & Product Research, Academic Research | `cta_click` | 3 / 3 |
| 9 | `footernav` | footer link columns | footer | Academic Research, Epoc X, KB | `content_click` | 42 / 42 |
| 10 | `footer` (newsletter) | subscribe form | footer | Subscribe here | `form_submit` | 1 |

Notes:
- `product` labels are badge-prefixed by auto-capture (`Best sellerEpoc X14-Channel…`) — accepted for A/B test; clean labels need per-instance props (blocked: shared component).
- Detail: `WIRING.md` (per-section plant points + A/B diff table).
