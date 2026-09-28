import type { MetadataRoute } from 'next'

import { getSiteOrigin } from '@/lib/site-url'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const origin = await getSiteOrigin()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /_next/ must stay crawlable: blocking it hides CSS/JS from Googlebot's
        // renderer, which then rates every page as unstyled.
        disallow: ['/api/'],
      },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
      { userAgent: 'Applebot', allow: '/' },
    ],
    sitemap: `${origin.origin}/sitemap.xml`,
  }
}
