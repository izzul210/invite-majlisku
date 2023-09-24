/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'firebasestorage.googleapis.com',
				port: '',
				pathname: '/v0/b/myweddingapp-25712.appspot.com/**',
			},
		],
	},
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({});

module.exports = withBundleAnalyzer(nextConfig);
