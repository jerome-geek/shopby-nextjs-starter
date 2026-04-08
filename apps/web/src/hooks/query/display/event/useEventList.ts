import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { event } from '@/api/display';
import eventKeys from '@/hooks/queryKeys/eventKeys';
import type { GetEventsV2Params, GetEventsResponse } from '@/models/display/event';

interface UseEventListParams<T = GetEventsResponse> {
    searchParams: GetEventsV2Params;
    options?: Omit<
        UseQueryOptions<
            GetEventsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof eventKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useEventList = <T = GetEventsResponse>({
    searchParams,
    options,
}: UseEventListParams<T>) => {
    return useQuery({
        queryKey: eventKeys.list(searchParams),
        queryFn: async () => {
            const { data } = await event.getEventsV2(searchParams);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useEventList;
