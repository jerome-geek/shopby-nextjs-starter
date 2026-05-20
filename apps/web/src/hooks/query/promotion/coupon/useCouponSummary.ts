import { useQuery } from '@tanstack/react-query';

import {
    couponSummaryOptions,
    type UseCouponSummaryParams,
} from '@/entities/promotion/coupon/queries';
import type { GetCouponSummaryResponse } from '@/models/promotion/coupon';

const useCouponSummary = <T = GetCouponSummaryResponse>(
    params: UseCouponSummaryParams<T>,
) => {
    return useQuery(couponSummaryOptions(params));
};

export default useCouponSummary;
