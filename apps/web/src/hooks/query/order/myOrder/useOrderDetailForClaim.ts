import { useQuery } from '@tanstack/react-query';

import {
    orderDetailForClaimOptions,
    type UseOrderDetailForClaimParams,
} from '@/entities/order/queries';
import type { OrderDetailResponse } from '@/entities/order/model';

const useOrderDetailForClaim = <T = OrderDetailResponse>(
    params: UseOrderDetailForClaimParams<T>,
) => useQuery(orderDetailForClaimOptions(params));

export default useOrderDetailForClaim;
