import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-images-1.medium.com",
        port: "",
        pathname: "/max/**",
      },
      {
        protocol: "https",
        hostname: "placehold.jp",
        port: "",
        pathname: "/bdbdc2/**",
      },
    ],
  },
};

export default nextConfig;
