import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { coupon } from '@/api/promotion';
import { couponKeys } from '@/hooks/queryKeys';
import type {
    GetUserCouponsParams,
    GetUserCouponsResponse,
} from '@/models/promotion/coupon';

interface UseCouponListParams<T = GetUserCouponsResponse> {
    searchParams: GetUserCouponsParams;
    memberNo?: number;
    options?: Omit<
        UseQueryOptions<
            GetUserCouponsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof couponKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useCouponList = <T = GetUserCouponsResponse>({
    searchParams,
    memberNo = 0,
    options,
}: UseCouponListParams<T>) => {
    return useQuery({
        queryKey: couponKeys.list(searchParams, memberNo),
        queryFn: async () => {
            const { data } = await coupon.getUserCoupons(searchParams);

            return data;
        },
        enabled: memberNo !== 0,
        ...options,
    });
};

export default useCouponList;
