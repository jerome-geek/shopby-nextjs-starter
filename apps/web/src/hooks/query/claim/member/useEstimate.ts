import { useQuery } from '@tanstack/react-query';

import {
    estimateOptions,
    type UseEstimateParams,
} from '@/entities/claim/queries';
import { useAuth } from '@/hooks/useAuth';
import type { ClaimPriceInfo } from '@/entities/claim/model';

const useOrderOptionEstimate = <T = ClaimPriceInfo>({
    data,
    options,
}: Omit<UseEstimateParams<T>, 'isLogin'>) => {
    const isLogin = useAuth();

    return useQuery(estimateOptions({ data, isLogin: !!isLogin, options }));
};

export default useOrderOptionEstimate;
