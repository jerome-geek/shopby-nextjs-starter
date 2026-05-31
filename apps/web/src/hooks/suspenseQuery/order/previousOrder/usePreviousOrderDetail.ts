import { useSuspenseQuery } from '@tanstack/react-query';

import {
    previousOrderDetailSuspenseOptions,
    type UsePreviousOrderDetailSuspenseParams,
} from '@/entities/order/queries';
import type { GetPreviousOrderResponse } from '@/entities/order/model/previousOrder';

const usePreviousOrderDetail = <T = GetPreviousOrderResponse>(
    params: UsePreviousOrderDetailSuspenseParams<T>,
) => useSuspenseQuery(previousOrderDetailSuspenseOptions(params));

export default usePreviousOrderDetail;
