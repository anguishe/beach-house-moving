import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, ShieldCheck } from 'lucide-react'

import { TrackedPhoneLink } from '@/components/analytics/TrackedPhoneLink'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { PageShell } from '@/components/layout/PageShell'
import { QuoteForm } from '@/components/forms/QuoteForm'
import { FAQSection } from '@/components/sections/FAQSection'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  BUSINESS,
  GET_A_QUOTE_CONTENT,
  GET_A_QUOTE_FAQS,
  PAGE_META,
} from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema, contactPageSchema } from '@/lib/structured-data'
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
      <JsonLd
        data={[
          breadcrumbs,
          contactPageSchema('/get-a-quote', 'Get a Free Moving Quote', origin.origin),
        ]}
      />

      <section className="bg-brand-sand px-6 py-10 md:py-14">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-brand-coral">
            {GET_A_QUOTE_CONTENT.eyebrow}
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-brand-navy md:text-5xl">
            {GET_A_QUOTE_CONTENT.headline}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-ink-muted md:text-lg">
            {GET_A_QUOTE_CONTENT.subheadline}
          </p>
        </div>
      </section>

      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Get a Quote' },
            ]}
          />

          {/* Trust signals */}
          <ul
            aria-label="Why choose Beach House Moving"
            className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 rounded-brand-lg border border-brand-teal/20 bg-white px-6 py-4 shadow-brand"
          >
            {GET_A_QUOTE_CONTENT.trustSignals.map((signal, index) => (
              <li
                key={signal}
                className="flex items-center gap-2 font-body text-sm font-medium text-brand-navy"
              >
                {index > 0 && (
                  <span className="hidden text-ink-light sm:inline" aria-hidden>
                    ·
                  </span>
                )}
                <ShieldCheck className="size-4 shrink-0 text-brand-teal" aria-hidden />
                {signal}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-12 lg:grid-cols-2">
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
                  <p className="font-body text-sm text-ink-light">
                    Tap to call · Available 7 days a week
                  </p>
                </div>
              </TrackedPhoneLink>

              <ul className="space-y-3 font-body text-sm text-ink-muted">
                {GET_A_QUOTE_CONTENT.sidebarNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>

              <p className="font-body text-sm text-ink-light">
                {GET_A_QUOTE_CONTENT.browseServices.prefix}{' '}
                <Link href="/services" className="font-semibold text-brand-teal hover:underline">
                  {GET_A_QUOTE_CONTENT.browseServices.linkLabel}
                </Link>
              </p>
            </div>

            <div className="rounded-brand-lg border border-brand-navy/8 bg-white p-8 shadow-brand-lg">
              <h2 className="font-heading text-xl font-bold text-brand-navy">
                {GET_A_QUOTE_CONTENT.formHeadline}
              </h2>
              <p className="mt-2 font-body text-sm text-ink-muted">
                {GET_A_QUOTE_CONTENT.formSubheadline}
              </p>
              <div className="mt-6">
                <QuoteForm />
              </div>
            </div>
          </div>

          {/* What happens next */}
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-brand-navy md:text-3xl">
              {GET_A_QUOTE_CONTENT.whatHappensNext.headline}
            </h2>
            <p className="mt-3 max-w-3xl font-body text-base leading-relaxed text-ink-muted">
              {GET_A_QUOTE_CONTENT.whatHappensNext.intro}
            </p>
            <ol className="mt-8 grid gap-6 md:grid-cols-3">
              {GET_A_QUOTE_CONTENT.whatHappensNext.steps.map((step, index) => (
                <li
                  key={step.title}
                  className="rounded-brand-lg border border-brand-navy/8 bg-brand-sand p-6"
                >
                  <span
                    className="inline-flex size-8 items-center justify-center rounded-full bg-brand-navy font-body text-sm font-bold text-white"
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-brand-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Phone CTA */}
          <div className="mt-12 rounded-brand-lg bg-brand-navy px-8 py-8 text-center">
            <p className="font-body text-base text-white/90">
              {GET_A_QUOTE_CONTENT.phoneCta.prefix}{' '}
              <TrackedPhoneLink
                location="get-a-quote-phone-cta"
                className="font-semibold text-brand-teal underline-offset-2 hover:underline"
              >
                {BUSINESS.phone.display}
              </TrackedPhoneLink>
            </p>
          </div>
        </div>
      </section>

      <FAQSection faqs={GET_A_QUOTE_FAQS} />
    </PageShell>
  )
}
