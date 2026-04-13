import { useRouter } from 'next/router';
import { useCallback } from 'react';

import {
    COLLECTION_PAGE_QUERY_KEY,
    RECIPE_PAGE_QUERY_KEY,
    type SearchTabId,
    TAB_QUERY_KEY,
} from '@/const/search';

export const useSearchTab = () => {
    const router = useRouter();

    const setTab = useCallback(
        (tab: SearchTabId) => {
            router.replace(
                {
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        [TAB_QUERY_KEY]: tab,
                        pageNumber: '1',
                        [RECIPE_PAGE_QUERY_KEY]: '1',
                        [COLLECTION_PAGE_QUERY_KEY]: '1',
                    },
                },
                undefined,
                { shallow: true },
            );
        },
        [router],
    );

    return { setTab };
};
