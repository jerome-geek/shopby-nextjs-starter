import {
    useQuery,
    type UseQueryOptions,
    keepPreviousData,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import coupon from '@/api/promotion/coupon';
import couponKeys from '@/hooks/queryKeys/couponKeys';
import type {
    GetUserCouponsParams,
    GetUserCouponsResponse,
} from '@/models/promotion/coupon';

interface UseUserCouponsParams<T = GetUserCouponsResponse> {
    params: GetUserCouponsParams;
    options?: Omit<
        UseQueryOptions<GetUserCouponsResponse, AxiosError, T>,
        'queryKey' | 'queryFn'
    >;
}

const useUserCoupons = <T = GetUserCouponsResponse>({
    params,
    options,
}: UseUserCouponsParams<T>) => {
    return useQuery({
        queryKey: couponKeys.list(params),
        queryFn: async () => {
            const { data } = await coupon.getUserCoupons(params);
            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useUserCoupons;
