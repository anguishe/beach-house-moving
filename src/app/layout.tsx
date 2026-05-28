import type { Metadata } from "next";
import Script from "next/script";

import { inter, playfairDisplay } from "@/lib/fonts";

import "@/styles/globals.css";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: "Beach House Moving",
  telephone: "+18508421962",
  email: "beachhousemoving@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "110 Via Largo",
    addressLocality: "Santa Rosa Beach",
    addressRegion: "FL",
    postalCode: "32459",
  },
  areaServed: ["Walton County FL", "Okaloosa County FL", "Bay County FL"],
  url: "https://beachhousemoving.com",
};

export const metadata: Metadata = {
  title: "Beach House Moving | Movers in Santa Rosa Beach, FL",
  description:
    "Locally owned & fully licensed movers serving Walton, Okaloosa & Bay Counties. Packing, loading, transportation & storage. Get your free quote today — (850) 842-1962.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable}`}
    >
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only">
          Skip to main content
        </a>
        <Script
          id="local-business-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
