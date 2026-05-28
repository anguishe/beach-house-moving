import { z } from 'zod'

export const quoteFormSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Valid email required'),
  moveType: z.string().min(1, 'Please select a move type'),
  moveDate: z.string().optional(),
  moveFrom: z.string().min(2, 'Origin city or ZIP required'),
  moveTo: z.string().min(2, 'Destination city or ZIP required'),
  notes: z.string().optional(),
})

export type QuoteFormData = z.infer<typeof quoteFormSchema>
