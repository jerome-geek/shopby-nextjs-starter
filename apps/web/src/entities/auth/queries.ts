import { queryOptions, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { KCPCertification } from '@/api/auth';
import { kcpKeys } from '@/hooks/queryKeys';
import type { GetKCPCertificationResultResponse } from '@/models/auth/KCPCertification';

export interface UseKCPCertificationResultParams<
    T = GetKCPCertificationResultResponse,
> {
    key: string;
    options?: Omit<
        UseQueryOptions<
            GetKCPCertificationResultResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof kcpKeys)['certificationResult']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const kcpCertificationResultOptions = <
    T = GetKCPCertificationResultResponse,
>({
    key,
    options,
}: UseKCPCertificationResultParams<T>) =>
    queryOptions({
        queryKey: kcpKeys.certificationResult(key),
        queryFn: async () => {
            const { data } =
                await KCPCertification.getKCPCertificationResult({ key });

            return data;
        },
        ...options,
    });
