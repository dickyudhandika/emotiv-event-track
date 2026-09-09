# Pages — Tracked Event Coverage

Per-page Umami event coverage, one file per page, same table shape as `vocabularies/emotiv.md` (`#` / `Value` / `Role` / `Where on page` / `Example CTAs` / `Event`), plus per-row status.

| Page | URL | File | Status | Backing |
|---|---|---|---|---|
| Homepage | `/` | [homepage.md](homepage.md) | ✅ live — control route (A/B ended 2026-09-09; Variant B retired, history in A/B log) | `WIRING.md` |
| Neuroscience article | `/neuroscience/theta-waves-benefits` | [neuroscience.md](neuroscience.md) | ✅ live (2026-08-25, both variants) | `NEUROSCIENCE.md` |
| EPOC X | `/epoc-x` | [epoc-x.md](epoc-x.md) | ✅ live (2026-09-09, product-prop rollout) | `PRODUCT-ROLLOUT.md` |
| Insight | `/insight` | [insight.md](insight.md) | 🟡 planned (hero, sub-nav, accessories) | `PRODUCT-ROLLOUT.md` |

Not audited yet: `/epoc-x-pro`, `/mn8`, `/flex`, `/emotivpro`, solution pages, blog index, knowledge base. Shared sections (`nav`/`footer`/`footernav`/`snackbar`) already live there — see `vocabularies/emotiv.md`; page-specific wiring unmapped.

## Status legend

- ✅ live — verified on published page (server-HTML grep / console spy / network capture)
- 🟡 planned — export exists, wiring mapped, not published
- ⏸ deferred — consciously out of current scope
- ❌ gap — known untracked element
