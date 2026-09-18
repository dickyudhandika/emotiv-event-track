# Brainwear onboarding `hello.emotiv.com/brainwear` — Event Coverage

Status: 🟡 **planned** — wired and deployed 2026-09-18; awaiting first live events to confirm ✅. First page tracked on the `hello.emotiv.com` onboarding site. Third domain on Umami site `338c5f5a` (after `www.emotiv.com` and `brainwear.app`), so the same vocabulary applies with no new values.

Current page traffic: pending (Umami website `338c5f5a`).

Codebase: [`Emotiv/web-onboarding`](https://github.com/Emotiv/web-onboarding) — hand-written static HTML, **not Framer**. Attributes are planted directly in the markup; `templates/umami.tsx` is not used and needs no new export.

| # | Value | Role | Where on page | Example CTAs | Event | Status |
|---|---|---|---|---|---|---|
| 1 | `hero` | the page's own buy CTA | bundle card, boxes band (~85%) | Get the bundle $399 (→ `shop.emotiv.com/mn8`) | `cta_click` + `product=brainwear` | 🟡 planted, pending deploy |
| 2 | `related` | link to the Brainwear product site | boxes band (~85%) | Explore Brainwear (→ `brainwear.app`) | `content_click` + `product=brainwear` | ❌ gap — out of scope this pass |
| 3 | — | back link to the onboarding picker | header (~2%) | Back (→ `/`) | — | ⏸ deferred — internal nav, not a CTA |

The page has exactly three anchors. Rows 2-3 are listed so the next scan starts from a complete inventory, not so they are silently skipped.

## Decisions

**`hero`, not `crosssell`.** "Get the bundle" points at `shop.emotiv.com/mn8`, a different domain and a different slug — but the same product. Brainwear is MN8's consumer brand, so under the vocabulary's same-product clause this is the page's own conversion. Direct precedent: [`brainwear.md`](brainwear.md) row 1, where "Get Brainwear" points at the identical URL and stays `hero`. Calling it crosssell would zero out the only purchase metric this page has.

**`hero` below the fold.** The bundle card sits near the bottom, not in the first fold. `brainwear.md` already treats the bottom-band "Shop now" as `hero` — the value is the page's primary buy role, not a screen position. No new value needed.

**`product=brainwear`, not `mn8`.** Bundle promos map to the product, not the bundle name, and this surface is the Brainwear brand. Same choice `brainwear.md` makes for the same destination URL.

**Explicit label — required here, not a preference.** Auto-capture is a global listener on the emotiv.com Framer site. This static page has no such listener, so without an explicit attribute the event would carry **no label at all**. The whole card is also one `<a>` (image + kicker + title + price + subtitle), so `textContent` would give `MN8 + Brainwear appGet the bundle $399In-e…` sliced at 40 chars. `data-umami-event-label="Get the bundle"` is set per RULES.md → Labels → explicit override.

**Row 2 left unwired deliberately.** "Explore Brainwear" → `brainwear.app` is the same product, so it is `related` + `content_click`, not crosssell. Wiring it was out of scope for this pass; flagged as a gap rather than mapped and forgotten.

## ⚠️ Consent gating — unique to this site

`hello.emotiv.com` runs CookieYes as its CMP. Umami is **not** loaded via the GDPR guide's attribute-based blocking — that was tried first and found broken for Umami (see below). Instead an inline loader ahead of the CookieYes tag creates the script itself once analytics is accepted, via `cookieyes_banner_load`, `cookieyes_consent_update`, and a direct read of the stored `cookieyes-consent` cookie. Nothing loads before consent. Consequences for this vocabulary are unchanged:

- **Clicks before consent are not recorded.** Expect this page to undercount against `www.emotiv.com`, which is not consent-gated the same way. Do not read the gap as a wiring fault.
- **`data-umami-event` attributes are the safe mechanism here.** They sit inert in the DOM and bind whenever Umami loads. Anything calling `window.umami.track(...)` directly would throw on this site, because `window.umami` is `undefined` until consent.
- The console-spy verification in `SKILL.md` only works **after** accepting analytics cookies on this domain.

### Why not attribute-based blocking (a warning for other Emotiv properties)

The guide's `<script type="text/plain" data-cookieyes="cookieyes-analytics" …>` was deployed first and verified live in two browsers. It sends **zero** events, in both paths:

| Path | What CookieYes does | Result |
|---|---|---|
| Accept in-session | re-injects the script with only `src` + `type` — **`data-website-id` is dropped** | Umami loads, `getSession().website` is `null`, nothing sent |
| Return visit, consent stored | never flips the tag back from `text/plain` | Umami never loads |

Root cause: Umami's whole configuration lives in `data-*` attributes, and CookieYes's restore does not preserve them. **Any tracker configured by data attributes (Umami, Plausible, Fathom…) behind CookieYes attribute-blocking will fail the same way, silently.** Scripts configured by URL are unaffected. It is also why `hello.emotiv.com` was missing from the shared site's Hostname filter — no rows had ever arrived from this host.

## Wiring steps

Applied in `Emotiv/web-onboarding`, `public/brainwear/index.html` (hand-maintained — it is not generated by `tools/build.py`, so no rebuild):

```html
<a class="box box-bundle" href="https://shop.emotiv.com/mn8" rel="noopener"
   data-umami-event="cta_click"
   data-umami-event-section="hero"
   data-umami-event-product="brainwear"
   data-umami-event-label="Get the bundle">
```

Equivalent to `trackHeroBrainwear` in `templates/umami.tsx`, plus the explicit label.

## Verification

Server HTML, cache-busted:

```bash
curl -sL "https://hello.emotiv.com/brainwear/?v=$(date +%s)" | grep -oE 'data-umami-event="[^"]*"' | sort | uniq -c
curl -sL "https://hello.emotiv.com/brainwear/?v=$(date +%s)" | grep -oE 'data-umami-event-section="[^"]*"' | sort | uniq -c
curl -sL "https://hello.emotiv.com/brainwear/?v=$(date +%s)" | grep -oE 'data-umami-event-product="[^"]*"' | sort | uniq -c
```

Expected: `cta_click` ×1, `hero` ×1, `brainwear` ×1.

Verified against the local build at the time of wiring — all four attributes present exactly once each.

Console spy (**accept analytics cookies first**, or `window.umami` will be undefined):

```js
window._spy = [];
const _t = window.umami.track;
window.umami.track = (n, p) => (_spy.push({ n, p }), _t(n, p));
```

Click the bundle card → `{ n: "cta_click", p: { section: "hero", product: "brainwear", label: "Get the bundle" } }`.
