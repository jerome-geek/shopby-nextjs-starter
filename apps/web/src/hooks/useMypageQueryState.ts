import { useRouter } from 'next/router';

const PAGE_SIZE = 12;

export const useMypageQueryState = () => {
    const router = useRouter();

    const startYmd = String(router.query.startYmd ?? '') || undefined;
    const endYmd = String(router.query.endYmd ?? '') || undefined;
    const pageNumber = Number(router.query.pageNumber) || 1;

    const pageSize = PAGE_SIZE;

    const setQuery = (next: Record<string, string | number | undefined>) => {
        router.replace(
            {
                pathname: router.pathname,
                query: {
                    ...router.query,
                    ...next,
                    ...(next.pageNumber ? {} : { pageNumber: 1 }),
                },
            },
            undefined,
            { shallow: true },
        );
    };

    return {
        router,
        startYmd,
        endYmd,
        pageNumber,
        pageSize,
        setQuery,
    };
};
