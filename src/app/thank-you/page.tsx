import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, Phone } from 'lucide-react'

import { TrackedPhoneLink } from '@/components/analytics/TrackedPhoneLink'
import { PageShell } from '@/components/layout/PageShell'
import { BUSINESS, PAGE_META, THANK_YOU_CONTENT } from '@/lib/content'
import { buildNoIndexMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildNoIndexMetadata(PAGE_META.thankYou)
}

export default function ThankYouPage() {
  return (
    <PageShell>
      <section className="flex min-h-[60vh] items-center px-6 py-24 pt-32">
        <div className="mx-auto max-w-lg text-center">
          <CheckCircle2
            className="mx-auto size-16 text-green-500"
            strokeWidth={1.5}
            aria-hidden
          />
          <h1 className="mt-6 font-heading text-3xl font-bold text-brand-navy md:text-4xl">
            {THANK_YOU_CONTENT.headline}
          </h1>
          <p className="mt-3 font-body text-base text-ink-muted">
            {THANK_YOU_CONTENT.subheadline}
          </p>

          <ol className="mt-8 space-y-3 text-left">
            {THANK_YOU_CONTENT.steps.map((step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-teal/10 font-body text-xs font-bold text-brand-teal">
                  {index + 1}
                </span>
                <span className="font-body text-sm leading-relaxed text-ink-muted">{step}</span>
              </li>
            ))}
          </ol>

          <TrackedPhoneLink
            location="thank-you-page"
            className="mt-10 inline-flex items-center gap-2 rounded-brand bg-brand-coral px-8 py-3.5 font-body text-base font-semibold text-white shadow-brand hover:bg-brand-coral-dark"
          >
            <Phone className="size-4" aria-hidden />
            {THANK_YOU_CONTENT.ctaLabel} — {BUSINESS.phone.display}
          </TrackedPhoneLink>

          <p className="mt-6 font-body text-sm text-ink-light">
            <Link href="/" className="font-semibold text-brand-teal hover:underline">
              Return to homepage
            </Link>
          </p>
        </div>
      </section>
    </PageShell>
  )
}
