# EPOC X `/epoc-x` — Event Coverage

Status: ✅ **live** (product-prop rollout) + ✅ **live-global** — double-track fixed 2026-09-09; hero/sub-nav/accessories verified with `product=epoc_x`, globals (nav/footer/snackbar) clean no-product. Case studies, specs, comparison, accessoriesall wired `product=epoc_x` 2026-09-11. Insight cross-sell, testimonials, features, leadmagnet deferred/dropped (see notes).

Current page traffic: 90d pageviews 9,705 (Umami, website `338c5f5a`).

| # | Value | Role | Where on page | Example CTAs | Event | Status |
|---|---|---|---|---|---|---|
| 1 | `nav` | global navigation (shared comp) | header | Shop Now, Start Now | `cta_click` | ✅ live |
| 2 | `footer` | footer band CTAs (shared) | footer | User & Product Research, Academic Research | `cta_click` | ✅ live |
| 3 | `footernav` | footer link columns (shared) | footer | Academic Research, Epoc X, KB | `content_click` | ✅ live |
| 4 | `snackbar` | floating promo banner (GLOBAL — no product by rule) | bottom overlay | MN8 bundle promo | `cta_click` | ✅ live |
| 5 | `hero` | first fold buy CTAs | hero (desktop ×2 + mobile ×2) | Buy, Buy Emotiv Epoc X, Buy now | `cta_click` + `product=epoc_x` | ✅ `trackHeroEpocX` |
| 6 | `productnav` | product sub-nav anchors | sticky sub-nav | Case studies, EmotivPRO, Tech Specs | `cta_click` + `product=epoc_x` | ✅ `trackProductNavEpocX` |
| 7 | `accessories` | accessory cross-sell cards | accessories row | Rubber Comfort Pads, USB Receiver Universal | `cta_click` + `product=epoc_x` | ✅ `trackAccessoriesEpocX` (old `product`-section double-track removed) |
| 8 | `casestudies` | case study cards (whole-card links) | case studies row | Open Your Eyes / See the Music, The Future of Gaming, BCI4Kids Calgary | `content_click` + `product=epoc_x` | ✅ `trackCaseStudiesEpocX` |
| 9 | `specs` | static specification table (desktop + mobile) | spec section | any click in section (no links/buttons) | `content_click` + `product=epoc_x` | ✅ `trackSpecsEpocX` — plant on BOTH breakpoint instances |
| 10 | `comparison` | comparison page CTA | compare section | Show full comparison | `cta_click` + `product=epoc_x` | ✅ `trackComparisonEpocX` |
| 11 | `accessoriesall` | accessories index CTA | accessories section | See all accessories | `cta_click` + `product=epoc_x` | ✅ `trackAccessoriesAllEpocX` |
| 12 | cross-sell | other products' accessory cards | accessories row | Insight cable, sensor tips | — | ⏸ deferred |
| — | `testimonials` | static quote cards (Trusted by Researchers) | testimonials | — | — | ⏸ skipped — no CTA, nothing clickable |
| — | `features` | static spec grid | features | — | — | ⏸ skipped — no CTA |
| — | `leadmagnet` | download card | download | — | — | ⏸ skipped — display card only, no actual form in DOM |

Wiring done. Live-verified 2026-09-09 (v11): hero ×2 + productnav ×6 + accessories ×6 with `product=epoc_x` (14 total); zero old `product`-section anchors; globals clean. Case studies `trackCaseStudiesEpocX` + specs `trackSpecsEpocX` + comparison `trackComparisonEpocX` + accessoriesall `trackAccessoriesAllEpocX` added 2026-09-11 (pending Framer plant + publish + live-verify). Plan: `PRODUCT-ROLLOUT.md` → `/epoc-x` mapping.

## A/B test log (epoc-x)

| Item | Detail |
|---|---|
| Test | Hero layout — control vs left-aligned hero variant |
| Control route | `C7IYYq1t2` → Umami tag `epocx-control` |
| Variant B route | `GU6vo2Ncg` → tag `epocx-variant-b` |
| Scope | **Variant B edits hero only** — productnav ×6 + accessories ×6 are the integrity check (should come out ~equal across variants) |
| Variant source | `data-framer-hydrate-v2` routeId on `#main` — never the `framer_variant` URL param (random per real visitor) |
| Hero diff | control: centered, black text, gradient headline, "Buy now" ×4 · variant B: left-aligned, white text, "Buy Now" ×4 (CTA casing differs slightly — labels not identical across variants) |
| Tracking | No new events — same `cta_click` + `product=epoc_x`; analysis = Umami Path `/epoc-x` split by session tag |
| Started | 2026-09-10 (tags live-verified both variants; script ×1, no double-inject) |
| Mechanism | Snippet `obcX5y7mC` (renamed "epocx AB tag") — routeId → tag map, fallback `epocx-control`, scoped `^\/epoc-x\/?$` |
| Baseline snippet (new 2026-09-10) | "site baseline tag" — injects script.js with tag `site-baseline` on every page EXCEPT `/epoc-x`. Old `obcX5y7mC` was the site's ONLY injector; adding the epocx scope killed tracking on `/`, `/insight`, etc. Baseline restores it. Scope gotcha on record: Framer Custom Code with no path scope ships on ALL pages — always pair routeId map with a path guard AND a companion baseline injector |

### 2026-09-11 integrity check — accessories layout differs between variants

After wiring case studies/specs/comparison/accessoriesall, `framer_variant` curl audit found:

| Section | Control (C7IYYq1t2) | Variant B (GU6vo2Ncg) | Verdict |
|---|---|---|---|
| `casestudies` | 3 | 3 | ✅ equal |
| `specs` | 8 | 8 | ✅ equal |
| `comparison` | 2 | 2 | ✅ equal |
| `accessoriesall` | 2 | 2 | ✅ equal |
| `productnav` | 6 | 6 | ✅ equal |
| `hero` | 2 | 4 | expected (hero-only diff) |
| `accessories` | 6 | **4** | ✅ corrected baseline (variant B slideshow = 2 products × desk/mob) |

**Root cause: variant B uses a DIFFERENT accessories component** — a "More Accessories" **slideshow** (`Related Accessories section` → `slideshow` → `item`, cards `desk w price`/`mobile w price`), NOT the control's static grid. The slideshow was never wired.

**Variant B slideshow content** (2 products vs control's 3):
- Epoc X Comfort Pads → `./epoc-x-rubber-comfort-pads`
- (USB Receiver) → `./epoc-x-usb-receiver-universal` — each slide ×2 breakpoints = 4 card `<a>` elements

**Fix (done 2026-09-11, live-verified):** planted `trackAccessoriesEpocX` (`cta_click`/`accessories`/`epoc_x`) on the shared slideshow `item` card component root (whole-card link, per slideshow rule — NOT the slideshow wrapper). Live count = **4** events (2 products × desk+mob) — exactly as predicted. The original "~equal ×6" assumption was wrong: variant B genuinely has 2 accessory products in a different component. Corrected integrity baseline for `accessories`: control 6, variant B 4.
