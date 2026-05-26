import { useQuery } from '@tanstack/react-query';

import {
    calculateOrderSheetOptions,
    type UseCalculateOrderSheetParams,
} from '@/entities/order/queries';
import type { GetCalculatedOrderSheetResponse } from '@/models/order/orderSheet';

const useCalculateOrderSheet = <T = GetCalculatedOrderSheetResponse>(
    params: UseCalculateOrderSheetParams<T>,
) => useQuery(calculateOrderSheetOptions(params));

export default useCalculateOrderSheet;
