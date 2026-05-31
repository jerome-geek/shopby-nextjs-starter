import { useQuery } from '@tanstack/react-query';

import {
    bannerListOptions,
    type BannerListParams,
} from '@/entities/banner/queries';
import type { GetBannersResponse } from '@/entities/display/model/banner';

const useBannerList = <T = GetBannersResponse>(params: BannerListParams<T>) => {
    return useQuery(bannerListOptions(params));
};

export default useBannerList;
