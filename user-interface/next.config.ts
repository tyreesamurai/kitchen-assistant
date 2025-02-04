import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Required for static exports
  basePath: "/kitchen-assistant", // Replace <repository-name> with your GitHub repo name
  trailingSlash: true, // Helps with static hosting
};

module.exports = nextConfig;

export default nextConfig;
