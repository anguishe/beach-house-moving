import { Footer } from '@/components/layout/Footer'

type PageShellProps = {
  children: React.ReactNode
}

/** Standard inner-page wrapper — accounts for fixed navbar and mobile sticky CTA. */
export function PageShell({ children }: PageShellProps) {
  return (
    <>
      <main id="main-content" tabIndex={-1} className="pb-[64px] outline-none md:pb-0">
        {children}
      </main>
      <Footer />
    </>
  )
}
