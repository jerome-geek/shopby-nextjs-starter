import { indexBy, map, pipe, prop, toArray } from '@fxts/core';
import { useMemo } from 'react';

import { useAdditionalDiscountByProductNos } from '@/hooks/query/product/additionalDiscount';

/**
 * 상품 리스트를 받아 각 상품에 해당하는 추가 할인 정보를 병합해주는 훅
 * @param products productNo를 가진 상품 객체 배열
 */
export const useProductsWithAdditionalDiscounts = <
    T extends { productNo: number },
>(
    products: T[],
) => {
    // 1. 상품 번호 추출
    const productNos = useMemo(
        () =>
            pipe(
                products,
                map((p) => p.productNo),
                toArray,
            ),
        [products],
    );

    // 2. 추가 할인 정보 조회
    const { data: additionalDiscountsData, isLoading } =
        useAdditionalDiscountByProductNos({
            searchParams: { productNos },
            options: { enabled: productNos.length > 0 },
        });

    // 3. 상품 데이터에 할인 정보 병합 (O(N) 효율)
    const productsWithDiscounts = useMemo(() => {
        const discountMap = pipe(
            additionalDiscountsData?.data ?? [],
            indexBy(prop('productNo')),
        );

        return pipe(
            products,
            map((product) => ({
                ...product,
                additionalDiscount: discountMap[product.productNo] ?? null,
            })),
            toArray,
        );
    }, [products, additionalDiscountsData]);

    return {
        productsWithDiscounts,
        isLoadingAdditionalDiscounts: isLoading,
    };
};
