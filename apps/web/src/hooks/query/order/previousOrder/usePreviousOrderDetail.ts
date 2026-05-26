import { useQuery } from '@tanstack/react-query';

import {
    previousOrderDetailOptions,
    type UsePreviousOrderDetailParams,
} from '@/entities/order/queries';
import type { GetPreviousOrderResponse } from '@/models/order/previousOrder';

const usePreviousOrderDetail = <T = GetPreviousOrderResponse>(
    params: UsePreviousOrderDetailParams<T>,
) => useQuery(previousOrderDetailOptions(params));

export default usePreviousOrderDetail;
