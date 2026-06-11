// IndexNow ping — runs after every production build
// Key: 11781a711fe74e7d385896e222cbd2ad (public by design)
const KEY = '11781a711fe74e7d385896e222cbd2ad'
const HOST = 'beachhousemoving.xyz'
const SITEMAP = `https://${HOST}/sitemap.xml`

const url = `https://api.indexnow.org/indexnow?url=${encodeURIComponent(SITEMAP)}&key=${KEY}`

try {
  const res = await fetch(url)
  console.log(`[IndexNow] ${res.status} — sitemap submitted to Bing/Yandex`)
} catch (err) {
  // Non-fatal — do not fail the build if IndexNow is unreachable
  console.warn('[IndexNow] Ping failed (non-fatal):', err.message)
}
