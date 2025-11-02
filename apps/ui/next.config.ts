import type { NextConfig } from "next"
import { createMDX } from "fumadocs-mdx/next"

const { NEXT_PUBLIC_ORIGIN_URL } = process.env

const withMDX = createMDX()

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "/ui",
  transpilePackages: ["@workspace/ui", "@loveui/ether", "@loveui/silk", "@loveui/gradiant-blinds"],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "wajxiz6qhqyqkm0o.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "stream.mux.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/docs",
        permanent: false,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: "/docs/:path*.md",
        destination: "/api/raw/docs/:path*",
      },
    ]
  },
}

export default withMDX(nextConfig)
