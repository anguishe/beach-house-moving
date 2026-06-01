import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone } from 'lucide-react'

import { TrackedPhoneLink } from '@/components/analytics/TrackedPhoneLink'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { PageHero } from '@/components/layout/PageHero'
import { PageShell } from '@/components/layout/PageShell'
import { QuoteForm } from '@/components/forms/QuoteForm'
import { JsonLd } from '@/components/seo/JsonLd'
import { BUSINESS, PAGE_META } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { getSiteOrigin } from '@/lib/site-url'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(PAGE_META.getAQuote)
}

export default async function GetAQuotePage() {
  const origin = await getSiteOrigin()
  const breadcrumbs = breadcrumbSchema(
    [
      { name: 'Home', path: '/' },
      { name: 'Get a Quote', path: '/get-a-quote' },
    ],
    origin.origin,
  )

  return (
    <PageShell>
      <JsonLd data={breadcrumbs} />

      <PageHero
        eyebrow="Free Estimates · No Obligation"
        title="Get Your Free Moving Quote"
        description="Fill out the form below and we'll call you back with an honest estimate. Prefer to talk now? Call us directly — a real person answers."
      />

      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Get a Quote' },
            ]}
          />

          <div className="mt-8 grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <TrackedPhoneLink
                location="get-a-quote-page"
                className="flex items-center gap-4 rounded-brand-lg border border-brand-teal/25 bg-brand-sand p-6 transition-shadow hover:shadow-brand"
              >
                <div className="flex size-14 items-center justify-center rounded-full bg-brand-teal shadow-md">
                  <Phone className="size-6 text-white" strokeWidth={1.6} aria-hidden />
                </div>
                <div>
                  <p className="font-body text-xs font-semibold uppercase tracking-wide text-ink-light">
                    Fastest way to get moving
                  </p>
                  <p className="font-heading text-3xl font-bold text-brand-navy">
                    {BUSINESS.phone.display}
                  </p>
                  <p className="font-body text-sm text-ink-light">Tap to call · Available 7 days a week</p>
                </div>
              </TrackedPhoneLink>

              <ul className="space-y-3 font-body text-sm text-ink-muted">
                <li>No robots. No hold music. A real person answers.</li>
                <li>Free estimates with zero obligation.</li>
                <li>{BUSINESS.licenseStatement}</li>
              </ul>

              <p className="font-body text-sm text-ink-light">
                Already know what you need?{' '}
                <Link href="/services" className="font-semibold text-brand-teal hover:underline">
                  Browse our services
                </Link>
              </p>
            </div>

            <div className="rounded-brand-lg border border-brand-navy/8 bg-white p-8 shadow-brand-lg">
              <h2 className="font-heading text-xl font-bold text-brand-navy">
                Request a Quote Online
              </h2>
              <p className="mt-2 font-body text-sm text-ink-muted">
                We&apos;ll review your details and call you back promptly.
              </p>
              <div className="mt-6">
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
