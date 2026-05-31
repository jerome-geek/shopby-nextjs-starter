import { useSuspenseQuery } from '@tanstack/react-query';

import {
    likeBrandListOptions,
    type LikeBrandListOptionsParams,
} from '@/entities/product/profile/queries';
import type { GetLikeBrandsResponse } from '@/entities/product/model/profile';

const useLikeBrandList = <T = GetLikeBrandsResponse>({
    memberNo,
    params,
    options,
}: LikeBrandListOptionsParams<T>) => {
    return useSuspenseQuery(likeBrandListOptions({ memberNo, params, options }));
};

export default useLikeBrandList;
