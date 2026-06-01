import type { Metadata } from 'next'
import Script from 'next/script'
import { Playfair_Display, Inter } from 'next/font/google'

import { Navbar } from '@/components/layout/Navbar'
import { SkipToContent } from '@/components/layout/SkipToContent'
import { JsonLd } from '@/components/seo/JsonLd'
import { GA_ID } from '@/lib/gtag'
import { buildMetadata, HOME_METADATA } from '@/lib/seo'
import { movingCompanySchema } from '@/lib/structured-data'
import { getSiteOrigin } from '@/lib/site-url'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(HOME_METADATA)
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const origin = await getSiteOrigin()

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className={`${playfair.variable} ${inter.variable} font-body antialiased pt-0`}>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
        <JsonLd data={movingCompanySchema(origin.origin)} />
        <SkipToContent />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
