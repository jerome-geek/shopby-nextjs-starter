import { useQuery } from '@tanstack/react-query';

import {
    couponListByProductNoOptions,
    type UseCouponListByProductNoParams,
} from '@/entities/promotion/coupon/queries';
import type { GetIssuableCouponsByProductNoResponse } from '@/models/promotion/coupon';

const useCouponListByProductNo = <T = GetIssuableCouponsByProductNoResponse>(
    params: UseCouponListByProductNoParams<T>,
) => useQuery(couponListByProductNoOptions(params));

export default useCouponListByProductNo;
