import { useQuery } from '@tanstack/react-query';

import {
    memberLikeBrandListOptions,
    type MemberLikeBrandListOptionsParams,
} from '@/entities/product/profile/queries';
import type { GetMemberLikeBrandListResponse } from '@/models/product/profile';

const useMemberLikeBrandList = <T = GetMemberLikeBrandListResponse>({
    memberNo = 0,
    searchParams,
    options,
}: MemberLikeBrandListOptionsParams<T> = {}) => {
    return useQuery({
        ...memberLikeBrandListOptions({ memberNo, searchParams, options }),
        enabled: memberNo !== 0,
    });
};

export default useMemberLikeBrandList;
