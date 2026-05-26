import { useQuery } from '@tanstack/react-query';

import {
    kcpCertificationResultOptions,
    type UseKCPCertificationResultParams,
} from '@/entities/auth/queries';
import type { GetKCPCertificationResultResponse } from '@/models/auth/KCPCertification';

const useKCPCertificationResult = <T = GetKCPCertificationResultResponse>(
    params: UseKCPCertificationResultParams<T>,
) => useQuery(kcpCertificationResultOptions(params));

export default useKCPCertificationResult;
