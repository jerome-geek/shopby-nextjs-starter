import { useQuery } from '@tanstack/react-query';

import {
    profileQueryOptions,
    type UseProfileParams,
} from '@/entities/member/profile/queries';
import type { GetProfileResponse } from '@/models/member/profile';

const useProfile = <T = GetProfileResponse>(
    params: UseProfileParams<T> = {},
) => {
    return useQuery(profileQueryOptions(params));
};

export default useProfile;
