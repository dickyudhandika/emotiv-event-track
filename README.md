# Emotiv Event Track

A shared **section vocabulary** for Umami event tracking on Emotiv's websites — plus the rules and skill that keep it consistent.

## What this is

Umami custom events have three dimensions:

| Dimension | Who sets it | Example |
|---|---|---|
| **Action** | event name | `cta_click` |
| **Section** | prop (this repo) | `hero`, `nav`, `tiers` |
| **Page** | Umami auto (`url`) | `/`, `/epoc-x` |
| **Button** | `label` (auto-captured) | `Buy`, `Start free trial` |

This repo defines the **section vocabulary** — the controlled list of `section` values per site — plus the rules for how values get added, so dashboards stay comparable and history doesn't break on redesign.

### Available values (EMOTIV)

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
| 10 | `productnav` | product sub-nav | product pages | Overview, Case studies, Tech Specs, Buy | `cta_click` |
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

**Legacy** (kept for other pages, not in count): `pricing` (`cta_click`), `howitworks` (`cta_click`), `faq` (`faq_toggle`).

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
│   └── SKILL.md                 # same rules, agent-executable (any harness)
├── vocabularies/
│   ├── emotiv.md                # EMOTIV vocabulary (reference)
│   └── _template.md             # blank per-site vocabulary
├── templates/
│   └── umami.tsx                # Framer override file template
├── .github/
│   └── PULL_REQUEST_TEMPLATE.md
├── CONTRIBUTING.md
└── LICENSE
```

## How to use it

### 1. Install the skill (manual — works in any harness)

The skill is plain markdown. Copy `skill/SKILL.md` into your agent's instructions:

| Harness | Where it goes |
|---|---|
| Hermes | `~/.hermes/skills/emotiv-event-track/SKILL.md` |
| Claude Code | `~/.claude/skills/emotiv-event-track/SKILL.md` |
| Codex | `~/.codex/skills/` or paste into `AGENTS.md` |
| Cursor | `.cursor/rules/` or `AGENTS.md` |
| Any agent | paste `SKILL.md` content into system prompt / context file |

No CLI, no dependencies — just a file.

### 2. Send the page

Give the agent a URL (or sitemap) and the site's vocabulary file. The agent:

1. **Scans** the page — lists every CTA region top-to-bottom
2. **Compares** — against the site vocabulary
3. **Reuses** — role exists → assign existing value
4. **Adds** — role missing + "will you compare it?" = yes → new value (3 gates + 4 steps, see RULES.md)
5. **Outputs** — updated vocabulary + `umami.tsx` exports + wiring instructions

### 3. Wire it in Framer

1. Paste `templates/umami.tsx` into Framer → Code Overrides
2. Select a button → Overrides panel → pick the export matching its section
3. Publish
4. Verify with the console spy (see RULES.md)

## Contributing

New site vocabulary, new section values, rule changes — all welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) and the [PR template](.github/PULL_REQUEST_TEMPLATE.md).

## License

MIT — see [LICENSE](LICENSE).
