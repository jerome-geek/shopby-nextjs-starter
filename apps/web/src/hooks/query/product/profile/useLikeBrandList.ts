import { isEmpty } from '@fxts/core';
import { useQuery } from '@tanstack/react-query';

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
    return useQuery({
        ...likeBrandListOptions({ memberNo, params, options }),
        enabled: !isEmpty(memberNo),
    });
};

export default useLikeBrandList;
