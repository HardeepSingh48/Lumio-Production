import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'uploadthing.com',
      'utfs.io',
      'img.clerk.com',
      'subdomain',
      'files.stripe.com',
    ],
  },
  reactStrictMode: false,
  /* config options here */
};

export default nextConfig;
