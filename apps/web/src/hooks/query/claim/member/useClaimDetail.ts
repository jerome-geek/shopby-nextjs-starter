import { useQuery } from '@tanstack/react-query';

import {
    claimDetailOptions,
    type UseClaimDetailParams,
} from '@/entities/claim/queries';
import type { GetClaimDetailByClaimNoResponse } from '@/models/claim/member';

const useClaimDetail = <T = GetClaimDetailByClaimNoResponse>(
    params: UseClaimDetailParams<T>,
) => useQuery(claimDetailOptions(params));

export default useClaimDetail;
