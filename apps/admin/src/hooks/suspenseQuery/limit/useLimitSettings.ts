import {
    UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import limitKeys from '@/hooks/queryKeys/limitKeys';
import { limit } from '@/api/limit';
import { CreationLimitResponse } from '@/model/limit';

interface UseLimitSettingsParams<T = CreationLimitResponse> {
    options?: Omit<
        UseSuspenseQueryOptions<
            CreationLimitResponse,
            AxiosError,
            T,
            ReturnType<(typeof limitKeys)['settings']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useLimitSettings = <T = CreationLimitResponse>({
    options,
}: UseLimitSettingsParams<T> = {}) => {
    return useSuspenseQuery({
        queryKey: limitKeys.settings(),
        queryFn: async () => {
            const { data } = await limit.getCreationLimit();

            return data;
        },
        ...options,
    });
};

export default useLimitSettings;
