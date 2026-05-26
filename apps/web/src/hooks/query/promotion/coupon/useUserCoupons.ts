import { useQuery } from '@tanstack/react-query';

import {
    userCouponsOptions,
    type UseUserCouponsParams,
} from '@/entities/promotion/coupon/queries';
import type { GetUserCouponsResponse } from '@/models/promotion/coupon';

const useUserCoupons = <T = GetUserCouponsResponse>(
    params: UseUserCouponsParams<T>,
) => useQuery(userCouponsOptions(params));

export default useUserCoupons;
