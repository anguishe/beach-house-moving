'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { CheckCircle, Star } from 'lucide-react'
import Link from 'next/link'

import { REVIEWS_PAGE, REVIEWS_PAGE_META } from '@/lib/content'
import type { GoogleReview } from '@/lib/google-reviews'

type GoogleReviewsCarouselProps = {
  reviews: GoogleReview[]
  totalCount: number
  averageRating: number
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
    <article className="flex w-80 shrink-0 snap-start flex-col gap-4 rounded-brand bg-white p-6 shadow-brand md:w-96">
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

export function GoogleReviewsCarousel({
  reviews,
  totalCount,
  averageRating,
}: GoogleReviewsCarouselProps) {
  const prefersReducedMotion = useReducedMotion()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  const scroll = useCallback(() => {
    const el = scrollRef.current
    if (!el || isPaused || prefersReducedMotion) return

    const maxScroll = el.scrollWidth - el.clientWidth
    if (maxScroll <= 0) return

    el.scrollLeft += 1
    if (el.scrollLeft >= maxScroll) {
      el.scrollLeft = 0
    }
  }, [isPaused, prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion || reviews.length === 0) return

    const interval = window.setInterval(scroll, 30)
    return () => window.clearInterval(interval)
  }, [scroll, prefersReducedMotion, reviews.length])

  if (reviews.length === 0) {
    return null
  }

  const duplicatedReviews = [...reviews, ...reviews]

  return (
    <section id="reviews" className="bg-brand-sand py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal">
            What Our Customers Say
          </p>
          <h2 className="mb-4 font-heading text-3xl font-bold leading-tight text-brand-navy md:text-4xl">
            The Panhandle Trusts Beach House Moving
          </h2>
          <div className="mx-auto mb-5 h-0.5 w-10 bg-brand-teal" />
          <div className="flex items-center justify-center gap-2.5">
            <div className="flex gap-0.5" aria-hidden>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="size-5 fill-brand-gold text-brand-gold" strokeWidth={0} />
              ))}
            </div>
            <span className="font-heading text-xl font-bold text-brand-navy">
              {averageRating.toFixed(1)}
            </span>
            <span className="font-body text-sm text-ink-light">
              on Google · {totalCount} reviews
            </span>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          aria-label="Google customer reviews carousel"
        >
          {duplicatedReviews.map((review, index) => (
            <ReviewCard key={`${review.author_name}-${review.time}-${index}`} review={review} />
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
      </div>
    </section>
  )
}
