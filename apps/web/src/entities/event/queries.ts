import { queryOptions, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { event } from '@/entities/display/api';
import { eventKeys } from '@/hooks/queryKeys';
import type {
    GetEventByIdParams,
    GetEventParams,
    GetEventProductDisplaySectionParams,
    GetEventProductDisplaySectionResponse,
    GetEventResponse,
    GetEventsByProductNoResponse,
    GetEventsResponse,
    GetEventsV2Params,
    SearchEventsByEventNosParams,
    SearchEventsByEventNosResponse,
} from '@/entities/display/model/event';

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

export interface EventProductSectionParams<
    T = GetEventProductDisplaySectionResponse,
> {
    eventNo: number;
    sectionNo: number;
    searchParams: GetEventProductDisplaySectionParams;
    options?: Omit<
        UseQueryOptions<
            GetEventProductDisplaySectionResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof eventKeys)['productSection']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const eventProductSectionOptions = <
    T = GetEventProductDisplaySectionResponse,
>({
    eventNo,
    sectionNo,
    searchParams,
    options,
}: EventProductSectionParams<T>) =>
    queryOptions({
        queryKey: eventKeys.productSection(eventNo, sectionNo, searchParams),
        queryFn: async () => {
            const { data } = await event.getEventProductDisplaySection(
                eventNo,
                sectionNo,
                searchParams,
            );

            return data;
        },
        ...options,
    });

export interface EventsByEventNosParams<T = SearchEventsByEventNosResponse> {
    searchParams: SearchEventsByEventNosParams;
    options?: Omit<
        UseQueryOptions<
            SearchEventsByEventNosResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof eventKeys)['searchByEventNos']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const eventsByEventNosOptions = <T = SearchEventsByEventNosResponse>({
    searchParams,
    options,
}: EventsByEventNosParams<T>) =>
    queryOptions({
        queryKey: eventKeys.searchByEventNos(searchParams),
        queryFn: async () => {
            const { data } = await event.searchEventsByEventNos(searchParams);

            return data;
        },
        ...options,
    });

export interface EventsByProductParams<T = GetEventsByProductNoResponse> {
    productNo: number;
    options?: Omit<
        UseQueryOptions<
            GetEventsByProductNoResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof eventKeys)['detailByProduct']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const eventsByProductOptions = <T = GetEventsByProductNoResponse>({
    productNo,
    options,
}: EventsByProductParams<T>) =>
    queryOptions({
        queryKey: eventKeys.detailByProduct(productNo),
        queryFn: async () => {
            const { data } = await event.getEventsByProduct(productNo);

            return data;
        },
        ...options,
    });

export interface EventByIdParams<T = GetEventResponse> {
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

export const eventByIdOptions = <T = GetEventResponse>({
    eventId,
    params,
    options,
}: EventByIdParams<T>) =>
    queryOptions({
        queryKey: eventKeys.detailById(eventId, params),
        queryFn: async () => {
            const { data } = await event.getEventById(eventId, params);

            return data;
        },
        ...options,
    });
