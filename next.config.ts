/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // barcha domenlar uchun ruxsat
      },
    ],
  },
  experimental: {
    middleware: true,
  },
};

export default nextConfig;
