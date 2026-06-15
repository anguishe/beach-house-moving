// IndexNow batch submit — runs after every production build
// Fetches the live sitemap, parses every <loc>, and POSTs the full URL list
// to IndexNow (covers Bing + Yandex). Non-fatal on any network error.
const KEY = '11781a711fe74e7d385896e222cbd2ad'
const HOST = 'beachhousemoving.xyz'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`

async function submitIndexNow(urlList) {
  const body = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  })
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body,
  })
  console.log(`[IndexNow] ${res.status} — ${urlList.length} URLs submitted to Bing/Yandex`)
  return res.status
}

async function submitBingWebmaster(urlList) {
  const apiKey = process.env.BING_API_KEY
  if (!apiKey) {
    console.log('[Bing Webmaster] BING_API_KEY not set — skipping')
    return
  }
  const endpoint = `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=${encodeURIComponent(apiKey)}`
  const body = JSON.stringify({
    siteUrl: `https://${HOST}`,
    urlList,
  })
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body,
  })
  console.log(`[Bing Webmaster] ${res.status} — ${urlList.length} URLs submitted`)
}

try {
  // Fetch and parse the live sitemap for the canonical URL list
  const sitemapRes = await fetch(`https://${HOST}/sitemap.xml`)
  if (!sitemapRes.ok) {
    throw new Error(`Sitemap fetch failed: ${sitemapRes.status}`)
  }
  const xml = await sitemapRes.text()
  const urlList = [...xml.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map((m) => m[1])

  if (urlList.length === 0) {
    console.warn('[IndexNow] No URLs found in sitemap — nothing submitted')
  } else {
    await submitIndexNow(urlList)

    try {
      await submitBingWebmaster(urlList)
    } catch (bingErr) {
      console.warn('[Bing Webmaster] Submission failed (non-fatal):', bingErr.message)
    }
  }
} catch (err) {
  // Non-fatal — do not fail the build if IndexNow is unreachable
  console.warn('[IndexNow] Submission failed (non-fatal):', err.message)
}
