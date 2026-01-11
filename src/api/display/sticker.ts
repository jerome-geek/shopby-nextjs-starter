import { Options } from 'ky';

import { publicRequest } from '@/api/core/request';
import { GetStickersResponse } from '@/models/display/sticker';

const sticker = {
    /**
     * 스티커 목록 조회
     */
    getStickers: (options?: Options) => {
        return publicRequest.get<GetStickersResponse>('stickers', {
            ...options,
        });
    },
};

export default sticker;
