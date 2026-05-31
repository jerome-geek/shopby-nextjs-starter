import { queryOptions, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { sticker } from '@/api/display';
import { stickerKeys } from '@/hooks/queryKeys';
import type { GetStickersResponse } from '@/models/display/sticker';

export interface StickerListOptionsParams<T = GetStickersResponse> {
    options?: Omit<
        UseQueryOptions<
            GetStickersResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            typeof stickerKeys.all
        >,
        'queryKey' | 'queryFn'
    >;
}

export const stickerListOptions = <T = GetStickersResponse>({
    options,
}: StickerListOptionsParams<T> = {}) =>
    queryOptions({
        queryKey: stickerKeys.all,
        queryFn: async () => {
            const { data } = await sticker.getStickers();
            return data;
        },
        ...options,
    });
