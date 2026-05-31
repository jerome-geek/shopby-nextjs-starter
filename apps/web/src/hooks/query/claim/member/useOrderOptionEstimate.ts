import { useQuery } from '@tanstack/react-query';

import {
    memberOrderOptionEstimateOptions,
    type MemberOrderOptionEstimateOptionsParams,
} from '@/entities/claim/queries';
import { useAuth } from '@/hooks/useAuth';
import type { ClaimPriceInfo } from '@/models/claim';

const useOrderOptionEstimate = <T = ClaimPriceInfo>({
    orderOptionNo,
    searchParams,
    options,
}: MemberOrderOptionEstimateOptionsParams<T>) => {
    const isLogin = useAuth();

    return useQuery({
        ...memberOrderOptionEstimateOptions({ orderOptionNo, searchParams, options }),
        enabled:
            (options?.enabled ?? true) &&
            !!orderOptionNo &&
            !!isLogin &&
            !!searchParams?.claimReasonType,
    });
};

export default useOrderOptionEstimate;
