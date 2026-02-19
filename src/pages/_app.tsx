import {
    HydrationBoundary,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ReactLenis } from 'lenis/react';
import { AnimatePresence, motion } from 'motion/react';
import { generateDefaultSeo } from 'next-seo/pages';
import type { AppProps } from 'next/app';
import { Noto_Sans_KR } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { OverlayProvider } from 'overlay-kit';
import { useState } from 'react';
import { Toaster } from 'sonner';

import { Layout } from '@/components/layout';

import '@/styles/global.css';
import '@/i18n/config';
import '@/styles/globals.css';

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
                        refetchOnWindowFocus:
                            process.env.NODE_ENV === 'production',
                        refetchOnMount: process.env.NODE_ENV === 'production',
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
                <HydrationBoundary state={pageProps.dehydratedState}>
                    <OverlayProvider>
                        <Head>{defaultSeo}</Head>
                        <Layout className={notoSansKr.className}>
                            <AnimatePresence mode="wait">
                                {/* TODO: router.route를 사용할 경우 slug페이지에서 애니메이션이 미동작하는 경우가 있어 router.asPath 사용, 이 경우 queryParameter가 변경되는 경우에도 페이지 transition이 동작함 */}
                                <motion.div
                                    key={router.asPath}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Component {...pageProps} />
                                </motion.div>
                            </AnimatePresence>
                        </Layout>
                        <Toaster />
                        <ReactQueryDevtools initialIsOpen={false} />
                        <Analytics />
                        <SpeedInsights />
                    </OverlayProvider>
                </HydrationBoundary>
            </QueryClientProvider>
        </ReactLenis>
    );
}
