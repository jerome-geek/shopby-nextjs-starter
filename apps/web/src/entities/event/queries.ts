import { queryOptions, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { event } from '@/api/display';
import { eventKeys } from '@/hooks/queryKeys';
import type {
    GetEventParams,
    GetEventResponse,
    GetEventsResponse,
    GetEventsV2Params,
} from '@/models/display/event';

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

export interface EventListParams<T = GetEventsResponse> {
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

export const eventListOptions = <T = GetEventsResponse>({
    searchParams,
    options,
}: EventListParams<T>) =>
    queryOptions({
        queryKey: eventKeys.list(searchParams),
        queryFn: async () => {
            const { data } = await event.getEventsV2(searchParams);

            return data;
        },
        ...options,
    });
