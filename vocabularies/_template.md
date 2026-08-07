# Vocabulary Template

Copy this file to `vocabularies/<site>.md` and fill it in. The agent fills this during the scan workflow — humans review.

Site: <!-- domain, e.g. https://example.com -->
Updated: <!-- YYYY-MM-DD -->
Values: <!-- count -->

## Vocabulary

| # | Value | Role | Pages | Example CTAs | Event |
|---|---|---|---|---|---|
| 1 | `nav` | global navigation | all | Shop Now | `cta_click` |
| 2 | `hero` | first fold | all | Buy now | `cta_click` |
| 3 |  |  |  |  |  |
| 4 |  |  |  |  |  |

<!-- Rules reminder:
- Value = lowercase, single word, stable forever. Name by ROLE, not heading copy.
- One value per role per site. Same role on every page = same value.
- Two regions sharing a role on one page → disambiguate: hero + banner.
- Add a value ONLY when: role missing AND "will you compare it?" = yes.
- Cap ~10-20 values per site.
- Label disambiguates within a section (View Specs ×4 → explicit labels).
-->

## Legacy (kept for other pages, not in count)

| Export | Value | Event | Used for |
|---|---|---|---|
|  |  |  |  |

## Label variants (same section, explicit labels)

| Export | Label |
|---|---|
|  |  |

## Notes

- Sitemap audit: <!-- URL count → template count -->
- <!-- decisions: which values merged, which kept separate, why -->
