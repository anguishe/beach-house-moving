import { z } from 'zod'

// First-touch data captured by <LeadSourceTracker /> and sent with every form.
// All optional and length-capped: it's visitor-controlled.
const short = z.string().max(300).optional()
export const leadSourceSchema = z.object({
  src: short,
  referrer: short,
  landing: short,
  page: short,
  utmSource: short,
  utmCampaign: short,
})
export type LeadSource = z.infer<typeof leadSourceSchema>

// Honeypot: hidden from people, filled by bots. Any value → silently dropped.
const honeypot = z.string().max(300).optional()

export const quoteFormSchema = z.object({
  fullName: z.string().min(2, 'Name is required').max(120),
  phone: z.string().min(10, 'Valid phone number required').max(40),
  email: z.string().email('Valid email required').max(200),
  moveType: z.string().min(1, 'Please select a move type').max(80),
  homeSize: z.string().max(80).optional(),
  moveDate: z.string().max(40).optional(),
  moveFrom: z.string().min(2, 'Origin city or ZIP required').max(200),
  moveTo: z.string().min(2, 'Destination city or ZIP required').max(200),
  notes: z.string().max(4000).optional(),
  heardAbout: z.string().max(80).optional(),
  smsConsent: z.boolean().default(false),
  company: honeypot,
  source: leadSourceSchema.optional(),
})

export type QuoteFormInput = z.input<typeof quoteFormSchema>
export type QuoteFormData = z.output<typeof quoteFormSchema>

export const contactFormSchema = z.object({
  fullName: z.string().min(2, 'Name is required').max(120),
  phone: z.string().min(10, 'Valid phone number required').max(40),
  email: z.string().email('Valid email required').max(200),
  message: z.string().min(10, 'Please include a brief message').max(4000),
  company: honeypot,
  source: leadSourceSchema.optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
