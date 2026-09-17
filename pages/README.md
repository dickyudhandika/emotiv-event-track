# Pages — Tracked Event Coverage

Per-page Umami event coverage, one file per page, same table shape as `vocabularies/emotiv.md` (`#` / `Value` / `Role` / `Where on page` / `Example CTAs` / `Event`), plus per-row status.

| Page | URL | File | Status | Backing |
|---|---|---|---|---|
| Homepage | `/` | [homepage.md](homepage.md) | ✅ live — control route (A/B ended 2026-09-09; Variant B retired, history in A/B log) | `WIRING.md` |
| Neuroscience article | `/neuroscience/theta-waves-benefits` | [neuroscience.md](neuroscience.md) | ✅ live (2026-08-25, both variants) | `NEUROSCIENCE.md` |
| EPOC X | `/epoc-x` | [epoc-x.md](epoc-x.md) | ✅ live (2026-09-11, full product-prop) | `PRODUCT-ROLLOUT.md` |
| EPOC X PRO | `/epoc-x-pro` | [epoc-x-pro.md](epoc-x-pro.md) | 🟡 planned (2026-09-17 audit — hero ×2 + banner ×4) | `PRODUCT-ROLLOUT.md` |
| Flex | `/flex` | [flex.md](flex.md) | 🟡 planned (2026-09-17 audit — hero + sub-nav + 6 accessories + accessoriesall) | `PRODUCT-ROLLOUT.md` |
| Insight | `/insight` | [insight.md](insight.md) | 🟡 planned (2026-09-17 audit — hero + sub-nav + casestudies + accessories) | `PRODUCT-ROLLOUT.md` |
| MN8 | `/mn8` | [mn8.md](mn8.md) | 🟡 planned (2026-09-17 audit — hero + sub-nav + downloads + accessories) | `PRODUCT-ROLLOUT.md` |
| Studio | `/studio` | [studio.md](studio.md) | 🟡 planned (2026-09-17 audit — 2 cross-sell links only) | `PRODUCT-ROLLOUT.md` |
| EmotivPRO | `/emotivpro` | [emotivpro.md](emotivpro.md) | 🟡 planned (2026-09-17 audit — hero+pricing + sub-nav + downloads + casestudies) | `PRODUCT-ROLLOUT.md` |
| BrainViz | `/emotiv-brainviz` | [emotiv-brainviz.md](emotiv-brainviz.md) | 🟡 planned (2026-09-17 audit — hero ×5 + sub-nav) | `PRODUCT-ROLLOUT.md` |
| EmotivBCI | `/emotiv-bci` | [emotiv-bci.md](emotiv-bci.md) | 🟡 planned (2026-09-17 audit — complex, 6 regions) | `PRODUCT-ROLLOUT.md` |
| Launcher | `/emotiv-launcher` | [emotiv-launcher.md](emotiv-launcher.md) | 🟡 planned (2026-09-17 audit — anchors + 4 platform downloads) | `PRODUCT-ROLLOUT.md` |
| Brainwear | `brainwear.app` | [brainwear.md](brainwear.md) | 🟡 planned (2026-09-17 audit — zero-to-tracked, separate domain) | `PRODUCT-ROLLOUT.md` |

Not audited yet: solution pages (`/enterprise`, `/academic-research-and-education`, `/neuromarketing`, `/brain-computer-interface`, `/developer`), blog index, knowledge base. Shared sections (`nav`/`footer`/`footernav`/`snackbar`) already live there — see `vocabularies/emotiv.md`; page-specific wiring unmapped.

## Status legend

- ✅ live — verified on published page (server-HTML grep / console spy / network capture)
- 🟡 planned — export exists, wiring mapped, not published
- ⏸ deferred — consciously out of current scope
- ❌ gap — known untracked element
