import { useMemo } from 'react';

import { useProfile } from '@/hooks/query/member/profile';
import { useProductDetail } from '@/hooks/query/product/product';
import { KRW } from '@/utils/currency';
import { checkSoldout } from '@/utils/product';

const useProduct = ({ productNo }: { productNo: number }) => {
    const { data: profileData } = useProfile();
    const memberNo = profileData?.memberNo || 0;

    const {
        data: productDetailData,
        isLoading: isProductDetailLoading,
        isFetched: isProductDetailFetched,
    } = useProductDetail({
        productNo,
        // memberNo,
    });

    return useMemo(() => {
        const brand = productDetailData?.brand || null;
        const productName = productDetailData?.baseInfo.productName || '';
        const promotionText = productDetailData?.baseInfo.promotionText || '';
        const likeCnt = productDetailData?.counter.likeCnt || 0;
        const reviewRate = productDetailData?.reviewRate || 0;
        const reviewCnt = productDetailData?.counter.reviewCnt || 0;

        const liked = !!productDetailData?.liked;
        const isRestockAvailable =
            !!productDetailData?.baseInfo?.usableRestockNoti;
        const isNaverPayAvailable =
            !!productDetailData?.limitations.naverPayHandling;
        const relatedProductNos = productDetailData?.relatedProductNos || [];

        const isSoldOut =
            productDetailData &&
            checkSoldout(
                productDetailData?.status?.soldout,
                productDetailData?.stock?.stockCnt,
                productDetailData?.reservationData?.reservationStockCnt,
            );

        /** 기본할인 여부 (즉시할인) */
        const isDefaultDiscount =
            (productDetailData?.price?.immediateDiscountAmt ?? 0) > 0;
        /** 최대할인 여부 (즉시할인 + 추가할인 + 쿠폰할인) */
        const isMaxDiscount =
            (productDetailData?.price?.immediateDiscountAmt ?? 0) +
                (productDetailData?.price?.additionDiscountAmt ?? 0) +
                (productDetailData?.price?.couponDiscountAmt ?? 0) >
            0;

        const maxBuyTimeCnt =
            productDetailData?.limitations?.maxBuyTimeCnt ?? 0;
        const minBuyCnt = productDetailData?.limitations?.minBuyCnt || 1;
        const maxBuyDays = productDetailData?.limitations?.maxBuyDays || 0;
        const maxBuyPeriodCnt =
            productDetailData?.limitations?.maxBuyPeriodCnt || 0;
        const maxBuyPersonCnt =
            productDetailData?.limitations?.maxBuyPersonCnt || 0;

        /** 상품 판매가 (정가) */
        const salePrice = productDetailData?.price?.salePrice ?? 0;
        /** 즉시할인 */
        const immediateDiscountAmt =
            productDetailData?.price?.immediateDiscountAmt ?? 0;
        /** 추가할인 */
        const additionDiscountAmt =
            productDetailData?.price?.additionDiscountAmt ?? 0;
        /** TO CHECK: 쿠폰할인가 (상품쿠폰 + 장바구니 쿠폰) */
        const couponDiscountAmt =
            productDetailData?.price?.couponDiscountAmt ?? 0;

        /** 판매가 = 정가 - 즉시할인 */
        const productSalePrice = KRW(salePrice).subtract(immediateDiscountAmt);

        /** 혜택가 = 판매가 - 추가할인 */
        const benefitPrice = productSalePrice.subtract(additionDiscountAmt);

        /** 쿠폰 혜택가 = 혜택가 - 쿠폰할인 */
        const couponBenefitPrice = benefitPrice.subtract(couponDiscountAmt);

        return {
            brand,
            productName,
            promotionText,
            likeCnt,
            reviewRate,
            reviewCnt,
            productDetailData,
            isProductDetailLoading,
            isProductDetailFetched,
            liked,
            isNaverPayAvailable,
            relatedProductNos,
            isRestockAvailable,
            isSoldOut,
            isDefaultDiscount,
            isMaxDiscount,
            maxBuyTimeCnt,
            minBuyCnt,
            maxBuyDays,
            maxBuyPeriodCnt,
            maxBuyPersonCnt,
            salePrice,
            immediateDiscountAmt,
            additionDiscountAmt,
            couponDiscountAmt,
            productSalePrice,
            benefitPrice,
            couponBenefitPrice,
        };
    }, [productDetailData]);
};

export default useProduct;
