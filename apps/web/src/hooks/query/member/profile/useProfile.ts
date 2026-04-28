import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { AxiosError, RawAxiosRequestHeaders } from 'axios';

import { profile } from '@/api/member';
import { profileKeys } from '@/hooks/queryKeys';
import type { GetProfileResponse } from '@/models/member/profile';

interface UseProfileParams<T = GetProfileResponse> {
    headers?: RawAxiosRequestHeaders;
    options?: Omit<
        UseQueryOptions<
            GetProfileResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof profileKeys)['getProfile']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useProfile = <T = GetProfileResponse>({
    headers,
    options,
}: UseProfileParams<T> = {}) => {
    return useQuery({
        queryKey: profileKeys.getProfile(headers),
        queryFn: async () => {
            const { data } = await profile.getProfile({ headers });

            return data;
        },
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
        ...options,
    });
};

export default useProfile;
