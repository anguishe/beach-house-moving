import {
  BUSINESS,
  FAQS,
  IMAGES,
  JUNK_REMOVAL_AREA_SERVED,
  REVIEWS_PAGE_META,
  SERVICE_AREAS,
  SERVICES,
  SOCIAL_LINKS,
  TESTIMONIALS,
} from '@/lib/content'

type Faq = (typeof FAQS)[number]
type Service = (typeof SERVICES)[number]
type ServiceArea = (typeof SERVICE_AREAS)[number]

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
export function movingCompanySchema(origin: string) {
  const base = origin.replace(/\/$/, '')
  const logoUrl = absoluteUrl(base, IMAGES.logo.src)

  const areaServed = [
    ...SERVICE_AREAS.map((area) => ({
      '@type': 'AdministrativeArea' as const,
      name: area.county,
    })),
    ...SERVICE_AREAS.flatMap((area) =>
      area.cities.map((city) => ({
        '@type': 'City' as const,
        name: city,
      })),
    ),
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    name: BUSINESS.name,
    url: base,
    telephone: BUSINESS.phone.e164,
    email: BUSINESS.email,
    image: logoUrl,
    logo: logoUrl,
    areaServed,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [...DAYS_OF_WEEK],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    identifier: {
      '@type': 'PropertyValue',
      name: 'FDACS Florida Mover Registration',
      value: BUSINESS.registration.number,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      addressCountry: 'US',
    },
    sameAs: [SOCIAL_LINKS.facebook, SOCIAL_LINKS.google].filter(Boolean),
  }
}

export function webSiteSchema(origin: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BUSINESS.name,
    url: origin,
    publisher: {
      '@type': 'MovingCompany',
      name: BUSINESS.name,
      telephone: BUSINESS.phone.e164,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${origin}/services?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
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

export function serviceSchema(service: Service, origin: string) {
  const base = origin.replace(/\/$/, '')

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.fullDescription,
    url: absoluteUrl(base, `/services/${service.slug}`),
    provider: {
      '@type': 'MovingCompany',
      name: BUSINESS.name,
      url: base,
      telephone: BUSINESS.phone.e164,
    },
    areaServed: SERVICE_AREAS.map((area) => ({
      '@type': 'AdministrativeArea',
      name: area.county,
    })),
  }
}

/** County-scoped MovingCompany + Service JSON-LD for local SEO pages (SAB — no street address). */
export function countyAreaSchema(area: ServiceArea, origin: string) {
  const base = origin.replace(/\/$/, '')

  const areaServed = [
    { '@type': 'AdministrativeArea' as const, name: area.county },
    ...area.cities.map((city) => ({
      '@type': 'City' as const,
      name: city,
    })),
  ]

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'MovingCompany',
      name: BUSINESS.name,
      url: absoluteUrl(base, `/service-areas/${area.slug}`),
      telephone: BUSINESS.phone.e164,
      email: BUSINESS.email,
      areaServed,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: BUSINESS.geo.lat,
        longitude: BUSINESS.geo.lng,
      },
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

export function faqSchema(faqs: readonly Faq[] = FAQS) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }
}

/** MovingCompany + AggregateRating for /reviews (SAB — no street address). */
export function reviewsAggregateRatingSchema() {
  const base = BUSINESS.website.replace(/\/$/, '')

  return {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    name: BUSINESS.name,
    url: base,
    telephone: BUSINESS.phone.e164,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: REVIEWS_PAGE_META.aggregateRating.ratingValue,
      reviewCount: REVIEWS_PAGE_META.aggregateRating.reviewCount,
      bestRating: REVIEWS_PAGE_META.aggregateRating.bestRating,
      worstRating: REVIEWS_PAGE_META.aggregateRating.worstRating,
    },
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
      ratingValue: String(t.rating),
      bestRating: '5',
    },
    reviewBody: t.text,
    itemReviewed: {
      '@type': 'MovingCompany',
      name: BUSINESS.name,
    },
  }))
}
