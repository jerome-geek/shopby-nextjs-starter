import { terms } from '@/api/manage';
import { termsKeys } from '@/hooks/queryKeys';
import {
    GetTermListByPostData,
    GetTermListResponse,
} from '@/models/manage/terms';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError, AxiosRequestConfig } from 'axios';

interface UseTermListV2Options<T = GetTermListResponse> {
    data: GetTermListByPostData;
    axiosOptions?: AxiosRequestConfig;
    options?: Omit<
        UseQueryOptions<
            GetTermListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof termsKeys)['listV2']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useTermListV2 = <T = GetTermListResponse>({
    data,
    axiosOptions,
    options,
}: UseTermListV2Options<T>) => {
    return useQuery({
        queryKey: termsKeys.listV2(data),
        queryFn: async () => {
            const response = await terms.getTermListByPost(data, axiosOptions);

            return response.data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
};

export default useTermListV2;
