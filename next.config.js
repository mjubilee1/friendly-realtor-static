// next.config.js
module.exports = {
  headers() {
    return [
      {
        source: '/.well-known/apple-app-site-association',
        headers: [{ key: 'content-type', value: 'application/json' }],
      },
    ];
  },
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
