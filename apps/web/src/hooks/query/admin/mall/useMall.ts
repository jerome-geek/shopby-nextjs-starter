import { useQuery } from '@tanstack/react-query';

import {
    mallOptions,
    type MallOptionsParams,
} from '@/entities/admin/mall/queries';
import type { GetMallResponse } from '@/models/admin/mall';

const useMall = <T = GetMallResponse>({ options }: MallOptionsParams<T> = {}) => {
    return useQuery(mallOptions({ options }));
};

export default useMall;
