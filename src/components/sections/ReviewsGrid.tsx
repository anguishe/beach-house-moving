'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle, Star } from 'lucide-react'

import { REVIEWS_PAGE, TESTIMONIALS } from '@/lib/content'

function GoogleGIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={20}
      height={20}
      aria-hidden
    >
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

function StarRow({ size = 'md' }: { size?: 'md' | 'sm' }) {
  const iconClass = size === 'sm' ? 'size-4' : 'size-5'
  return (
    <div className="flex gap-0.5" aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${iconClass} fill-brand-gold text-brand-gold`} strokeWidth={0} />
      ))}
    </div>
  )
}

export function ReviewsGrid() {
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1 },
        },
      }

  const cardVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: 'easeOut' as const },
        },
      }

  return (
    <section className="bg-brand-sand py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="mb-12 flex items-center justify-center gap-2 font-heading text-3xl font-bold text-brand-navy md:text-4xl">
          <GoogleGIcon className="shrink-0" />
          {REVIEWS_PAGE.reviewsSection.heading}
        </h2>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {TESTIMONIALS.map((review, index) => (
            <motion.article
              key={`${review.name}-${index}`}
              variants={cardVariants}
              className="flex flex-col gap-4 rounded-brand bg-white p-6 shadow-brand"
            >
              <StarRow size="sm" />

              {review.text ? (
                <p className="flex-1 font-body text-base italic leading-relaxed text-ink-muted">
                  &ldquo;{review.text}&rdquo;
                </p>
              ) : (
                <p className="flex-1 font-body text-sm italic leading-relaxed text-ink-light">
                  {REVIEWS_PAGE.noWrittenReview}
                </p>
              )}

              <div className="space-y-2 border-t border-brand-navy/8 pt-4">
                <p className="font-body font-semibold text-brand-navy">{review.name}</p>
                <p className="flex items-center gap-1.5 font-body text-xs font-medium text-brand-teal">
                  <CheckCircle className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
                  {REVIEWS_PAGE.verifiedBadge}
                </p>
                <p className="flex items-center gap-1.5 font-body text-xs text-ink-light">
                  <GoogleGIcon className="size-3.5 shrink-0" />
                  {review.source}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
