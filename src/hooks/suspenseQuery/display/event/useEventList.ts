import {
    UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { event } from '@/api/display';
import { eventKeys } from '@/hooks/queryKeys';
import { GetEventsV2Params, GetEventsResponse } from '@/models/display/event';

interface UseEventListParams<T = GetEventsResponse> {
    params: GetEventsV2Params;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetEventsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof eventKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useEventList = <T = GetEventsResponse>({
    params,
    options,
}: UseEventListParams<T>) => {
    return useSuspenseQuery({
        queryKey: eventKeys.list(params),
        queryFn: async () => {
            const { data } = await event.getEventsV2(params);

            return data;
        },
        ...options,
    });
};

export default useEventList;
