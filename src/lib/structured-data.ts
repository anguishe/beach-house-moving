import {
  BUSINESS,
  IMAGES,
  JUNK_REMOVAL_AREA_SERVED,
  REVIEWS_PAGE_META,
  SERVICES,
  SOCIAL_LINKS,
  TESTIMONIALS,
} from '@/lib/content'
import { siteUrl } from '@/lib/site-url'

export const BUILD_DATE = new Date().toISOString().split('T')[0]

type Service = (typeof SERVICES)[number]

/** Lean schema-only service area data — avoids importing full SERVICE_AREAS descriptions. */
const SCHEMA_COUNTIES = [
  'Walton County',
  'Okaloosa County',
  'Bay County',
] as const

const SCHEMA_CITIES = [
  'Santa Rosa Beach',
  'Destin',
  'Miramar Beach',
  'Fort Walton Beach',
  'Niceville',
  'Panama City Beach',
  'Panama City',
  'Crestview',
] as const

const SCHEMA_SERVICE_AREA_HUB = [
  { county: 'Walton County', slug: 'walton-county' },
  { county: 'Okaloosa County', slug: 'okaloosa-county' },
  { county: 'Bay County', slug: 'bay-county' },
] as const

type CountyAreaInput = {
  county: string
  slug: string
  cities: readonly string[]
  description: string
}

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const

function absoluteUrl(origin: string, path: string): string {
  return new URL(path, origin).toString()
}

/** Sitewide MovingCompany schema — SAB: no street address in public output. */
export function movingCompanySchema(origin: string, includeRating = false) {
  const base = origin.replace(/\/$/, '')
  const logoUrl = absoluteUrl(base, IMAGES.logo.src)

  const areaServed = [
    ...SCHEMA_COUNTIES.map((county) => ({
      '@type': 'AdministrativeArea' as const,
      name: county,
    })),
    ...SCHEMA_CITIES.map((city) => ({
      '@type': 'City' as const,
      name: city,
    })),
  ]

  return {
    '@context': 'https://schema.org',
    '@type': ['MovingCompany', 'HomeAndConstructionBusiness'],
    '@id': `${base}/#business`,
    foundingDate: '2025',
    name: BUSINESS.name,
    description: 'Locally owned, fully licensed moving company serving Walton, Okaloosa, and Bay Counties on Florida\'s Emerald Coast. Residential moving, packing, long-distance moves, and storage. FL Mover Reg. #IM4125. Available 24/7.',
    url: base,
    telephone: BUSINESS.phone.e164,
    email: BUSINESS.email,
    image: logoUrl,
    logo: logoUrl,
    priceRange: '$$',
    areaServed,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.lat.toFixed(5),
      longitude: BUSINESS.geo.lng.toFixed(5),
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [...DAYS_OF_WEEK],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    ...(includeRating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: REVIEWS_PAGE_META.aggregateRating.ratingValue,
            reviewCount: REVIEWS_PAGE_META.aggregateRating.reviewCount,
            bestRating: REVIEWS_PAGE_META.aggregateRating.bestRating,
            worstRating: REVIEWS_PAGE_META.aggregateRating.worstRating,
          },
        }
      : {}),
    identifier: {
      '@type': 'PropertyValue',
      name: 'FDACS Florida Mover Registration',
      value: BUSINESS.registration.number,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.zip,
      addressCountry: 'US',
    },
    sameAs: [SOCIAL_LINKS.facebook, SOCIAL_LINKS.google, SOCIAL_LINKS.yelp, SOCIAL_LINKS.bbb].filter(
      Boolean,
    ),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+18508421962',
      contactType: 'customer service',
      availableLanguage: 'English',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    },
    founder: {
      '@type': 'Person',
      '@id': `${base}/#owner`,
      name: 'Joshua B McGrew',
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      name: 'Florida Intrastate Mover Registration',
      recognizedBy: {
        '@type': 'GovernmentOrganization',
        name: 'Florida Department of Agriculture and Consumer Services (FDACS)',
      },
      identifier: BUSINESS.registration.number,
    },
  }
}

export function webSiteSchema(origin: string) {
  const base = origin.replace(/\/$/, '')

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${base}/#website`,
    name: BUSINESS.name,
    url: base,
  }
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
  origin: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(origin, item.path),
    })),
  }
}

/** Junk removal Service JSON-LD — dedicated page format (SAB — no street address). */
export function junkRemovalServiceSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Junk Removal',
    provider: {
      '@type': 'MovingCompany',
      name: BUSINESS.name,
      telephone: BUSINESS.phone.e164,
      url: BUSINESS.website,
      areaServed: [...JUNK_REMOVAL_AREA_SERVED],
    },
    description,
    areaServed: [...JUNK_REMOVAL_AREA_SERVED],
  }
}

export function serviceSchema(service: Service, description: string, origin: string) {
  const base = origin.replace(/\/$/, '')
  const url = absoluteUrl(base, `/services/${service.slug}`)

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    serviceType: service.title,
    name: service.title,
    description,
    url,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        description: 'Free estimates — call (850) 842-1962 for a quote.',
      },
    },
    provider: {
      '@type': 'MovingCompany',
      name: BUSINESS.name,
      url: base,
      telephone: BUSINESS.phone.e164,
    },
    areaServed: SCHEMA_COUNTIES.map((county) => ({
      '@type': 'AdministrativeArea',
      name: county,
    })),
  }
}

/** County-scoped MovingCompany + Service JSON-LD for local SEO pages (SAB — no street address). */
export function countyAreaSchema(area: CountyAreaInput, origin: string) {
  const base = origin.replace(/\/$/, '')

  const areaServed = [
    {
      '@type': 'AdministrativeArea' as const,
      name: area.county,
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    ...area.cities.map((city) => ({
      '@type': 'City' as const,
      name: city,
      addressRegion: 'FL',
      addressCountry: 'US',
    })),
  ]

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'MovingCompany',
      '@id': `${base}/#business`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Moving Services in ${area.county}`,
      description: area.description,
      url: absoluteUrl(base, `/service-areas/${area.slug}`),
      provider: {
        '@type': 'MovingCompany',
        name: BUSINESS.name,
        url: base,
        telephone: BUSINESS.phone.e164,
      },
      areaServed,
    },
  ]
}

/** MovingCompany + AggregateRating for /reviews (SAB — no street address). */
export function reviewsAggregateRatingSchema(overrides?: {
  ratingValue?: number
  reviewCount?: number
}) {
  const base = BUSINESS.website.replace(/\/$/, '')

  return {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    name: BUSINESS.name,
    url: base,
    telephone: BUSINESS.phone.e164,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: overrides?.ratingValue ?? REVIEWS_PAGE_META.aggregateRating.ratingValue,
      reviewCount: overrides?.reviewCount ?? REVIEWS_PAGE_META.aggregateRating.reviewCount,
      bestRating: REVIEWS_PAGE_META.aggregateRating.bestRating,
      worstRating: REVIEWS_PAGE_META.aggregateRating.worstRating,
    },
  }
}

/** AboutPage + Organization schema for /about — E-E-A-T signal. */
export function aboutPageSchema(origin: string) {
  const base = origin.replace(/\/$/, '')

  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${base}/about`,
    name: `About ${BUSINESS.name}`,
    url: `${base}/about`,
    description:
      'Owner-operated moving company on Florida\'s Emerald Coast. Licensed FL Mover Reg. #IM4125, fully insured, available 24/7.',
    dateModified: '2025-12-01',
    inLanguage: 'en-US',
    isPartOf: { '@id': `${base}/#website` },
    mainEntity: [
      {
        '@type': 'MovingCompany',
        '@id': `${base}/#business`,
        name: BUSINESS.name,
        foundingDate: '2025',
        numberOfEmployees: {
          '@type': 'QuantitativeValue',
          value: BUSINESS.teamSize,
        },
        description: `Owner-operated moving company on Florida's Emerald Coast. Licensed FL Mover Reg. #${BUSINESS.registration.number}, fully insured, available 24/7.`,
      },
      {
        '@type': 'Person',
        '@id': `${base}/#owner`,
        name: 'Joshua B McGrew',
        jobTitle: 'Owner',
        worksFor: { '@id': `${base}/#business` },
      },
    ],
  }
}

/** ContactPage WebPage schema for /contact and /get-a-quote. */
export function contactPageSchema(pagePath: string, pageName: string, origin: string) {
  const base = origin.replace(/\/$/, '')

  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${base}${pagePath}`,
    name: pageName,
    url: `${base}${pagePath}`,
    description:
      'Request a free moving quote from Beach House Moving — serving Walton, Okaloosa & Bay Counties 24/7.',
    mainEntity: { '@id': `${base}/#business` },
  }
}

export function faqPageSchema(faqs: readonly { q: string; a: string }[], pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/** ItemList schema for the /service-areas hub page. */
export function serviceAreasItemListSchema(origin: string) {
  const base = origin.replace(/\/$/, '')

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Beach House Moving Service Areas',
    description:
      'Moving company serving Walton, Okaloosa, and Bay Counties in the Florida Panhandle.',
    itemListElement: SCHEMA_SERVICE_AREA_HUB.map((area, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: area.county,
      url: absoluteUrl(base, `/service-areas/${area.slug}`),
    })),
  }
}

/** ItemList schema for the /services hub page. */
export function servicesItemListSchema(origin: string) {
  const base = origin.replace(/\/$/, '')

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${BUSINESS.name} Services`,
    url: `${base}/services`,
    itemListElement: SERVICES.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.title,
      url: absoluteUrl(base, `/services/${service.slug}`),
    })),
  }
}

/** Individual Review JSON-LD for testimonials with written text. */
export function reviewsWithTextSchema() {
  return TESTIMONIALS.filter((t) => t.text !== null).map((t) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: t.name,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: t.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: t.text,
    itemReviewed: {
      '@type': 'MovingCompany',
      name: BUSINESS.name,
    },
  }))
}

/** BlogPosting schema for /resources/[slug] articles. */
export function blogPostingSchema(
  post: {
    title: string
    description: string
    datePublished: string
    dateModified?: string
    heroImage: string
    slug: string
  },
  origin: string,
) {
  const base = origin.replace(/\/$/, '')
  const postUrl = absoluteUrl(base, `/resources/${post.slug}`)
  const imageUrl = absoluteUrl(base, post.heroImage)
  const logoUrl = absoluteUrl(base, IMAGES.logo.src)

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    image: imageUrl,
    author: {
      '@type': 'Person',
      name: 'Joshua B McGrew',
      url: `${base}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS.name,
      logo: {
        '@type': 'ImageObject',
        url: logoUrl,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  }
}

/** ItemList schema for /resources hub page. */
export function resourcesItemListSchema(
  posts: readonly { title: string; slug: string }[],
  origin: string,
) {
  const base = origin.replace(/\/$/, '')

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Moving Resources & Local Guides',
    url: `${base}/resources`,
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: post.title,
      url: absoluteUrl(base, `/resources/${post.slug}`),
    })),
  }
}

export function webPageSchema(
  url: string,
  name: string,
  dateModified: string,
  description: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url,
    name,
    dateModified,
    description,
    isPartOf: { '@id': `${siteUrl}/#website` },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS.name,
    },
  }
}
