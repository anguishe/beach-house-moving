/*
 * Google Reviews API — SETUP STATUS
 *
 * Current state: NEXT_PUBLIC_GOOGLE_PLACE_ID is not yet configured.
 * The GBP listing is new and not yet indexed in Google Places search.
 *
 * When to enable:
 * 1. Search "Beach House Moving" in Google Maps and confirm the business card appears.
 * 2. Click the business → Share → Copy link. The Place ID is in the URL after "1s".
 *    Example: https://maps.google.com/?cid=XXXXXXXXXX — the Place ID format is ChIJ...
 *    To get the ChIJ format: go to https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
 * 3. Add NEXT_PUBLIC_GOOGLE_PLACE_ID=ChIJ... to Vercel → Settings → Environment Variables
 * 4. Redeploy. fetchGoogleReviews() will begin returning live reviews.
 * 5. Once confirmed working, FLAGS.SHOW_TESTIMONIALS can remain true (live reviews will
 *    take precedence over static data via the GoogleReviewsCarousel component).
 *
 * The GOOGLE_PLACES_API_KEY is already set. Only the Place ID is missing.
 */

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

function getPlacesApiKey(): string | undefined {
  return process.env.GOOGLE_PLACES_API_KEY
}

function getPlaceId(): string | undefined {
  return process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID
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

  if (!placeId) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '[google-reviews] NEXT_PUBLIC_GOOGLE_PLACE_ID is not set. See src/lib/google-reviews.ts for setup instructions.',
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
