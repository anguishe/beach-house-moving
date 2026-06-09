import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

import { contactFormSchema } from '@/lib/schema'
import { BUSINESS, EMAIL } from '@/lib/content'

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
      return NextResponse.json({ error: 'Email service not configured' }, { status: 503 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const body = await req.json()
    const data = contactFormSchema.parse(body)

    const fromEmail = process.env.RESEND_FROM_EMAIL ?? EMAIL.quotesFrom

    await resend.emails.send({
      from: `Beach House Moving <${fromEmail}>`,
      to: [
        process.env.RESEND_TO_EMAIL ?? BUSINESS.email,
        process.env.RESEND_TO_EMAIL_2 ?? '',
      ].filter((email): email is string => Boolean(email)),
      replyTo: `${data.fullName} <${data.email}>`,
      subject: `New Contact Message — Beach House Moving`,
      html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1B2B4B;">
  <div style="background: #1B2B4B; padding: 24px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 20px;">New Contact Message</h1>
    <p style="color: #CBD5E0; margin: 8px 0 0; font-size: 14px;">Beach House Moving — beachhousemoving.xyz</p>
  </div>
  <div style="padding: 24px; background: #f9f9f9; border: 1px solid #e2e8f0;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px 0; color: #718096; font-size: 13px; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: bold;">${data.fullName}</td></tr>
      <tr><td style="padding: 8px 0; color: #718096; font-size: 13px;">Phone</td><td style="padding: 8px 0; font-weight: bold;"><a href="tel:${data.phone}" style="color: #E85D3D;">${data.phone}</a></td></tr>
      <tr><td style="padding: 8px 0; color: #718096; font-size: 13px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #2A9D8F;">${data.email}</a></td></tr>
    </table>
    <div style="margin-top: 16px; padding: 12px; background: white; border-left: 3px solid #E85D3D; border-radius: 0 4px 4px 0;">
      <p style="margin: 0; color: #718096; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
      <p style="margin: 8px 0 0;">${data.message}</p>
    </div>
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
    console.error(
      '[contact-api] Send failed:',
      error instanceof Error ? error.message : String(error)
    )
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
