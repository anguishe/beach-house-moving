'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, Loader2 } from 'lucide-react'
import { useForm, Controller, type Control } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  BUSINESS,
  QUOTE_FORM_HEARD_ABOUT,
  QUOTE_FORM_HOME_SIZES,
  QUOTE_FORM_MOVE_TYPES,
} from '@/lib/content'
import { trackQuoteLead, trackPhoneClick } from '@/lib/gtag'
import { getLeadSource } from '@/lib/lead-source'
import { quoteFormSchema, type QuoteFormInput } from '@/lib/schema'

type SelectFieldName = 'moveType' | 'homeSize' | 'heardAbout'

function SelectField({
  control,
  name,
  options,
  placeholder,
  invalid,
}: {
  control: Control<QuoteFormInput>
  name: SelectFieldName
  options: readonly string[]
  placeholder: string
  invalid?: boolean
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          value={field.value ?? ''}
          onValueChange={(value) => {
            if (value) field.onChange(value)
          }}
        >
          <SelectTrigger id={name} size="form" className="h-11 w-full bg-white text-ink" aria-invalid={invalid}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent sideOffset={4}>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  )
}

export function QuoteForm() {
  const router = useRouter()
  const form = useForm<QuoteFormInput>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: { moveType: '', homeSize: '', heardAbout: '', smsConsent: false },
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  const onSubmit = async (data: QuoteFormInput) => {
    setStatus('loading')

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteFormSchema.parse({ ...data, source: getLeadSource() })),
      })

      if (res.ok) {
        trackQuoteLead({
          move_type: data.moveType,
          home_size: data.homeSize,
        })
        router.push('/thank-you')
        return
      }

      setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {status === 'error' && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-brand border border-red-200 bg-red-50 p-4"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" aria-hidden />
          <p className="font-body text-sm text-red-800">
            Something went wrong. Please call us directly at{' '}
            <a
              href={BUSINESS.phone.href}
              onClick={() => trackPhoneClick('quote-form')}
              className="font-semibold text-brand-navy"
            >
              {BUSINESS.phone.display}
            </a>
            .
          </p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" size="form" {...form.register('fullName')} aria-invalid={!!form.formState.errors.fullName} />
        {form.formState.errors.fullName && (
          <p className="font-body text-xs text-red-600">{form.formState.errors.fullName.message}</p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" size="form" {...form.register('phone')} aria-invalid={!!form.formState.errors.phone} />
          {form.formState.errors.phone && (
            <p className="font-body text-xs text-red-600">{form.formState.errors.phone.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" size="form" {...form.register('email')} aria-invalid={!!form.formState.errors.email} />
          {form.formState.errors.email && (
            <p className="font-body text-xs text-red-600">{form.formState.errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="moveType">Move Type</Label>
          <SelectField
            control={form.control}
            name="moveType"
            options={QUOTE_FORM_MOVE_TYPES}
            placeholder="Select move type..."
            invalid={!!form.formState.errors.moveType}
          />
          {form.formState.errors.moveType && (
            <p className="font-body text-xs text-red-600">{form.formState.errors.moveType.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="homeSize">Home Size</Label>
          <SelectField
            control={form.control}
            name="homeSize"
            options={QUOTE_FORM_HOME_SIZES}
            placeholder="Select size..."
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="moveFrom">Moving From</Label>
          <Input id="moveFrom" size="form" {...form.register('moveFrom')} aria-invalid={!!form.formState.errors.moveFrom} />
          {form.formState.errors.moveFrom && (
            <p className="font-body text-xs text-red-600">{form.formState.errors.moveFrom.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="moveTo">Moving To</Label>
          <Input id="moveTo" size="form" {...form.register('moveTo')} aria-invalid={!!form.formState.errors.moveTo} />
          {form.formState.errors.moveTo && (
            <p className="font-body text-xs text-red-600">{form.formState.errors.moveTo.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="moveDate">Move Date (if known)</Label>
          <Input id="moveDate" type="date" size="form" {...form.register('moveDate')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="heardAbout">How Did You Hear About Us?</Label>
          <SelectField
            control={form.control}
            name="heardAbout"
            options={QUOTE_FORM_HEARD_ABOUT}
            placeholder="Select one..."
          />
        </div>
      </div>

      {/* Honeypot: hidden from people and screen readers; bots fill it and get dropped server-side. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" {...form.register('company')} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea id="notes" rows={4} size="form" {...form.register('notes')} />
      </div>

      <div className="flex items-start gap-3">
        <Controller
          name="smsConsent"
          control={form.control}
          render={({ field }) => (
            <Checkbox
              id="smsConsent"
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked === true)}
              className="mt-0.5"
            />
          )}
        />
        <Label htmlFor="smsConsent" className="font-body text-sm font-normal leading-snug text-ink-muted">
          I agree to receive text message updates about my move. Message &amp; data rates may apply.
        </Label>
      </div>

      <Button
        type="submit"
        disabled={status === 'loading'}
        className="h-11 w-full bg-brand-coral text-base font-semibold text-white hover:bg-brand-coral-dark"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Sending...
          </>
        ) : (
          'Request My Free Quote'
        )}
      </Button>
    </form>
  )
}
