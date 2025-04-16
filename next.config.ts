import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
  },
};

export default nextConfig;
