import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Phone } from 'lucide-react'

import { TrackedPhoneLink } from '@/components/analytics/TrackedPhoneLink'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { PageShell } from '@/components/layout/PageShell'
import { FAQSection } from '@/components/sections/FAQSection'
import { JsonLd } from '@/components/seo/JsonLd'
import { ABOUT_CONTENT, ABOUT_FAQS, BUSINESS, IMAGES, PAGE_META } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { aboutPageSchema, breadcrumbSchema, faqSchema } from '@/lib/structured-data'
import { getSiteOrigin } from '@/lib/site-url'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(PAGE_META.about)
}

export default async function AboutPage() {
  const origin = await getSiteOrigin()
  const breadcrumbs = breadcrumbSchema(
    [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ],
    origin.origin,
  )

  return (
    <PageShell>
      <JsonLd data={[breadcrumbs, aboutPageSchema(origin.origin), faqSchema(ABOUT_FAQS)]} />

      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'About' },
            ]}
          />

          <h1 className="mt-6 font-heading text-4xl font-bold text-brand-navy md:text-5xl">
            {ABOUT_CONTENT.pageTitle}
          </h1>

          <div className="mt-10 space-y-12">
            <div className="space-y-4">
              {ABOUT_CONTENT.opening.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="font-body text-base leading-relaxed text-ink-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-brand-navy">
                {ABOUT_CONTENT.story.headline}
              </h2>
              <div className="mt-4 space-y-4">
                {ABOUT_CONTENT.story.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="font-body text-base leading-relaxed text-ink-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-brand-navy">
                {ABOUT_CONTENT.whyLocalMatters.headline}
              </h2>
              <p className="mt-4 font-body text-base leading-relaxed text-ink-muted">
                {ABOUT_CONTENT.whyLocalMatters.intro}
              </p>
              <div className="mt-6 space-y-6">
                {ABOUT_CONTENT.whyLocalMatters.points.map((point) => (
                  <div
                    key={point.county}
                    className="rounded-brand-lg border border-brand-navy/8 bg-brand-sand p-6"
                  >
                    <h3 className="font-heading text-lg font-semibold text-brand-navy">
                      {point.county}
                    </h3>
                    <p className="mt-2 font-body text-base leading-relaxed text-ink-muted">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-brand-lg bg-brand-sand p-8">
              <h2 className="font-heading text-2xl font-bold text-brand-navy">
                {ABOUT_CONTENT.fleet.headline}
              </h2>
              <p className="mt-3 font-body text-base leading-relaxed text-ink-muted">
                {ABOUT_CONTENT.fleet.intro}
              </p>
              <ul className="mt-6 space-y-4">
                {ABOUT_CONTENT.fleet.vehicles.map((vehicle) => (
                  <li key={vehicle.name} className="font-body text-base leading-relaxed text-ink-muted">
                    <span className="font-semibold text-brand-navy">{vehicle.name}:</span>{' '}
                    {vehicle.description}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-brand-navy">
                {ABOUT_CONTENT.credentials.headline}
              </h2>
              <ul className="mt-4 space-y-3">
                {ABOUT_CONTENT.credentials.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-body text-base leading-relaxed text-ink-muted"
                  >
                    <CheckCircle2
                      className="mt-0.5 size-5 shrink-0 text-brand-teal"
                      strokeWidth={1.6}
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative aspect-[16/9] overflow-hidden rounded-brand-lg bg-brand-sand">
              <Image
                src={IMAGES.fleet.src}
                alt={IMAGES.fleet.alt}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-contain p-4"
              />
            </div>

            <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row">
              <TrackedPhoneLink
                location="about-page"
                className="inline-flex h-12 items-center gap-2 rounded-brand bg-brand-coral px-8 font-body text-base font-semibold text-white shadow-brand transition-colors hover:bg-brand-coral-dark"
              >
                <Phone className="size-4" aria-hidden />
                {BUSINESS.phone.display}
              </TrackedPhoneLink>
              <Link
                href="/get-a-quote"
                className="inline-flex h-12 items-center justify-center rounded-brand border-2 border-brand-navy px-8 font-body text-base font-semibold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white"
              >
                {ABOUT_CONTENT.cta.quoteLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={ABOUT_FAQS} />
    </PageShell>
  )
}
