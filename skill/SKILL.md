---
name: umami-section-vocabulary
description: "Use when assigning Umami section values to page CTAs. Audit the live DOM → reuse the site's shared vocabulary → add a value only if the role is missing → output exports + a PR to the vocabulary repo. Harness-agnostic."
---

# Umami Section Vocabulary

Assign `section` values to Umami custom events on **any** website. A vocabulary is a controlled list of `section` values for one site — a shared contract, so dashboards stay comparable across pages and history survives a redesign.

**This skill is generic.** It works for any site. Site-specific facts live in that site's vocabulary file in the shared repo, never in this skill.

- Repo (canonical vocabulary + export template): https://github.com/dickyudhandika/emotiv-event-track
- Worked example (EMOTIV, 27 values / 11 entity slugs): https://raw.githubusercontent.com/dickyudhandika/emotiv-event-track/main/vocabularies/emotiv.md

## When this activates

- User shares a link (or sitemap) and asks to track it / set up analytics events
- User provides a URL or page screenshot for event tracking
- User asks to add a new section value, or audit an existing vocabulary
- User asks to contribute a site vocabulary back to the repo

## The one-line contract

**Event name = action verb only. Props = context.**

| Dimension | Who sets it | Example |
|---|---|---|
| Action | event name | `cta_click`, `form_submit`, `faq_toggle` |
| Section | prop (the site's vocabulary) | `hero`, `nav`, `tiers` |
| Subject | optional 2nd prop (the site's vocabulary) | `epoc_x`, `pro-plan`, `enterprise` |
| Page | analytics tool auto (`url`) | `/`, `/pricing` |
| Button | `label` (listener auto-captures the element's text) | `Buy`, `Start free trial` |

## Terms

- **Role** — the layout function of a region (conceptual): "first fold conversion", "global navigation".
- **Value** — the encoded name sent as the `section` prop: `hero`, `nav`, `tiers`.
- **Subject prop** — optional second prop carrying *what the click is about* (a product, plan, or entity). Only if the site needs cross-entity comparison.
- **Vocabulary** — the registry for ONE site: value → role → pages → CTAs. One file per site, shared by everyone who touches that site's tracking.

## Workflow

0. **Load the site vocabulary first.** If the site already has a file (`vocabularies/<site>.md` in the repo), read it — reuse is the default. No file → start from `vocabularies/_template.md`. Never invent a value that already exists under another name.
1. **Audit the live page** (below). Do NOT map from a plan, brief, screenshot, or a previous pass — those ship wrong values. Read the rendered DOM.
2. **Compare each region against the vocabulary.** Role exists → assign the existing value.
3. **Add only if the role is missing** AND the gates pass (below).
4. **Propose the plant table** (below) and get confirmation before writing files. Show the table, not a wall of prose.
5. **Write the artifacts:** site vocabulary file + exports in `templates/umami.tsx` (or the site's own override file).
6. **Contribute it back** — branch, commit, PR (see *Contributing* below).

## Deliverable 1 — the plant table (present this for review)

One row per distinct CTA, grouped by region, with the value you propose. This is the artifact a human approves before anything gets wired.

| # | Region (where it sits) | CTA text | `section` | event | export | second prop |
|---|---|---|---|---|---|---|
| 1 | top sub-nav strip | Overview | `productnav` | `cta_click` | `trackProductnavEpocX` | `product=epoc_x` |
| 2 | top sub-nav strip | Buy | `productnav` | `cta_click` | `trackProductnavEpocX` | `product=epoc_x` |
| 3 | first fold | Buy now | `hero` | `cta_click` | `trackHeroEpocX` | `product=epoc_x` |
| 4 | body link | Learn about EMOTIVPRO | `crosssell` | `content_click` | `trackCrosssellInfoEmotivpro` | `product=emotivpro` |

State expected instance counts as **`≥ N`**, never exact equality — most page builders (Framer, Webflow, WP block themes) render one button per breakpoint variant, so live counts run 2–5× the visible count.

## Deliverable 2 — the files

| File | What changes |
|---|---|
| `vocabularies/<site>.md` | New or updated value registry (template: `vocabularies/_template.md`) |
| `templates/umami.tsx` | One explicit export per (section × entity) pair, or the site's own override file |
| `RULES.md` / `skill/SKILL.md` | Only if the *rule* changed — not for a new site |

## Section rules

1. Section = layout role, not page, not heading copy. Page is already free via `url`.
2. One value per role per site. `hero` on the homepage = `hero` on `/pricing`.
3. Two regions sharing a role on one page → disambiguate: `hero` + `banner`.
4. Name by role: lowercase, single word, stable forever. Renaming = orphan prop values.
5. Cap ~10–20 values per site. Past that you're slicing components, not regions.
6. Label disambiguates *within* a section (`View Specs` ×4 → explicit labels). Never per-button event names unless the button is its own KPI.
7. **Position decides nav vs body.** A sub-nav value covers the TOP nav strip ONLY — the container holding both the section anchors and the nav's own button (Buy / Pre-Order / Download), because they share one region and users are meant to compare nav-driven vs in-page conversion. Body links get their own values: `crosssell` (destination is a DIFFERENT product) and `related` (leaves the page, refers no other product). If you classify by href text alone you will mis-split the nav's own CTA into `hero` and lose that comparison.
8. **The page's own conversion funnel outranks the destination test.** A link to a different product that is nonetheless this page's own install/primary path stays on the page's primary section. Labelling it crosssell zeroes the page's own conversion metric. Same-product destinations (own shop URL, own add-on, own anchors) are never crosssell either.

## Adding a new value — 3 gates + 4 steps

**Gates (all must pass):**

1. **Role missing?** Audited the live page, compared against the vocabulary, the role genuinely does not exist.
2. **Will you compare it?** The value must answer a question someone would actually ask. "Getting Started vs Tiers?" = yes → separate values. "App Store vs Launcher link?" = no → same value, labels differentiate.
3. **Same-page test:** two regions on ONE page get separate values ONLY if they'll be compared against each other. Otherwise merge + labels.

**Steps:**

4. **Name by role:** lowercase, single word, stable forever. `gettingstarted`, not `get-started` or `Getting Started`.
5. **One export per (section × entity):** an explicit function declaration. Factory patterns have a shadowing pitfall — the host's override picker silently breaks.
6. **Update the vocabulary everywhere:** export-file header comment + vocabulary file + changelog line. The header comment is the source of truth for the next scan.
7. **Watch the cap:** past ~20 values, every addition needs a written justification.

**Decision flow:**

```
Region role exists?                        → reuse export
Role missing + will compare?               → add export + update vocabulary
Role missing + won't compare?              → fold into nearest value, label differentiates
Value would MIX heterogeneous roles?       → split it
```

A value that conflates roles is **worse** than a count above the cap. When you split, record the cap breach and the reason in the vocabulary file — "this split stops 1 value conflating 5 roles" is valid justification.

## Auditing a live page (do this BEFORE mapping anything)

Mapping from a plan document or a previous pass is how you ship wrong section values.

1. **Fetch and parse the server HTML.** `lxml.html` (the ancestor walk is what you need). Strip `<footer>` and `<nav>` subtrees first — on most modern sites `<nav>` is the GLOBAL nav only, and page-local sub-nav strips live outside it.
2. **Find the top strip by container, not by href.** Look for the page-builder's own container naming (Framer: `data-framer-name` matching `(links \+ button|submenu|navbar)`; WordPress/Webflow: the wrapper class of the sub-nav block). Identify the container holding BOTH the anchors and the nav's own button.
3. **Classify each anchor by ancestor membership.** For each `<a>`, walk up ≤14 parents; any ancestor in a known top-strip container → `productnav`/sub-nav value. Then classify the rest by href: same-page anchor → body value; different product page or its shop URL → `crosssell`; anything else that leaves → `related`/external.
4. **Dump per-page per-label counts and read them.** Aggregating by `(label, href-without-query)` exposes the same button at multiple breakpoints (×2–×5) and reveals that a label you assumed was one region is actually two (`Pre-Order` ×2 in the top strip + ×4 in the hero).
5. **Write expectations as `≥ N`, never equality.**
6. **Sanity-check against a page that's already live.** Assert your parser reproduces its known-good counts before trusting it on unmapped pages.

Skipping steps 2–3 is the failure mode: a mapping that looks right (all `Buy` buttons → `hero`) silently drops the nav CTA out of the sub-nav value, and the comparison the vocabulary exists for stops working.

If the page is JS-rendered and `curl` returns an empty shell, escalate the fetch: static HTML → headless browser text snapshot → full browser. Cache-bust with `?v=$(date +%s)`.

## The second prop (optional — name it per site)

Use it when the site needs to compare *what* was clicked across entities (products, plans, integrations). **Attribute name is `data-umami-event-<propname>` — the site picks `<propname>` once and never changes it.** EMOTIV calls it `product` (`data-umami-event-product="epoc_x"`); a SaaS site might use `plan`. This skill says "subject" generically; substitute the site's actual name. Rules:

- **Page-local content ONLY.** Global/shared components (nav, footer, snackbar) NEVER carry the second prop — they are ONE component reused everywhere, so the value would be false on every page but one. Globals stay section-only; page attribution is free from the URL filter.
- Applied via per-entity static exports: `track<Section><Entity>`, one explicit export each.
- Sub-items (accessories, add-ons, bundles) map to their **parent** entity; the auto-captured label names the item.
- Accessories/child cards use `section=<parent-section>` + `<propname>=<parent>`, never their own slug.
- Never rename it mid-project — the prop name is as frozen as the values themselves.

## Events

| Event | When | Example |
|---|---|---|
| `cta_click` | conversion-oriented click | Buy, Start building |
| `content_click` | reading/exploring, not conversion | Learn more, article cards |
| `form_submit` | form submission | Newsletter, whitepaper |
| `faq_toggle` | accordion open/close | FAQ questions |

## Labels

- Auto-capture: `if (!data.label) data.label = (umamiEl.textContent || '').trim().slice(0, 40)`
- **Dedupe before slice (required on Framer, harmless elsewhere).** Framer renders button labels twice (visible + aria-hidden), so `textContent` = `"Shop NowShop Now"`. Dedupe BEFORE slice, else the duplicate is cut mid-string:
  ```js
  let label = (umamiEl.textContent || '').trim();
  label = label.replace(/(.{3,})\1/g, '$1'); // collapse doubled visible+aria text
  if (!data.label) data.label = label.slice(0, 40);
  ```
  `(.{3,})` min-length avoids collapsing legit short repeats. This cleans ALL sections at once — not per-button.
- Explicit override: `data-umami-event-label="Epoc X"` wins over auto-capture.
- Use explicit labels when several buttons in one section share identical text but mean different things (three `Buy now` → three products → `Buy now — Epoc X`). Do NOT add a `destination` prop for this; explicit labels cover ~90% of the value at zero system cost.

## Planting the override (where you attach it matters as much as which export)

General rule: **plant on the layer that owns the click**, closest to the interactive element. Too high → over-tracks unrelated clicks and risks double-fire (deepest match wins, so a child click and the root both resolve). Too low in a repeated card → only one card tracks.

Site-builder specifics worth checking:

- **Slideshow/carousel:** an override on the slideshow WRAPPER does not reach the cards — each card's inner `<a>` doesn't inherit the attrs → 0 tracked. Plant on the **card component root** so all slides inherit. Also: slideshows drive per-slide variables, so a prop-reading override gets merged props WITHOUT the per-slide value → falls back to `|| default`. Prefer auto-capture (no forced label) inside slideshows.
- **Accordion / expandable cards:** the CTA button only exists on the OPEN card. Plant on the **button layer only**, NOT the card root — root planting over-tracks (fires on expand clicks) and risks double-fire.
- **Distinct buttons in a repeated component:** if each instance's text differs, auto-capture gives distinct labels from one plant. If they share text, set explicit per-instance `data-umami-event-label`.
- **Variables ≠ props:** a field in the builder's "variables" panel is INTERNAL state, not an exposed prop. A prop-reading override (`props.title`) returns `undefined` for variables → silently falls back to the literal. Diagnose from the live DOM: the fallback literal proves the prop was undefined at runtime.

## A/B tests via session tags (not event-property wrappers)

Prefer a **session tag** over wrapping events: the tag lives on the injected script so every send (pageview + fired events) carries it, and analysis is a tag filter. No new event names — keep `cta_click` and split the dashboard by tag.

- Framer A/B duplicate pages: the `data-framer-hydrate-v2` attribute on `#main` carries a stable `routeId`. Map routeId → `data-tag`. Other builders: pick any server-stable variant marker (server-set class, header, route), never a client-assigned URL param.
- Naming: `<page>-control` / `<page>-variant-b`.
- The fallback tag inside a test snippet must be the control tag of THAT test — never a generic name.
- Keep a second snippet tagging the rest of the site (`site-baseline`) as mirror-image path guards, so no page goes untracked.

**Pitfalls**

- **A snippet that injects the tracker may be the site's ONLY injector.** Before repurposing it for a test, check whether it is page-scoped or global — editing a global injector in place silently kills tracking on every other page. Keep an injector for the rest of the site in the same change.
- **Unscoped custom code ships on every page.** If the snippet has a fallback tag, unmatched pages fall through to it — pollution (non-visitors counted in a variant). Scope at BOTH layers: the builder's snippet page-scope AND a `location.pathname` JS guard.
- **Never trust a variant URL param as the variant label** — it's assigned per visitor. The server-set route id is the routing key.
- **Two injector snippets on one page = double pageview risk.** Verify one script tag per page.
- **SPA navigation gap:** a load-time path guard isn't re-evaluated on client-side navigation. Note it in the test doc.

## Verification

Runtime spy — click a tracked button and read what actually fired:

```js
window._spy = [];
const _t = window.umami.track;
window.umami.track = (n, p) => (_spy.push({ n, p }), _t(n, p));
```

Expect `{ n: "cta_click", p: { section: "hero", label: "Buy" } }` + a second `api/send` in the Network tab (the first is the pageview).

**Live re-verify after wiring** (server HTML, cache-busted):

```bash
curl -sL "https://<site>/<page>?v=$(date +%s)" | grep -o 'data-umami-event-section="[^"]*"' | sort | uniq -c
curl -sL "https://<site>/<page>?v=$(date +%s)" | grep -o 'data-umami-event-<propname>="[^"]*"' | sort | uniq -c
```

Expect the second prop only on page-local sections; global sections present with NO second prop. Also check for **double-tracking**: the same element carrying both an old and a new override fires twice with different sections.

**A/B variants: verify at runtime, not from static HTML.** The tag exists only after injection. Open each variant, wait ~4s (MutationObserver + fallback budget), then confirm: exactly one analytics script tag, its `data-tag`, and the route id matching the expected variant. Then re-check 1–2 non-test pages for the correct baseline/no-injection state.

## Contributing a vocabulary back (the PR flow)

The vocabulary is shared — a scan is only useful once it's in the repo.

```bash
git clone https://github.com/dickyudhandika/emotiv-event-track.git
cd emotiv-event-track
git checkout -b vocab/<site>
```

1. Copy `vocabularies/_template.md` → `vocabularies/<site>.md` and fill it from the audited plant table.
2. Add the exports to the site's override file (`templates/umami.tsx` for Framer; otherwise add the file alongside and note the host in the vocabulary's Notes).
3. Update the vocabulary's own changelog line + the export file's header comment.
4. Commit in one logical chunk per concern, e.g. `vocab: add <site> vocabulary (N values, audited YYYY-MM-DD)`.
5. Open the PR with `.github/PULL_REQUEST_TEMPLATE.md` filled in — include the page URL, the gates you passed, and the question the new values answer.

```bash
git add vocabularies/<site>.md templates/umami.tsx
git commit -m "vocab: add <site> vocabulary (N values)"
git push -u origin vocab/<site>
gh pr create --fill --title "vocab: <site> (N values)"
```

Never rename an existing value in a PR — renaming orphans historical data. Deprecate by adding a new value and marking the old one `Legacy` in the vocabulary.

## Anti-patterns

- **Section numbers** (`section=3`) — redesign reorders → history corrupts; page-relative → cross-page comparison dies.
- **Per-button event names** — naming drift. Only when the button is its own KPI.
- **Renaming values** — orphans prop values in dashboards.
- **Page in section** (`section=homepage`) — page is already free via `url`.
- **Heading copy as value** — copy changes; the region doesn't.
- **Mapping from a plan/screenshot instead of the live DOM** — the #1 cause of wrong values shipped.
- **Factory-pattern exports** — inner component props shadow outer factory props; the picker silently breaks. Use explicit function declarations.
- **A picker that filters by signature** — only lists `(Component) => Component` overrides. A factory taking a string arg never appears. Static exports with hardcoded labels.
- **Layer name as identity** — `data-framer-name` / class names are unreliable (typos, only set on some instances). Identity lives in the rendered text or the data.

## Reference

- Repo: https://github.com/dickyudhandika/emotiv-event-track
- **Shareable skill link** (paste into any agent, no install):
  https://raw.githubusercontent.com/dickyudhandika/emotiv-event-track/main/skill/SKILL.md
- Worked examples: `vocabularies/emotiv.md` (27 values, 11 entity slugs), `vocabularies/_template.md` (blank), `RULES.md`, `WIRING.md`, `NEUROSCIENCE.md` (A/B tag snippet, verified live)
- This skill is canonical in the repo at `skill/SKILL.md`. Keep any local copy in sync with it.
