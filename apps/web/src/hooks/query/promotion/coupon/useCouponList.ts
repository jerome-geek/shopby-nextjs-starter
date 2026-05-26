import { useQuery } from '@tanstack/react-query';

import {
    couponListOptions,
    type UseCouponListParams,
} from '@/entities/promotion/coupon/queries';
import type { GetUserCouponsResponse } from '@/models/promotion/coupon';

const useCouponList = <T = GetUserCouponsResponse>(
    params: UseCouponListParams<T>,
) => useQuery(couponListOptions(params));

export default useCouponList;
