import { useSuspenseQuery } from '@tanstack/react-query';

import {
    availableCouponListSuspenseOptions,
    type UseAvailableCouponListSuspenseParams,
} from '@/entities/order/queries';
import type { ApplyCouponResponse } from '@/entities/order/model';

const useAvailableCouponList = <T = ApplyCouponResponse>(
    params: UseAvailableCouponListSuspenseParams<T>,
) => useSuspenseQuery(availableCouponListSuspenseOptions(params));

export default useAvailableCouponList;
