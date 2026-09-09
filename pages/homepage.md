# Homepage `/` — Event Coverage

Status: ✅ **live** — control route only. Re-verified 2026-09-09: rev-2 compliant — zero product props site-wide, globals clean (nav/footer/snackbar no product). Homepage intentionally carries NO product prop. Homepage A/B test **concluded 2026-09-09** — control (`augiA20Il`) retained, Variant B retired. History in A/B log below.

| # | Value | Role | Where on page | Example CTAs | Event | Count |
|---|---|---|---|---|---|---|
| 1 | `nav` | global navigation | header | Shop Now, Start Now | `cta_click` | 2 |
| 2 | `hero` | first fold | hero | User & Product Research, Academic Research | `cta_click` | 2 |
| 3 | `product` | product slideshow cards | product slider | See Epoc X, See Insight, See MN8, See Flex 2 | `cta_click` — NO `product` prop (rev-2: homepage intentionally un-nested) | 16 |
| 4 | `applications` | use-case accordion cards | "Versatile by design" | Access Research Hub, Start Building | `cta_click` | 1 (shared comp → all 4 buttons) |
| 5 | `pathway` | audience selector cards | pathway section | Play Now, Start Building | `cta_click` | 5 |
| 6 | `platform` | platform pitch CTA | "Operating System for the Brain" | Start Building | `cta_click` | 1 |
| 7 | `news` | article cards | latest news | article titles, Read latest news | `content_click` | 4 |
| 8 | `footer` | footer band CTAs | footer | User & Product Research, Academic Research | `cta_click` | 3 |
| 9 | `footernav` | footer link columns | footer | Academic Research, Epoc X, KB | `content_click` | 42 |
| 10 | `footer` (newsletter) | subscribe form | footer | Subscribe here | `form_submit` | 1 |

Notes:
- `product` labels are badge-prefixed by auto-capture (`Best sellerEpoc X14-Channel…`) — clean labels need per-instance props (blocked: shared component).
- Detail: `WIRING.md` (per-section plant points).

## A/B test log (homepage)

| Item | Detail |
|---|---|
| Test | Hero layout — control vs product-carousel variant |
| Control route | `augiA20Il` → Umami `data-tag=homepage-control` |
| Variant B route | `J4y1ztAFM` → `homepage-variant-b` (retired 2026-09-09) |
| Window | Verified live 2026-08-11 → ended 2026-09-09 |
| Winner | Control (Variant B route no longer served) |
| Tagging | Snippet `obcX5y7mC` retained → every homepage session logged with `data-tag=homepage-control`. Variant-b no longer served, so no split traffic |
| Tracking diff | Control 76 events vs Variant B 80 (B added hero carousel: +4 `product` "See X" buttons) — full table in `WIRING.md` changelog |

Exports `trackProductSeeEpocX/Insight/Mn8/Flex` stay in the library (used if a product carousel ships again) — currently unwired.
