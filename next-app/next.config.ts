import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopack: {
      // @ts-ignore
      root: __dirname,
    }
  }
};

export default nextConfig;
