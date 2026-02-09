import type { NextConfig } from 'next';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.cdn-nhncommerce.com',
            },
            {
                protocol: 'https',
                hostname: 'shopby-images.cdn-nhncommerce.com',
            },
        ],
    },
};

export default withVanillaExtract(nextConfig);
