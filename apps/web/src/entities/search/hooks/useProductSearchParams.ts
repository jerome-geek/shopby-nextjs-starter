import {
    parseAsInteger,
    parseAsString,
    parseAsStringLiteral,
    useQueryStates,
} from 'nuqs';

import {
    COLLECTION_ORDER_QUERY_KEY,
    COLLECTION_PAGE_QUERY_KEY,
    COLLECTION_SORT_BY_QUERY_KEY,
    RECIPE_ORDER_QUERY_KEY,
    RECIPE_PAGE_QUERY_KEY,
    RECIPE_SORT_BY_QUERY_KEY,
    TAB_QUERY_KEY,
} from '@/const/search';
import type { OrderByType, OrderDirectionType } from '@/models';
import type { CollectionSortBy, RecipeSortBy } from '@/const/recipe';

export const useProductSearchParams = () => {
    return useQueryStates(
        {
            [TAB_QUERY_KEY]: parseAsStringLiteral([
                'integrated',
                'shopping',
                'recipe',
                'collection',
            ]).withDefault('integrated'),
            keyword: parseAsString.withDefault(''),

            // 쇼핑(상품)
            pageNumber: parseAsInteger.withDefault(1),
            by: parseAsStringLiteral<OrderByType>([
                'MD_RECOMMEND',
                'RECENT_PRODUCT',
                'DISCOUNTED_PRICE',
                'POPULAR',
                'REVIEW',
            ]),
            direction: parseAsStringLiteral<OrderDirectionType>(['ASC', 'DESC']),

            // 레시피
            [RECIPE_PAGE_QUERY_KEY]: parseAsInteger.withDefault(1),
            [RECIPE_SORT_BY_QUERY_KEY]: parseAsStringLiteral<RecipeSortBy>([
                'LATEST',
                'BOOKMARK_COUNT',
                'LIKE_COUNT',
            ]).withDefault('LATEST'),
            [RECIPE_ORDER_QUERY_KEY]:
                parseAsStringLiteral<OrderDirectionType>(['ASC', 'DESC']).withDefault(
                    'DESC',
                ),

            // 컬렉션
            [COLLECTION_PAGE_QUERY_KEY]: parseAsInteger.withDefault(1),
            [COLLECTION_SORT_BY_QUERY_KEY]: parseAsStringLiteral<CollectionSortBy>([
                'LATEST',
                'BOOKMARK_COUNT',
            ]).withDefault('LATEST'),
            [COLLECTION_ORDER_QUERY_KEY]:
                parseAsStringLiteral<OrderDirectionType>(['ASC', 'DESC']).withDefault(
                    'DESC',
                ),
        },
        {
            shallow: true,
            history: 'push',
        },
    );
};
