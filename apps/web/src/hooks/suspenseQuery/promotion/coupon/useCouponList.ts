import { useSuspenseQuery } from '@tanstack/react-query';

import {
    couponListSuspenseOptions,
    type UseCouponListSuspenseParams,
} from '@/entities/promotion/coupon/queries';
import type { GetUserCouponsResponse } from '@/models/promotion/coupon';

const useCouponList = <T = GetUserCouponsResponse>(
    params: UseCouponListSuspenseParams<T>,
) => useSuspenseQuery(couponListSuspenseOptions(params));

export default useCouponList;
