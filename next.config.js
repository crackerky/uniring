/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'syuddulwqqyuhrcwhqqs.supabase.co',
      },
    ],
  },
  webpack: (config, { dev }) => {
    // Disable cache in development to prevent cache corruption issues
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;