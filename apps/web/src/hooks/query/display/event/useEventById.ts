import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { event } from '@/api/display';
import { eventKeys } from '@/hooks/queryKeys';
import type { GetEventByIdParams, GetEventResponse } from '@/models/display/event';

interface UseEventParams<T = GetEventResponse> {
    eventId: string;
    params?: GetEventByIdParams;
    options?: Omit<
        UseQueryOptions<
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
    return useQuery({
        queryKey: eventKeys.detailById(eventId, params),
        queryFn: async () => {
            const { data } = await event.getEventById(eventId, params);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useEventById;
