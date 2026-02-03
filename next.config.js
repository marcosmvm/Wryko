/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'auth.wryko.com',
      },
    ],
  },
  // Enable experimental features if needed
  experimental: {
    // serverActions: true, // Already stable in Next.js 14
  },
}

module.exports = nextConfig
