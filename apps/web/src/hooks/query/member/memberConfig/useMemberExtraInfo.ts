import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { memberConfig } from '@/api/member';
import type { GetMemberExtraInfoResponse } from '@/models/member/memberConfig';

interface UseMemberExtraInfoParams<T = GetMemberExtraInfoResponse> {
    options?: Omit<
        UseQueryOptions<
            GetMemberExtraInfoResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            [string]
        >,
        'queryKey' | 'queryFn'
    >;
}

const useMemberExtraInfo = <T = GetMemberExtraInfoResponse>({
    options,
}: UseMemberExtraInfoParams<T> = {}) => {
    return useQuery({
        queryKey: ['memberExtraInfo'],
        queryFn: async () => {
            const { data } = await memberConfig.getMemberExtraInfo();

            return data;
        },
        ...options,
    });
};

export default useMemberExtraInfo;
