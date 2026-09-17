# EmotivPRO `/emotivpro` — Event Coverage

Status: 🟡 **planned** — live audit 2026-09-17; hero + sub-nav + pricing buys + downloads untracked, globals live.

Current page traffic: pending (Umami website `338c5f5a`).

| # | Value | Role | Where on page | Example CTAs | Event | Status |
|---|---|---|---|---|---|---|
| 1 | `nav` | global navigation (shared comp) | header | Shop Now | `cta_click` | ✅ live |
| 2 | `productnav` | sub-nav anchors | sticky sub-nav (9%) | Overview, Features, Pricing | `cta_click` + `product=emotivpro` | ❌ wire `trackProductNavEmotivpro` |
| 3 | `hero` | buy CTAs (hero + pricing area) | hero (9-17%) + pricing section (43%) | Buy (×2), Buy now (×8 hero), Shop now (×12, pricing area) | `cta_click` + `product=emotivpro` | ❌ wire `trackHeroEmotivpro` |
| 4 | `productnav` | "Learn more" anchor | hero (17%) | Learn more (×2) | `cta_click` + `product=emotivpro` | ❌ wire `trackProductNavEmotivpro` |
| 5 | `download` | app store badges (×3 destinations) | PRO Mobile / PRO Tablet bands (20-24%) | App Store (×2, iOS mobile), Google Play (×4, Android mobile), App Store (×2, iOS tablet) | `cta_click` + `product=emotivpro` | ❌ wire `trackDownloadEmotivpro` |
| 6 | `productnav` | pricing-area nav links | pricing section | View licensing (28%), Compare Plans (×2, 42%), Compare plans (×2, 92%) | `cta_click` + `product=emotivpro` | ❌ wire `trackProductNavEmotivpro` |
| 7 | `productnav` | Launcher cross-sell | pricing/licensing ($0, 50%) | Start now, for free (×3) | `cta_click` + `product=emotivpro` | ❌ wire `trackProductNavEmotivpro` |
| 8 | `casestudies` | study links (3) | "Groundbreaking research" / "Advancing Brain Care" (44-47%) | Read study (×2 IEEE, ×2 Frontiers, ×2 internal) | `content_click` (no product) | ❌ wire `trackCaseStudies` |
| 9 | `news` | tutorial article link | "Lab Streaming Layer" (82%) | Read the Full Tutorial (×2) | `content_click` (no product) | ❌ wire `trackNews` |
| 10 | `footer` | footer band CTAs (shared) | footer | User & Product Research | `cta_click` | ✅ live |
| 11 | `footernav` | footer link columns (shared) | footer | Academic Research, Epoc X | `content_click` | ✅ live |
| 12 | `snackbar` | floating promo banner (GLOBAL — no product) | bottom overlay | Buy (×5, shop.emotiv.com/emotivpro/) | `cta_click` | ✅ live |

Decision (carried from plan, user-confirmed 2026-09-16): **all conversion buy buttons use `section=hero` + `product=emotivpro`**, including the pricing-area CTAs — keeps "hero CTA conversion rate" comparable across pages. Label distinguishes `Buy now` vs `Shop now` vs `Buy`. Live counts: Shop now **12**, Buy now **8**, Buy 2 → 22 buy instances, not the plan's 5. That is a large undercount; wire by *destination + region*, not by a fixed number.

Wiring steps:
1. Sub-nav anchors (Overview, Features, Pricing) → Overrides → `trackProductNavEmotivpro`.
2. Buy CTAs (hero + pricing) → Overrides → `trackHeroEmotivpro` (all breakpoints; 22 instances).
3. "Learn more" (×2) → Overrides → `trackProductNavEmotivpro`.
4. App store badges (×3 destinations, 8 instances) → Overrides → `trackDownloadEmotivpro`.
5. "View licensing", "Compare Plans"/"Compare plans" (×4) → Overrides → `trackProductNavEmotivpro`.
6. "Start now, for free" (×3) → Overrides → `trackProductNavEmotivpro`.
7. "Read study" (×6) → Overrides → `trackCaseStudies`.
8. "Read the Full Tutorial" (×2) → Overrides → `trackNews`.
9. Publish.
10. Verify sections: `curl -sL "https://www.emotiv.com/emotivpro?v=$(date +%s)" | grep -oE 'data-umami-event-section="[^"]*"' | sort | uniq -c`
    Expected page-local additions: `hero` ≥22, `productnav` ≥14, `download` ≥8, `casestudies` ≥6, `news` ≥2.
11. Verify product: `curl -sL "https://www.emotiv.com/emotivpro?v=$(date +%s)" | grep -oE 'data-umami-event-product="[^"]*"' | sort | uniq -c`
    Expected: `emotivpro` only (case studies + news carry no product).
