import { cache } from 'react';

import product from '@/api/product/product';
import { GetProductDetailParams } from '@/models/product/product';

// React cache는 인자의 참조 동등성(Reference Equality)을 체크하므로,
// 객체(params)를 그대로 넘기면 매 요청마다 캐시가 미스됩니다.
// 따라서 문자열로 직렬화하여 '값' 기반으로 캐싱하기 위해 내부 함수를 분리합니다.
const _internalCachedProductDetail = cache(
    async (productNo: number, serializedParams: string) => {
        let params: GetProductDetailParams;

        try {
            params = JSON.parse(serializedParams);
        } catch (e) {
            console.error('Failed to parse serializedParams:', e);
            params = {};
        }

        const response = await product.getProductDetail(productNo, params);
        return await response.json();
    }
);

export const getCachedProductDetail = (
    productNo: number,
    params?: GetProductDetailParams
) => {
    let serializedParams = '{}';

    try {
        serializedParams = JSON.stringify(params ?? {});
    } catch (e) {
        console.error('Failed to stringify params:', e);
    }

    return _internalCachedProductDetail(productNo, serializedParams);
};
