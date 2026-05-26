import { useSuspenseQuery } from '@tanstack/react-query';

import {
    userCouponsSuspenseOptions,
    type UseUserCouponsSuspenseParams,
} from '@/entities/promotion/coupon/queries';
import type { GetUserCouponsResponse } from '@/models/promotion/coupon';

const useUserCoupons = <T = GetUserCouponsResponse>(
    params: UseUserCouponsSuspenseParams<T>,
) => useSuspenseQuery(userCouponsSuspenseOptions(params));

export default useUserCoupons;
