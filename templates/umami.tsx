import { forwardRef, type ComponentType } from "react"

// Learn more: https://www.framer.com/developers/overrides/
//
// Section vocabulary (2026-08-07): scan page → compare → reuse → add only if missing.
// Section = layout role, not page (url covers page), not heading copy.
// Label disambiguates within a section. Event name = action verb only.
// Values: nav, hero, banner, applications, pathway, platform, product, news,
//         footer, productnav, features, casestudies, testimonials, leadmagnet,
//         specs, usecases, gettingstarted, tiers, community, download, footernav,
//         snackbar, accessories
// Legacy: pricing, howitworks, faq
//
// Product vocabulary (2026-09-08, rev 2): product = WHAT they clicked (product
// identity). Values: epoc_x, epoc_x_pro, mn8, flex, insight, emotivpro.
// GLOBAL/shared components (nav, footer, footernav, snackbar) NEVER carry
// product — they stay section-only everywhere. Product only on page-local
// content (hero, productnav, accessories, homepage carousel).
// Accessories: section=accessories + product=parent (e.g. epoc_x) — label
// differentiates the item. NO accessory product slugs.
// Model: product = what, section = where, URL path filter = which page (free in Umami).
// Per-product exports are STATIC (no string-arg factories — invisible to Framer picker).

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

