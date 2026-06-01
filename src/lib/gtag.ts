declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''

export function pageview(url: string) {
  if (!GA_ID || typeof window === 'undefined' || !window.gtag) return
  window.gtag('config', GA_ID, { page_path: url })
}

export function event({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) {
  if (!GA_ID || typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', action, {
    event_category: category,
    ...(label !== undefined && { event_label: label }),
    ...(value !== undefined && { value }),
  })
}

export function trackQuoteLead() {
  event({ action: 'generate_lead', category: 'conversion' })
}

export function trackPhoneClick(location: string) {
  event({ action: 'contact', category: 'engagement', label: location })
}
