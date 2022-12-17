/** @type {import('next').NextConfig} */
const nextConfig = {
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
}

module.exports = nextConfig
