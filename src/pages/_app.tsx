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
import { OverlayProvider } from 'overlay-kit';
import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/router';

import { Noto_Sans_KR } from 'next/font/google';

import { Layout } from '@/components/layout';

const notoSansKr = Noto_Sans_KR({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
    variable: '--font-noto-sans-kr',
});

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
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
                <OverlayProvider>
                    <Head>{defaultSeo}</Head>
                    <main className={notoSansKr.className}>
                        <Layout>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={router.route}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Component {...pageProps} />
                                </motion.div>
                            </AnimatePresence>
                        </Layout>
                    </main>
                    <Toaster />
                    <ReactQueryDevtools initialIsOpen={false} />
                    <Analytics />
                    <SpeedInsights />
                </OverlayProvider>
            </QueryClientProvider>
        </ReactLenis>
    );
}
