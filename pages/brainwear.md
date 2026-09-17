# Brainwear `brainwear.app` — Event Coverage

Status: 🟡 **planned** — live audit 2026-09-17; ZERO tracking (no `data-umami-event` attributes anywhere). Umami script loaded, site `338c5f5a`. Separate domain, same Umami site.

Current page traffic: pending (Umami website `338c5f5a`).

| # | Value | Role | Where on page | Example CTAs | Event | Status |
|---|---|---|---|---|---|---|
| 1 | `hero` | first fold buy CTA | hero (1%) | Get Brainwear (×5) | `cta_click` + `product=brainwear` | ❌ wire `trackHeroBrainwear` |
| 2 | `productnav` | in-page nav link | hero (2%) | Learn More (×5) → `./how-it-works` | `cta_click` + `product=brainwear` | ❌ wire `trackProductNavBrainwear` |
| 3 | `download` | app store badges (×2 destinations) | "Brainwear app gives you guidance." (10%) | App Store (×4), Google Play (×4) | `cta_click` + `product=brainwear` | ❌ wire `trackDownloadBrainwear` |
| 4 | `productnav` | body nav links | "Start with a check-in" (81%) + footer band (89%) | How it Works (×2), How It Works (×2), FAQ (×2) | `cta_click` + `product=brainwear` | ❌ wire `trackProductNavBrainwear` |
| 5 | `hero` | bottom shop CTA | footer band (90%) | Shop now (×2) | `cta_click` + `product=brainwear` | ❌ wire `trackHeroBrainwear` |

Notes: **brainwear.app is a separate domain and a separate Framer project** — it does NOT share emotiv.com's nav/footer/footernav/snackbar components, and its globals are not tracked. `templates/umami.tsx` must be pasted into the brainwear.app project's Code Overrides independently (plan confirmed user has Framer access to it). Live counts: Get Brainwear ×5, Learn More ×5, App Store ×4, Google Play ×4, Shop now ×2, plus body How-it-Works/FAQ links ×6. `Explore Play` + `Discover the Experiences` (×5) and `How We Protect Your Data` are external (`emotivplay.com`, `emotiv.com/emotiv-eeg-cloud`) — **out of scope** for this pass; wire them only if outbound-brand clicks become a KPI. Plan listed `Explore Play`/`Discover` under `productnav`; flagging as a deliberate exclusion rather than a silent omission.

Wiring steps:
1. Paste `templates/umami.tsx` into the brainwear.app Framer project → Code Overrides.
2. "Get Brainwear" (×5) → Overrides → `trackHeroBrainwear`.
3. "Learn More" (×5, hero) → Overrides → `trackProductNavBrainwear`.
4. App Store (×4) + Google Play (×4) → Overrides → `trackDownloadBrainwear`.
5. Body nav: "How it Works" / "How It Works" (×4), "FAQ" (×2) → Overrides → `trackProductNavBrainwear`.
6. Bottom "Shop now" (×2) → Overrides → `trackHeroBrainwear`.
7. Publish.
8. Verify events: `curl -sL "https://brainwear.app/?v=$(date +%s)" | grep -oE 'data-umami-event="[^"]*"' | sort | uniq -c`
   Expected: `cta_click` with count ≥ 22.
9. Verify product: `curl -sL "https://brainwear.app/?v=$(date +%s)" | grep -oE 'data-umami-event-product="[^"]*"' | sort | uniq -c`
   Expected: `brainwear` with count ≥ 22.
