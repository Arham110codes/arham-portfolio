import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js 16: qualities must be an explicit allowlist (default is [75] only)
    qualities: [75, 90],
    // Prefer AVIF for better quality/byte ratio; fall back to WebP
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
