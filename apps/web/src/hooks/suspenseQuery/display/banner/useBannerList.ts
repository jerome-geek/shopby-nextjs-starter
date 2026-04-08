import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { banner } from '@/api/display';
import { bannerKeys } from '@/hooks/queryKeys';
import type { GetBannersResponse } from '@/models/display/banner';

interface UseBannerListParams<T = GetBannersResponse> {
    type?: 'code' | 'id';
    banners: string[];
    options?: Omit<
        UseSuspenseQueryOptions<
            GetBannersResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof bannerKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const createQueryFn = (type: 'code' | 'id', banners: string[]) => {
    return async () => {
        if (type === 'code') {
            const { data } = await banner.getBanners(banners);

            return data;
        } else {
            const { data } = await banner.getBannersByIds(banners);

            return data;
        }
    };
};

const useBannerList = <T = GetBannersResponse>({
    type = 'id',
    banners,
    options,
}: UseBannerListParams<T>) => {
    return useSuspenseQuery({
        queryKey: bannerKeys.list(banners),
        queryFn: createQueryFn(type, banners),
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
        ...options,
    });
};

export default useBannerList;
