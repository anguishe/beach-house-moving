import type React from 'react'
import { Clock, DollarSign, Heart, ShieldCheck } from 'lucide-react'

import { MotionReveal } from '@/components/ui/MotionReveal'
import { LICENSE_DISPLAY, TRUST_BADGES } from '@/lib/content'

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Heart,
  DollarSign,
  Clock,
}

export function TrustSection() {
  return (
    <>
      <section className="w-full bg-brand-navy pb-20 pt-14">
        <div className="mx-auto max-w-6xl px-8">
          <p className="mb-10 text-center font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
            {LICENSE_DISPLAY.heroTrustBadge}
          </p>
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {TRUST_BADGES.map((badge, index) => {
              const IconComponent = iconMap[badge.icon as keyof typeof iconMap]
              return (
                <MotionReveal
                  key={badge.label}
                  index={index}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-teal/15">
                    {IconComponent && (
                      <IconComponent className="size-6 text-brand-teal" strokeWidth={1.5} aria-hidden />
                    )}
                  </div>
                  <p className="m-0 font-heading text-lg font-semibold leading-snug text-white">
                    {badge.label}
                  </p>
                  <p className="m-0 max-w-[160px] font-body text-sm leading-relaxed text-white/55">
                    {badge.description}
                  </p>
                </MotionReveal>
              )
            })}
          </div>
        </div>
      </section>
      <div className="h-0.5 bg-gradient-to-r from-transparent via-brand-teal/25 to-transparent" />
    </>
  )
}
