# Brainwear `brainwear.app` — Event Coverage

Status: 🟡 **planned** — live audit 2026-09-17, re-mapped to rev-4 values; ZERO tracking (no `data-umami-event` attributes anywhere). Umami script loaded (site `338c5f5a`). Different domain, same Umami site.

Current page traffic: pending (Umami website `338c5f5a`).

| # | Value | Role | Where on page | Example CTAs | Event | Status |
|---|---|---|---|---|---|---|
| 1 | `hero` | first fold buy CTA + bottom shop link | hero (0-2%) + bottom band (54%) | Get Brainwear (×3 → `shop.emotiv.com/mn8`), Shop now (×2 → `shop.emotiv.com/mn8/`) | `cta_click` + `product=brainwear` | ❌ wire `trackHeroBrainwear` |
| 2 | `hero` | header strip buy CTA | header (0%) | Get Brainwear (×2 → `shop.emotiv.com/mn8`) | `cta_click` + `product=brainwear` | ❌ wire `trackHeroBrainwear` |
| 3 | `related` | header nav links | header strip (2%) | Learn More (×2 → `./how-it-works`) | `content_click` + `product=brainwear` | ❌ wire `trackRelatedBrainwear` |
| 4 | `related` | hero + in-page nav links | hero (2%) + Links strip (50-52%) | Learn More (×3 → `./how-it-works`), How it Works (×2 + ×2 → `./how-it-works`), FAQ (×2 → `./faq`) | `content_click` + `product=brainwear` | ❌ wire `trackRelatedBrainwear` |
| 5 | `download` | app store badges (×2) | header strip (12-14%) | App Store (×4), Google Play (×4) | `cta_click` + `product=brainwear` | ❌ wire `trackDownloadBrainwear` |
| 6 | `crosssell` | Emotiv Play (different product) | header (20%) + mid-page (34%) + explore band | Explore Play (×3 → `emotivplay.com`), Discover the Experiences (×2 → `emotivplay.com`) | `content_click` + `product=brainwear` | ❌ wire `trackCrosssellInfoBrainwear` |
| 7 | `news` | blog article cards (3) | article band (42-46%) | Choosing the Right Focus Session, Challenge Your Focus with Flank Force, Understanding Your Mental States | `content_click` (no product) | ❌ wire `trackNews` |
| 8 | `related` | legal / privacy links | footer (74-86%) | How We Protect Your Data (`emotiv-eeg-cloud`), Privacy Policy (×2), Terms of Use, EULA | `content_click` | ⏸ boilerplate — not wired |

## Decisions

**No shared globals.** brainwear.app has its own layout — it does **not** use emotiv.com's `nav`/`footer`/`footernav`/`snackbar` components. Every click is page-local, and `product=brainwear` applies throughout the brand surface.

**No `productnav`.** There is no top sub-nav pattern here — no `<nav>` element at all, and no container matching the emotiv.com top-strip. The header holds `Learn More` (nav link) plus the two store badges; both are handled by `related` / `download`.

**`Get Brainwear` stays `hero`.** It points at `shop.emotiv.com/mn8` — a *different* domain and a different page slug, but **the same product**: Brainwear is MN8's consumer brand, so this is the page's own conversion, not cross-sell. Under the same-product clause it stays `hero` + `product=brainwear`. Labelling it crosssell would zero out this site's only purchase metric.

**Emotiv Play → `crosssell` (learn intent).** `Explore Play` + `Discover the Experiences` point at `emotivplay.com`, a different product → crosssell. Wording is exploratory, so `content_click` / `trackCrosssellInfoBrainwear`.

**Blog cards → `news`.** Three article cards sit in an article band. They are not blog-index or homepage news, but `news` is the article-card role and it keeps article reads out of the CTA funnel; `trackNews` is the existing export (no product).

**Rows 7-8 are new vs the first pass.** The first pass listed only hero/nav/downloads; the live DOM has a 3-card article band and a full legal footer. Legal links are boilerplate — flagged, deliberately not wired.

## Wiring steps

1. Paste `templates/umami.tsx` into the brainwear.app Framer project → Code Overrides (separate project from emotiv.com).
2. Hero "Get Brainwear" (×3) → `trackHeroBrainwear`.
3. Header "Get Brainwear" (×2) → `trackHeroBrainwear`.
4. Bottom "Shop now" (×2) → `trackHeroBrainwear`.
5. Header + hero "Learn More" (×5 total) and `How it Works` / `How It Works` (×4) / `FAQ` (×2) → `trackRelatedBrainwear`.
6. App Store + Google Play badges (×4 each) → `trackDownloadBrainwear`.
7. "Explore Play" (×3) + "Discover the Experiences" (×2) → `trackCrosssellInfoBrainwear`.
8. 3 blog article cards → `trackNews`.
9. Publish.

## Verification

```bash
curl -sL "https://brainwear.app/?v=$(date +%s)" | grep -oE 'data-umami-event="[^"]*"' | sort | uniq -c
```
Expected: `cta_click` and `content_click` both present — no longer zero.

```bash
curl -sL "https://brainwear.app/?v=$(date +%s)" | grep -oE 'data-umami-event-section="[^"]*"' | sort | uniq -c
```
Expected: `hero` ≥7, `related` ≥11, `download` ≥8, `crosssell` ≥5, `news` ≥3.

```bash
curl -sL "https://brainwear.app/?v=$(date +%s)" | grep -oE 'data-umami-event-product="[^"]*"' | sort | uniq -c
```
Expected: `brainwear` only (blog + legal carry no product).
