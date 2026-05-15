import { queryOptions, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { event } from '@/api/display';
import { eventKeys } from '@/hooks/queryKeys';
import type { GetEventParams, GetEventResponse } from '@/models/display/event';

export interface EventDetailParams<T = GetEventResponse> {
    eventKey: string | number;
    searchParams?: GetEventParams;
    options?: Omit<
        UseQueryOptions<
            GetEventResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof eventKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const eventDetailOptions = <T = GetEventResponse>({
    eventKey,
    searchParams,
    options,
}: EventDetailParams<T>) =>
    queryOptions({
        queryKey: eventKeys.detail(eventKey, searchParams),
        queryFn: async () => {
            const { data } = await event.getEvent(eventKey, searchParams);

            return data;
        },
        ...options,
    });
