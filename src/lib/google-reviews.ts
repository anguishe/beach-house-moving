/*
 * Google Reviews — LIVE (Places API New) with static fallback.
 *
 * `getReviewsData()` fetches live reviews from the Places API (New) Place
 * Details endpoint and degrades to the first-party `TESTIMONIALS`
 * (src/lib/content.ts) on ANY failure — missing/invalid key or Place ID,
 * network error, non-2xx (including a 429 daily-quota exhaustion), or zero
 * live reviews. Count + rating are always derived from whichever array we
 * return, so the number on the page can never drift from the reviews shown.
 *
 * Env (see .env.local / .env.example):
 *   NEXT_PUBLIC_GOOGLE_PLACE_ID — the `ChIJ…` Place ID (NOT a CID / "0x…" hex).
 *     `isValidPlaceId` rejects a CID before we ever call the API.
 *   GOOGLE_PLACES_API_KEY — key with "Places API (New)" enabled + billing.
 *
 * Note: the LEGACY Details endpoint (maps.googleapis.com/.../place/details)
 * returns NOT_FOUND for this listing; the New endpoint resolves it. Do not
 * revert to legacy without re-verifying the Place ID against it.
 *
 * Quota: responses are ISR-cached 24h (revalidate: 86400), so upstream is hit
 * ~once/day per build node — the free tier is never a concern, and a 429 still
 * falls back to static cleanly.
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

// Places API (New) response subset — matches X-Goog-FieldMask below.
type PlacesNewReview = {
  rating?: number
  text?: { text?: string }
  originalText?: { text?: string }
  relativePublishTimeDescription?: string
  publishTime?: string
  authorAttribution?: { displayName?: string; photoUri?: string }
}

type PlacesNewResponse = {
  rating?: number
  userRatingCount?: number
  reviews?: PlacesNewReview[]
}

/** Map one Places API (New) review onto the GoogleReview shape the UI renders. */
function normalizeReview(r: PlacesNewReview): GoogleReview {
  const publishMs = r.publishTime ? Date.parse(r.publishTime) : NaN
  return {
    author_name: r.authorAttribution?.displayName ?? 'Google user',
    rating: r.rating ?? 0,
    text: r.text?.text ?? r.originalText?.text ?? '',
    time: Number.isNaN(publishMs) ? 0 : Math.floor(publishMs / 1000),
    profile_photo_url: r.authorAttribution?.photoUri,
    relative_time_description: r.relativePublishTimeDescription ?? '',
  }
}

export type ReviewsData = {
  hasLiveReviews: boolean
  reviews: GoogleReview[]
  totalCount: number
  averageRating: number
}

/** One concise, honest line emitted when we fall back to the static reviews. */
const STATIC_FALLBACK_LOG = `[reviews] live source unavailable — using ${TESTIMONIALS.length} static reviews`

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

  // Places API (New) Place Details. Field mask limits us to the 3 fields we
  // render, which keeps this on the cheapest SKU.
  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`

  try {
    const response = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
      },
      next: { revalidate: 86400 },
    })

    // Any non-2xx (incl. 429 RESOURCE_EXHAUSTED = daily quota) → caller falls
    // back to the static TESTIMONIALS.
    if (!response.ok) {
      console.error(`[google-reviews] Places API (New) HTTP ${response.status}`)
      return null
    }

    const place = (await response.json()) as PlacesNewResponse

    // Normalize into the legacy-style shape the rest of this module speaks, so
    // getReviewsData() and all consumers stay untouched.
    return {
      status: 'OK',
      result: {
        rating: place.rating,
        user_ratings_total: place.userRatingCount,
        reviews: (place.reviews ?? []).map(normalizeReview),
      },
    }
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
