import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  distDir: "dist",
};

module.exports = {
  redirects() {
    return [
      {
        source: "/Simulation",
        destination: "/Simulation/File",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
