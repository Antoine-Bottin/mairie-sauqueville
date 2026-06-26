import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/mairie/comptes-rendus",
        destination: "/documents/comptes-rendus",
        permanent: true,
      },
      {
        source: "/mairie/urbanisme",
        destination: "/documents/urbanisme",
        permanent: true,
      },
      {
        source: "/mairie/autres-documents",
        destination: "/documents/autres-documents",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
