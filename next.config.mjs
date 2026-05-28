/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // All assets are local under /public/images/ — no remotePatterns or domains
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
