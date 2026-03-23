'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useQueryState = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    /**
     * 1. Router Replace (Server Side Trigger)
     *  - Next.js가 인지하게 하여 서버 데이터를 새로 패칭해야 할 때 (필터링, 검색 등)
     *  - URL을 변경하여 Server Component의 리렌더링(데이터 페칭)을 유발
     */
    const setQuery = useCallback(
        (
            params: Record<string, string | number | null>,
            options?: { scroll?: boolean },
        ) => {
            const newParams = new URLSearchParams(searchParams.toString());

            Object.entries(params).forEach(([key, value]) => {
                if (value === null) {
                    newParams.delete(key);
                } else {
                    newParams.set(key, String(value));
                }
            });

            router.replace(`${pathname}?${newParams.toString()}`, {
                scroll: options?.scroll ?? false,
            });
        },
        [router, pathname, searchParams],
    );

    /**
     * 2. Silent Update (Client Side Only)
     *  - 서버 요청 없이 브라우저 주소창의 URL만 슬쩍 변경 (무한스크롤 등)
     *  - Next.js 몰래 주소창만 바꿀 때 (무한 스크롤 현재 페이지 기억용 등)
     */
    const setSilentQuery = useCallback(
        (params: Record<string, string | number | null>) => {
            const newParams = new URLSearchParams(searchParams.toString());

            Object.entries(params).forEach(([key, value]) => {
                if (value === null) {
                    newParams.delete(key);
                } else {
                    newParams.set(key, String(value));
                }
            });

            const url = `${pathname}?${newParams.toString()}`;
            window.history.replaceState(
                { ...window.history.state, as: url, url },
                '',
                url,
            );
        },
        [pathname, searchParams],
    );

    return { searchParams, setQuery, setSilentQuery };
};
