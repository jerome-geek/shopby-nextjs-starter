import { useQuery } from '@tanstack/react-query';

import {
    guestOrderOptionEstimateOptions,
    type GuestOrderOptionEstimateOptionsParams,
} from '@/entities/claim/queries';
import { useAuth } from '@/hooks/useAuth';
import type { ClaimPriceInfo } from '@/entities/claim/model';

const useGuestOrderOptionEstimate = <T = ClaimPriceInfo>({
    orderOptionNo,
    searchParams,
    options,
}: GuestOrderOptionEstimateOptionsParams<T>) => {
    const isLogin = useAuth();

    return useQuery({
        ...guestOrderOptionEstimateOptions({ orderOptionNo, searchParams, options }),
        enabled:
            (options?.enabled ?? true) &&
            !!orderOptionNo &&
            !isLogin &&
            !!searchParams?.claimReasonType,
    });
};

export default useGuestOrderOptionEstimate;
