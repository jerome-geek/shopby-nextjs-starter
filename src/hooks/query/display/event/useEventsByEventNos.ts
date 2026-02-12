import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { event } from '@/api/display';
import { eventKeys } from '@/hooks/queryKeys';
import {
    SearchEventsByEventNosParams,
    SearchEventsByEventNosResponse,
} from '@/models/display/event';

interface UseEventsByEventNosParams<T = SearchEventsByEventNosResponse> {
    searchParams: SearchEventsByEventNosParams;
    options?: Omit<
        UseQueryOptions<
            SearchEventsByEventNosResponse,
            HTTPError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof eventKeys)['searchByEventNos']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useEventsByEventNos = <T = SearchEventsByEventNosResponse>({
    searchParams,
    options,
}: UseEventsByEventNosParams<T>) => {
    return useQuery({
        queryKey: eventKeys.searchByEventNos(searchParams),
        queryFn: async () => {
            const data = await event
                .searchEventsByEventNos(searchParams)
                .json();

            return data;
        },
        ...options,
    });
};

export default useEventsByEventNos;
