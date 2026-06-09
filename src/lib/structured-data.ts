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

type Faq = { readonly q: string; readonly a: string }
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
export function movingCompanySchema(origin: string, includeRating = false) {
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
    '@type': ['MovingCompany', 'HomeAndConstructionBusiness'],
    '@id': `${base}/#business`,
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
      '@id': `${base}/service-areas/${area.slug}#business`,
      name: BUSINESS.name,
      url: absoluteUrl(base, `/service-areas/${area.slug}`),
      telephone: BUSINESS.phone.e164,
      email: BUSINESS.email,
      branchOf: { '@id': `${base}/#business` },
      areaServed,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: BUSINESS.geo.lat.toFixed(5),
        longitude: BUSINESS.geo.lng.toFixed(5),
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
    mainEntity: {
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
    mainEntity: { '@id': `${base}/#business` },
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

/** BlogPosting schema for /resources/[slug] articles. */
export function blogPostingSchema(
  post: {
    title: string
    description: string
    datePublished: string
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
    dateModified: post.datePublished,
    image: imageUrl,
    author: {
      '@type': 'Organization',
      name: BUSINESS.name,
      url: base,
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
