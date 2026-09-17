import { forwardRef, type ComponentType } from "react"

// Learn more: https://www.framer.com/developers/overrides/
//
// Section vocabulary (2026-08-07): scan page → compare → reuse → add only if missing.
// Section = layout role, not page (url covers page), not heading copy.
// Label disambiguates within a section. Event name = action verb only.
// Values: nav, hero, banner, applications, pathway, platform, product, news,
//         footer, productnav, features, casestudies, testimonials, leadmagnet,
//         specs, usecases, gettingstarted, tiers, community, download, footernav,
//         snackbar, accessories, comparison, accessoriesall, crosssell, related
// Legacy: pricing, howitworks, faq
//
// Product vocabulary (2026-09-17, rev 4): product = WHAT they clicked (product
// identity). Values: epoc_x, epoc_x_pro, mn8, flex, insight, emotivpro,
// studio, brainviz, bci, launcher, brainwear (11 total: 6 hardware + 5 software/brand).
// GLOBAL/shared components (nav, footer, footernav, snackbar) NEVER carry
// product — they stay section-only everywhere. Product only on page-local
// content (hero, productnav, accessories, download, homepage carousel).
// Accessories: section=accessories + product=parent (e.g. epoc_x) — label
// differentiates the item. NO accessory product slugs.
// Model: product = what, section = where, URL path filter = which page (free in Umami).
// Per-product exports are STATIC (no string-arg factories — invisible to Framer picker).
//
// Section split (rev 4, 2026-09-17) — productnav is the TOP sub-nav strip ONLY.
// The top strip is the container that holds the section anchors AND the nav's own
// button (Buy / Pre-Order / Download). Live precedent: /epoc-x has 6 productnav
// instances = 4 anchors + 2 nav Buy buttons. Position decides, not the href.
// Body links are split by href:
//   crosssell -> destination is a DIFFERENT Emotiv product (page or its shop URL)
//   related   -> leaves the page but refers NO other product (docs, developer,
//                solution pages, contact, own-product support)
// Same-product destinations and dependency links are NOT crosssell: own shop URL,
// own add-on, own anchors stay hero/productnav/download/accessories. "Download
// EmotivBCI" -> ./emotiv-launcher is the page's own install path, so it stays
// hero — the page's own conversion funnel always outranks the destination test.

// ── Global / shared ──────────────────────────────────────────────────────────

export function trackSnackbar(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="snackbar"
            />
        )
    })
}

export function trackNav(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="nav"
            />
        )
    })
}

export function trackHero(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="hero"
            />
        )
    })
}

export function trackBanner(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="banner"
            />
        )
    })
}

export function trackProduct(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="product"
            />
        )
    })
}

export function trackPricing(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="pricing"
            />
        )
    })
}

export function trackHowItWorks(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="howitworks"
            />
        )
    })
}

export function trackFooter(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="footer"
            />
        )
    })
}

export function trackNewsletter(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="form_submit"
                data-umami-event-section="footer"
            />
        )
    })
}

export function trackFaq(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return <Component ref={ref} {...props} data-umami-event="faq_toggle" />
    })
}

// ── Homepage sections ─────────────────────────────────────────────────────────

export function trackApplications(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="applications"
            />
        )
    })
}

export function trackPathway(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="pathway"
            />
        )
    })
}

export function trackPlatform(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="platform"
            />
        )
    })
}

export function trackNews(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="content_click"
                data-umami-event-section="news"
            />
        )
    })
}

// ── Product page sections (epoc-x, mn8, flex, insight) ───────────────────────

export function trackProductNav(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="productnav"
            />
        )
    })
}

export function trackFeatures(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="features"
            />
        )
    })
}

export function trackCaseStudies(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="content_click"
                data-umami-event-section="casestudies"
            />
        )
    })
}

export function trackTestimonials(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="testimonials"
            />
        )
    })
}

export function trackLeadMagnet(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="form_submit"
                data-umami-event-section="leadmagnet"
            />
        )
    })
}

export function trackSpecs(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="specs"
            />
        )
    })
}

// ── Solution pages (enterprise, academic-research, developer, etc.) ───────────

export function trackUseCases(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="usecases"
            />
        )
    })
}

export function trackGettingStarted(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="gettingstarted"
            />
        )
    })
}

export function trackTiers(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="tiers"
            />
        )
    })
}

export function trackCommunity(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="content_click"
                data-umami-event-section="community"
            />
        )
    })
}

export function trackDownload(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="download"
            />
        )
    })
}

export function trackFooterNav(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="content_click"
                data-umami-event-section="footernav"
            />
        )
    })
}

// ── Product property (2026-09-08) ─────────────────────────────────────────────
// cta_click/content_click + product=<slug>. Static per-product exports — wire on
// the instance. Section matches the plain export of the same section so existing
// dashboards stay comparable; the product prop adds the dimension.

// Product page heroes (Phase 1 + 3) — replaces plain trackHero on product pages

export function trackHeroInsight(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="hero"
                data-umami-event-product="insight"
            />
        )
    })
}

export function trackHeroEpocX(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="hero"
                data-umami-event-product="epoc_x"
            />
        )
    })
}

export function trackHeroEpocXPro(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="hero"
                data-umami-event-product="epoc_x_pro"
            />
        )
    })
}

export function trackHeroMn8(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="hero"
                data-umami-event-product="mn8"
            />
        )
    })
}

export function trackHeroFlex(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="hero"
                data-umami-event-product="flex"
            />
        )
    })
}

export function trackHeroEmotivpro(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="hero"
                data-umami-event-product="emotivpro"
            />
        )
    })
}

// Product page heroes — software products (2026-09-17)

export function trackHeroStudio(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="hero"
                data-umami-event-product="studio"
            />
        )
    })
}

export function trackHeroBrainviz(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="hero"
                data-umami-event-product="brainviz"
            />
        )
    })
}

export function trackHeroBci(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="hero"
                data-umami-event-product="bci"
            />
        )
    })
}

export function trackHeroLauncher(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="hero"
                data-umami-event-product="launcher"
            />
        )
    })
}

export function trackHeroBrainwear(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="hero"
                data-umami-event-product="brainwear"
            />
        )
    })
}

// Banner CTAs on product pages (2026-09-17) — section=banner + product=page product.
// Banner = bottom CTA section (2nd hero / promo band), distinct from hero (first fold).

export function trackBannerEpocXPro(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="banner"
                data-umami-event-product="epoc_x_pro"
            />
        )
    })
}

// Product sub-navs (Phase 1 + 3) — replaces plain trackProductNav on product pages

export function trackProductNavInsight(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="productnav"
                data-umami-event-product="insight"
            />
        )
    })
}

export function trackProductNavEpocX(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="productnav"
                data-umami-event-product="epoc_x"
            />
        )
    })
}

export function trackProductNavEpocXPro(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="productnav"
                data-umami-event-product="epoc_x_pro"
            />
        )
    })
}

export function trackProductNavMn8(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="productnav"
                data-umami-event-product="mn8"
            />
        )
    })
}

export function trackProductNavFlex(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="productnav"
                data-umami-event-product="flex"
            />
        )
    })
}

export function trackProductNavEmotivpro(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="productnav"
                data-umami-event-product="emotivpro"
            />
        )
    })
}

export function trackProductNavStudio(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="productnav"
                data-umami-event-product="studio"
            />
        )
    })
}

export function trackProductNavBrainviz(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="productnav"
                data-umami-event-product="brainviz"
            />
        )
    })
}

export function trackProductNavBci(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="productnav"
                data-umami-event-product="bci"
            />
        )
    })
}

export function trackProductNavLauncher(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="productnav"
                data-umami-event-product="launcher"
            />
        )
    })
}

export function trackProductNavBrainwear(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="productnav"
                data-umami-event-product="brainwear"
            />
        )
    })
}

// Homepage hero carousel "See X" (Variant B) — replaces plain trackProduct there

export function trackProductSeeEpocX(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="product"
                data-umami-event-product="epoc_x"
            />
        )
    })
}

export function trackProductSeeInsight(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="product"
                data-umami-event-product="insight"
            />
        )
    })
}

export function trackProductSeeMn8(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="product"
                data-umami-event-product="mn8"
            />
        )
    })
}

export function trackProductSeeFlex(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="product"
                data-umami-event-product="flex"
            />
        )
    })
}

// Case studies on product pages (2026-09-11) — section=casestudies + product=parent.
// Whole-card links (Case Study component root). Plain trackCaseStudies (no product)
// stays for non-product pages; this adds the product dimension per rev-2 model.

export function trackCaseStudiesEpocX(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="content_click"
                data-umami-event-section="casestudies"
                data-umami-event-product="epoc_x"
            />
        )
    })
}

// Specs on product pages (2026-09-11) — section=specs + product=parent.
// Static specification table (no links/buttons). content_click on the section root
// fires on ANY click within the specs region — reader engagement signal. Plant on BOTH
// breakpoint instances (spec - desktop - black / spec - mobile - black).

export function trackSpecsEpocX(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="content_click"
                data-umami-event-section="specs"
                data-umami-event-product="epoc_x"
            />
        )
    })
}

// Comparison + accessories-index CTAs on product pages (2026-09-11) — outgoing page
// navigations. section = destination role (comparison / accessoriesall), NOT a nav
// structure. Distinct values so button clicks don't merge with accessory-card clicks.
// Both page-local product content → product=epoc_x.

export function trackComparisonEpocX(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="comparison"
                data-umami-event-product="epoc_x"
            />
        )
    })
}

export function trackAccessoriesAllEpocX(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="accessoriesall"
                data-umami-event-product="epoc_x"
            />
        )
    })
}

// Accessory cards on product pages (2026-09-08, QA'd model) — section=accessories
// (own region role), product=parent ecosystem; label differentiates the item.
// Replaces plain trackProduct on accessory cards.

export function trackAccessories(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="accessories"
            />
        )
    })
}

export function trackAccessoriesEpocX(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="accessories"
                data-umami-event-product="epoc_x"
            />
        )
    })
}

export function trackAccessoriesInsight(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="accessories"
                data-umami-event-product="insight"
            />
        )
    })
}

export function trackAccessoriesFlex(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="accessories"
                data-umami-event-product="flex"
            />
        )
    })
}

export function trackAccessoriesMn8(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="accessories"
                data-umami-event-product="mn8"
            />
        )
    })
}

// Download CTAs on software pages (2026-09-17) — section=download + product=<software>.
// For pages where the download IS the hero CTA (bci, launcher), use the hero export
// instead. These are for SECONDARY download links (app store badges, installer rows).

export function trackDownloadBci(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="download"
                data-umami-event-product="bci"
            />
        )
    })
}

export function trackDownloadLauncher(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="download"
                data-umami-event-product="launcher"
            />
        )
    })
}

export function trackDownloadBrainwear(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="download"
                data-umami-event-product="brainwear"
            />
        )
    })
}

export function trackDownloadEmotivpro(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="download"
                data-umami-event-product="emotivpro"
            />
        )
    })
}

// Accessory-index CTAs — other product pages (2026-09-17). Same role as
// trackAccessoriesAllEpocX, per-product export so the product dimension survives.

export function trackAccessoriesAllInsight(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="accessoriesall"
                data-umami-event-product="insight"
            />
        )
    })
}

export function trackAccessoriesAllFlex(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="accessoriesall"
                data-umami-event-product="flex"
            />
        )
    })
}

export function trackAccessoriesAllMn8(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="accessoriesall"
                data-umami-event-product="mn8"
            />
        )
    })
}

// ── Cross-sell + related (2026-09-17, rev 4) ──────────────────────────────────
// Vocabulary split decided 2026-09-17: `productnav` means the TOP product sub-nav
// ONLY. Links in the page body get their own values so productnav stops being a
// junk drawer:
//   crosssell = page-local link whose destination is a DIFFERENT Emotiv product
//               (product page or its shop URL). Two exports per product, because
//               buy-intent and browse-intent are different questions:
//                 trackCrosssell<Prod>     -> cta_click     (Buy now, Get Pricing,
//                                             PRO License, Start now, license)
//                 trackCrosssellInfo<Prod> -> content_click (Learn about/More,
//                                             Explore, Discover)
//   related   = page-local in-body link that refers NO other product: same-page
//               section anchors in the body, docs/toolkit links, solution or
//               developer pages, support/contact. -> content_click
// Same-product destinations are NOT cross-sell (own shop URL, own add-on, own
// anchors) — those stay hero / productnav / download / accessories.
// Dependency links are NOT cross-sell either: a link to a different product that
// is nonetheless this page's own install/primary path stays with the page's
// primary section ("Download EmotivBCI" -> ./emotiv-launcher stays hero). The
// page's own conversion funnel always outranks the destination test.
// Cross-sell labels: pass an explicit data-umami-event-label per instance when
// several buttons share text (e.g. three "Buy now" going to Epoc X / Insight /
// MN8) — auto-capture collapses them to one string otherwise.

// Cross-sell — buy intent (cta_click)

export function trackCrosssellBci(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="crosssell"
                data-umami-event-product="bci"
            />
        )
    })
}
export function trackCrosssellFlex(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="crosssell"
                data-umami-event-product="flex"
            />
        )
    })
}
export function trackCrosssellMn8(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="crosssell"
                data-umami-event-product="mn8"
            />
        )
    })
}
export function trackCrosssellStudio(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="crosssell"
                data-umami-event-product="studio"
            />
        )
    })
}
export function trackCrosssellEmotivpro(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="crosssell"
                data-umami-event-product="emotivpro"
            />
        )
    })
}
export function trackCrosssellLauncher(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="crosssell"
                data-umami-event-product="launcher"
            />
        )
    })
}
export function trackCrosssellInsight(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="crosssell"
                data-umami-event-product="insight"
            />
        )
    })
}
export function trackCrosssellBrainwear(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="crosssell"
                data-umami-event-product="brainwear"
            />
        )
    })
}
export function trackCrosssellBrainviz(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="cta_click"
                data-umami-event-section="crosssell"
                data-umami-event-product="brainviz"
            />
        )
    })
}

// Cross-sell — learn intent (content_click)

export function trackCrosssellInfoBci(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="content_click"
                data-umami-event-section="crosssell"
                data-umami-event-product="bci"
            />
        )
    })
}
export function trackCrosssellInfoFlex(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="content_click"
                data-umami-event-section="crosssell"
                data-umami-event-product="flex"
            />
        )
    })
}
export function trackCrosssellInfoMn8(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="content_click"
                data-umami-event-section="crosssell"
                data-umami-event-product="mn8"
            />
        )
    })
}
export function trackCrosssellInfoStudio(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="content_click"
                data-umami-event-section="crosssell"
                data-umami-event-product="studio"
            />
        )
    })
}
export function trackCrosssellInfoEmotivpro(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="content_click"
                data-umami-event-section="crosssell"
                data-umami-event-product="emotivpro"
            />
        )
    })
}
export function trackCrosssellInfoLauncher(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="content_click"
                data-umami-event-section="crosssell"
                data-umami-event-product="launcher"
            />
        )
    })
}
export function trackCrosssellInfoInsight(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="content_click"
                data-umami-event-section="crosssell"
                data-umami-event-product="insight"
            />
        )
    })
}
export function trackCrosssellInfoBrainwear(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="content_click"
                data-umami-event-section="crosssell"
                data-umami-event-product="brainwear"
            />
        )
    })
}
export function trackCrosssellInfoBrainviz(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="content_click"
                data-umami-event-section="crosssell"
                data-umami-event-product="brainviz"
            />
        )
    })
}

// Related in-body links (no other product referred)

export function trackRelatedEmotivpro(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="content_click"
                data-umami-event-section="related"
                data-umami-event-product="emotivpro"
            />
        )
    })
}
export function trackRelatedInsight(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="content_click"
                data-umami-event-section="related"
                data-umami-event-product="insight"
            />
        )
    })
}
export function trackRelatedMn8(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="content_click"
                data-umami-event-section="related"
                data-umami-event-product="mn8"
            />
        )
    })
}
export function trackRelatedLauncher(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="content_click"
                data-umami-event-section="related"
                data-umami-event-product="launcher"
            />
        )
    })
}
export function trackRelatedBrainwear(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="content_click"
                data-umami-event-section="related"
                data-umami-event-product="brainwear"
            />
        )
    })
}
export function trackRelatedBci(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="content_click"
                data-umami-event-section="related"
                data-umami-event-product="bci"
            />
        )
    })
}
export function trackRelatedBrainviz(Component: ComponentType): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                data-umami-event="content_click"
                data-umami-event-section="related"
                data-umami-event-product="brainviz"
            />
        )
    })
}
