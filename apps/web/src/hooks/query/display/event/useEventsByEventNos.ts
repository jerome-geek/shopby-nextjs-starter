import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { event } from '@/api/display';
import { eventKeys } from '@/hooks/queryKeys';
import type {
    SearchEventsByEventNosParams,
    SearchEventsByEventNosResponse,
} from '@/models/display/event';

interface UseEventsByEventNosParams<T = SearchEventsByEventNosResponse> {
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

const useEventsByEventNos = <T = SearchEventsByEventNosResponse>({
    searchParams,
    options,
}: UseEventsByEventNosParams<T>) => {
    return useQuery({
        queryKey: eventKeys.searchByEventNos(searchParams),
        queryFn: async () => {
            const { data } = await event.searchEventsByEventNos(searchParams);

            return data;
        },
        ...options,
    });
};

export default useEventsByEventNos;
