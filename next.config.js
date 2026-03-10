const IS_DEV_MODE = process.env.NODE_ENV !== 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	turbopack: {
		rules: {
			'*.glsl': {
				loaders: ['raw-loader'],
				as: '*.js',
			},
		},
	},
};

export default nextConfig;
