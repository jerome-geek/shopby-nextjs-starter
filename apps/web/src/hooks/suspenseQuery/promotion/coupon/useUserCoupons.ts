import {
    useSuspenseQuery,
    type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { coupon } from '@/api/promotion';
import { couponKeys } from '@/hooks/queryKeys';
import type {
    GetUserCouponsParams,
    GetUserCouponsResponse,
} from '@/models/promotion/coupon';

interface UseUserCouponsParams<T = GetUserCouponsResponse> {
    params: GetUserCouponsParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetUserCouponsResponse,
            AxiosError,
            T,
            ReturnType<(typeof couponKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useUserCoupons = <T = GetUserCouponsResponse>({
    params,
    options,
}: UseUserCouponsParams<T>) => {
    return useSuspenseQuery({
        queryKey: couponKeys.list(params),
        queryFn: async () => {
            const { data } = await coupon.getUserCoupons(params);

            return data;
        },
        ...options,
    });
};

export default useUserCoupons;
