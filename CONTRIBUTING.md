# Contributing

Thanks for contributing to the Emotiv Event Track vocabulary. Three contribution types:

1. **New site vocabulary** — a new file in `vocabularies/`
2. **New section value** — an edit to an existing site's vocabulary + exports
3. **Rule change** — an edit to `RULES.md` / `skill/SKILL.md`

## Process

1. **Fork** the repo, create a branch.
2. **Make your change** — follow the rules in `RULES.md`.
3. **Open a PR** using the template (`.github/PULL_REQUEST_TEMPLATE.md`).
4. **Review** — maintainers check the gates: role missing, will-compare test, same-page test, naming, vocabulary updated everywhere.

## Rules of thumb

- **Reuse before add.** If the role exists, use the existing value. New values are the exception, not the norm.
- **One value per role per site.** `hero` means the same thing on every page.
- **Name by role, not copy.** `pathway` not `selectyourpathway`.
- **Never rename.** Renaming orphans historical data in dashboards.
- **Keep the cap.** ~10-20 values per site. Past that, you're slicing components, not regions.
- **Update everywhere.** Vocabulary file + `umami.tsx` header comment + log entry. The comment is the source of truth for the next scan.

## PR review checklist

- [ ] Vocabulary file updated
- [ ] Exports are explicit function declarations (no factory pattern)
- [ ] Event names are action verbs (`cta_click`, `content_click`, `form_submit`, `faq_toggle`)
- [ ] Labels used for within-section disambiguation, not new values
- [ ] RULES.md / SKILL.md updated if the rule itself changed
- [ ] Page reference (URL or screenshot) included
