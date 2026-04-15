import {
    type UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { event } from '@/api/display';
import { eventKeys } from '@/hooks/queryKeys';
import type {
    GetEventByIdParams,
    GetEventResponse,
} from '@/models/display/event';

interface UseEventParams<T = GetEventResponse> {
    eventId: string;
    params?: GetEventByIdParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetEventResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof eventKeys)['detailById']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useEventById = <T = GetEventResponse>({
    eventId,
    params,
    options,
}: UseEventParams<T>) => {
    return useSuspenseQuery({
        queryKey: eventKeys.detailById(eventId, params),
        queryFn: async () => {
            const { data } = await event.getEventById(eventId, params);

            return data;
        },
        ...options,
    });
};

export default useEventById;
