'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle, Star } from 'lucide-react'

import { TrackedPhoneLink } from '@/components/analytics/TrackedPhoneLink'
import { BUSINESS, REVIEWS_PAGE } from '@/lib/content'
import type { GoogleReview } from '@/lib/google-reviews'

type GoogleReviewsGridProps = {
  reviews: GoogleReview[]
  intro?: string
}

const TRUNCATE_LENGTH = 180

function GoogleGIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={20} height={20} aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`size-4 ${i <= rating ? 'fill-brand-gold text-brand-gold' : 'fill-brand-navy/10 text-brand-navy/10'}`}
          strokeWidth={0}
          aria-hidden
        />
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const [expanded, setExpanded] = useState(false)
  const needsTruncate = review.text.length > TRUNCATE_LENGTH
  const displayText =
    expanded || !needsTruncate ? review.text : `${review.text.slice(0, TRUNCATE_LENGTH).trimEnd()}…`

  return (
    <article className="flex flex-col gap-4 rounded-brand bg-white p-6 shadow-brand">
      <StarRow rating={review.rating} />

      {review.text ? (
        <div className="flex-1">
          <p className="font-body text-base italic leading-relaxed text-ink-muted">
            &ldquo;{displayText}&rdquo;
          </p>
          {needsTruncate ? (
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="mt-2 font-body text-sm font-medium text-brand-teal hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal rounded-sm"
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>
          ) : null}
        </div>
      ) : (
        <p className="flex-1 font-body text-sm italic leading-relaxed text-ink-light">
          {REVIEWS_PAGE.noWrittenReview}
        </p>
      )}

      <div className="space-y-2 border-t border-brand-navy/8 pt-4">
        <p className="font-body font-semibold text-brand-navy">{review.author_name}</p>
        <p className="font-body text-xs text-ink-light">{review.relative_time_description}</p>
        <p className="flex items-center gap-1.5 font-body text-xs font-medium text-brand-teal">
          <CheckCircle className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
          {REVIEWS_PAGE.verifiedBadge}
        </p>
        <p className="flex items-center gap-1.5 font-body text-xs text-ink-light">
          <GoogleGIcon className="size-3.5 shrink-0" />
          Google
        </p>
      </div>
    </article>
  )
}

function ReviewsInlineCTA() {
  return (
    <div className="col-span-full rounded-brand-lg bg-brand-navy px-6 py-10 text-center shadow-brand md:px-10">
      <p className="font-body text-base leading-relaxed text-white md:text-lg">
        Have a move coming up?{' '}
        <TrackedPhoneLink
          location="reviews-grid-inline-cta"
          className="inline-flex items-center justify-center rounded-brand bg-brand-coral px-5 py-2.5 font-body text-base font-semibold text-white no-underline shadow-brand transition-colors duration-200 hover:bg-brand-coral-dark hover:shadow-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
        >
          Call {BUSINESS.phone.display}
        </TrackedPhoneLink>{' '}
        — we answer 24/7.
      </p>
      <Link
        href="/get-a-quote"
        className="mt-5 inline-block font-body text-sm font-semibold text-brand-teal underline-offset-4 transition-colors hover:text-brand-teal-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
      >
        Get a Free Quote
      </Link>
    </div>
  )
}

export function GoogleReviewsGrid({ reviews, intro }: GoogleReviewsGridProps) {
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }

  const cardVariants = prefersReducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
      }

  return (
    <section className="bg-brand-sand py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="mb-6 flex items-center justify-center gap-2 font-heading text-3xl font-bold text-brand-navy md:text-4xl">
          <GoogleGIcon className="shrink-0" />
          {REVIEWS_PAGE.reviewsSection.heading}
        </h2>

        {intro ? (
          <p className="mx-auto mb-12 max-w-3xl text-center font-body text-base leading-relaxed text-ink-muted">
            {intro}
          </p>
        ) : null}

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {reviews.flatMap((review, index) => {
            const card = (
              <motion.div
                key={`${review.author_name}-${review.time}-${index}`}
                variants={cardVariants}
              >
                <ReviewCard review={review} />
              </motion.div>
            )

            if (index === 2) {
              return [card, <ReviewsInlineCTA key="reviews-inline-cta" />]
            }

            return [card]
          })}
        </motion.div>
      </div>
    </section>
  )
}
