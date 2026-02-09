import '@/styles/globals.css';
import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { generateDefaultSeo } from 'next-seo/pages';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ReactLenis } from 'lenis/react';

export default function App({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                    },
                },
            }),
    );

    const defaultSeo = generateDefaultSeo({
        titleTemplate: '%s | My Shop',
        defaultTitle: 'My Shop',
        description: 'Headless Commerce Example',
    });

    return (
        <ReactLenis root>
            <QueryClientProvider client={queryClient}>
                <Head>{defaultSeo}</Head>
                <Component {...pageProps} />
                <Toaster />
                <ReactQueryDevtools initialIsOpen={false} />
                <Analytics />
                <SpeedInsights />
            </QueryClientProvider>
        </ReactLenis>
    );
}
