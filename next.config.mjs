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
        protocol: "http",
        hostname: "karatstorage.blob.core.windows.net",
      },
    ],
  },
};

export default nextConfig;
