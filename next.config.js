// next.config.js
module.exports = {
  experimental: {
    headers() {
      return [
        {
          source: '/.well-known/apple-app-site-association',
          headers: [{ key: 'content-type', value: 'application/json' }],
        },
      ];
    },
  },
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
    unoptimized: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
