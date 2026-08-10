import { forwardRef, type ComponentType } from "react"

// Learn more: https://www.framer.com/developers/overrides/
//
// Section vocabulary (2026-08-07): scan page → compare → reuse → add only if missing.
// Section = layout role, not page (url covers page), not heading copy.
// Label disambiguates within a section. Event name = action verb only.
// Values: nav, hero, banner, applications, pathway, platform, product, news,
//         footer, productnav, features, casestudies, testimonials, leadmagnet,
//         specs, usecases, gettingstarted, tiers, community, download, footernav
// Legacy: pricing, howitworks, faq

// ── Global / shared ──────────────────────────────────────────────────────────

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
