import { request } from '@/api/core';
import { GetStickersResponse } from '@/models/display/sticker';
import { Options } from 'ky';

const sticker = {
    /**
     * 스티커 목록 조회
     */
    getStickers: (options?: Options) => {
        return request.get<GetStickersResponse>('stickers', {
            ...options,
        });
    },
};

export default sticker;
