import { useSuspenseQuery } from '@tanstack/react-query';

import {
    orderSheetSuspenseOptions,
    type UseOrderSheetSuspenseParams,
} from '@/entities/order/queries';
import type { GetOrderSheetResponse } from '@/entities/order/model/orderSheet';

const useOrderSheet = <T = GetOrderSheetResponse>(
    params: UseOrderSheetSuspenseParams<T>,
) => useSuspenseQuery(orderSheetSuspenseOptions(params));

export default useOrderSheet;
