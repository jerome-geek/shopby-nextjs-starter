import { useSuspenseQuery } from '@tanstack/react-query';

import {
    couponListByProductNoSuspenseOptions,
    type UseCouponListByProductNoSuspenseParams,
} from '@/entities/promotion/coupon/queries';
import type { GetIssuableCouponsByProductNoResponse } from '@/models/promotion/coupon';

const useCouponListByProductNo = <T = GetIssuableCouponsByProductNoResponse>(
    params: UseCouponListByProductNoSuspenseParams<T>,
) => useSuspenseQuery(couponListByProductNoSuspenseOptions(params));

export default useCouponListByProductNo;
