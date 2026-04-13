import { useRouter } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';
import { useCallback, useMemo } from 'react';

import { PATHS } from '@/const/paths';
import {
    COLLECTION_PAGE_QUERY_KEY,
    RECIPE_PAGE_QUERY_KEY,
} from '@/const/search';
import { getSafeQueryString } from '@/utils/query';

export const useSearchKeyword = () => {
    const router = useRouter();

    const keywordFromQuery = useMemo(
        () => getSafeQueryString(router.query.keyword),
        [router.query.keyword],
    );

    const searchByKeyword = useCallback(
        (value: string): boolean => {
            const keyword = value.trim();

            if (!keyword) {
                return false;
            }

            const isSearchPage = router.pathname === PATHS.SEARCH;
            const nextQuery: ParsedUrlQueryInput = isSearchPage
                ? {
                      ...router.query,
                      keyword,
                      pageNumber: '1',
                      [RECIPE_PAGE_QUERY_KEY]: '1',
                      [COLLECTION_PAGE_QUERY_KEY]: '1',
                  }
                : { keyword };

            router.push({
                pathname: PATHS.SEARCH,
                query: nextQuery,
            });

            return true;
        },
        [router],
    );

    return { keywordFromQuery, searchByKeyword };
};
