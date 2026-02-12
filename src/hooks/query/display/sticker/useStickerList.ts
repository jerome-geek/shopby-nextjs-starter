import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { sticker } from '@/api/display';
import { GetStickersResponse } from '@/models/display/sticker';

export interface UseStickerListParams<T = GetStickersResponse> {
    options?: Omit<
        UseQueryOptions<
            GetStickersResponse,
            HTTPError<ShopByErrorResponse>,
            T,
            ['sticker']
        >,
        'queryKey' | 'queryFn'
    >;
}

const useStickerList = <T = GetStickersResponse>({
    options,
}: UseStickerListParams<T> = {}) => {
    return useQuery({
        queryKey: ['sticker'],
        queryFn: async () => {
            const response = await sticker.getStickers().json();

            return response;
        },
        ...options,
    });
};

export default useStickerList;
