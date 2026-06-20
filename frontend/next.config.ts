/// <reference types="next" />
/// <reference types="next/image-types/global" />

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
