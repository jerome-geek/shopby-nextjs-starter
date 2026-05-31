import { useSuspenseQuery } from '@tanstack/react-query';

import {
    guestOrderDetailSuspenseOptions,
    type UseGuestOrderDetailSuspenseParams,
} from '@/entities/order/queries';
import type { OrderDetailResponse } from '@/models/order';

const useGuestOrderDetail = <T = OrderDetailResponse>(
    params: UseGuestOrderDetailSuspenseParams<T>,
) => useSuspenseQuery(guestOrderDetailSuspenseOptions(params));

export default useGuestOrderDetail;
