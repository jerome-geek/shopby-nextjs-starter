import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { event } from '@/api/display';
import { GetEventsByProductNoResponse } from '@/models/display/event';

interface UseEventParams<T = GetEventsByProductNoResponse> {
    productNo: number;
    options?: Omit<
        UseQueryOptions<
            GetEventsByProductNoResponse,
            HTTPError<ShopByErrorResponse>,
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
            const data = await event.getEventsByProduct(productNo).json();

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useEventsByProduct;
