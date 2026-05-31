import { queryOptions, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { banner } from '@/api/display';
import { bannerKeys } from '@/hooks/queryKeys';
import type {
    GetBannerExtraInfosParams,
    GetBannerExtraInfosResponse,
    GetBannersResponse,
} from '@/models/display/banner';

export interface BannerListParams<T = GetBannersResponse> {
    type?: 'code' | 'id';
    banners: string[];
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

export const bannerListOptions = <T = GetBannersResponse>({
    type = 'id',
    banners,
    options,
}: BannerListParams<T>) =>
    queryOptions({
        queryKey: bannerKeys.list(banners),
        queryFn: createQueryFn(type, banners),
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
        ...options,
    });

export interface BannerExtraInfosParams<T = GetBannerExtraInfosResponse> {
    params: GetBannerExtraInfosParams;
    options?: Omit<
        UseQueryOptions<
            GetBannerExtraInfosResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof bannerKeys)['extraInfos']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const bannerExtraInfosOptions = <T = GetBannerExtraInfosResponse>({
    params,
    options,
}: BannerExtraInfosParams<T>) =>
    queryOptions({
        queryKey: bannerKeys.extraInfos(params),
        queryFn: async () => {
            const { data } = await banner.getBannerExtraInfos(params);

            return data;
        },
        ...options,
    });
