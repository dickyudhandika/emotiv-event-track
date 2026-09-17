# EmotivBCI `/emotiv-bci` — Event Coverage

Status: 🟡 **planned** — live audit 2026-09-17, re-mapped to rev-4 values; complex page — hero download + top sub-nav + hardware cross-sell + BCI-OSC + case studies + third-party badges. Globals live.

Current page traffic: pending (Umami website `338c5f5a`).

| # | Value | Role | Where on page | Example CTAs | Event | Status |
|---|---|---|---|---|---|---|
| 1 | `nav` | global navigation (shared comp) | header | Shop Now | `cta_click` | ✅ live |
| 2 | `productnav` | **top** sub-nav strip (anchors + its button) | sticky sub-nav (10%) | Overview, Features, Download EmotivBCI (×2) | `cta_click` + `product=bci` | ❌ wire `trackProductNavBci` |
| 3 | `hero` | primary download CTA (body) | hero (10%) | Download EmotivBCI (×1) | `cta_click` + `product=bci` | ❌ wire `trackHeroBci` |
| 4 | `crosssell` | hardware cross-sell — **buy intent** | "Select Your Brain Interface" (24-28%) | Buy now → Epoc X / Insight / MN8 (×3) | `cta_click` + `product=bci` + explicit label | ❌ wire `trackCrosssellBci` |
| 5 | `crosssell` | hardware cross-sell — **learn intent** | "Select Your Brain Interface" (24-29%) | Learn More About Epoc X / Insight / MN8 (×3) | `content_click` + `product=bci` | ❌ wire `trackCrosssellInfoBci` |
| 6 | `related` | same-page anchor / own add-on | body (18%, 41%) | Additional Modules (→ `#features`), Explore BCI-OSC Features (→ `./bci-osc`) | `content_click` + `product=bci` | ❌ wire `trackRelatedBci` |
| 7 | `related` | performance-metrics link | "Select Your Brain Interface" (30%) | Learn More About Performance Metrics (→ `./performance-metrics`) | `content_click` + `product=bci` | ❌ wire `trackRelatedBci` |
| 8 | `casestudies` | case study cards (4) | "Where Imagination Meets Control" (30-37%) | Passion for Blending Music, brain-drone race, Childhood Connections, neuromarketing | `content_click` (no product) | ❌ wire `trackCaseStudies` |
| 9 | `hero` | BCI-OSC buy CTA (own add-on) | "Scale Your BCI Capabilities" (40%) | Buy now → `shop.emotiv.com/bci-osc` | `cta_click` + `product=bci` | ❌ wire `trackHeroBci` |
| 10 | `download` | Launcher download | "Scale Your BCI Capabilities" (42%) | Download (→ `./emotiv-launcher`) | `cta_click` + `product=bci` | ❌ wire `trackDownloadBci` |
| 11 | `related` | Node-RED toolbox doc | "Scale Your BCI Capabilities" (44%) | Learn More About Node-RED Toolbox (gitbook) | `content_click` + `product=bci` | ❌ wire `trackRelatedBci` |
| 12 | `download` | third-party app badges | Mindful Garden / Hearts & Heal (46-49%) | App Store (×3), Google Play (×6), App Store (×3) | `cta_click` (no product — third-party apps) | ❌ wire `trackDownload` |
| 13 | `crosssell` | Emotiv Play (external, other product) | app section | Learn more about Emotiv Play (×3 → `emotivplay.com`) | `content_click` + `product=bci` | ❌ wire `trackCrosssellInfoBci` |
| 14 | `related` | developer / register links | developer sections (10% + 92%) | Become an Emotiv Developer (×3), Register | `content_click` + `product=bci` | ❌ wire `trackRelatedBci` |
| 15 | `related` | academy / article links | "Emotiv Academy" / "Get Started with EmotivBCI" (89-92%) | Watch Series (YouTube), Learn More (gitbook) | `content_click` + `product=bci` | ❌ wire `trackRelatedBci` |
| 16 | `news` | blog article | IFA+ Summit (91%) | IFA+ Summit 17: Erica Warp – Brain Wearables | `content_click` (no product) | ❌ wire `trackNews` |
| 17 | `footer` | footer band CTAs (shared) | footer | User & Product Research | `cta_click` | ✅ live |
| 18 | `footernav` | footer link columns (shared) | footer | Academic Research, Epoc X | `content_click` | ✅ live |
| 19 | `snackbar` | floating promo banner (GLOBAL — no product) | bottom overlay | promo | `cta_click` | ✅ live |

## Decisions

**Hero count corrected ×3 → ×1 (+2 in the top strip).** `Download EmotivBCI` appears 3 times: **2 in the top sub-nav strip** → `productnav`, **1 in the hero body** → `hero`. Verified by ancestor container against live `/epoc-x`.

**Dependency clause.** `Download EmotivBCI` → `./emotiv-launcher` stays on the page's primary sections even though Launcher is a different product: the Launcher is *how you install BCI*, so the click answers "did someone want BCI". Labelling it crosssell would zero out this page's primary conversion. See `vocabularies/emotiv.md` → dependency links.

**Rev-4 re-bucket (2026-09-17).** Rows 4-7, 11, 13-15 changed from the first pass:

| Was | Now | Why |
|---|---|---|
| `productnav` (hardware Buy now ×3) | `crosssell` + `cta_click` | different products, buy intent |
| `productnav` (Learn More About X ×3) | `crosssell` + `content_click` | different products, learn intent |
| `productnav` (Additional Modules, Explore BCI-OSC) | `related` | same-page anchor / own add-on |
| `productnav` (Performance Metrics, Node-RED, Register, Developer, academy) | `related` | leave the page, refer no other product |
| unwired (Emotiv Play ×3) | `crosssell` | your decision to wire Emotiv Play |

**Row 9 stays `hero`** — BCI-OSC is this page's own add-on (same-product clause). **Row 16 `news`** — the IFA+ Summit link is a blog article, so it belongs with the article value, not `related`.

**Labels required on row 4.** Three buttons share the text `Buy now` but target three different products; auto-capture collapses them to one string. Set `data-umami-event-label` per instance: `Buy now — Epoc X`, `Buy now — Insight`, `Buy now — MN8`. No `destination` prop (rejected 2026-09-16, reaffirmed 2026-09-17).

Highest-risk page in the set: ~40 page-local instances across 8 values. Recommend a per-region verification pass rather than one end-of-page check.

## Wiring steps

1. Top sub-nav strip (Overview, Features) + sub-nav Download EmotivBCI (×2) → `trackProductNavBci`.
2. Hero "Download EmotivBCI" (×1 body) → `trackHeroBci`.
3. Hardware cross-sell "Buy now" (×3) → `trackCrosssellBci` + explicit label per button.
4. Hardware cross-sell "Learn More About…" (×3) → `trackCrosssellInfoBci`.
5. "Additional Modules" + "Explore BCI-OSC Features" → `trackRelatedBci`.
6. "Learn More About Performance Metrics" → `trackRelatedBci`.
7. 4 case study cards → `trackCaseStudies`.
8. BCI-OSC "Buy now" → `trackHeroBci`.
9. "Download" (Launcher) → `trackDownloadBci`.
10. "Learn More About Node-RED Toolbox" → `trackRelatedBci`.
11. Third-party badges (Mindful Garden, Hearts Heal) → `trackDownload` (plain).
12. "Learn more about Emotiv Play" (×3) → `trackCrosssellInfoBci`.
13. Developer links (Become an Emotiv Developer ×3, Register) → `trackRelatedBci`.
14. "Watch Series" + gitbook "Learn More" → `trackRelatedBci`.
15. IFA+ Summit article → `trackNews`.
16. Publish.

## Verification

```bash
curl -sL "https://www.emotiv.com/emotiv-bci?v=$(date +%s)" | grep -oE 'data-umami-event-section="[^"]*"' | sort | uniq -c
```
Expected page-local additions: `productnav` ≥4, `hero` ≥2, `crosssell` ≥9, `related` ≥10, `download` ≥13, `casestudies` ≥4, `news` ≥1.

```bash
curl -sL "https://www.emotiv.com/emotiv-bci?v=$(date +%s)" | grep -oE 'data-umami-event-product="[^"]*"' | sort | uniq -c
```
Expected: `bci` only (case studies, third-party downloads, blog carry no product).

Cross-sell intent split:
```bash
curl -sL "https://www.emotiv.com/emotiv-bci?v=$(date +%s)" | grep -oE 'data-umami-event="(cta_click|content_click)"[^>]*data-umami-event-section="crosssell"' | grep -oE 'cta_click|content_click' | sort | uniq -c
```
Expected: `cta_click` ≥3 (hardware Buy now), `content_click` ≥6 (3 Learn More + 3 Emotiv Play).
