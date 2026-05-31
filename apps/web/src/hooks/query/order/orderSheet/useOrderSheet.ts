import { useQuery } from '@tanstack/react-query';

import {
    orderSheetOptions,
    type UseOrderSheetParams,
} from '@/entities/order/queries';
import type { GetOrderSheetResponse } from '@/models/order/orderSheet';

const useOrderSheet = <T = GetOrderSheetResponse>(
    params: UseOrderSheetParams<T>,
) => useQuery(orderSheetOptions(params));

export default useOrderSheet;
