import { BUSINESS } from '@/lib/content'

const items = [
  `FL Mover Reg. #${BUSINESS.registration.number}`,
  'Licensed & Insured',
  'Owner-Operated — No Subcontractors',
  'Available 24/7',
]

export function TrustStrip() {
  return (
    <div className="border-y border-brand-navy/8 bg-brand-sand">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-2 px-6 py-3.5 text-center">
        {items.map((item, index) => (
          <span key={item} className="flex items-center gap-x-3">
            {index > 0 && (
              <span className="text-brand-teal/50" aria-hidden>
                ·
              </span>
            )}
            <span className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-brand-navy/75">
              {item}
            </span>
          </span>
        ))}
        <span className="flex items-center gap-x-3">
          <span className="text-brand-teal/50" aria-hidden>
            ·
          </span>
          <a
            href={BUSINESS.phone.href}
            className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-brand-teal hover:text-brand-navy"
          >
            {BUSINESS.phone.display}
          </a>
        </span>
      </div>
    </div>
  )
}
