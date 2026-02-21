export const env = {
    NEXT_PUBLIC_MODE: process.env.NEXT_PUBLIC_MODE || 'development',
    NEXT_PUBLIC_VERSION: process.env.NEXT_PUBLIC_VERSION || '1.0',
    NEXT_PUBLIC_CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID || '',
    NEXT_PUBLIC_SHOPBY_BASE_URL:
        process.env.NEXT_PUBLIC_API_URL || 'https://shop-api.e-ncp.com',
    NEXT_PUBLIC_LOCALE: process.env.NEXT_PUBLIC_LOCALE || 'ko',
    NEXT_PUBLIC_CURRENCY: process.env.NEXT_PUBLIC_CURRENCY || 'KRW',
} as const;
