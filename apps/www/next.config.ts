import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  async rewrites() {
    return [
      {
        source: "/ui/_next/:path*",
        destination: "http://localhost:4000/_next/:path*",
      },
      {
        source: "/ui/:path*",
        destination: "http://localhost:4000/ui/:path*",
      },
      {
        source: "/ui",
        destination: "http://localhost:4000/ui",
      },
      {
        source: "/ui/api/:path*",
        destination: "http://localhost:4000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
