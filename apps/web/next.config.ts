import type { NextConfig } from 'next';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
    pageExtensions: ['tsx', 'api.ts'],
    reactCompiler: true,
    reactStrictMode: true,
    poweredByHeader: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.cdn-nhncommerce.com',
            },
        ],
    },
    experimental: {
        optimizePackageImports: ['@/components/modal', '@/components/layout/modal'],
    },
};

export default withVanillaExtract(nextConfig);
