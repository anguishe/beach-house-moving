import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FAQS } from '@/lib/content'

type Faq = (typeof FAQS)[number]

type FAQSectionProps = {
  faqs?: readonly Faq[]
  className?: string
}

export function FAQSection({ faqs = FAQS, className }: FAQSectionProps) {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className={`bg-brand-sand px-6 py-20 md:py-24 ${className ?? ''}`}
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.22em] text-brand-coral">
            Common Questions
          </p>
          <h2
            id="faq-heading"
            className="font-heading text-3xl font-bold text-brand-navy md:text-4xl"
          >
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-base text-ink-muted">
            Straight answers about our service area, licensing, pricing, and scheduling.
          </p>
        </div>

        <Accordion keepMounted className="rounded-brand-lg bg-white px-6 shadow-brand">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.q} value={`faq-${index}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
