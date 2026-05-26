import { useInfiniteQuery } from '@tanstack/react-query';

import {
    infiniteMemberClaimListOptions,
    type UseInfiniteMemberClaimListParams,
} from '@/entities/claim/queries';

const useInfiniteMemberClaimList = (
    params: UseInfiniteMemberClaimListParams,
) => useInfiniteQuery(infiniteMemberClaimListOptions(params));

export default useInfiniteMemberClaimList;
