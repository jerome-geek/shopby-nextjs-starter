'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

interface QueryProviderProps {
    children: React.ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
    // React Query v5 공식 문서에 따른 QueryClient 설정
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // 데이터가 stale되기까지의 시간 (5분)
                        staleTime: 1000 * 60 * 5,
                        // 캐시된 데이터가 메모리에 유지되는 시간 (10분)
                        gcTime: 1000 * 60 * 10,
                        // 재시도 횟수
                        retry: (failureCount, error) => {
                            // 4xx 에러는 재시도하지 않음
                            if (
                                error instanceof Error &&
                                'status' in error &&
                                typeof error.status === 'number' &&
                                error.status >= 400 &&
                                error.status < 500
                            ) {
                                return false;
                            }
                            // 최대 3번 재시도
                            return failureCount < 3;
                        },
                        // 재시도 지연 시간 (지수 백오프)
                        retryDelay: (attemptIndex) =>
                            Math.min(1000 * 2 ** attemptIndex, 30000),
                        // 브라우저 포커스 시 자동 refetch
                        refetchOnWindowFocus: false,
                        // 네트워크 재연결 시 자동 refetch
                        refetchOnReconnect: true,
                    },
                    mutations: {
                        // mutation 재시도 횟수
                        retry: 1,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
