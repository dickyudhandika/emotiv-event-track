# EmotivBCI `/emotiv-bci` — Event Coverage

Status: 🟡 **planned** — live audit 2026-09-17; complex page — hero download + sub-nav + hardware cross-sell + BCI-OSC + case studies + third-party app badges. Globals live.

Current page traffic: pending (Umami website `338c5f5a`).

| # | Value | Role | Where on page | Example CTAs | Event | Status |
|---|---|---|---|---|---|---|
| 1 | `nav` | global navigation (shared comp) | header | Shop Now | `cta_click` | ✅ live |
| 2 | `productnav` | sub-nav anchors | sticky sub-nav (10%) | Overview, Features, Additional Modules | `cta_click` + `product=bci` | ❌ wire `trackProductNavBci` |
| 3 | `hero` | primary download CTA | hero (10%) | Download EmotivBCI (×3) | `cta_click` + `product=bci` | ❌ wire `trackHeroBci` |
| 4 | `productnav` | hardware cross-sell | "Select Your Brain Interface" (24-29%) | Buy now → Epoc X / Insight / MN8 (×3), Learn More About Epoc X / Insight / MN8 (×3) | `cta_click` + `product=bci` | ❌ wire `trackProductNavBci` |
| 5 | `productnav` | performance-metrics link | "Select Your Brain Interface" (30%) | Learn More About Performance Metrics | `cta_click` + `product=bci` | ❌ wire `trackProductNavBci` |
| 6 | `casestudies` | case study cards (4) | "Where Imagination Meets Control" (30-37%) | Passion for Blending Music, brain-drone race, Childhood Connections, neuromarketing | `content_click` (no product) | ❌ wire `trackCaseStudies` |
| 7 | `hero` | BCI-OSC buy CTA | "Scale Your BCI Capabilities" (40%) | Buy now (BCI-OSC) | `cta_click` + `product=bci` | ❌ wire `trackHeroBci` |
| 8 | `productnav` | "Explore BCI-OSC Features" | "Scale Your BCI Capabilities" (41%) | Explore BCI-OSC Features | `cta_click` + `product=bci` | ❌ wire `trackProductNavBci` |
| 9 | `download` | Launcher download | "Scale Your BCI Capabilities" (42%) | Download | `cta_click` + `product=bci` | ❌ wire `trackDownloadBci` |
| 10 | `productnav` | Node-RED toolbox link | "Scale Your BCI Capabilities" (44%) | Learn More About Node-RED Toolbox | `cta_click` + `product=bci` | ❌ wire `trackProductNavBci` |
| 11 | `download` | third-party app badges | Mindful Garden / Hearts & Heal (46-49%) | App Store (×3), Google Play (×6), App Store (×3) | `cta_click` (no product — third-party apps) | ❌ wire `trackDownload` |
| 12 | `productnav` | Register / Become a Developer | developer sections (10% + 92%) | Become an Emotiv Developer (×3 hero), Register | `cta_click` + `product=bci` | ❌ wire `trackProductNavBci` |
| 13 | `news` | academy / article links | "Emotiv Academy" / "Get Started with EmotivBCI" (89-92%) | Watch Series, IFA+ Summit article, Learn More (gitbook) | `content_click` (no product) | ❌ wire `trackNews` |
| 14 | `footer` | footer band CTAs (shared) | footer | User & Product Research | `cta_click` | ✅ live |
| 15 | `footernav` | footer link columns (shared) | footer | Academic Research, Epoc X | `content_click` | ✅ live |
| 16 | `snackbar` | floating promo banner (GLOBAL — no product) | bottom overlay | promo | `cta_click` | ✅ live |

Decision (plan, user-confirmed): hardware cross-sell "Buy now" links → `productnav`, **not** `hero` — they are not this page's primary conversion. BCI-OSC "Buy now" → `hero` (direct purchase of this page's add-on). Third-party wellness-app badges → plain `trackDownload` (no product; they are not EmotivBCI). `Become an Emotiv Developer` is shared-component navigation on other pages, but here the ×3 instances sit inside page-local hero content at 10% — wire those three, leave the footer/nav copies global. This is the highest-risk page in the set (~40 page-local CTA instances, 6 regions): recommend a per-region verification pass rather than one end-of-page check.

Wiring steps:
1. Sub-nav (Overview, Features, Additional Modules) → `trackProductNavBci`.
2. Hero "Download EmotivBCI" (×3) → `trackHeroBci`.
3. Hardware cross-sell (Buy now ×3, Learn More ×3) → `trackProductNavBci`.
4. "Learn More About Performance Metrics" → `trackProductNavBci`.
5. BCI-OSC "Buy now" → `trackHeroBci`; "Explore BCI-OSC Features" → `trackProductNavBci`.
6. "Download" (Launcher) → `trackDownloadBci`.
7. "Learn More About Node-RED Toolbox" → `trackProductNavBci`.
8. Hero developer links (Become an Emotiv Developer ×3, Register) → `trackProductNavBci`.
9. 4 case study cards → `trackCaseStudies`.
10. Third-party app badges (Mindful Garden, Hearts & Heal) → `trackDownload` (plain).
11. Academy/article links (Watch Series, IFA+ Summit, gitbook Learn More) → `trackNews`.
12. Publish.
13. Verify sections: `curl -sL "https://www.emotiv.com/emotiv-bci?v=$(date +%s)" | grep -oE 'data-umami-event-section="[^"]*"' | sort | uniq -c`
    Expected page-local additions: `hero` ≥4, `productnav` ≥14, `download` ≥13, `casestudies` ≥4, `news` ≥3.
14. Verify product: `curl -sL "https://www.emotiv.com/emotiv-bci?v=$(date +%s)" | grep -oE 'data-umami-event-product="[^"]*"' | sort | uniq -c`
    Expected: `bci` only (case studies, news, third-party downloads carry no product).
