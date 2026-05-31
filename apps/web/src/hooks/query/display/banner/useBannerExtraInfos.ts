import { useQuery } from '@tanstack/react-query';

import {
    bannerExtraInfosOptions,
    type BannerExtraInfosParams,
} from '@/entities/banner/queries';
import type { GetBannerExtraInfosResponse } from '@/models/display/banner';

const useBannerExtraInfos = <T = GetBannerExtraInfosResponse>(
    params: BannerExtraInfosParams<T>,
) => {
    return useQuery(bannerExtraInfosOptions(params));
};

export default useBannerExtraInfos;
