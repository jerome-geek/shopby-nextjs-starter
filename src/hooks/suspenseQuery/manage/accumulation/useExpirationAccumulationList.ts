import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { accumulation } from '@/api/manage';
import accumulationKeys from '@/hooks/queryKeys/accumulationKeys';
import {
    GetExpirationAccumulationListParams,
    GetExpirationAccumulationListResponse,
} from '@/models/manage/accumulation';

interface UseExpirationAccumulationListParams<
    T = GetExpirationAccumulationListResponse,
> {
    memberNo?: number;
    searchParams?: GetExpirationAccumulationListParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetExpirationAccumulationListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof accumulationKeys)['expirationList']>
        >,
        'queryKey' | 'queryFn'
    >;
}
const useExpirationAccumulationList = <
    T = GetExpirationAccumulationListResponse,
>({
    memberNo = 0,
    searchParams,
    options,
}: UseExpirationAccumulationListParams<T>) => {
    return useSuspenseQuery({
        queryKey: accumulationKeys.expirationList(memberNo, searchParams),
        queryFn: async () => {
            const { data } = await accumulation.getExpirationAccumulations(
                searchParams,
            );

            return data;
        },
        ...options,
    });
};

export default useExpirationAccumulationList;
