import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { HTTPError } from 'ky';

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
            HTTPError<ShopByErrorResponse>,
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
            const data = await banner.getBannerExtraInfos(params).json();

            return data;
        },
        ...options,
    });
};

export default useBannerExtraInfos;
