/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
		return [
			{
				source: '/character',
				destination: '/',
				permanent: true,
			},
            {
				source: '/episode',
				destination: '/',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
