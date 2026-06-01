'use client'

import Image from 'next/image'
import { CheckCircle2, Phone } from 'lucide-react'

import { TrackedPhoneLink } from '@/components/analytics/TrackedPhoneLink'
import { QuoteForm } from '@/components/forms/QuoteForm'
import { BUSINESS } from '@/lib/content'

const trustItems = [
  'No robots. No hold music. A real person answers.',
  'Available 7 days a week — call anytime.',
  'Free estimates with zero obligation.',
] as const

const quotePhotos = [
  {
    src: '/images/move-inlet-beach.jpg',
    alt: 'Beach House Moving at Inlet Beach, FL',
    span: true,
  },
  {
    src: '/images/fleet-box-truck.jpg',
    alt: 'Beach House Moving box truck',
    span: false,
  },
  {
    src: '/images/team-stairs.jpg',
    alt: 'Beach House Moving team',
    span: false,
  },
] as const

export function QuoteFormSection() {
  return (
    <>
      <div id="contact" className="sr-only" aria-hidden="true" />
      <section
        id="quote"
        className="bg-gradient-to-b from-brand-sand/60 to-white py-24"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <div className="flex flex-col gap-5">
              <p className="m-0 font-body text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">
                Free Estimates · No Obligation
              </p>

              <div>
                <span className="block font-heading text-3xl font-bold leading-tight text-brand-navy md:text-4xl">
                  The fastest way
                </span>
                <span className="block font-heading text-3xl font-bold italic leading-tight text-brand-coral md:text-4xl">
                  to get moving?
                </span>
                <span className="mt-2 block font-heading text-xl font-semibold leading-snug text-brand-navy md:text-2xl">
                  Just call us.
                </span>
              </div>

              <TrackedPhoneLink
                location="quote-form-section"
                className="flex items-center gap-5 rounded-brand-lg border border-brand-teal/25 bg-brand-sand p-6 no-underline shadow-brand transition-shadow hover:border-brand-teal/60 hover:shadow-brand-lg"
              >
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-teal shadow-md">
                  <Phone className="size-6 text-white" strokeWidth={1.6} aria-hidden />
                </div>
                <div>
                  <p className="m-0 font-heading text-3xl font-bold leading-none text-brand-navy">
                    {BUSINESS.phone.display}
                  </p>
                  <p className="mt-1.5 font-body text-sm text-ink-light">
                    Tap to call · Available 7 days a week
                  </p>
                </div>
              </TrackedPhoneLink>

              {trustItems.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-brand-teal"
                    strokeWidth={1.8}
                    aria-hidden
                  />
                  <p className="m-0 font-body text-base leading-relaxed text-ink-muted">{item}</p>
                </div>
              ))}

              <div className="mt-2 grid grid-cols-2 gap-2.5">
                {quotePhotos.map((photo) => (
                  <div
                    key={photo.src}
                    className={`relative overflow-hidden rounded-brand bg-brand-sand ${photo.span ? 'col-span-2 aspect-video' : 'aspect-square'}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-contain object-center p-1"
                    />
                  </div>
                ))}
              </div>

              <p className="mt-1 text-center font-body text-xs text-ink-light">
                {BUSINESS.licenseStatement}
              </p>
            </div>

            <div className="rounded-brand-lg border border-brand-navy/6 bg-white p-8 shadow-brand-lg md:p-10">
              <h3 className="mt-0 mb-1 font-heading text-xl font-bold text-brand-navy md:text-2xl">
                Prefer a form?
              </h3>
              <p className="mt-0 mb-7 font-body text-sm text-ink-light">
                Fill this out and we&apos;ll call you back.
              </p>

              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
