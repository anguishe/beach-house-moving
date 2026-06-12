import type { Metadata } from 'next'
import { Suspense } from 'react'
import Script from 'next/script'
import { Playfair_Display, Inter } from 'next/font/google'

import { GtmPageView } from '@/components/analytics/GtmPageView'
import { Navbar } from '@/components/layout/Navbar'
import { SkipToContent } from '@/components/layout/SkipToContent'
import { buildMetadata, HOME_METADATA } from '@/lib/seo'
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
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://analytics.ahrefs.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WNFSB7NT');`}
        </Script>
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="j2BL/k+yqwVjkOmeUgLn+A"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${playfair.variable} ${inter.variable} font-body antialiased pt-0`}>
        <Suspense fallback={null}>
          <GtmPageView />
        </Suspense>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WNFSB7NT"
            height="0"
            width="0"
            title="Google Tag Manager"
            className="hidden invisible"
          />
        </noscript>
        <SkipToContent />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
