import { flatMap, last, pipe, prop, toArray } from '@fxts/core';
import { useMemo } from 'react';

import { useProductsWithAdditionalDiscounts } from '@/entities/product/hooks/useProductsWithAdditionalDiscounts';
import { useProductSearchParams } from '@/entities/search/hooks/useProductSearchParams';
import { useInfiniteProductList } from '@/hooks/infiniteQuery/product/product';
import { useSb } from '@/hooks/libs/shopby';
import { useProfile } from '@/hooks/query/member/profile';
import { useProductList } from '@/hooks/query/product/product';
import { useAuth } from '@/hooks/useAuth';
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

    const isLogin = useAuth();

    const { data: profileData } = useProfile({
        options: {
            enabled: !!isLogin,
        },
    });
    const memberNo = profileData?.memberNo || 0;

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
                    searchParams.direction ??
                    appliedSearchParams.order?.direction,
            },
        }),
        [appliedSearchParams, isIntegrated, searchParams],
    );

    const isInfinite = isIntegrated || isTablet;
    const isQuery = !isIntegrated && !isTablet;

    const {
        data: infiniteProductListData,
        fetchNextPage,
        hasNextPage,
        isFetching: isInfiniteFetching,
    } = useInfiniteProductList({
        searchParams: shoppingSearchParams,
        memberNo,
        options: {
            enabled: mainCategoryNo !== 0 && isInfinite,
        },
    });

    const { data: productListData, isFetching: isQueryFetching } =
        useProductList({
            searchParams: shoppingSearchParams,
            memberNo,
            options: {
                enabled: mainCategoryNo !== 0 && isQuery,
            },
        });

    const products = useMemo(() => {
        if (isInfinite) {
            return pipe(
                infiniteProductListData?.pages ?? [],
                flatMap((page) => page.data.items),
                toArray,
            );
        }
        return productListData?.items ?? [];
    }, [isInfinite, infiniteProductListData, productListData]);

    const { productsWithDiscounts } =
        useProductsWithAdditionalDiscounts(products);

    const totalCount = isInfinite
        ? (infiniteProductListData?.pages[0]?.data.totalCount ?? 0)
        : (productListData?.totalCount ?? 0);

    const isFetching = isInfinite ? isInfiniteFetching : isQueryFetching;

    const searchedProduct = useMemo(() => {
        if (isInfinite) {
            if (!infiniteProductListData) {
                return undefined;
            }

            return pipe(
                infiniteProductListData,
                prop('pages'),
                last,
                (a) => a?.data,
            );
        } else {
            if (!productListData) {
                return undefined;
            }

            return productListData;
        }
    }, [isInfinite, infiniteProductListData, productListData]);

    useSb({
        searchedProduct,
    });

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
