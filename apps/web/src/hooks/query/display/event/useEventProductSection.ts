import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { event } from '@/api/display';
import { eventKeys } from '@/hooks/queryKeys';
import type {
    GetEventProductDisplaySectionParams,
    GetEventProductDisplaySectionResponse,
} from '@/models/display/event';

interface UseEventProductSectionParams<
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

const useEventProductSection = <T = GetEventProductDisplaySectionResponse>({
    eventNo,
    sectionNo,
    searchParams,
    options,
}: UseEventProductSectionParams<T>) => {
    return useQuery({
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
};

export default useEventProductSection;
