import { flatMap, pipe, toArray } from '@fxts/core';
import { useMemo } from 'react';

import { useProductSearchParams } from '@/entities/search/hooks/useProductSearchParams';
import { useProductsWithAdditionalDiscounts } from '@/entities/product/hooks/useProductsWithAdditionalDiscounts';
import { useInfiniteProductList } from '@/hooks/infiniteQuery/product/product';
import { useProductList } from '@/hooks/query/product/product';
import { useMainCategory } from '@/hooks/useMainCategory';
import { useProductFilter } from '@/hooks/useProductFilter';
import { useResponsive } from '@/hooks/utils';

interface UseShoppingSearchProps {
    isIntegrated?: boolean;
}

export const useShoppingSearch = ({
    isIntegrated = false,
}: UseShoppingSearchProps = {}) => {
    const { isTablet } = useResponsive();
    const { mainCategoryNo } = useMainCategory();
    const [searchParams] = useProductSearchParams();

    const { appliedSearchParams } = useProductFilter({
        categoryNo: mainCategoryNo,
    });

    const shoppingSearchParams = useMemo(
        () => ({
            ...appliedSearchParams,
            pageSize: isIntegrated ? 4 : appliedSearchParams.pageSize,
            filter: {
                ...appliedSearchParams.filter,
                includeLikeSearch: true,
                keywords: searchParams.keyword || undefined,
            },
            pageNumber: searchParams.pageNumber,
            order: {
                by: searchParams.by ?? appliedSearchParams.order?.by,
                direction:
                    searchParams.direction ?? appliedSearchParams.order?.direction,
            },
        }),
        [appliedSearchParams, isIntegrated, searchParams],
    );

    const isInfinite = isIntegrated || isTablet;
    const isQuery = !isIntegrated && !isTablet;

    const {
        data: infiniteData,
        fetchNextPage,
        hasNextPage,
        isFetching: isInfiniteFetching,
    } = useInfiniteProductList({
        searchParams: shoppingSearchParams,
        options: {
            enabled: mainCategoryNo !== 0 && isInfinite,
        },
    });

    const { data: queryData, isFetching: isQueryFetching } = useProductList({
        searchParams: shoppingSearchParams,
        options: {
            enabled: mainCategoryNo !== 0 && isQuery,
        },
    });

    const products = useMemo(() => {
        if (isInfinite) {
            return pipe(
                infiniteData?.pages ?? [],
                flatMap((page) => page.data.items),
                toArray,
            );
        }
        return queryData?.items ?? [];
    }, [isInfinite, infiniteData, queryData]);

    const { productsWithDiscounts } = useProductsWithAdditionalDiscounts(products);

    const totalCount = isInfinite
        ? (infiniteData?.pages[0]?.data.totalCount ?? 0)
        : (queryData?.totalCount ?? 0);

    const isFetching = isInfinite ? isInfiniteFetching : isQueryFetching;

    return {
        products: productsWithDiscounts,
        totalCount,
        hasNextPage: hasNextPage ?? false,
        fetchNextPage,
        pageNumber: shoppingSearchParams.pageNumber ?? 1,
        pageSize: shoppingSearchParams.pageSize ?? 20,
        isFetching,
    };
};
