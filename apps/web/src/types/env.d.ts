declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_MODE: 'development' | 'production' | 'test';
        NEXT_PUBLIC_VERSION: string;
        NEXT_PUBLIC_CLIENT_ID: string;
        NEXT_PUBLIC_LOCALE: 'ko' | 'en' | 'ja' | 'zh';
        NEXT_PUBLIC_APP_NAME: string;
        NEXT_PUBLIC_CURRENCY: 'KRW' | 'USD' | 'JPY';
        NEXT_PUBLIC_SHOPBY_BASE_URL: string;
    }
}
