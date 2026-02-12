import {
    keepPreviousData,
    useQuery,
    UseQueryOptions,
} from '@tanstack/react-query';
import { isEmpty } from '@fxts/core';
import { HTTPError } from 'ky';

import { category } from '@/api/display';
import { categoryKeys } from '@/hooks/queryKeys';
import {
    GetCategoriesByManagementCodeData,
    GetCategoriesByManagementCodeResponse,
} from '@/models/display/category';

interface UseCategoriesByCodeParams<T = GetCategoriesByManagementCodeResponse> {
    data: GetCategoriesByManagementCodeData;
    options?: Omit<
        UseQueryOptions<
            GetCategoriesByManagementCodeResponse,
            HTTPError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof categoryKeys)['byCode']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useCategoriesByCode = <T = GetCategoriesByManagementCodeResponse>({
    data,
    options,
}: UseCategoriesByCodeParams<T>) => {
    return useQuery({
        queryKey: categoryKeys.byCode(data),
        queryFn: async () => {
            const response = await category
                .getCategoriesByManagementCode(data)
                .json();

            return response;
        },
        enabled: !isEmpty(data.codes),
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useCategoriesByCode;
