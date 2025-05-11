import path from "path";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  srcDir: "src",
  experimental: {
    serverActions: {},
  },
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
};

export default nextConfig;
