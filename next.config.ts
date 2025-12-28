import { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'shopby-images.cdn-nhncommerce.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    compiler: {
        // 프로덕션 빌드에서 console.* 제거
        removeConsole:
            process.env.NODE_ENV === 'production'
                ? {
                      exclude: ['error', 'warn'],
                  }
                : false,
    },
    productionBrowserSourceMaps: process.env.NODE_ENV !== 'production',
    compress: true,
    reactStrictMode: true,
};

export default nextConfig;
