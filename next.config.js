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
}

module.exports = nextConfig
