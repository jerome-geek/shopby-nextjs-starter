import { queryOptions, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { memberConfig } from '@/api/member';
import { memberConfigKeys } from '@/hooks/queryKeys';
import type { GetMemberExtraInfoResponse } from '@/models/member/memberConfig';

export interface UseMemberExtraInfoParams<T = GetMemberExtraInfoResponse> {
    options?: Omit<
        UseQueryOptions<
            GetMemberExtraInfoResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof memberConfigKeys)['extraInfo']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const memberExtraInfoOptions = <T = GetMemberExtraInfoResponse>({
    options,
}: UseMemberExtraInfoParams<T> = {}) =>
    queryOptions({
        queryKey: memberConfigKeys.extraInfo(),
        queryFn: async () => {
            const { data } = await memberConfig.getMemberExtraInfo();

            return data;
        },
        ...options,
    });
