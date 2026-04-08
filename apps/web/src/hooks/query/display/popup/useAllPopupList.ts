import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { AxiosRequestConfig } from 'axios';

import { popup } from '@/api/display';
import popupKeys from '@/hooks/queryKeys/popupKeys';
import type { GetAllPopupParams, GetAllPopupResponse } from '@/models/display/popup';

interface UseAllPopupListParams<T = GetAllPopupResponse> {
    params?: GetAllPopupParams;
    platform?: string;
    axiosRequestConfig?: AxiosRequestConfig;
    options?: Omit<
        UseQueryOptions<
            GetAllPopupResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof popupKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useAllPopupList = <T = GetAllPopupResponse>({
    params,
    platform,
    axiosRequestConfig,
    options,
}: UseAllPopupListParams<T>) => {
    return useQuery({
        queryKey: popupKeys.list(params, platform, axiosRequestConfig),
        queryFn: async () => {
            const { data } = await popup.getAllPopups(
                params,
                platform,
                axiosRequestConfig,
            );

            return data;
        },
        ...options,
    });
};

export default useAllPopupList;
