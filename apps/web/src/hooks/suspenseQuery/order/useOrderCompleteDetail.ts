import { useSuspenseQuery } from '@tanstack/react-query';

import {
    orderCompleteDetailOptions,
    type UseOrderCompleteDetailParams,
} from '@/entities/order/queries';

export const useOrderCompleteDetail = (
    params: UseOrderCompleteDetailParams,
) => useSuspenseQuery(orderCompleteDetailOptions(params));
