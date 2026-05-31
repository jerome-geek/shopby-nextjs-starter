import { useSuspenseQuery } from '@tanstack/react-query';

import {
    availableCouponListSuspenseOptions,
    type UseAvailableCouponListSuspenseParams,
} from '@/entities/order/queries';
import type { ApplyCouponResponse } from '@/models/order';

const useAvailableCouponList = <T = ApplyCouponResponse>(
    params: UseAvailableCouponListSuspenseParams<T>,
) => useSuspenseQuery(availableCouponListSuspenseOptions(params));

export default useAvailableCouponList;
