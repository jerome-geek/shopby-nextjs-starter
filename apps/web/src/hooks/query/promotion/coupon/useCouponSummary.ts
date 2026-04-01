import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import coupon from '@/api/promotion/coupon';
import couponKeys from '@/hooks/queryKeys/couponKeys';
import type {
    GetCouponSummaryParams,
    GetCouponSummaryResponse,
} from '@/models/promotion/coupon';

interface UseCouponSummaryParams<T = GetCouponSummaryResponse> {
    memberNo: number;
    params: GetCouponSummaryParams;
    options?: Omit<
        UseQueryOptions<
            GetCouponSummaryResponse,
            AxiosError<ShopByErrorResponse>,
            T
        >,
        'queryKey' | 'queryFn'
    >;
}

const useCouponSummary = <T = GetCouponSummaryResponse>({
    memberNo,
    params,
    options,
}: UseCouponSummaryParams<T>) => {
    return useQuery({
        queryKey: couponKeys.summary(memberNo, params),
        queryFn: async () => {
            const { data } = await coupon.getCouponSummary(params);
            return data;
        },
        ...options,
    });
};

export default useCouponSummary;

