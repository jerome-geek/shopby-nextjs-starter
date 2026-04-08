import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { event } from '@/api/display';
import type { GetEventsByProductNoResponse } from '@/models/display/event';

interface UseEventParams<T = GetEventsByProductNoResponse> {
    productNo: number;
    options?: Omit<
        UseQueryOptions<
            GetEventsByProductNoResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            [string, { productNo: number }]
        >,
        'queryKey' | 'queryFn'
    >;
}

const useEventsByProduct = <T = GetEventsByProductNoResponse>({
    productNo,
    options,
}: UseEventParams<T>) => {
    return useQuery({
        queryKey: ['eventsByProduct', { productNo }],
        queryFn: async () => {
            const { data } = await event.getEventsByProduct(productNo);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useEventsByProduct;
