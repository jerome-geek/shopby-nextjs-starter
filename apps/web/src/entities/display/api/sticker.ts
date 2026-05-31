import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import type { GetStickersResponse } from '@/entities/display/model/sticker';

const sticker = {
    /**
     * 스티커 목록 조회
     */
    getStickers: (options?: AxiosRequestConfig) => {
        return shopbyRequest<GetStickersResponse>({
            method: 'GET',
            url: 'stickers',
            ...options,
        });
    },
};

export default sticker;
