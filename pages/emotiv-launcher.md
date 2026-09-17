# Emotiv Launcher `/emotiv-launcher` — Event Coverage

Status: 🟡 **planned** — live audit 2026-09-17; hero anchor + 4 platform downloads untracked, globals live. Clean (no mis-tags).

Current page traffic: pending (Umami website `338c5f5a`).

| # | Value | Role | Where on page | Example CTAs | Event | Status |
|---|---|---|---|---|---|---|
| 1 | `nav` | global navigation (shared comp) | header | Shop Now | `cta_click` | ✅ live |
| 2 | `productnav` | on-page hero anchor | hero (25%) | Download Now For Free (×2) | `cta_click` + `product=launcher` | ❌ wire `trackProductNavLauncher` |
| 3 | `productnav` | "Learn More" anchor | hero (26%) | Learn More (×2) | `cta_click` + `product=launcher` | ❌ wire `trackProductNavLauncher` |
| 4 | `productnav` | EmotivPRO cross-sell | "Analyze" band (41%) | Learn More → `/emotivpro` | `cta_click` + `product=launcher` | ❌ wire `trackProductNavLauncher` |
| 5 | `download` | platform installer downloads | "Download Emotiv Launcher" (50-60%) | Download → macOS (×3), Windows x64 (×3), Ubuntu .deb (×3), Raspberry Pi armhf (×3) | `cta_click` + `product=launcher` | ❌ wire `trackDownloadLauncher` |
| 6 | `footer` | footer band CTAs (shared) | footer | User & Product Research | `cta_click` | ✅ live |
| 7 | `footernav` | footer link columns (shared) | footer | Academic Research, Epoc X | `content_click` | ✅ live |
| 8 | `snackbar` | floating promo banner (GLOBAL — no product) | bottom overlay | promo | `cta_click` | ✅ live |

Notes: hero "Download Now For Free" links to the on-page `#download` anchor (not a direct file) → `productnav`; the four real installer buttons → `download` + `product=launcher`. All four installer destinations live on `horizon-cdn.emotiv.com`. **4 download instances, not the plan's 3** (each platform link renders desktop + mobile + one extra). `Learn More → /emotivpro` has identical label text to the two hero anchors but a different meaning — recommend an explicit `data-umami-event-label` on the cross-sell one so labels don't collide in dashboards (RULES.md → Labels).

Wiring steps:
1. "Download Now For Free" (×2) → Overrides → `trackProductNavLauncher`.
2. "Learn More" hero anchors (×2) → Overrides → `trackProductNavLauncher`.
3. "Learn More" (EmotivPRO cross-sell) → Overrides → `trackProductNavLauncher` + set explicit `data-umami-event-label="Learn More (EmotivPRO)"`.
4. 4 platform installers (macOS, Windows, Ubuntu, Raspberry Pi) → Overrides → `trackDownloadLauncher`.
5. Publish.
6. Verify sections: `curl -sL "https://www.emotiv.com/emotiv-launcher?v=$(date +%s)" | grep -oE 'data-umami-event-section="[^"]*"' | sort | uniq -c`
   Expected page-local additions: `productnav` ≥5, `download` ≥16.
7. Verify product: `curl -sL "https://www.emotiv.com/emotiv-launcher?v=$(date +%s)" | grep -oE 'data-umami-event-product="[^"]*"' | sort | uniq -c`
   Expected: `launcher` with count ≥ 21.
