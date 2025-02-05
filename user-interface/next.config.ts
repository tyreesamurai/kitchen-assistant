import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.allrecipes.com",
      },
      {
        protocol: "https",
        hostname: "www.simplyrecipes.com",
      },
    ],
  },
};

export default nextConfig;
