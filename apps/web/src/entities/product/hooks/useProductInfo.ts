import { filter, join, pipe } from '@fxts/core';
import { useMemo } from 'react';

import { useProductDetail } from '@/hooks/suspenseQuery/product/product';
import { checkSoldout } from '@/utils/product';

export const useProductInfo = (productNo: number) => {
    const { data: productDetailData } = useProductDetail({ productNo });

    return useMemo(() => {
        const {
            status,
            baseInfo,
            stock,
            reservationData,
            brand,
            price,
            counter,
            liked,
            deliveryFee,
        } = productDetailData;

        // 1. 상태 관련 (Status)
        const isSoldOut = checkSoldout(
            status.soldout,
            stock.stockCnt,
            reservationData?.reservationStockCnt,
        );

        const isSaleEnd = status.saleStatusType === 'FINISHED';
        const isStopSale = status.saleStatusType === 'STOP';
        const isReady = status.saleStatusType === 'READY';

        // 2. 콘텐츠 관련 (Content)
        const productContent = pipe(
            [baseInfo.contentHeader, baseInfo.content, baseInfo.contentFooter],
            filter((a) => !!a),
            join(''),
        );

        return {
            // Status
            isSoldOut,
            isSaleEnd,
            isStopSale,
            isReady,
            saleStatusType: status.saleStatusType,
            // BaseInfo
            productDetailData,
            // Info
            brand,
            price,
            counter,
            liked,
            deliveryFee,
            productContent,
            productName: baseInfo.productName,
            promotionText: baseInfo.promotionText,
        };
    }, [productDetailData]);
};
