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
				pathname: '/v0/b/myweddingapp-25712.appspot.com/**',
			},
		],
	},
};

module.exports = nextConfig;
