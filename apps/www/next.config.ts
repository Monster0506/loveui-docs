import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@loveui/ui"],
  async rewrites() {
    if (process.env.NODE_ENV !== "development") {
      return [];
    }

    const devHost = process.env.UI_DEV_SERVER ?? "http://localhost:4000";

    return [
      {
        source: "/ui/_next/:path*",
        destination: `${devHost}/_next/:path*`,
      },
      {
        source: "/ui/api/:path*",
        destination: `${devHost}/api/:path*`,
      },
      {
        source: "/ui/:path*",
        destination: `${devHost}/ui/:path*`,
      },
      {
        source: "/ui",
        destination: `${devHost}/ui`,
      },
    ];
  },
};

export default nextConfig;
