import type { Metadata } from 'next'
import Image from 'next/image'
import { Clock, ShieldCheck, Truck } from 'lucide-react'

import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { PageHero } from '@/components/layout/PageHero'
import { PageShell } from '@/components/layout/PageShell'
import { FAQSection } from '@/components/sections/FAQSection'
import { JsonLd } from '@/components/seo/JsonLd'
import { ABOUT_CONTENT, BUSINESS, FAQS, IMAGES, PAGE_META } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema, faqSchema } from '@/lib/structured-data'
import { getSiteOrigin } from '@/lib/site-url'

const aboutFaqs = [FAQS[0], FAQS[1], FAQS[5]]

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
      <JsonLd data={[breadcrumbs, faqSchema(aboutFaqs)]} />

      <PageHero
        eyebrow={ABOUT_CONTENT.eyebrow}
        title={ABOUT_CONTENT.headline}
        description={ABOUT_CONTENT.intro}
        image={IMAGES.fleet}
        priority
      />

      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'About' },
            ]}
          />

          <div className="mt-8 space-y-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-brand-navy">Our Story</h2>
              <div className="mt-4 space-y-4">
                {ABOUT_CONTENT.storyParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="font-body text-base leading-relaxed text-ink-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-brand-navy">Our Values</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {ABOUT_CONTENT.values.map((value) => (
                  <div
                    key={value.title}
                    className="rounded-brand-lg border border-brand-navy/8 bg-white p-5 shadow-brand"
                  >
                    <h3 className="font-heading text-lg font-semibold text-brand-navy">
                      {value.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-brand-lg bg-brand-sand p-8">
              <div className="flex items-start gap-4">
                <Truck className="size-8 shrink-0 text-brand-teal" strokeWidth={1.6} aria-hidden />
                <div>
                  <h2 className="font-heading text-2xl font-bold text-brand-navy">
                    {ABOUT_CONTENT.fleetHeadline}
                  </h2>
                  <p className="mt-3 font-body text-base leading-relaxed text-ink-muted">
                    {ABOUT_CONTENT.fleetDescription}
                  </p>
                  <p className="mt-2 font-body text-sm font-semibold text-brand-teal">
                    {BUSINESS.fleetCount} fully equipped trucks
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {BUSINESS.registration.display && (
                <div className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-2.5 font-body text-sm font-semibold text-white">
                  <ShieldCheck className="size-4 text-brand-teal" aria-hidden />
                  {ABOUT_CONTENT.licenseBadge}
                </div>
              )}
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-navy/15 bg-white px-5 py-2.5 font-body text-sm font-semibold text-brand-navy">
                <Clock className="size-4 text-brand-teal" aria-hidden />
                {ABOUT_CONTENT.hoursBadge}
              </div>
            </div>

            {/* TODO: confirm photo — replace placeholder when owner/team asset is available */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-brand-lg bg-brand-sand">
              <Image
                src={IMAGES.boxTruck.src}
                alt="Beach House Moving crew and truck — team photo placeholder"
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-contain p-4"
              />
              <div className="absolute inset-x-0 bottom-0 bg-brand-navy/80 px-4 py-3 text-center">
                <p className="font-body text-xs text-white/70">
                  Team photo coming soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={aboutFaqs} />
    </PageShell>
  )
}
