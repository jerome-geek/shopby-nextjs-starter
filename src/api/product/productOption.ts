import qs from 'qs';
import type { Options } from 'ky';

import { request } from '@/api/core';
import {
    GetOptionImagesResponse,
    GetProductOptionImagesResponse,
    GetProductOptionParams,
    GetProductOptionsParams,
    GetProductOptionsResponse,
    ProductOptionResponse,
} from '@/models/product/productOption';

const productOption = {
    /**
     * 옵션 목록 조회하기
     *  - 옵션 목록을 조회하는 API입니다
     */
    getProductOptions: (params: GetProductOptionsParams, options?: Options) => {
        return request.get<GetProductOptionsResponse>('products/options', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 옵션 조회하기
     *  - 해당 상품 번호에 대한 옵션 정보를 조회하는 API입니다
     *  - 2가지 옵션 목록(계층, 원본)을 제공합니다
     *  - 필수/선택 옵션인 경우 multiLevelOptions(분리형 옵션)노출방식이 변경됩니다.
     *   - multiLevelOptions[].value(옵션값)는 빈값으로 노출됩니다.
     *   - 필수옵션 및 선택옵션의 옵션 값들은 multiLevelOptions.children[]의 1depth로만 노출됩니다.
     */
    getProductOption: (
        productNo: number,
        params?: GetProductOptionParams,
        options?: Options
    ) => {
        return request.get<ProductOptionResponse>(
            `products/${productNo}/options`,
            {
                searchParams: qs.stringify(params),
                ...options,
            }
        );
    },

    /**
     * 상품에 해당하는 옵션 이미지 목록 조회하기
     *  - 상품에 해당하는 옵션 이미지 목록 조회하는 API입니다
     *  - 옵션 상세 보기 시, 사용합니다
     */
    getProductOptionImages: (productNo: number, options?: Options) => {
        return request.get<GetProductOptionImagesResponse>(
            `products/${productNo}/options/images`,
            {
                ...options,
            }
        );
    },

    /**
     * 옵션의 이미지 정보 조회하기
     *  - 옵션의 이미지 목록을 조회하는 API입니다
     *  - 옵션 상세 보기 시, 사용합니다
     */
    getOptionImages: (
        productNo: number,
        optionNo: string,
        options?: Options
    ) => {
        return request.get<GetOptionImagesResponse>(
            `products/${productNo}/options/${optionNo}/images`,
            {
                ...options,
            }
        );
    },
};

export default productOption;
