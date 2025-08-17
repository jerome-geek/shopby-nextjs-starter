import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError, RawAxiosRequestHeaders } from 'axios';

import { profile } from '@/api/member';
import { GetProfileResponse } from '@/models/member/profile';
import { profileKeys } from '@/hooks/queryKeys';
import { shopbyTokenStorage } from '@/utils/storage';

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
    const accessToken = shopbyTokenStorage.getAccessToken();

    return useQuery({
        queryKey: profileKeys.getProfile(headers),
        queryFn: async () => {
            const { data } = await profile.getProfile({ headers });

            return data;
        },
        enabled: !!accessToken?.accessToken,
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
        ...options,
    });
};

export default useProfile;
