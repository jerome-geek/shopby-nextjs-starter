import { useSuspenseQuery } from '@tanstack/react-query';

import {
    previousOrderDetailSuspenseOptions,
    type UsePreviousOrderDetailSuspenseParams,
} from '@/entities/order/queries';
import type { GetPreviousOrderResponse } from '@/models/order/previousOrder';

const usePreviousOrderDetail = <T = GetPreviousOrderResponse>(
    params: UsePreviousOrderDetailSuspenseParams<T>,
) => useSuspenseQuery(previousOrderDetailSuspenseOptions(params));

export default usePreviousOrderDetail;
