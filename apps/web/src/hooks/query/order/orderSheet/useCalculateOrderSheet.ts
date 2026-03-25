import {
    keepPreviousData,
    useQuery,
    UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { orderSheet } from '@/api/order';
import { orderSheetKeys } from '@/hooks/queryKeys';
import {
    GetCalculatedOrderSheetData,
    GetCalculatedOrderSheetResponse,
} from '@/models/order/orderSheet';

interface UseCalculateOrderSheetParams<T = GetCalculatedOrderSheetResponse> {
    orderSheetNo: string;
    searchParams: GetCalculatedOrderSheetData;
    options?: Omit<
        UseQueryOptions<
            GetCalculatedOrderSheetResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof orderSheetKeys)['calculate']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useCalculateOrderSheet = <T = GetCalculatedOrderSheetResponse>({
    orderSheetNo,
    searchParams,
    options,
}: UseCalculateOrderSheetParams<T>) => {
    return useQuery({
        queryKey: orderSheetKeys.calculate(orderSheetNo, searchParams),
        queryFn: async () => {
            const { data } = await orderSheet.getCalculatedOrderSheet(
                orderSheetNo,
                searchParams,
            );

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
        enabled: (options?.enabled ?? true) && !!orderSheetNo,
    });
};

export default useCalculateOrderSheet;
