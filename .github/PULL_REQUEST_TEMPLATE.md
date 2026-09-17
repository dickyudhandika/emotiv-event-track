## What are you contributing?

- [ ] New site vocabulary
- [ ] New section value (existing site)
- [ ] Rule change

## Site

<!-- name + URL -->

## Page builder / host

<!-- Framer / Webflow / WordPress / custom — affects where overrides get planted and how counts are verified -->

## Plant table (audited from the live DOM)

| # | Region | CTA text | `section` | event | export | subject |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |

<!-- Expected live counts as `>= N`, never equality — builders render one button per breakpoint variant. -->

## Sections added / changed

| Value | Role | Pages | CTAs | Event |
|---|---|---|---|---|
|  |  |  |  |  |

## Gates passed (for new values)

- [ ] **Role missing** — scanned the page, compared against vocabulary, role genuinely doesn't exist
- [ ] **Will compare it** — the value answers a question we'd actually ask (state the question)
- [ ] **Same-page test** — two regions on one page got separate values ONLY because they'll be compared
- [ ] **Name by role** — lowercase, single word, stable forever
- [ ] **Vocabulary updated everywhere** — umami.tsx header comment + vocabulary file + log entry

## Question this value answers

<!-- e.g. "Do hero CTAs beat footer CTAs?" -->

## Page reference

<!-- URL or screenshot of the page -->

## Checklist

- [ ] Vocabulary file updated (`vocabularies/<site>.md`)
- [ ] `templates/umami.tsx` exports added (explicit function declarations, no factory)
- [ ] RULES.md / SKILL.md updated if rule changed
- [ ] README install table unchanged or updated
