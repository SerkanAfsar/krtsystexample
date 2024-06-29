/** @type {import('next').NextConfig} */
const nextConfig = {
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
