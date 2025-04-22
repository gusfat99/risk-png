import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api-risk.alus.co',
        pathname: '/storage/**',
      },
    ],
  }
};

export default nextConfig;
