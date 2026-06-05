import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';

const withVanillaExtract = createVanillaExtractPlugin();
const isReactCompilerEnabled = process.env.NEXT_ENABLE_REACT_COMPILER === 'true';

const nextConfig: NextConfig = {
    pageExtensions: ['tsx', 'api.ts'],
    reactCompiler: isReactCompilerEnabled,
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
    productionBrowserSourceMaps: false,
    transpilePackages: ['@geek/utils'],
    experimental: {
        optimizePackageImports: ['@/components/modal', '@/components/layout', '@/entities/recipe/ui'],
    },
};

export default withVanillaExtract(nextConfig);
