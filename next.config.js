/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel deployment configuration
  images: {
    domains: ['localhost'],
    unoptimized: false
  },
  // Enable API routes for Vercel
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  }
}

module.exports = nextConfig
