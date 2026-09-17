# Rules — Umami Section Vocabulary

The rules for defining, adding, and maintaining `section` values in Umami event tracking. Written for humans. The agent-executable version lives in `skill/SKILL.md`.

## Core model

**Event name = action verb only. Props = context.**

| Dimension | Who sets it | Example |
|---|---|---|
| **Action** | event name | `cta_click`, `form_submit`, `faq_toggle` |
| **Section** | prop (this repo) | `hero`, `nav`, `tiers` |
| **Page** | Umami auto (`url`) | `/`, `/pricing` |
| **Button** | `label` (listener auto-captures text) | `Buy`, `Start free trial` |

Per-button event names answer questions you don't have ("did THIS button get clicked") and create naming drift. Action + props answers real questions ("do hero CTAs beat footer CTAs?").

## Terms

| Term | Definition | Example |
|---|---|---|
| **Role** | The layout *function* of a region — what it does in the page flow. Conceptual. | "first fold conversion", "global navigation", "audience selector" |
| **Value** | The encoded name sent as `section` prop in Umami. Lowercase, single word, stable. | `hero`, `nav`, `tiers` |
| **Vocabulary** | The complete registry for ONE site: value → role → pages → CTAs. One file per site. | `vocabularies/emotiv.md` |

Rule: role is the question ("does hero beat footer?"), value is the answer key, vocabulary is the map.

## Section rules

1. **Scan → compare → reuse → add only if missing.** Walk the page top-to-bottom, list every CTA region, compare against the vocabulary, reuse first.
2. **Section = layout role, not page, not heading copy.** Page is free via Umami `url`. Heading copy changes; the region doesn't.
3. **One value per role per site.** `hero` on homepage = `hero` on /epoc-x = `hero` on /pricing.
4. **Two regions sharing a role on one page → disambiguate:** `hero` + `banner` (second hero / promo band).
5. **Name by role: lowercase, single word, stable forever.** Renaming = orphan prop values in dashboards.
6. **Cap ~10-20 values per site.** Past that you're slicing components, not regions.
7. **Label disambiguates within a section.** "View Specs" ×4 → explicit labels `Epoc X` / `MN8` / `Flex 2.0` / `Insight`. Never per-button event names unless the button is its own KPI.
8. **Page-specific sections are legal.** `pathway` exists only on homepage — it's a layout region of that page. Don't force-fit into `product`.
9. **Position decides nav vs body.** `productnav` = the TOP sub-nav strip only (the container holding the section anchors *and* the nav's own button). Anything in the body is `crosssell` (different product) or `related` (no other product) — never `productnav`. Verified precedent: `/epoc-x` has 6 `productnav` instances = 4 anchors + 2 nav `Buy` buttons in one top-strip container.
10. **The page's own conversion funnel outranks the destination test.** A link to a different product that is nonetheless this page's own install path (`Download EmotivBCI` → `./emotiv-launcher`) stays on the page's primary section — otherwise the page's own conversion metric reads zero.

## Adding a new value — 3 gates + 4 steps

**Gates (all must pass):**

1. **Role missing?** Scanned the page, compared against vocabulary, the role genuinely doesn't exist.
2. **Will you compare it?** The new value must answer a question you'd actually ask. "Getting Started vs Tiers?" = yes → separate values. "App Store vs Launcher link?" = no → same value, label differentiates.
3. **Same-page test:** two regions on ONE page → separate values ONLY if you'll compare them against each other. Otherwise merge into one value + labels.

**Steps:**

4. **Name by role:** lowercase, single word, stable forever. `gettingstarted` not `get-started` or `Getting Started`.
5. **One export per value:** explicit function declaration. (Factory patterns have a shadowing pitfall — pickers silently break.)
6. **Update vocabulary everywhere:** `umami.tsx` header comment + vocabulary file + log entry. The comment IS the source of truth for the next scan.
7. **Watch the cap:** past ~20 values, every new one needs stronger justification.

**Decision flow:**

```
Region role exists?              → reuse export
Role missing + will compare?     → add export + update vocabulary
Role missing + won't compare?    → fold into nearest value, label differentiates
```

## Events

| Event | When | Example |
|---|---|---|
| `cta_click` | conversion-oriented click | Buy, Start building, Shop now |
| `content_click` | reading/exploring, not conversion | Learn more, article cards, See case study |
| `form_submit` | form submission | Newsletter, whitepaper download |
| `faq_toggle` | accordion open/close | FAQ questions |

Keep the event vocabulary small. `content_click` exists so article reads don't pollute the CTA funnel.

## Labels

- **Auto-capture:** the global listener grabs button text: `if (!data.label) data.label = (umamiEl.textContent || '').trim().slice(0, 40)`
- **Framer dedupe (required):** Framer renders button labels twice (visible + aria-hidden), so `textContent` yields `"Shop NowShop Now"`. Dedupe **before** slicing — the duplicate is cut mid-string if you slice first:
  ```js
  let label = (umamiEl.textContent || '').trim()
  label = label.replace(/(.{3,})\1/g, '$1') // collapse doubled visible+aria text
  if (!data.label) data.label = label.slice(0, 40)
  ```
  Result: `"Shop NowShop Now"` → `"Shop Now"`. `(.{3,})` min length avoids false collapses on short repeats.
- **Explicit override:** `data-umami-event-label="Epoc X"` on the element wins over auto-capture.
- **Use explicit labels when** multiple buttons in one section share identical text but mean different things (View Specs ×4, Learn more ×3).

## Component prop conventions

Reusable components (cards, tiles, banners) must use standard prop names. Tracking overrides read these props — non-standard names force fragile fallback chains.

| Content | Prop name | Example value |
|---|---|---|
| Heading | `title` | `Epoc X` |
| Body copy | `description` | `14-Channel professional EEG...` |
| Button/CTA text | `label` | `View Specs` |
| Link target | `link` | `./epoc-x` |
| Image | `image` | `epoc-x.png` |
| Badge/pill | `badge` | `Best seller` |

Rules:

1. **camelCase, no spaces, no "text" suffix.** `title` not `label text` or `title text`. Spaces force `props["label text"]` — ugly, error-prone.
2. **One name per role.** Heading is always `title`, never `heading`/`productName`/`label text` depending on mood.
3. **`label` = button text only.** The tracking label comes from `title` (what the card IS), not `label` (what the button SAYS).
4. **Tracking overrides read `props.title`.** `trackProduct` uses `props.title || "Product"`. No chains, no guessing.
5. **New component → copy the convention, don't invent.** If a card needs a new field, extend the table above, don't improvise.

Why: prop-reading overrides are the only way to track reusable components when instances can't be selected individually (component-in-slider). The convention makes `props.title` always correct.

## Anti-patterns

| Anti-pattern | Why it fails |
|---|---|
| **Section numbers** (`section=3`) | Redesign reorders sections → history silently corrupts. Numbers are page-relative → cross-page comparison dies. |
| **Per-button event names** (`hero_cta_clicked`) | Naming drift, dashboard noise. Only when the button is its own KPI (e.g. demo requests). |
| **Renaming values** | Orphan prop values in dashboards. `howitworks` stays `howitworks` even if ugly. |
| **Page in section** (`section=homepage`) | Page is already free via `url`. Duplicates it. |
| **Heading copy as value** (`section=selectyourpathway`) | Copy changes; the region doesn't. Name by role. |
| **Factory-pattern exports** | Inner `forwardRef` props shadow outer factory props — section attrs never land, pickers silently break. Use explicit function declarations. |

## Verification

```js
// Console spy — click a tracked button, check _spy
window._spy = [];
const _t = window.umami.track;
window.umami.track = (n, p) => (_spy.push({ n, p }), _t(n, p));
```

Expected: `{ n: "cta_click", p: { section: "hero", label: "Buy" } }` + a 2nd `api/send` in Network tab (first = pageview).
