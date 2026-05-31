import { useQuery } from '@tanstack/react-query';

import {
    guestClaimDetailOptions,
    type UseGuestClaimDetailParams,
} from '@/entities/claim/queries';
import type { GetClaimDetailByClaimNoResponse } from '@/models/claim/member';

const useGuestClaimDetail = <T = GetClaimDetailByClaimNoResponse>(
    params: UseGuestClaimDetailParams<T>,
) => useQuery(guestClaimDetailOptions(params));

export default useGuestClaimDetail;
