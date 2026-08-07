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

## Why it matters

- **Cross-page comparison** — `section=hero` means the same thing on every page. Numbers or per-page names break this.
- **Redesign-proof** — values are named by layout *role*, not position. Reordering sections doesn't corrupt history.
- **Scannable dashboards** — `section=hero` reads instantly; `section=4` requires a decoder map.

## Repo layout

```
emotiv-event-track/
├── README.md                    # this file
├── RULES.md                     # the rules, human-readable
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
