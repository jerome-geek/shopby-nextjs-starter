import { useQuery } from '@tanstack/react-query';

import {
    memberClaimListOptions,
    type UseMemberClaimListParams,
} from '@/entities/claim/queries';
import type { GetClaimListResponse } from '@/entities/claim/model/member';

const useMemberClaimList = <T = GetClaimListResponse>(
    params: UseMemberClaimListParams<T>,
) => useQuery(memberClaimListOptions(params));

export default useMemberClaimList;
