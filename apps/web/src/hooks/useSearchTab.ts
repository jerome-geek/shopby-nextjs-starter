import { useCallback } from 'react';

import {
    type SearchTabId,
    TAB_QUERY_KEY,
} from '@/const/search';
import { useProductSearchParams } from '@/entities/search/hooks/useProductSearchParams';

export const useSearchTab = () => {
    const [, setParams] = useProductSearchParams();

    const setTab = useCallback(
        (tab: SearchTabId) => {
            setParams({
                [TAB_QUERY_KEY]: tab,
                pageNumber: 1,
                'recipe.page': 1,
                'collection.page': 1,
            });
        },
        [setParams],
    );

    return { setTab };
};
