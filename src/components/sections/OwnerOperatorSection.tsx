import Image from 'next/image'
import Link from 'next/link'

import { BUSINESS, IMAGES } from '@/lib/content'

export function OwnerOperatorSection() {
  return (
    <section className="bg-brand-navy py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text column */}
          <div>
            <p className="mb-4 font-body text-sm font-semibold uppercase tracking-widest text-brand-teal">
              Why We&apos;re Different
            </p>
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              The People Who Own This Company Are the Ones on Your Job
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-white/80">
              We are four owners, one team, and no subcontractors. When you book Beach House Moving,
              the people who answer your call are the same people who show up, load the truck, and stay
              until the job is done. That&apos;s not a promise we made up — it&apos;s just how we built
              the company.
            </p>
            <Link
              href="/get-a-quote"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-brand bg-brand-coral px-8 font-body text-base font-semibold text-white transition-colors hover:bg-brand-coral-dark"
            >
              Get a Free Quote
            </Link>
          </div>

          {/* Image column */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-brand-lg">
            <Image
              src={IMAGES.fleet.src}
              alt="Beach House Moving full fleet — Sprinter van and two box trucks"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
