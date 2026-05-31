import { useQuery } from '@tanstack/react-query';

import {
    availableCouponListOptions,
    type UseAvailableCouponListParams,
} from '@/entities/order/queries';
import type { ApplyCouponResponse } from '@/entities/order/model';

const useAvailableCouponList = <T = ApplyCouponResponse>(
    params: UseAvailableCouponListParams<T>,
) => useQuery(availableCouponListOptions(params));

export default useAvailableCouponList;
