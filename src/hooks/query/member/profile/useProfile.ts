import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { HTTPError, Options } from 'ky';

import { profile } from '@/api/member';
import { profileKeys } from '@/hooks/queryKeys';
import { GetProfileResponse } from '@/models/member/profile';
// import { checkLogin } from '@/utils/users';

interface UseProfileParams<T = GetProfileResponse> {
    // TODO: headers에서 accessToken을 꼭 받도록
    headers?: Options['headers'];
    options?: Omit<
        UseQueryOptions<
            GetProfileResponse,
            HTTPError<ShopByErrorResponse>,
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
            const data = await profile.getProfile({ headers }).json();

            return data;
        },
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
        //NOTE: enabled 조건은 외부에서 주입하는 props에 따라 변경되어야 하는 경우가 있으므로 현재 상태에서 수정하지 않도록 합니다
        // enabled: checkLogin(),
        ...options,
    });
};

export default useProfile;
