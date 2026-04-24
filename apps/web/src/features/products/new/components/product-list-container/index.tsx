import { flatMap, pipe, prop, toArray } from '@fxts/core';
import { ReactNode, useMemo } from 'react';

import { useProductsWithAdditionalDiscounts } from '@/entities/product/hooks/useProductsWithAdditionalDiscounts';
import { useNewProductParams } from '@/entities/products/new/hooks/useNewProductParams';
import {
    useProductList,
} from '@/hooks/query/product/product';
import useInfiniteProductList from '@/hooks/infiniteQuery/product/product/useInfiniteProductList';
import { useResponsive } from '@/hooks/utils';
import type { AdditionalDiscountWithProductNo } from '@/models/product/additionalDiscount';
import type { ProductItem } from '@/models/product/product';
import type { OrderByType, OrderDirectionType } from '@/models';

interface NewProductListContainerProps {
    selectedCategory: number;
    renderSkeleton: () => ReactNode;
    children: (data: {
        products: (ProductItem & {
            additionalDiscount: Nullable<AdditionalDiscountWithProductNo>;
        })[];
        totalCount: number;
        hasNextPage?: boolean;
        fetchNextPage?: () => void;
        pageNumber: number;
    }) => ReactNode;
}

export const NewProductListContainer = ({
    selectedCategory,
    renderSkeleton,
    children,
}: NewProductListContainerProps) => {
    const [queryParams] = useNewProductParams();
    const { isMobile } = useResponsive();

    const searchParams = useMemo(
        () => ({
            ...queryParams,
            categoryNos: selectedCategory ? [selectedCategory] : [],
            hasTotalCount: true,
            order: {
                by: 'SALE_YMD' as OrderByType,
                direction: 'DESC' as OrderDirectionType,
            },
        }),
        [queryParams, selectedCategory],
    );

    const listEnabled = selectedCategory > 0;

    const { data: productListData, isFetching: isDesktopFetching } =
        useProductList({
            searchParams,
            options: {
                enabled: listEnabled && !isMobile,
            },
        });

    const {
        data: infiniteProductListData,
        fetchNextPage,
        hasNextPage,
        isFetching: isMobileFetching,
    } = useInfiniteProductList({
        searchParams,
        options: {
            enabled: listEnabled && isMobile,
        },
    });

    const totalCount = isMobile
        ? (infiniteProductListData?.pages[0]?.data.totalCount ?? 0)
        : (productListData?.totalCount ?? 0);

    const isFetching = isMobile ? isMobileFetching : isDesktopFetching;

    const products = useMemo(() => {
        if (isMobile) {
            return pipe(
                infiniteProductListData?.pages ?? [],
                flatMap((page) => page.data.items),
                toArray,
            );
        }

        return productListData?.items ?? [];
    }, [isMobile, productListData, infiniteProductListData]);

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
