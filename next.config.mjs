// ponytail: 'unsafe-eval' only in dev (React refresh eval); prod script-src stays without it
const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  ...(process.env.NODE_ENV !== 'production' ? ["'unsafe-eval'"] : []),
  'https://www.googletagmanager.com',
  'https://analytics.ahrefs.com',
].join(' ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // All assets are local under /public/images/ — no remotePatterns or domains
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 2592000,
  },
  async redirects() {
    return [{ source: '/go/gbp', destination: '/', permanent: true }];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'Content-Security-Policy', value: `default-src 'self'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://*.google-analytics.com https://maps.googleapis.com https://analytics.ahrefs.com; frame-src https://www.google.com https://www.googletagmanager.com; object-src 'none'; base-uri 'self';` },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' },
        ],
      },
    ];
  },
};

export default nextConfig;
