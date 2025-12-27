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
};

export default nextConfig;
