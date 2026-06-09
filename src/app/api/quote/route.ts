import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { BUSINESS, EMAIL } from '@/lib/content'
import { quoteFormSchema } from '@/lib/schema'

/*
 * Required Vercel env vars for this route:
 * RESEND_API_KEY        — Resend API key (re_...)
 * RESEND_FROM_EMAIL     — Verified sender: quotes@beachhousemoving.xyz
 * RESEND_TO_EMAIL       — Primary recipient: beachhousemoving@gmail.com
 * RESEND_TO_EMAIL_2     — (Optional) Secondary recipient for copies
 *
 * Domain beachhousemoving.xyz must be verified in Resend dashboard.
 * replyTo is set to the customer's email so Reply goes to them, not back to quotes@.
 */

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error(
        '[quote-api] RESEND_API_KEY is not configured. Set it in Vercel → Settings → Environment Variables. See INTEGRATIONS.md.'
      )
      return NextResponse.json({ error: 'Email service not configured' }, { status: 503 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const body = await req.json()
    const data = quoteFormSchema.parse(body)

    const fromEmail = process.env.RESEND_FROM_EMAIL ?? EMAIL.quotesFrom

    await resend.emails.send({
      from: `Beach House Moving <${fromEmail}>`,
      to: [
        process.env.RESEND_TO_EMAIL ?? BUSINESS.email,
        process.env.RESEND_TO_EMAIL_2 ?? '',
      ].filter((email): email is string => Boolean(email)),
      replyTo: `${data.fullName} <${data.email}>`,
      subject: `New Quote Request — ${data.moveType ?? 'Moving'} | Beach House Moving`,
      html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1B2B4B;">
  <div style="background: #1B2B4B; padding: 24px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 20px;">New Quote Request</h1>
    <p style="color: #CBD5E0; margin: 8px 0 0; font-size: 14px;">Beach House Moving — beachhousemoving.xyz</p>
  </div>
  <div style="padding: 24px; background: #f9f9f9; border: 1px solid #e2e8f0;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px 0; color: #718096; font-size: 13px; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: bold;">${data.fullName}</td></tr>
      <tr><td style="padding: 8px 0; color: #718096; font-size: 13px;">Phone</td><td style="padding: 8px 0; font-weight: bold;"><a href="tel:${data.phone}" style="color: #E85D3D;">${data.phone}</a></td></tr>
      <tr><td style="padding: 8px 0; color: #718096; font-size: 13px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #2A9D8F;">${data.email}</a></td></tr>
      <tr><td style="padding: 8px 0; color: #718096; font-size: 13px;">Move Type</td><td style="padding: 8px 0;">${data.moveType ?? '—'}</td></tr>
      <tr><td style="padding: 8px 0; color: #718096; font-size: 13px;">Move Date</td><td style="padding: 8px 0;">${data.moveDate ?? '—'}</td></tr>
      <tr><td style="padding: 8px 0; color: #718096; font-size: 13px;">Moving From</td><td style="padding: 8px 0;">${data.moveFrom ?? '—'}</td></tr>
      <tr><td style="padding: 8px 0; color: #718096; font-size: 13px;">Moving To</td><td style="padding: 8px 0;">${data.moveTo ?? '—'}</td></tr>
      ${data.smsConsent ? '<tr><td style="padding: 8px 0; color: #718096; font-size: 13px;">SMS Consent</td><td style="padding: 8px 0;">✓ Agreed to SMS updates</td></tr>' : ''}
    </table>
    ${data.notes ? `<div style="margin-top: 16px; padding: 12px; background: white; border-left: 3px solid #E85D3D; border-radius: 0 4px 4px 0;"><p style="margin: 0; color: #718096; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Notes</p><p style="margin: 8px 0 0;">${data.notes}</p></div>` : ''}
  </div>
  <div style="padding: 16px 24px; background: white; border-top: 1px solid #e2e8f0;">
    <p style="margin: 0; font-size: 12px; color: #718096;">
      Submitted via beachhousemoving.xyz · Reply to this email to respond to ${data.fullName} directly.
    </p>
  </div>
</body>
</html>`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    // Do not log request body or PII. Log a generic failure marker only.
    const message = error instanceof Error ? error.name : 'UnknownError'
    // Surface to monitoring without PII:
    console.error('[quote] submission failed:', message)
    return NextResponse.json(
      { ok: false, error: `Something went wrong. Please call ${BUSINESS.phone.display}.` },
      { status: 500 }
    )
  }
}
