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
import type { NextPage } from 'next';
import { generateDefaultSeo } from 'next-seo/pages';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { type ReactElement, type ReactNode, useMemo, useState } from 'react';
import { Toaster } from 'sonner';
import { HttpStatusCode, isAxiosError } from 'axios';

import { ExternalScripts } from '@/components/common';
import { DefaultLayout } from '@/components/layout';
import { AppProviders } from '@/providers';
import { env } from '@/configs/env';

import '@/i18n/config';
import '@/styles/global.css.ts';
import 'react-day-picker/dist/style.css';

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
                        staleTime: 1000 * 60 * 5,
                        gcTime: 1000 * 60 * 10,
                        refetchOnWindowFocus:
                            process.env.NODE_ENV === 'production',
                        refetchOnMount: process.env.NODE_ENV === 'production',
                        refetchOnReconnect: true,
                        retry: (failureCount, error) => {
                            if (process.env.NODE_ENV === 'development') {
                                return false;
                            }

                            if (
                                isAxiosError(error) &&
                                error.response?.status ===
                                    HttpStatusCode.BadRequest
                            ) {
                                return false;
                            }

                            // AbortError는 재시도하지 않음
                            if (
                                error.name === 'AbortError' ||
                                error.name === 'CanceledError'
                            ) {
                                return false;
                            }

                            return failureCount < 3;
                        },
                    },
                    mutations: { throwOnError: false },
                },
            }),
    );

    // 부모 레이아웃(Layout)은 무조건 적용하고, 페이지별 중첩 레이아웃은 선택적으로 적용
    const getLayout = Component.getLayout ?? ((page) => page);

    const defaultSeo = generateDefaultSeo({
        titleTemplate: '%s | JollyPot',
        defaultTitle: 'JollyPot',
        description: 'Headless Commerce Example',
    });

    const pathname = useMemo(() => {
        return router.asPath.split('?')[0];
    }, [router.asPath]);

    return (
        <>
            <ExternalScripts />

            <ReactLenis root>
                <QueryClientProvider client={queryClient}>
                    <HydrationBoundary state={pageProps.dehydratedState}>
                        <AppProviders>
                            <Head>{defaultSeo}</Head>
                            <DefaultLayout>
                                {getLayout(
                                    <AnimatePresence mode='wait'>
                                        <motion.div
                                            // TO CHECK: 리스트 페이지에서 다음 페이지로 이동할 경우 체크 필요(router.asPath -> router.pathname으로 변경)
                                            key={pathname}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Component {...pageProps} />
                                        </motion.div>
                                    </AnimatePresence>,
                                )}
                            </DefaultLayout>
                            <Toaster
                                richColors
                                position='bottom-center'
                                duration={1500}
                            />

                            {env.NEXT_PUBLIC_MODE !== 'production' && (
                                <div
                                    style={{
                                        fontSize: '16px',
                                    }}
                                    data-lenis-prevent
                                >
                                    <ReactQueryDevtools initialIsOpen={false} />
                                </div>
                            )}
                            <Analytics />
                            <SpeedInsights />
                        </AppProviders>
                    </HydrationBoundary>
                </QueryClientProvider>
            </ReactLenis>
        </>
    );
}
