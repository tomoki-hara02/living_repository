import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cms-assets.nilto.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/repository/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=0, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=0, stale-while-revalidate=3600",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
