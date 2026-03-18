import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
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
import Head from 'next/head';
import { useRouter } from 'next/router';
import { OverlayProvider } from 'overlay-kit';
import { useState } from 'react';
import { Toaster } from 'sonner';

import { Layout } from '@/components/layout';

import '@/styles/global.css.ts';
import '@/i18n/config';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
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

    // 페이지별 레이아웃 정의가 있으면 사용, 없으면 기본 Layout 사용
    const getLayout =
        Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

    const defaultSeo = generateDefaultSeo({
        titleTemplate: '%s | JollyPot',
        defaultTitle: 'JollyPot',
        description: 'Headless Commerce Example',
    });

    return (
        <ReactLenis root>
            <QueryClientProvider client={queryClient}>
                <HydrationBoundary state={pageProps.dehydratedState}>
                    <OverlayProvider>
                        <Head>{defaultSeo}</Head>
                        {getLayout(
                            <AnimatePresence mode="wait">
                                <motion.div
                                    // TO CHECK: 리스트 페이지에서 다음 페이지로 이동할 경우 체크 필요(router.asPath -> router.pathname으로 변경)
                                    key={router.pathname}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Component {...pageProps} />
                                </motion.div>
                            </AnimatePresence>,
                        )}
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
