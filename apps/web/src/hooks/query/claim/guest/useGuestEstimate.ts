import { useQuery } from '@tanstack/react-query';

import {
    guestEstimateOptions,
    type UseGuestEstimateParams,
} from '@/entities/claim/queries';
import { useAuth } from '@/hooks/useAuth';
import type { ClaimPriceInfo } from '@/entities/claim/model';

const useGuestOrderOptionEstimate = <T = ClaimPriceInfo>({
    data,
    options,
}: Omit<UseGuestEstimateParams<T>, 'isLogin'>) => {
    const isLogin = useAuth();

    return useQuery(guestEstimateOptions({ data, isLogin: !!isLogin, options }));
};

export default useGuestOrderOptionEstimate;
