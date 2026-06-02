'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Phone, Star } from 'lucide-react'
import Link from 'next/link'

import { BUSINESS, FLAGS, REVIEWS_PAGE, REVIEWS_PAGE_META, TESTIMONIALS } from '@/lib/content'
import { trackPhoneClick } from '@/lib/gtag'

function StarRow({ className = 'size-4' }: { className?: string }) {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${className} fill-brand-gold text-brand-gold`} strokeWidth={0} />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  if (!FLAGS.SHOW_TESTIMONIALS) {
    return null
  }

  return (
    <section id="about" className="bg-brand-sand py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">
            What Our Customers Say
          </p>
          <h2 className="mb-4 font-heading text-3xl font-bold leading-tight text-brand-navy md:text-4xl">
            The Panhandle Trusts Beach House Moving
          </h2>
          <div className="mx-auto mb-5 h-0.5 w-10 bg-brand-teal" />
          <p className="font-body text-base leading-relaxed text-ink-muted">
            Real reviews from real neighbors.
          </p>
        </div>

        <div className="mb-14 flex items-center justify-center gap-2.5">
          <StarRow className="size-5" />
          <span className="font-heading text-xl font-bold text-brand-navy">5.0</span>
          <span className="font-body text-sm text-ink-light">on Google</span>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
          {TESTIMONIALS.map((review, index) => (
            <motion.div
              key={`${review.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col gap-4 rounded-brand border border-brand-navy/6 bg-white p-6 shadow-brand md:p-7"
            >
              <StarRow />

              {review.text !== null ? (
                <p className="m-0 flex-1 font-body text-base italic leading-relaxed text-ink-muted">
                  &ldquo;{review.text}&rdquo;
                </p>
              ) : (
                <div className="flex flex-1 flex-col gap-2">
                  <p className="m-0 font-body text-base font-medium text-ink-muted">5-star rating</p>
                  <p className="m-0 font-body text-sm font-semibold text-brand-navy">{review.name}</p>
                </div>
              )}

              <div className="space-y-2 border-t border-brand-navy/8 pt-4">
                {review.text !== null ? (
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-teal">
                      <span className="font-body text-base font-bold text-white">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="m-0 font-body text-sm font-semibold text-brand-navy">{review.name}</p>
                      {review.location ? (
                        <p className="m-0 font-body text-xs text-ink-light">{review.location}</p>
                      ) : null}
                    </div>
                  </div>
                ) : null}
                <p className="m-0 flex items-center gap-1.5 font-body text-xs font-medium text-brand-teal">
                  <CheckCircle className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
                  {REVIEWS_PAGE.verifiedBadge}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <Link
            href="/reviews"
            className="font-body font-medium text-brand-teal underline-offset-2 hover:underline"
          >
            See all our Google reviews
          </Link>
          <a
            href={REVIEWS_PAGE_META.googleReviewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-ink-muted transition-colors hover:text-brand-teal"
          >
            Leave a review
          </a>
        </div>

        <div className="mt-14 text-center">
          <p className="mb-5 font-body text-base text-ink-muted">
            Join your neighbors across the Florida Panhandle.
          </p>
          <a
            href={BUSINESS.phone.href}
            onClick={() => trackPhoneClick('testimonials-section')}
            className="inline-flex items-center gap-2 rounded-brand bg-brand-coral px-8 py-4 font-body text-base font-semibold text-white no-underline shadow-brand transition-colors duration-200 hover:bg-brand-coral-dark hover:shadow-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
          >
            <Phone className="size-4" strokeWidth={1.8} aria-hidden />
            Call for Your Free Quote
          </a>
        </div>
      </div>
    </section>
  )
}
