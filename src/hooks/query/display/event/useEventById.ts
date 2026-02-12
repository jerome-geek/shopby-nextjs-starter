import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { event } from '@/api/display';
import eventKeys from '@/hooks/queryKeys/eventKeys';
import { GetEventByIdParams, GetEventResponse } from '@/models/display/event';

interface UseEventParams<T = GetEventResponse> {
    eventId: string;
    params?: GetEventByIdParams;
    options?: Omit<
        UseQueryOptions<
            GetEventResponse,
            HTTPError<ShopByErrorResponse>,
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
            const data = await event.getEventById(eventId, params).json();

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useEventById;
