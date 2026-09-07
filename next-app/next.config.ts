import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.wieiit.live",
          },
        ],
        destination: "https://wieiit.live/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
