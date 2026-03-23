import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { banner } from '@/api/display';
import { bannerKeys } from '@/hooks/queryKeys';
import {
    GetBannerExtraInfosParams,
    GetBannerExtraInfosResponse,
} from '@/models/display/banner';

interface UseBannerExtraInfosParams<T = GetBannerExtraInfosResponse> {
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

const useBannerExtraInfos = <T = GetBannerExtraInfosResponse>({
    params,
    options,
}: UseBannerExtraInfosParams<T>) => {
    return useQuery({
        queryKey: bannerKeys.extraInfos(params),
        queryFn: async () => {
            const { data } = await banner.getBannerExtraInfos(params);

            return data;
        },
        ...options,
    });
};

export default useBannerExtraInfos;
