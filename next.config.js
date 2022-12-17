/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public'
})

const nextConfig = withPWA({
  reactStrictMode: true,
	webpack: {
    configure: {
      experiments: {
        topLevelAwait: true,
      },
    },
  },
	pwa: {
		dest: "public",
		register: true,
		skipWaiting: true
	}
});

module.exports = nextConfig
