import {
    UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { event } from '@/api/display';
import { eventKeys } from '@/hooks/queryKeys';
import { GetEventsV2Params, GetEventsResponse } from '@/models/display/event';

interface UseEventListParams<T = GetEventsResponse> {
    params: GetEventsV2Params;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetEventsResponse,
            HTTPError<ShopByErrorResponse>,
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
            const data = await event.getEventsV2(params).json();

            return data;
        },
        ...options,
    });
};

export default useEventList;
