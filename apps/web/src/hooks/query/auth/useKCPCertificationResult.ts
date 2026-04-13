import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { KCPCertification } from '@/api/auth';
import type { GetKCPCertificationResultResponse } from '@/models/auth/KCPCertification';

interface UseKCPCertificationResultParams<
    T = GetKCPCertificationResultResponse,
> {
    key: string;
    options?: Omit<
        UseQueryOptions<
            GetKCPCertificationResultResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ['kcp', 'certification', 'result', string]
        >,
        'queryKey' | 'queryFn'
    >;
}

const useKCPCertificationResult = <T = GetKCPCertificationResultResponse>({
    key,
    options,
}: UseKCPCertificationResultParams<T>) => {
    return useQuery({
        queryKey: ['kcp', 'certification', 'result', key],
        queryFn: async () => {
            const { data } = await KCPCertification.getKCPCertificationResult({
                key,
            });

            return data;
        },
        ...options,
    });
};

export default useKCPCertificationResult;
