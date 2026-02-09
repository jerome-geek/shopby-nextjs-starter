export const env = {
    NEXT_PUBLIC_CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID || '',
    NEXT_PUBLIC_API_URL:
        process.env.NEXT_PUBLIC_API_URL || 'https://shop-api.e-ncp.com',
} as const;
