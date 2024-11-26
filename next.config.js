/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // ... existing code ...
  output: 'standalone',
  experimental: {
    // Enable if you need static exports
    // outputStandalone: true,
  }
  // ... existing code ...
};

module.exports = nextConfig;