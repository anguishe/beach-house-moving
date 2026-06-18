/*
 * Google Reviews API — SETUP STATUS (DORMANT, but READY)
 *
 * Current state: the live Google Places fetch is intentionally dormant. The
 * 10 first-party reviews in `TESTIMONIALS` (src/lib/content.ts) are the
 * CANONICAL source of truth for count + rating across the site today.
 *
 * Why dormant: the GBP listing is only ~weeks old and a stable Place ID has
 * not reliably populated. The value currently in NEXT_PUBLIC_GOOGLE_PLACE_ID
 * is a CID (e.g. the "0x..." hex / the base64 "CXl8yvSwTlBcEAI" from the
 * g.page review link) — a CID is NOT a Place ID. The Places Details endpoint
 * rejects it with `INVALID_REQUEST — Invalid 'placeid' parameter`. We guard
 * for that BEFORE calling the API (see `isValidPlaceId`) so the build stays
 * clean and we fall back to the static reviews honestly.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * TODO (enable live reviews): once the listing matures, obtain the REAL Place
 * ID — it is the `ChIJ…` token, never the CID. Three ways to get it:
 *
 *   (a) Google Place ID Finder — search the business and copy the `ChIJ…` id:
 *       https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
 *   (b) Places Text Search (New) — POST to places.googleapis.com/v1/places:searchText
 *       with textQuery "Beach House Moving Santa Rosa Beach FL" and read the
 *       returned resource `id` (the Place ID).
 *   (c) GBP API — accounts.locations.list on the owned, verified listing and
 *       read the location's Place ID.
 *
 * Then set NEXT_PUBLIC_GOOGLE_PLACE_ID=ChIJ… in Vercel env and redeploy.
 * `isValidPlaceId` will accept it, the live fetch will resolve, and
 * `getReviewsData()` will return live reviews automatically.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * The GOOGLE_PLACES_API_KEY is already set. Only a valid Place ID is missing.
 */

import { TESTIMONIALS } from './content'

export type GoogleReview = {
  author_name: string
  rating: number
  text: string
  time: number
  profile_photo_url?: string
  relative_time_description: string
}

type PlaceDetailsResponse = {
  result?: {
    rating?: number
    user_ratings_total?: number
    reviews?: GoogleReview[]
  }
  status?: string
  error_message?: string
}

export type ReviewsData = {
  hasLiveReviews: boolean
  reviews: GoogleReview[]
  totalCount: number
  averageRating: number
}

/** One concise, honest line emitted when we fall back to the static reviews. */
const STATIC_FALLBACK_LOG = '[reviews] live source unavailable — using 10 static reviews'

function getPlacesApiKey(): string | undefined {
  return process.env.GOOGLE_PLACES_API_KEY
}

function getPlaceId(): string | undefined {
  return process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID
}

/**
 * A real Google Place ID is the `ChIJ…` token. A CID (decimal, the "0x…" hex
 * form, or the base64 string in a g.page link) is NOT a Place ID and the
 * Places API rejects it with INVALID_REQUEST. Guard for that BEFORE the call.
 */
function isValidPlaceId(placeId: string | undefined): placeId is string {
  return typeof placeId === 'string' && /^ChIJ[A-Za-z0-9_-]{20,}$/.test(placeId)
}

/** Static aggregate computed from the canonical reviews so it can't drift. */
function staticAggregate(): { reviewCount: number; averageRating: number } {
  const reviewCount = TESTIMONIALS.length
  const sum = TESTIMONIALS.reduce((acc, t) => acc + t.rating, 0)
  const averageRating = reviewCount > 0 ? sum / reviewCount : 0
  return { reviewCount, averageRating }
}

async function fetchPlaceDetails(): Promise<PlaceDetailsResponse | null> {
  const apiKey = getPlacesApiKey()
  const placeId = getPlaceId()

  if (!apiKey) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[google-reviews] GOOGLE_PLACES_API_KEY is not set — returning empty reviews')
    }
    return null
  }

  // Missing OR not a real ChIJ Place ID (e.g. a CID): do not call the API.
  if (!isValidPlaceId(placeId)) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '[google-reviews] NEXT_PUBLIC_GOOGLE_PLACE_ID missing or not a ChIJ Place ID — skipping live fetch. See setup TODO in src/lib/google-reviews.ts.',
      )
    }
    return null
  }

  const url = new URL('https://maps.googleapis.com/maps/api/place/details/json')
  url.searchParams.set('place_id', placeId)
  url.searchParams.set('fields', 'reviews,rating,user_ratings_total')
  url.searchParams.set('key', apiKey)
  url.searchParams.set('reviews_sort', 'newest')

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 86400 },
    })

    if (!response.ok) {
      console.error(`[google-reviews] Places API HTTP error: ${response.status}`)
      return null
    }

    const data = (await response.json()) as PlaceDetailsResponse

    if (data.status !== 'OK') {
      console.error(
        `[google-reviews] Places API error: ${data.status ?? 'unknown'}${data.error_message ? ` — ${data.error_message}` : ''}`,
      )
      return null
    }

    return data
  } catch (error) {
    console.error('[google-reviews] Failed to fetch place details:', error)
    return null
  }
}

/**
 * Single source of truth for the review source decision. Fetches the live
 * Places data once; on ANY failure (missing/invalid Place ID, network error,
 * non-OK status, or zero live reviews) it degrades gracefully to the static
 * `TESTIMONIALS` and logs exactly one concise line. Count + rating are derived
 * from the array so they stay truthful.
 */
export async function getReviewsData(): Promise<ReviewsData> {
  const { reviewCount, averageRating: staticRating } = staticAggregate()
  const data = await fetchPlaceDetails()
  const liveReviews = data?.result?.reviews ?? []

  if (liveReviews.length === 0) {
    console.info(STATIC_FALLBACK_LOG)
    return {
      hasLiveReviews: false,
      reviews: [],
      totalCount: reviewCount,
      averageRating: staticRating,
    }
  }

  return {
    hasLiveReviews: true,
    reviews: liveReviews,
    totalCount: data?.result?.user_ratings_total ?? reviewCount,
    averageRating: data?.result?.rating ?? staticRating,
  }
}

// ── Dormant-but-ready live-fetch helpers ──────────────────────────────────
// Kept intact so enabling live reviews is a no-code change (just set a valid
// NEXT_PUBLIC_GOOGLE_PLACE_ID). `getReviewsData()` above is the path the site
// actually uses today.

export async function fetchGoogleReviews(): Promise<GoogleReview[]> {
  const data = await fetchPlaceDetails()
  return data?.result?.reviews ?? []
}

export async function fetchPlaceSummary(): Promise<{
  rating: number
  user_ratings_total: number
} | null> {
  const data = await fetchPlaceDetails()
  const rating = data?.result?.rating
  const userRatingsTotal = data?.result?.user_ratings_total

  if (rating === undefined || userRatingsTotal === undefined) {
    return null
  }

  return { rating, user_ratings_total: userRatingsTotal }
}
