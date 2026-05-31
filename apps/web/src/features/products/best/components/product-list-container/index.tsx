import { flatMap, pipe, prop, toArray } from '@fxts/core';
import { ReactNode, useMemo } from 'react';

import { useProductsWithAdditionalDiscounts } from '@/entities/product/hooks/useProductsWithAdditionalDiscounts';
import { useBestProductParams } from '@/entities/products/best/hooks/useBestProductParams';
import {
    useBestSellerProductList,
    useInfiniteBestSellerProductList,
} from '@/hooks/query/product/product';
import { useResponsive } from '@/hooks/utils';
import type { AdditionalDiscountWithProductNo } from '@/entities/product/model/additionalDiscount';
import type { BestSellerProductItem } from '@/entities/product/model/product';

interface BestProductListContainerProps {
    selectedCategory: number;
    renderSkeleton: () => ReactNode;
    children: (data: {
        products: (BestSellerProductItem & {
            additionalDiscount: Nullable<AdditionalDiscountWithProductNo>;
        })[];
        totalCount: number;
        hasNextPage?: boolean;
        fetchNextPage?: () => void;
        pageNumber: number;
    }) => ReactNode;
}

export const BestProductListContainer = ({
    selectedCategory,
    renderSkeleton,
    children,
}: BestProductListContainerProps) => {
    const [queryParams] = useBestProductParams();
    const { isMobile } = useResponsive();

    const searchParams = useMemo(
        () => ({
            ...queryParams,
            categoryNos: selectedCategory ? [selectedCategory] : [],
            hasTotalCount: true,
        }),
        [queryParams, selectedCategory],
    );

    const listEnabled = selectedCategory > 0;

    const { data: bestSellerProductListData, isFetching: isDesktopFetching } =
        useBestSellerProductList({
            searchParams,
            options: {
                enabled: listEnabled && !isMobile,
            },
        });

    const {
        data: infiniteBestSellerProductListData,
        fetchNextPage,
        hasNextPage,
        isFetching: isMobileFetching,
    } = useInfiniteBestSellerProductList({
        searchParams,
        options: {
            enabled: listEnabled && isMobile,
        },
    });

    const totalCount = isMobile
        ? (infiniteBestSellerProductListData?.pages[0]?.data.totalCount ?? 0)
        : (bestSellerProductListData?.totalCount ?? 0);

    const isFetching = isMobile ? isMobileFetching : isDesktopFetching;

    const products = useMemo(() => {
        if (isMobile) {
            return pipe(
                infiniteBestSellerProductListData?.pages ?? [],
                flatMap((page) => page.data.items),
                toArray,
            );
        }

        return bestSellerProductListData?.items ?? [];
    }, [
        isMobile,
        bestSellerProductListData,
        infiniteBestSellerProductListData,
    ]);

    const { productsWithDiscounts } = useProductsWithAdditionalDiscounts(products);

    if (isFetching && products.length === 0) {
        return <>{renderSkeleton()}</>;
    }

    return (
        <>
            {children({
                products: productsWithDiscounts,
                totalCount,
                hasNextPage,
                fetchNextPage,
                pageNumber: queryParams.pageNumber,
            })}
        </>
    );
};
