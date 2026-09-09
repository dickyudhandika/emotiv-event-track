# Pages — Tracked Event Coverage

Public index of every emotiv.com page wired for Umami event tracking, with live-verification status. One row per page: what's planted, what's verified, what's still unwired.

Status legend:
- ✅ **live** — verified on the published page (server-HTML grep and/or console spy)
- 🟡 **planned** — export exists in `templates/umami.tsx`, wiring mapped in `PRODUCT-ROLLOUT.md`, not yet published
- ❌ **gap** — known untracked element on a live page

| Page | URL | Events planted | Live status | Detail |
|---|---|---|---|---|
| Homepage | `/` | `cta_click` (nav ×2, hero ×2, product ×16/20, applications, pathway ×5, platform, footer ×3), `content_click` (news ×4, footernav ×42), `form_submit` (footer newsletter) — both A/B variants | ✅ live (2026-08-11, DOM scan + console spy, both variants) | `WIRING.md` |
| Neuroscience article (A/B banner) | `/neuroscience/theta-waves-benefits` | `neuroscience_{control\|variation}_{impression\|click}_banner{1,2,3}` ×12, Custom Code End-of-Body tracker | ✅ live (2026-08-25, network capture + umami.track interceptor, both variants) | `NEUROSCIENCE.md` |
| EPOC X product page | `/epoc-x` | `cta_click` (nav, footer ×10, snackbar ×5), accessories ×4 (`product` section) | 🟡 planned — hero ×4 + sub-nav ×3 untracked; accessories rewire to `accessories` model pending; see `PRODUCT-ROLLOUT.md` | `/epoc-x` mapping |
| Insight product page | `/insight` | `cta_click` (nav ×6, footer ×15, snackbar ×5), accessories ×6 (`product` section), `form_submit` (snackbar?) | 🟡 planned — hero ×2 + sub-nav untracked; product prop rollout pending | `PRODUCT-ROLLOUT.md` |

Shared-everywhere sections (`nav`, `footer`, `footernav`, `snackbar`) repeat on all pages — see `vocabularies/emotiv.md` for the section registry and `PRODUCT-ROLLOUT.md` for the product-prop rollout plan.

Not verified yet: `/epoc-x-pro`, `/mn8`, `/flex`, `/emotivpro`, solution pages, blog index, knowledge base. Same shared nav/footer/snackbar tracking applies there; page-specific wiring not audited.
