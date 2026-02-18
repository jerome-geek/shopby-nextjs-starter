import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { product } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import {
    GetGroupManagementCodesData,
    GroupManagementCodeResponse,
} from '@/models/product/product';

interface UseGroupManagementCodeParams<T = GroupManagementCodeResponse> {
    /** NOTE: POST 요청이지만 다른 hooks와 컨벤션을 맞추기 위해 data -> searchParams */
    searchParams: GetGroupManagementCodesData;
    options?: Omit<
        UseQueryOptions<
            GroupManagementCodeResponse,
            HTTPError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['groupManagementCode']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useGroupManagementCode = <T = GroupManagementCodeResponse>({
    searchParams,
    options,
}: UseGroupManagementCodeParams<T>) => {
    return useQuery({
        queryKey: productKeys.groupManagementCode(searchParams),
        queryFn: async () => {
            const data = await product
                .getGroupManagementCodes(searchParams)
                .json();

            return data;
        },
        ...options,
    });
};

export default useGroupManagementCode;
