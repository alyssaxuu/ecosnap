/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
	register: true,
	skipWaiting: true
})

const nextConfig = withPWA({
  reactStrictMode: true,
	webpack: {
    configure: {
      experiments: {
        topLevelAwait: true,
      },
    },
  }
});

module.exports = nextConfig
