import type { AxiosRequestConfig } from 'axios';

import { geekRequest } from '@/api/core/geekRequest';
import {
    GetTimeSaleSectionProductsParams,
    TimeSaleSectionProductsResponse,
} from '@/models/shop/timeSale';

const timeSale = {
    /**
     * 타임세일 섹션 상품 전체 조회
     */
    getTimeSaleSectionProducts: (
        sectionNo: number,
        params?: GetTimeSaleSectionProductsParams,
        options?: AxiosRequestConfig,
    ) => {
        return geekRequest<TimeSaleSectionProductsResponse>({
            method: 'GET',
            url: `/shop/time-sale/sections/${sectionNo}/products`,
            params,
            ...options,
        });
    },
};

export default timeSale;
