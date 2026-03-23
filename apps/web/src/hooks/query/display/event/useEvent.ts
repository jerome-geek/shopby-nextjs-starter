import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSearchParams } from 'next/navigation';

import { event } from '@/api/display';
import { eventKeys } from '@/hooks/queryKeys';
import { GetEventParams, GetEventResponse } from '@/models/display/event';

interface UseEventParams<T = GetEventResponse> {
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

const useEvent = <T = GetEventResponse>({
    eventKey,
    searchParams,
    options,
}: UseEventParams<T>) => {
    const query = useSearchParams();
    const preview = query.get('preview') === 'true';
    const defaultSearchParams = { ...searchParams, preview };

    return useQuery({
        queryKey: eventKeys.detail(eventKey, defaultSearchParams),
        queryFn: async () => {
            const { data } = await event.getEvent(
                eventKey,
                defaultSearchParams,
            );

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useEvent;
