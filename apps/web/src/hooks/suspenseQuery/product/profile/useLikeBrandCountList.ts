import { useSuspenseQuery } from '@tanstack/react-query';

import {
    likeBrandCountListOptions,
    type LikeBrandCountListOptionsParams,
} from '@/entities/product/profile/queries';
import type { GetLikeBrandsCountResponse } from '@/models/product/profile';

const useLikeBrandCountList = <T = GetLikeBrandsCountResponse>({
    searchParams,
    options,
}: LikeBrandCountListOptionsParams<T>) => {
    return useSuspenseQuery(likeBrandCountListOptions({ searchParams, options }));
};

export default useLikeBrandCountList;
