import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import type { Options } from 'ky';

import { popup } from '@/api/display';
import popupKeys from '@/hooks/queryKeys/popupKeys';
import { GetAllPopupParams, GetAllPopupResponse } from '@/models/display/popup';

interface UseAllPopupListParams<T = GetAllPopupResponse> {
    params?: GetAllPopupParams;
    platform?: string;
    kyOptions?: Options;
    options?: Omit<
        UseQueryOptions<
            GetAllPopupResponse,
            HTTPError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof popupKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useAllPopupList = <T = GetAllPopupResponse>({
    params,
    platform,
    kyOptions,
    options,
}: UseAllPopupListParams<T>) => {
    return useQuery({
        queryKey: popupKeys.list(params, platform, kyOptions),
        queryFn: async () => {
            const response = await popup
                .getAllPopups(params, platform, kyOptions)
                .json();

            return response;
        },
        ...options,
    });
};

export default useAllPopupList;
