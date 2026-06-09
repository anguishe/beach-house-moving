// src/lib/gtag.ts
// GTM-managed analytics. GTM container: GTM-WNFSB7NT
// GA4 property: G-6H4SJSCW0G (managed inside GTM via GA4 Configuration tag)
//
// Event firing strategy: dataLayer.push() for all custom events.
// GTM listens for these events via Custom Event triggers and forwards to GA4.
// This decouples the site code from the GA4 Measurement ID entirely.
//
// window.gtag is also called as a fallback for generate_lead and contact
// in case the GTM GA4 Configuration tag exposes window.gtag directly.

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
    gtag?: (...args: unknown[]) => void
  }
}

/** Push a custom event to GTM dataLayer */
function pushEvent(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({
    event: eventName,
    ...params,
  })
  // Also call window.gtag if available (GTM GA4 Configuration tag exposes it)
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  }
}

/** Track quote form lead conversion */
export function trackQuoteLead(params?: {
  move_type?: string
  moving_from?: string
  moving_to?: string
}): void {
  pushEvent('generate_lead', {
    event_category: 'quote_form',
    ...params,
  })
}

/** Track phone number click */
export function trackPhoneClick(location: string): void {
  pushEvent('contact', {
    event_category: 'phone_click',
    phone_click_location: location,
  })
  // phone_click is a separate event from contact so GTM can have distinct triggers:
  // - A GA4 Event tag listening for "contact" (counts as a GA4 conversion event)
  // - A GTM click trigger on "phone_click" for debugging/heatmap tools
  // If GTM has a tag on BOTH events sending to GA4, disable the phone_click GA4 tag
  // to avoid double-counting phone conversions.
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer ?? []
    window.dataLayer.push({
      event: 'phone_click',
      phone_click_location: location,
    })
  }
}

/** Generic event (for any future custom events) */
export function trackEvent(
  action: string,
  category?: string,
  label?: string,
  value?: number
): void {
  pushEvent(action, {
    event_category: category,
    event_label: label,
    value,
  })
}
