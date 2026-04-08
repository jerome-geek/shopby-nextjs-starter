import {
    type UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useSearchParams } from 'next/navigation';

import { event } from '@/api/display';
import { eventKeys } from '@/hooks/queryKeys';
import type { GetEventParams } from '@/models/display';
import type { GetEventResponse } from '@/models/display/event';

interface UseEventParams<T = GetEventResponse> {
    eventKey: string | number;
    searchParams?: GetEventParams;
    options?: Omit<
        UseSuspenseQueryOptions<
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
    const searchParamsFromURL = useSearchParams();
    const preview = searchParamsFromURL.get('preview') === 'true';
    const defaultSearchParams = { ...searchParams, preview };

    return useSuspenseQuery({
        queryKey: eventKeys.detail(eventKey, defaultSearchParams),
        queryFn: async () => {
            const { data } = await event.getEvent(
                eventKey,
                defaultSearchParams,
            );

            return data;
        },
        ...options,
    });
};

export default useEvent;
