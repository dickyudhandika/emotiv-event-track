---
name: umami-section-vocabulary
description: "Assign Umami section values to page CTAs. Scan page → compare against site vocabulary → reuse → add only if role missing. Works in any harness (Hermes, Claude Code, Codex, Cursor)."
---

# Umami Section Vocabulary

Assign `section` values to Umami custom events on a website. The vocabulary is a controlled list of section values per site — this keeps dashboards comparable and redesign-proof.

## When this activates

- User asks to track events / assign sections on a page or site
- User provides a URL, sitemap, or page screenshot for event tracking
- User asks to add a new section value or audit an existing vocabulary

## Core model

**Event name = action verb only. Props = context.**

| Dimension | Who sets it | Example |
|---|---|---|
| Action | event name | `cta_click`, `form_submit`, `faq_toggle` |
| Section | prop (this repo) | `hero`, `nav`, `tiers` |
| Page | Umami auto (`url`) | `/`, `/pricing` |
| Button | `label` (listener auto-captures text) | `Buy`, `Start free trial` |

## Terms

- **Role** = layout function of a region (conceptual): "first fold conversion", "global navigation"
- **Value** = encoded name sent as `section` prop: `hero`, `nav`, `tiers`
- **Vocabulary** = registry for ONE site: value → role → pages → CTAs. One file per site.

## Workflow

1. **Scan the page.** Walk top-to-bottom. List every layout region containing a CTA. Note the CTA text and its region.
2. **Compare against the site vocabulary.** If no vocabulary file exists for the site, start from `_template.md`.
3. **Reuse first — always.** Role exists → assign the existing value. Do NOT create a new value.
4. **Add only if role missing** AND the "will you compare it?" gate passes (below).
5. **Output:** updated vocabulary + `umami.tsx` exports + wiring instructions (which export to pick per button).

## Section rules

1. Section = layout role, not page, not heading copy. Page is free via Umami `url`.
2. One value per role per site. `hero` on homepage = `hero` on /epoc-x.
3. Two regions sharing a role on one page → disambiguate: `hero` + `banner`.
4. Name by role: lowercase, single word, stable forever. Renaming = orphan prop values.
5. Cap ~10-20 values per site. Past that you're slicing components, not regions.
6. Label disambiguates within a section (View Specs ×4 → explicit labels). Never per-button event names unless the button is its own KPI.

## Adding a new value — 3 gates + 4 steps

**Gates (all must pass):**
1. **Role missing?** Scanned + compared, role genuinely doesn't exist.
2. **Will you compare it?** The value must answer a question the user would actually ask. "Getting Started vs Tiers?" = yes → separate values. "App Store vs Launcher link?" = no → same value, label differentiates.
3. **Same-page test:** two regions on ONE page → separate values ONLY if they'll be compared against each other. Otherwise merge + labels.

**Steps:**
4. Name by role: lowercase, single word, stable forever.
5. One export per value: explicit function declaration (factory patterns have a shadowing pitfall — pickers silently break).
6. Update vocabulary everywhere: `umami.tsx` header comment + vocabulary file + log entry.
7. Watch the cap: past ~20 values, every new one needs stronger justification.

**Decision flow:**
```
Region role exists?              → reuse export
Role missing + will compare?     → add export + update vocabulary
Role missing + won't compare?    → fold into nearest value, label differentiates
```

## Events

| Event | When | Example |
|---|---|---|
| `cta_click` | conversion-oriented click | Buy, Start building |
| `content_click` | reading/exploring, not conversion | Learn more, article cards |
| `form_submit` | form submission | Newsletter, whitepaper |
| `faq_toggle` | accordion open/close | FAQ questions |

## Labels

- Auto-capture: `if (!data.label) data.label = (umamiEl.textContent || '').trim().slice(0, 40)`
- **Framer dedupe (required):** Framer renders labels twice (visible + aria-hidden) → `"Shop NowShop Now"`. Dedupe **before** slice, else the duplicate is cut mid-string:
  ```js
  let label = (umamiEl.textContent || '').trim()
  label = label.replace(/(.{3,})\1/g, '$1') // collapse doubled visible+aria text
  if (!data.label) data.label = label.slice(0, 40)
  ```
- Explicit override: `data-umami-event-label="Epoc X"` wins over auto-capture.
- Use explicit labels when multiple buttons in one section share identical text but mean different things.

## Anti-patterns

- **Section numbers** (`section=3`) — redesign reorders → history corrupts; page-relative → cross-page comparison dies.
- **Per-button event names** — naming drift. Only when the button is its own KPI.
- **Renaming values** — orphan prop values in dashboards.
- **Page in section** (`section=homepage`) — page is already free via `url`.
- **Heading copy as value** — copy changes; the region doesn't.
- **Factory-pattern exports** — inner `forwardRef` props shadow outer factory props; pickers silently break. Use explicit function declarations.

## Verification

```js
window._spy = [];
const _t = window.umami.track;
window.umami.track = (n, p) => (_spy.push({ n, p }), _t(n, p));
```

Click a tracked button → `_spy` shows `{ n: "cta_click", p: { section: "hero", label: "Buy" } }` + a 2nd `api/send` in Network tab (first = pageview).
