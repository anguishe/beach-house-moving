declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

/** Fire a GA4 event (no-op when gtag or measurement ID is unavailable). */
export function trackEvent(eventName: string, params?: Record<string, string | number>) {
  if (typeof window === 'undefined' || !window.gtag || !GA_MEASUREMENT_ID) return
  window.gtag('event', eventName, params)
}

/** Conversion event for successful quote form submission. */
export function trackGenerateLead() {
  trackEvent('generate_lead', { event_category: 'engagement' })
}

/** Engagement event for tel: link clicks (Navbar, hero, footer, CTAs, mobile call bar). */
export function trackContact() {
  trackEvent('contact', { event_category: 'engagement', method: 'phone' })
}
