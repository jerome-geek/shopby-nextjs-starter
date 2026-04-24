import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { PATHS } from '@/const/paths';
import { useProductSearchParams } from '@/entities/search/hooks/useProductSearchParams';

export const useSearchKeyword = () => {
    const router = useRouter();
    const [params, setParams] = useProductSearchParams();

    const keywordFromQuery = params.keyword;

    const searchByKeyword = useCallback(
        (value: string): boolean => {
            const keyword = value.trim();

            if (!keyword) {
                return false;
            }

            const isSearchPage = router.pathname === PATHS.SEARCH;

            if (isSearchPage) {
                setParams({
                    keyword,
                    pageNumber: 1,
                    'recipe.page': 1,
                    'collection.page': 1,
                });
            } else {
                router.push({
                    pathname: PATHS.SEARCH,
                    query: { keyword },
                });
            }

            return true;
        },
        [router, setParams],
    );

    return { keywordFromQuery, searchByKeyword };
};
