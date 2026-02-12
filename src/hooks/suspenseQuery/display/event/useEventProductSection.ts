import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { event } from '@/api/display';
import { eventKeys } from '@/hooks/queryKeys';
import {
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
        UseSuspenseQueryOptions<
            GetEventProductDisplaySectionResponse,
            HTTPError<ShopByErrorResponse>,
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
    return useSuspenseQuery({
        queryKey: eventKeys.productSection(eventNo, sectionNo, searchParams),
        queryFn: async () => {
            const data = await event
                .getEventProductDisplaySection(eventNo, sectionNo, searchParams)
                .json();

            return data;
        },
        ...options,
    });
};

export default useEventProductSection;
