import type { MetadataRoute } from 'next'

import { NEIGHBORHOODS, SERVICE_AREAS, SERVICES } from '@/lib/content'
import { getSiteOrigin } from '@/lib/site-url'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = await getSiteOrigin()
  const base = origin.origin

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: '2026-06-04',
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/services`,
      lastModified: '2026-06-04',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/service-areas`,
      lastModified: '2026-06-04',
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/about`,
      lastModified: '2026-06-04',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/contact`,
      lastModified: '2026-06-04',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/get-a-quote`,
      lastModified: '2026-06-04',
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/reviews`,
      lastModified: '2026-06-04',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/pricing`,
      lastModified: '2026-06-04',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${base}/services/${service.slug}`,
    lastModified: '2026-06-04',
    changeFrequency: 'monthly',
    priority: service.slug === 'junk-removal' ? 0.7 : 0.9,
  }))

  const areaRoutes: MetadataRoute.Sitemap = SERVICE_AREAS.map((area) => ({
    url: `${base}/service-areas/${area.slug}`,
    lastModified: '2026-06-04',
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const neighborhoodRoutes: MetadataRoute.Sitemap = NEIGHBORHOODS.map((nb) => {
    const area = SERVICE_AREAS.find((sa) => sa.county === nb.county)
    return {
      url: `${base}/service-areas/${area?.slug ?? 'walton-county'}/${nb.slug}`,
      lastModified: '2026-06-04',
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }
  })

  return [...staticRoutes, ...serviceRoutes, ...areaRoutes, ...neighborhoodRoutes]
}
