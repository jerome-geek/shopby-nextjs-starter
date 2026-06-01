import { flatMap, pipe, toArray } from '@fxts/core';
import { useMemo } from 'react';

import { useProductSearchParams } from '@/entities/search/hooks/useProductSearchParams';
import { COLLECTION_TAKE_PER_TAB, INTEGRATED_SEARCH_PAGE } from '@/features/search/constants';
import {
    useInfinitePublicCollectionSearch,
    usePublicCollectionSearch,
} from '@/hooks/query/shop/collection';
import { useResponsive } from '@/hooks/utils';
import { OrderDirectionType } from '@/models';
import { CollectionSortBy } from '@/features/recipe/constants';

interface UseCollectionSearchProps {
    isIntegrated?: boolean;
}

export const useCollectionSearch = ({
    isIntegrated = false,
}: UseCollectionSearchProps = {}) => {
    const { isTablet } = useResponsive();
    const [searchParams] = useProductSearchParams();

    const collectionTake = isIntegrated
        ? INTEGRATED_SEARCH_PAGE.collection
        : COLLECTION_TAKE_PER_TAB;

    const isInfinite = isIntegrated || isTablet;
    const isQuery = !isIntegrated && !isTablet;

    const commonParams = useMemo(
        () => ({
            keyword: searchParams.keyword,
            order: searchParams['collection.order'] as OrderDirectionType,
            sortBy: searchParams['collection.sortBy'] as CollectionSortBy,
            take: collectionTake,
        }),
        [searchParams, collectionTake],
    );

    const {
        data: infiniteData,
        fetchNextPage,
        hasNextPage,
    } = useInfinitePublicCollectionSearch({
        searchParams: commonParams,
        options: {
            enabled: isInfinite,
        },
    });

    const { data: queryData } = usePublicCollectionSearch({
        searchParams: {
            ...commonParams,
            page: searchParams['collection.page'],
        },
        options: {
            enabled: isQuery,
        },
    });

    const collections = useMemo(() => {
        if (isInfinite) {
            return pipe(
                infiniteData?.pages ?? [],
                flatMap((page) => page.data),
                toArray,
            );
        }
        return queryData?.data ?? [];
    }, [isInfinite, infiniteData, queryData]);

    const totalCount = isInfinite
        ? (infiniteData?.pages[0]?.count ?? 0)
        : (queryData?.count ?? 0);

    return {
        collections,
        totalCount,
        hasNextPage: hasNextPage ?? false,
        fetchNextPage,
        pageNumber: searchParams['collection.page'],
        pageSize: collectionTake,
    };
};
