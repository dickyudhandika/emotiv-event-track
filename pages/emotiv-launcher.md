# Emotiv Launcher `/emotiv-launcher` — Event Coverage

Status: 🟡 **planned** — live audit 2026-09-17, re-mapped to rev-4 values; hero download + 4 platform installers + EmotivPRO cross-sell untracked, globals live. Clean (no mis-tags).

Current page traffic: pending (Umami website `338c5f5a`).

| # | Value | Role | Where on page | Example CTAs | Event | Status |
|---|---|---|---|---|---|---|
| 1 | `nav` | global navigation (shared comp) | header | Shop Now | `cta_click` | ✅ live |
| 2 | `hero` | hero anchor (primary install CTA) | hero (25%) | Download Now For Free (×2 → `#download`) | `cta_click` + `product=launcher` | ❌ wire `trackHeroLauncher` |
| 3 | `related` | same-page anchor (body) | hero (26%) | Learn More (×2 → `#learn-more`) | `content_click` + `product=launcher` | ❌ wire `trackRelatedLauncher` |
| 4 | `crosssell` | EmotivPRO — **learn intent** | "Analyze" band (41%) | Learn More (×1 → `./emotivpro`) | `content_click` + `product=launcher` + explicit label | ❌ wire `trackCrosssellInfoLauncher` |
| 5 | `download` | platform installer downloads (4) | "Download Emotiv Launcher" (50-60%) | Download → macOS (×3), Windows x64 (×3), Ubuntu .deb (×3), Raspberry Pi armhf (×3) | `cta_click` + `product=launcher` | ❌ wire `trackDownloadLauncher` |
| 6 | `footer` | footer band CTAs (shared) | footer | User & Product Research | `cta_click` | ✅ live |
| 7 | `footernav` | footer link columns (shared) | footer | Academic Research, Epoc X | `content_click` | ✅ live |
| 8 | `snackbar` | floating promo banner (GLOBAL — no product) | bottom overlay | promo | `cta_click` | ✅ live |

## Decisions

**No `productnav` on this page.** Launcher has **no top sub-nav strip** — no container matching the top-nav pattern exists in the live DOM. Its hero anchors (`Download Now For Free`, `Learn More`) are same-page anchors sitting in the hero **body**, so under your rule (`productnav` = top navigation only) they are not `productnav`.

- `Download Now For Free` (×2 → `#download`) → **`hero`**, because it is this page's primary conversion action (it is literally how you install Launcher). `trackHeroLauncher` was added for exactly this case.
- `Learn More` (×2 → `#learn-more`) → **`related`**.

**Label required on row 4.** It shares the exact text `Learn More` with the two hero anchors (row 3) but means something different. Set `data-umami-event-label="Learn More (EmotivPRO)"` so labels don't collide across two sections in dashboards (RULES.md → Labels).

**Row 4 is `crosssell` — learn intent.** It points at a different product. The wording is `Learn More`, so it is browse-intent, not buy-intent; it must not inflate buy numbers.

The four real installer buttons go to `horizon-cdn.emotiv.com` (direct files, this product's own download) → `download` + `product=launcher`. 4 destinations × 3 breakpoints = 12 instances.

## Wiring steps

1. "Download Now For Free" (×2) → `trackHeroLauncher`.
2. Hero "Learn More" anchors (×2) → `trackRelatedLauncher`.
3. "Learn More" (EmotivPRO cross-sell) → `trackCrosssellInfoLauncher` + `data-umami-event-label="Learn More (EmotivPRO)"`.
4. 4 platform installers (macOS, Windows, Ubuntu, Raspberry Pi) → `trackDownloadLauncher`.
5. Publish.

## Verification

```bash
curl -sL "https://www.emotiv.com/emotiv-launcher?v=$(date +%s)" | grep -oE 'data-umami-event-section="[^"]*"' | sort | uniq -c
```
Expected page-local additions: `hero` ≥2, `related` ≥2, `crosssell` ≥1, `download` ≥12, and **no** `productnav`.

```bash
curl -sL "https://www.emotiv.com/emotiv-launcher?v=$(date +%s)" | grep -oE 'data-umami-event-product="[^"]*"' | sort | uniq -c
```
Expected: `launcher` with count ≥ 17.
