import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Home, Package, Phone, Shield, ShieldCheck, Truck } from 'lucide-react'

import { TrackedPhoneLink } from '@/components/analytics/TrackedPhoneLink'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { PageShell } from '@/components/layout/PageShell'
import { FAQSection } from '@/components/sections/FAQSection'
import { JsonLd } from '@/components/seo/JsonLd'
import { ABOUT_CONTENT, BUSINESS, FAQS, IMAGES } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema, faqSchema } from '@/lib/structured-data'
import { getSiteOrigin } from '@/lib/site-url'

const aboutFaqs = [FAQS[0], FAQS[1], FAQS[5]]

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'About Beach House Moving | Owner-Operated Movers on the Emerald Coast',
    description: `Beach House Moving is a ${BUSINESS.teamSize}-person, owner-operated moving company on the Florida Panhandle. Licensed FL Mover Reg. #${BUSINESS.registration.number}, fully insured, available 24/7. We are the movers.`,
    path: '/about',
  })
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

      {/* Direct-answer paragraph — AEO */}
      <div className="bg-brand-sand px-6 py-6">
        <div className="mx-auto max-w-4xl">
          <p className="font-body text-base leading-relaxed text-ink-muted">
            Beach House Moving is a locally owned, owner-operated moving company based on the Emerald
            Coast of Northwest Florida. We are four owners who are also the movers — the same people who
            answer the phone, load the truck, and carry your furniture are the ones who built this
            company. Licensed under Florida Mover Registration #{BUSINESS.registration.number}, fully
            insured, and available {BUSINESS.hours}.
          </p>
        </div>
      </div>

      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'About' },
            ]}
          />

          <h1 className="mt-6 font-heading text-4xl font-bold text-brand-navy md:text-5xl">
            About Beach House Moving
          </h1>

          <div className="mt-10 space-y-12">
            {/* Section 1 */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-brand-navy">
                We Show Up Ourselves
              </h2>
              <p className="mt-4 font-body text-base leading-relaxed text-ink-muted">
                Most moving companies have owners in an office and strangers on your job. We built
                Beach House Moving differently. Our crew of four is our ownership team — which means
                accountability isn&apos;t a policy, it&apos;s personal. When something matters to you,
                it matters to us, because the people carrying your furniture are the same people whose
                names are on the company.
              </p>
            </div>

            {/* Section 2 — What we specialize in */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-brand-navy">
                What We Specialize In
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
                <div className="rounded-brand-lg bg-brand-sand p-6">
                  <Home className="mb-3 size-6 text-brand-teal" strokeWidth={1.5} aria-hidden />
                  <h3 className="font-heading text-base font-semibold text-brand-navy">
                    Luxury Beach Homes &amp; New Construction
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
                    Beachside homes on 30A and new builds across the Panhandle come with their own
                    challenges — elevated entries, finished floors, narrow driveways, long carries.
                    We&apos;ve done this work across every 30A community and we protect what
                    you&apos;ve built.
                  </p>
                </div>
                <div className="rounded-brand-lg bg-brand-sand p-6">
                  <Package className="mb-3 size-6 text-brand-teal" strokeWidth={1.5} aria-hidden />
                  <h3 className="font-heading text-base font-semibold text-brand-navy">
                    Appliance &amp; Specialty Delivery
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
                    Refrigerators, washers, dryers, TVs, and oversized items — we place them, position
                    them, and don&apos;t leave until they&apos;re right. Same professionalism as a full
                    move, applied to a single item.
                  </p>
                </div>
                <div className="rounded-brand-lg bg-brand-sand p-6">
                  <Shield className="mb-3 size-6 text-brand-teal" strokeWidth={1.5} aria-hidden />
                  <h3 className="font-heading text-base font-semibold text-brand-navy">
                    Military PCS Near Eglin &amp; Hurlburt
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
                    PCS moves have tight timelines and real stakes. We understand base housing
                    requirements, weight ticket logistics, and what it means to have a move that
                    can&apos;t slip. Military families near Eglin AFB and Hurlburt Field — we&apos;re
                    ready when you are.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3 — Fleet */}
            <div className="rounded-brand-lg bg-brand-sand p-8">
              <div className="flex items-start gap-4">
                <Truck className="size-8 shrink-0 text-brand-teal" strokeWidth={1.6} aria-hidden />
                <div>
                  <h2 className="font-heading text-2xl font-bold text-brand-navy">Our Fleet</h2>
                  <p className="mt-3 font-body text-base leading-relaxed text-ink-muted">
                    We run a {BUSINESS.fleetCount}-vehicle fleet: two box trucks with lift gates for
                    full home and appliance moves, and a Sprinter van for smaller jobs and specialty
                    deliveries. Every vehicle is equipped with the ramps, dollies, straps, and blankets
                    the job needs — nothing rented last-minute, nothing improvised.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4 — License */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-brand-navy">
                Licensed &amp; Insured. Always.
              </h2>
              <p className="mt-4 font-body text-base leading-relaxed text-ink-muted">
                {BUSINESS.licenseStatement} We carry that not because we have to, but because
                it&apos;s how we&apos;d want it if we were the customer.
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-4">
              {BUSINESS.registration.display && (
                <div className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-2.5 font-body text-sm font-semibold text-white">
                  <ShieldCheck className="size-4 text-brand-teal" aria-hidden />
                  {ABOUT_CONTENT.licenseBadge}
                </div>
              )}
            </div>

            {/* Fleet image */}
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

            {/* CTA */}
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
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={aboutFaqs} />
    </PageShell>
  )
}
