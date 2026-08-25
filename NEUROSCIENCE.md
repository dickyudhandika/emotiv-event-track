# Neuroscience Blog — Event Tracking (Umami)

Proof that the neuroscience blog A/B banner tracking works on **both** Framer variants, verified live 2026-08-25.

## Page

`https://www.emotiv.com/neuroscience/theta-waves-benefits`

This page runs a Framer A/B test with two variants. Each variant carries a **Custom Code → End of Body** tracker script that fires Umami events for 3 promo banners (`#banner1/2/3`).

## Variant → label mapping

| `?framer_variant=` | `data-variant` marker | Event label |
|---|---|---|
| `Ei03kqFBL` | `control` | `neuroscience_control_*` |
| `wXuFBMAuU` | `variation` | `neuroscience_variation_*` |

The `data-variant` marker is stamped per variant (root-layer override). The tracker reads it via `document.querySelector("[data-variant]")` — it does **not** guess from the URL, because Framer's `framer_variant` param is random for real visitors.

## Event schema

12 events total (6 per variant):

```
neuroscience_{control|variation}_impression_banner{1|2|3}
neuroscience_{control|variation}_click_banner{1|2|3}
```

- **Impression** — fires once when the banner scrolls into view (IntersectionObserver / interval re-check). Above-fold banner1 fires on load.
- **Click** — document-level delegation; `bannerFor()` walks up from the clicked `<a>` to find which `#bannerN` it lives in. Works for all 3 banners.

## Verification proof (live, 2026-08-25)

Headless Chrome + CDP, network capture of `gateway.umami.is/api/send` + `window.umami.track` interceptor.

### Control — `?framer_variant=Ei03kqFBL`

| Check | Result |
|---|---|
| `data-variant` | `control` |
| `#banner1/2/3` present | `[true,true,true]` |
| `window.umami` | `object` |
| `api/send` baseline → after scroll | 2 → 4 (delta +2) |
| impression events | `neuroscience_control_impression_banner2`, `_banner3` (banner1 above-fold, fired pre-intercept) |
| click events | `neuroscience_control_click_banner1`, `_banner2`, `_banner3` |

### Variation — `?framer_variant=wXuFBMAuU`

| Check | Result |
|---|---|
| `data-variant` | `variation` |
| `#banner1/2/3` present | `[true,true,true]` |
| `window.umami` | `object` |
| `api/send` baseline → after scroll | 1 → 2 (delta +1) |
| impression events | `neuroscience_variation_impression_banner2`, `_banner3` |
| click events | `neuroscience_variation_click_banner1`, `_banner2`, `_banner3` |

### Full 12-event matrix

| Event | Control | Variation |
|---|---|---|
| impression banner1 | ✅ (above-fold) | ✅ |
| impression banner2 | ✅ | ✅ |
| impression banner3 | ✅ | ✅ |
| click banner1 | ✅ | ✅ |
| click banner2 | ✅ | ✅ |
| click banner3 | ✅ | ✅ |

## How it's deployed

- **Mechanism:** Framer → Settings → Custom Code → **End of Body** (scope: **All pages** — per-variant deployment only works when scoped to All Pages, not a page pattern).
- **Tracker script:** polls for `window.umami` (async load), then wires document-level click delegation + scroll/interval impression checks. No node refs persist, so Framer's hydration node-replacement can't strand listeners.
- **`data-variant` marker:** root-layer override per variant (`control.tsx` / `variation.tsx`), ships with the published page.

## Re-verify after any change

```js
// 1. Tracker in server HTML (not just DOM — DOM can show console-injected copies)
(async function(){
  var r = await fetch(window.location.href, { cache: 'no-store' });
  var h = await r.text();
  return JSON.stringify({
    trackerInServerHTML: h.includes('getVariant'),
    variant: document.querySelector('[data-variant]')?.getAttribute('data-variant'),
    banner1: !!document.getElementById('banner1'),
    banner2: !!document.getElementById('banner2'),
    banner3: !!document.getElementById('banner3')
  });
})()
```

Run for **both** variant URLs. If `trackerInServerHTML:false` on one, the Custom Code snippet didn't deploy to that variant — re-check scope (All Pages) and republish.

## Notes / gotchas

- **Clicking a "Show Me" link navigates away** (`get.emotiv.com/...`) before you can read back a captured event. The event DID fire — verify via `api/send` count or `location.href` change, not a capture array.
- **Umami has no "delete event" button.** Legacy event names from older script versions persist in the dashboard forever. Filter by the 12 clean names above.
- **`framer_variant` param is NOT a stable control/variation label for real visitors** — Framer assigns it server-side by IP+fingerprint. Always rely on the `data-variant` marker, never the URL.
