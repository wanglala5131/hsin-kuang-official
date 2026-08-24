import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-e1d00d69b51f4ecbb5723cbc471372a1.r2.dev',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
