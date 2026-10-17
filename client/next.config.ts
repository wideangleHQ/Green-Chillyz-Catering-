import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // client/ is its own pnpm workspace (own pnpm-lock.yaml), so it is the Turbopack root.
  // The previous '/../..' pointed above the repository.
  turbopack: {
    root: __dirname,
  },

  // Security headers (supplementing Helmet on the API side)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },

  // Allow images from Supabase Storage once the bucket URL is confirmed
  images: {
    remotePatterns: [
      // Add Supabase storage bucket URL here when confirmed:
      // { protocol: 'https', hostname: '[project].supabase.co' },
    ],
  },

  // Redirect www → non-www (or vice versa) — configure once domain is confirmed
  // async redirects() { return []; },
};

export default nextConfig;
