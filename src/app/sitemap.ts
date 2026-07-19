import type { MetadataRoute } from 'next'

import {
  CONTENT_REVISION,
  NEIGHBORHOODS,
  SERVICE_AREAS,
  SERVICES,
  type Neighborhood,
  type Service,
  type ServiceArea,
} from '@/lib/content'
import { POSTS } from '@/content/posts'
import { getSiteOrigin } from '@/lib/site-url'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = await getSiteOrigin()
  const base = origin.origin

  // MANUAL lastModified dates: these routes have no per-record date source.
  // Bump the date on a route by hand when that page's content meaningfully
  // changes. Do not invent dates — leave as-is if the page is unchanged.
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: CONTENT_REVISION,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/services`,
      lastModified: CONTENT_REVISION,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/service-areas`,
      lastModified: CONTENT_REVISION,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/about`,
      lastModified: '2026-06-09',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/contact`,
      lastModified: '2026-06-09',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/get-a-quote`,
      lastModified: '2026-06-09',
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/reviews`,
      lastModified: '2026-06-01',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/pricing`,
      lastModified: '2026-06-14',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/resources`,
      lastModified: '2026-06-09',
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${base}/privacy-policy`,
      lastModified: '2026-06-01',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Per-record updatedAt when set; else the template-wide CONTENT_REVISION.
  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((service: Service) => ({
    url: `${base}/services/${service.slug}`,
    lastModified: service.updatedAt ?? CONTENT_REVISION,
    changeFrequency: 'monthly',
    priority: service.slug === 'junk-removal' ? 0.7 : 0.9,
  }))

  // Per-record updatedAt when set; else the template-wide CONTENT_REVISION.
  const areaRoutes: MetadataRoute.Sitemap = SERVICE_AREAS.map((area: ServiceArea) => ({
    url: `${base}/service-areas/${area.slug}`,
    lastModified: area.updatedAt ?? CONTENT_REVISION,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  // nb is typed as the wider Neighborhood (a supertype of the `as const`
  // element type) so the optional updatedAt field is accessible here.
  const neighborhoodRoutes: MetadataRoute.Sitemap = NEIGHBORHOODS.map((nb: Neighborhood) => {
    const area = SERVICE_AREAS.find((sa) => sa.county === nb.county)
    return {
      url: `${base}/service-areas/${area?.slug ?? 'walton-county'}/${nb.slug}`,
      // Prefer the per-neighborhood updatedAt when set; otherwise fall back to
      // the template-wide CONTENT_REVISION — set Neighborhood.updatedAt for one-offs.
      lastModified: nb.updatedAt ?? CONTENT_REVISION,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  })

  const resourcePostRoutes: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: `${base}/resources/${post.slug}`,
    // Data-driven: reflects the post's last edit when present, else publish date.
    lastModified: post.dateModified ?? post.datePublished,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }))

  return [...staticRoutes, ...serviceRoutes, ...areaRoutes, ...neighborhoodRoutes, ...resourcePostRoutes]
}
