# Emotiv Event Track

A shared **section vocabulary** for Umami event tracking — plus the rules, skill, and export template that keep it consistent. Generic enough for any site; EMOTIV is the worked example.

## What this is

Umami custom events have three dimensions:

| Dimension | Who sets it | Example |
|---|---|---|
| **Action** | event name | `cta_click` |
| **Section** | prop (this repo) | `hero`, `nav`, `tiers` |
| **Page** | Umami auto (`url`) | `/`, `/epoc-x` |
| **Button** | `label` (auto-captured) | `Buy`, `Start free trial` |

This repo defines the **section vocabulary** — the controlled list of `section` values per site — plus the rules for how values get added, so dashboards stay comparable and history doesn't break on redesign.

**Generic on purpose.** The rules and the skill (`skill/SKILL.md`) apply to any website and any page builder. Site-specific facts live in one file per site: `vocabularies/<site>.md`. To onboard a new site: share its URL with an agent that has the skill installed — it audits the live page, proposes a plant table, writes the vocabulary, and opens a PR here.

### Available values (EMOTIV — worked example)

**Column legend:**
- **Value** — the `section` prop sent to Umami. Lowercase, single word, stable forever.
- **Role** — the layout function of the region (what it does in the page flow). The question the value answers.
- **Event** — the action verb sent as the event name. Conversion vs content vs form.

| # | Value | Role | Pages | Example CTAs | Event |
|---|---|---|---|---|---|
| 1 | `nav` | global navigation | all | Shop Now | `cta_click` |
| 2 | `hero` | first fold | all | Buy now, User & Product Research | `cta_click` |
| 3 | `banner` | promo band / 2nd hero | pages with promo | promo CTA | `cta_click` |
| 4 | `applications` | use-case cards | homepage | Access Research Hub, card clicks | `cta_click` |
| 5 | `pathway` | audience selector | homepage | Unlock What Customers Really Want, Play Now, Start Building | `cta_click` |
| 6 | `platform` | platform pitch | homepage | Start Building | `cta_click` |
| 7 | `product` | hardware/accessory grid | homepage, comparison, accessories | View Specs, Shop now, See Accessory | `cta_click` |
| 8 | `news` | article cards | homepage, blog index | Read latest news, Learn more | `content_click` |
| 9 | `footer` | footer band + newsletter | all | User & Product Research, Academic Research | `cta_click` |
| 10 | `productnav` | product sub-nav — TOP strip only | product pages | Overview, Case studies, Tech Specs, Buy | `cta_click` |
| 11 | `features` | spec feature grid | product pages | feature card clicks | `cta_click` |
| 12 | `casestudies` | case study cards | product pages | See case study ×3 | `content_click` |
| 13 | `testimonials` | researcher quotes | product pages | Validation Studies | `cta_click` |
| 14 | `leadmagnet` | whitepaper download + form | product pages | Download whitepaper | `form_submit` |
| 15 | `specs` | specifications accordion | product pages, comparison | Specifications | `cta_click` |
| 16 | `usecases` | solution use-case cards | solution pages (enterprise, academic, developer) | Customer Experiences, Workplace Wellness | `cta_click` |
| 17 | `gettingstarted` | developer onboarding 3-step | /developer | Create an Emotiv account, Register your app | `cta_click` |
| 18 | `tiers` | developer partner tiers | /developer | Register, Contact us | `cta_click` |
| 19 | `community` | developer Learn & Connect | /developer | Explore, Go to Github | `content_click` |
| 20 | `download` | software download links | emotivpro, developer | App Store, Download | `cta_click` |
| 21 | `footernav` | footer link columns | all | Academic Research, Epoc X, Knowledge Base | `content_click` |
| 22 | `snackbar` | floating promo banner | all | MN8 bundle promo | `cta_click` |
| 23 | `accessories` | accessory cross-sell cards | product pages | accessory card clicks | `cta_click` |
| 24 | `comparison` | comparison page CTA | product pages | Show full comparison | `cta_click` |
| 25 | `accessoriesall` | accessories index CTA | product pages | See all accessories | `cta_click` |
| 26 | `crosssell` | link to a **different** product | product pages (body) | Buy now → Epoc X, Learn about EMOTIVPRO | `cta_click` (buy) / `content_click` (learn) |
| 27 | `related` | in-body link referring **no other product** | product pages (body) | Performance Metrics, Register, Node-RED | `content_click` |

**Legacy** (kept for other pages, not in count): `pricing` (`cta_click`), `howitworks` (`cta_click`), `faq` (`faq_toggle`).

**Section values:** `nav`, `hero`, `banner`, `applications`, `pathway`, `platform`, `product`, `news`, `footer`, `productnav`, `features`, `casestudies`, `testimonials`, `leadmagnet`, `specs`, `usecases`, `gettingstarted`, `tiers`, `community`, `download`, `footernav`, `snackbar`, `accessories`, `comparison`, `accessoriesall`, `crosssell`, `related` (27).

**`productnav` / `crosssell` / `related` (rev 4, 2026-09-17)** — `productnav` = the TOP sub-nav strip only. Body links split by href: `crosssell` = different Emotiv product, `related` = leaves the page but refers no other product. Same-product destinations and dependency links stay on the page's own sections. See `vocabularies/emotiv.md` → Value split.

**Product values** (2026-09-17, rev 4): `epoc_x`, `epoc_x_pro`, `mn8`, `flex`, `insight`, `emotivpro`, `studio`, `brainviz`, `bci`, `launcher`, `brainwear` (11 total: 6 hardware + 5 software/brand). Product prop is for **page-local** content only — global nav/footer/snackbar never carry it. See `vocabularies/emotiv.md` → Product vocabulary.

**Product label variants** (same `product` section): `trackProduct` injects event + section only; label comes from the global listener's auto-capture with Framer dedupe (name leads the card → `Epoc X` / `MN8` / `Flex 2.0` / `Insight` distinct). See `RULES.md` → Labels → Framer dedupe.

Full registry with notes: [`vocabularies/emotiv.md`](vocabularies/emotiv.md).

Per-element wiring (what's planted where): [`WIRING.md`](WIRING.md).

Neuroscience blog A/B banner tracking (Custom Code script, verified live): [`NEUROSCIENCE.md`](NEUROSCIENCE.md).

## Why it matters

- **Cross-page comparison** — `section=hero` means the same thing on every page. Numbers or per-page names break this.
- **Redesign-proof** — values are named by layout *role*, not position. Reordering sections doesn't corrupt history.
- **Scannable dashboards** — `section=hero` reads instantly; `section=4` requires a decoder map.

## Repo layout

```
emotiv-event-track/
├── README.md                    # this file
├── RULES.md                     # the rules, human-readable
├── WIRING.md                    # what's planted where (per page)
├── NEUROSCIENCE.md              # neuroscience blog A/B banner tracking (verified)
├── skill/
│   └── SKILL.md                 # generic, agent-executable (any harness, any site) — canonical
├── vocabularies/
│   ├── emotiv.md                # EMOTIV vocabulary (worked example)
│   └── _template.md             # blank per-site vocabulary — start here for a new site
├── templates/
│   └── umami.tsx                # Framer override file template
├── .github/
│   └── PULL_REQUEST_TEMPLATE.md
├── CONTRIBUTING.md
└── LICENSE
```

## How to use it

### 1. Install the skill (manual — works in any harness)

The skill is plain markdown and **generic** — it works for any site, not just Emotiv. Copy `skill/SKILL.md` into your agent's instructions:

| Harness | Where it goes |
|---|---|
| Hermes | `~/.hermes/profiles/<profile>/skills/umami-section-vocabulary/SKILL.md` |
| Claude Code | `~/.claude/skills/umami-section-vocabulary/SKILL.md` |
| Codex | `~/.codex/skills/umami-section-vocabulary/SKILL.md` or paste into `AGENTS.md` |
| Cursor | `.cursor/rules/` or `AGENTS.md` |
| Any agent | paste `SKILL.md` content into system prompt / context file |

No CLI, no dependencies — just a file. Keep the local copy in sync with `skill/SKILL.md`; the repo copy is canonical.

### 2. Share a link

Give the agent a URL (or sitemap). Nothing else is required — the agent loads the site's vocabulary from this repo if one exists, audits the live page, and comes back with a plant table:

1. **Loads** the site vocabulary (or starts from [`vocabularies/_template.md`](vocabularies/_template.md))
2. **Audits** the live DOM — every CTA region, container-based, not from a plan or screenshot
3. **Compares** — against the vocabulary
4. **Reuses** — role exists → assign the existing value
5. **Adds** — role missing + "will you compare it?" = yes → new value (3 gates + 4 steps, see `RULES.md`)
6. **Proposes** a plant table — region, CTA, `section`, event, export → **you approve before anything is written**
7. **Outputs** the vocabulary file + exports + wiring instructions
8. **Opens a PR** back here (see [CONTRIBUTING.md](CONTRIBUTING.md))

### 3. Wire it in Framer

1. Paste `templates/umami.tsx` into Framer → Code Overrides
2. Select a button → Overrides panel → pick the export matching its section
3. Publish
4. Verify with the console spy (see RULES.md)

## Contributing

New site vocabulary, new section values, rule changes — all welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) and the [PR template](.github/PULL_REQUEST_TEMPLATE.md).

## License

MIT — see [LICENSE](LICENSE).
