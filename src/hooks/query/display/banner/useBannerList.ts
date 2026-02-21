import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { banner } from '@/api/display';
import { bannerKeys } from '@/hooks/queryKeys';
import { GetBannersResponse } from '@/models/display/banner';

interface UseBannerListParams<T = GetBannersResponse> {
    type: 'code' | 'id';
    banners: string[];
    memberNo?: number;
    options?: Omit<
        UseQueryOptions<
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
    type = 'code',
    banners,
    memberNo = 0,
    options,
}: UseBannerListParams<T>) => {
    return useQuery({
        queryKey: bannerKeys.list(banners, memberNo),
        queryFn: createQueryFn(type, banners),
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
        ...options,
    });
};

export default useBannerList;
