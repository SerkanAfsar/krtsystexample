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
        hostname: "karatstorage.blob.core.windows.net",
      },
      // {
      //   protocol: "https",
      //   hostname: "atillakaratstorage.blob.core.windows.net",
      // },
    ],
  },
  devIndicators: false 
};

export default nextConfig;
