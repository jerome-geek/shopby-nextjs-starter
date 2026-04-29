import {
    useSuspenseQuery,
    type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { orderSheet } from '@/api/order';
import { orderSheetKeys } from '@/hooks/queryKeys';
import type {
    GetOrderSheetParams,
    GetOrderSheetResponse,
} from '@/models/order/orderSheet';

interface UseOrderSheetParams<T = GetOrderSheetResponse> {
    orderSheetNo: string;
    searchParams: GetOrderSheetParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetOrderSheetResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof orderSheetKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useOrderSheet = <T = GetOrderSheetResponse>({
    orderSheetNo,
    searchParams,
    options,
}: UseOrderSheetParams<T>) => {
    return useSuspenseQuery({
        queryKey: orderSheetKeys.detail(orderSheetNo, searchParams),
        queryFn: async () => {
            const { data } = await orderSheet.getOrderSheet(
                orderSheetNo,
                searchParams,
            );

            return data;
        },
        ...options,
    });
};

export default useOrderSheet;
