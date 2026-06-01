import Link from 'next/link'

import { PageShell } from '@/components/layout/PageShell'
import { NOT_FOUND_CONTENT } from '@/lib/content'

export default function NotFound() {
  return (
    <PageShell>
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 pt-32 text-center">
        <p className="font-body text-6xl font-bold text-brand-teal/30">404</p>
        <h1 className="mt-4 font-heading text-3xl font-bold text-brand-navy md:text-4xl">
          {NOT_FOUND_CONTENT.headline}
        </h1>
        <p className="mx-auto mt-4 max-w-md font-body text-base text-ink-muted">
          {NOT_FOUND_CONTENT.description}
        </p>
        <nav aria-label="Helpful links" className="mt-10 flex flex-col gap-3 sm:flex-row">
          {NOT_FOUND_CONTENT.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.href === '/get-a-quote'
                  ? 'inline-flex items-center justify-center rounded-brand bg-brand-coral px-6 py-3 font-body text-sm font-semibold text-white hover:bg-brand-coral-dark'
                  : 'inline-flex items-center justify-center rounded-brand border border-brand-navy/15 px-6 py-3 font-body text-sm font-semibold text-brand-navy hover:bg-brand-sand'
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </section>
    </PageShell>
  )
}
