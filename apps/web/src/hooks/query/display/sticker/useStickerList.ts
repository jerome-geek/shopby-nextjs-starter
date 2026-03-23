import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { sticker } from '@/api/display';
import { GetStickersResponse } from '@/models/display/sticker';

export interface UseStickerListParams<T = GetStickersResponse> {
    options?: Omit<
        UseQueryOptions<
            GetStickersResponse,
            AxiosError<ShopByErrorResponse>,
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
            const { data } = await sticker.getStickers();

            return data;
        },
        ...options,
    });
};

export default useStickerList;
