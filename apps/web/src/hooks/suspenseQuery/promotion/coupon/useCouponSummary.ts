import { useSuspenseQuery } from '@tanstack/react-query';

import {
    couponSummarySuspenseOptions,
    type UseCouponSummarySuspenseParams,
} from '@/entities/promotion/coupon/queries';
import type { GetCouponSummaryResponse } from '@/models/promotion/coupon';

const useCouponSummary = <T = GetCouponSummaryResponse>(
    params: UseCouponSummarySuspenseParams<T>,
) => {
    return useSuspenseQuery(couponSummarySuspenseOptions(params));
};

export default useCouponSummary;
