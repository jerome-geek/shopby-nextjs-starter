import { useMemo } from 'react';

import { useProductDetail } from '@/hooks/suspenseQuery/product/product';
import { discountRate as getDiscountRate } from '@/utils/currency';

interface UseProductPriceParams {
    productNo: number;
}

export const useProductPrice = ({ productNo }: UseProductPriceParams) => {
    const { data: productDetailData } = useProductDetail({ productNo });

    const { price } = productDetailData;

    return useMemo(() => {
        if (!price) {
            return {
                salePrice: 0,
                immediateDiscountAmt: 0,
                additionDiscountAmt: 0,
                couponDiscountAmt: 0,
                finalPrice: 0,
                discountRate: 0,
                buyPrice: 0,
            };
        }

        const {
            salePrice = 0,
            immediateDiscountAmt = 0,
            additionDiscountAmt = 0,
            couponDiscountAmt = 0,
        } = price;

        // 총할인금액 (즉시할인 + 쿠폰할인 + 추가할인)
        const totalDiscountPrice =
            immediateDiscountAmt + couponDiscountAmt + additionDiscountAmt;

        // 최종 구매가 (정상가 - 총할인금액)
        const buyPrice = salePrice - totalDiscountPrice;

        // 할인율 계산
        const calculatedDiscountRate = getDiscountRate(
            salePrice,
            immediateDiscountAmt,
            additionDiscountAmt,
        );

        return {
            salePrice,
            immediateDiscountAmt,
            additionDiscountAmt,
            couponDiscountAmt,
            totalDiscountPrice,
            buyPrice,
            discountRate: calculatedDiscountRate.intValue,
        };
    }, [price]);
};
