'use client';

import { ProductSearchParams } from '@/models/product/product';
import { useMemo } from 'react';
import { useQueryParams } from './useQueryParams';
import {
    PRODUCT_COLOR_CUSTOM_PROPERTY_NO,
    SORT_OPTIONS,
} from '@/const/product';
import { useParams } from 'next/navigation';
import { useProductSearchSummary } from '@/hooks/query/product/product';

export interface ProductListInitialValues extends ProductSearchParams {
    childCategoryNo: string;
    sizes: string[];
    colors: number[];
    brands: number[];
    [key: string]: unknown;
}

const useFilter = ({
    pageSize,
    categoryNo,
    mainCategoryNo,
    filterCategoryNo,
    itemInfoCategoryNo,
}: {
    pageSize: number;
    categoryNo?: number;
    mainCategoryNo: number;
    filterCategoryNo: number;
    itemInfoCategoryNo: number;
}) => {
    const parsedCategoryNo = categoryNo || mainCategoryNo;

    const params = useParams();

    const brandNo = params.brandNo;

    const { updateQueryParams, queryParams } =
        useQueryParams<ProductListInitialValues>();

    // 초기값 설정
    const initialValues: ProductListInitialValues = useMemo(
        () => ({
            childCategoryNo: queryParams.childCategoryNo || '',
            sizes: queryParams.sizes || [],
            colors: queryParams.colors || [],
            pageNumber: queryParams.pageNumber || 1,
            pageSize,
            order: {
                by: SORT_OPTIONS[0].by,
                direction: SORT_OPTIONS[0].direction,
                soldoutPlaceEnd: true,
                ...queryParams.order,
            },
            filter: {
                saleStatus: 'RESERVATION_AND_ONSALE',
                discountedComparison: 'BETWEEN',
                discountedPrices: undefined,
                stickerNos: [],
                ...queryParams.filter,
                soldout: queryParams.filter?.soldout ?? true,
                keywords: queryParams.keyword as string | undefined,
            },
            brands: brandNo ? [Number(brandNo)] : queryParams.brands || [],
            onlySaleProduct: !!queryParams.onlySaleProduct,
            categoryNos: queryParams.categoryNos || [],
            hasMaxCouponAmt: !!queryParams.hasMaxCouponAmt,
        }),
        [queryParams, pageSize, brandNo],
    );

    const customProperties =
        initialValues.colors.length > 0
            ? {
                  propNos: PRODUCT_COLOR_CUSTOM_PROPERTY_NO.toString(),
                  propValueNos: initialValues.colors.join(' '),
                  propOperator: 'OR' as const,
              }
            : undefined;

    const { data: parentProductSummaryData } = useProductSearchSummary({
        searchParams: {
            categoryNos: [
                Number(initialValues.childCategoryNo) || parsedCategoryNo,
            ],
            categoryOperator: 'AND',
            filter: {
                customProperties,
                ...initialValues.filter,
            },
        },
    });

    const filterCategoryList =
        parentProductSummaryData?.multiLevelCategories.find(
            (category) => category.categoryNo === filterCategoryNo,
        );

    const itemInfoCategoryList =
        parentProductSummaryData?.multiLevelCategories.find(
            (category) => category.categoryNo === itemInfoCategoryNo,
        );

    const toggleFilterProduct = (filterCategoryNo: number) => {
        const currentCategoryNos = initialValues.categoryNos || [];
        const newCategoryNos = currentCategoryNos.includes(filterCategoryNo)
            ? currentCategoryNos.filter((no) => no !== filterCategoryNo)
            : [...currentCategoryNos, filterCategoryNo];

        updateQueryParams({
            categoryNos: newCategoryNos,
            pageNumber: 1,
        });
    };

    return {
        initialValues,
        filterCategoryList,
        itemInfoCategoryList,
        toggleFilterProduct,
    };
};

export default useFilter;
