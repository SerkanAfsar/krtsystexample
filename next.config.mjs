/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 0,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "atillakaratstorage.blob.core.windows.net",
      },
    ],
  },
};

export default nextConfig;
