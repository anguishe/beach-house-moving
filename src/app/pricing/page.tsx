import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone } from 'lucide-react'

import { TrackedPhoneLink } from '@/components/analytics/TrackedPhoneLink'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { PageShell } from '@/components/layout/PageShell'
import { JsonLd } from '@/components/seo/JsonLd'
import { BUSINESS, FAQS } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { getSiteOrigin } from '@/lib/site-url'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'How Much Do Movers Cost on 30A & the Emerald Coast? | Beach House Moving',
    description:
      'Honest answers about moving costs on the Florida Panhandle. No hidden fees. Free estimates. Owner-operated crew — (850) 842-1962.',
    path: '/pricing',
  })
}

const pricingFactors = [
  {
    factor: 'Home size',
    detail:
      'Larger homes take more time and more truck capacity. We’ll walk through room count and major items before quoting.',
  },
  {
    factor: 'Distance',
    detail:
      'Local moves within Walton, Okaloosa, or Bay County are priced differently than long-distance relocations. We’re transparent about both.',
  },
  {
    factor: 'Stairs, elevators & long carries',
    detail:
      'Beachside homes, 30A communities, and condo towers often have access challenges. We account for these upfront — not after the job.',
  },
  {
    factor: 'Packing services',
    detail:
      'If you want us to pack, we include the time and materials in your estimate. No surprise supply charges.',
  },
  {
    factor: 'Specialty items',
    detail:
      'Appliances, pianos, artwork, and oversized pieces require extra care and equipment. We price these honestly.',
  },
  {
    factor: 'Timing',
    detail:
      'Weekend and month-end moves are in higher demand. Earlier booking often means more flexibility on scheduling.',
  },
]

const howToSteps = [
  `Call us at ${BUSINESS.phone.display} — a real person answers, ${BUSINESS.hours}.`,
  'Tell us your move size, the addresses, any stairs or specialty items, and your target date.',
  'We’ll give you a clear estimate, usually within the same conversation.',
  'If details change before the move, we’ll update the estimate — no surprises at delivery.',
]

export default async function PricingPage() {
  const origin = await getSiteOrigin()
  const breadcrumbs = breadcrumbSchema(
    [
      { name: 'Home', path: '/' },
      { name: 'Pricing', path: '/pricing' },
    ],
    origin.origin,
  )

  const pricingFaqQuestions = new Set([
    'How much does a move cost?',
    'Do you charge for estimates?',
    'How do I get a quote?',
  ])
  const pricingFaqs = FAQS.filter((f) => pricingFaqQuestions.has(f.q))

  return (
    <PageShell>
      <JsonLd data={breadcrumbs} />

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Pricing' },
            ]}
          />

          <h1 className="mt-6 font-heading text-4xl font-bold text-brand-navy md:text-5xl">
            What Does a Move Cost on the Emerald Coast?
          </h1>

          {/* Direct-answer paragraph */}
          <p className="mt-6 font-body text-lg leading-relaxed text-ink-muted">
            Moving costs on 30A and the Florida Panhandle depend on a few honest variables: the size
            of your home, the distance between addresses, how many stairs or long-carry situations are
            involved, and whether you need packing. Beach House Moving provides free, itemized
            estimates — no surprises, no hidden fees. Call {BUSINESS.phone.display} and we&apos;ll
            give you a real number, not a range designed to get in the door.
          </p>

          {/* What affects cost */}
          <div className="mt-14">
            <h2 className="font-heading text-2xl font-bold text-brand-navy">
              What Affects the Cost of Your Move
            </h2>
            <div className="mt-6 divide-y divide-brand-navy/8 overflow-hidden rounded-brand-lg border border-brand-navy/8 bg-white shadow-brand">
              {pricingFactors.map(({ factor, detail }) => (
                <div key={factor} className="grid gap-1 px-6 py-5 sm:grid-cols-[220px_1fr] sm:gap-4">
                  <p className="font-body text-sm font-semibold text-brand-navy">{factor}</p>
                  <p className="font-body text-sm leading-relaxed text-ink-muted">{detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What you'll never pay for */}
          <div className="mt-14">
            <h2 className="font-heading text-2xl font-bold text-brand-navy">
              What You&apos;ll Never Pay For
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-ink-muted">
              There are no fuel surcharges, no mattress fees, no stair fees that appear only on the
              final invoice. What we quote is what you pay. That&apos;s a reflection of how we&apos;d
              want to be treated — not a marketing line.
            </p>
          </div>

          {/* How to get an estimate */}
          <div className="mt-14">
            <h2 className="font-heading text-2xl font-bold text-brand-navy">
              How to Get an Accurate Estimate
            </h2>
            <ol className="mt-6 space-y-4">
              {howToSteps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-teal font-body text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="pt-1 font-body text-base leading-relaxed text-ink-muted">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* FAQ block */}
          <div className="mt-14">
            <h2 className="mb-6 font-heading text-2xl font-bold text-brand-navy">
              Frequently Asked Questions About Moving Costs
            </h2>
            <div className="space-y-4">
              {pricingFaqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-brand border border-brand-navy/8 bg-white p-6 shadow-brand"
                >
                  <h3 className="font-heading text-base font-semibold text-brand-navy">{faq.q}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-coral px-6 py-16 text-white md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Get Your Free Estimate
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-base text-white/85">
            {BUSINESS.promise}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <TrackedPhoneLink
              location="pricing-page"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-brand bg-white px-8 font-body text-base font-semibold text-brand-coral shadow-brand transition-colors hover:bg-white/90"
            >
              <Phone className="size-4" aria-hidden />
              {BUSINESS.phone.display}
            </TrackedPhoneLink>
            <Link
              href="/get-a-quote"
              className="inline-flex h-12 items-center justify-center rounded-brand border-2 border-white px-8 font-body text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Request a Quote Online
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
