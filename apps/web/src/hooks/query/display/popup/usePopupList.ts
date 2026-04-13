import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { popup } from '@/api/display';
import type { GetAllPopupParams, GetAllPopupResponse } from '@/models/display/popup';
import popupKeys from '@/hooks/queryKeys/popupKeys';

interface UseAllPopupListParams<T = GetAllPopupResponse> {
    popupNos: number[];
    params?: GetAllPopupParams;
    options?: Omit<
        UseQueryOptions<
            GetAllPopupResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof popupKeys)['detailByPopupNos']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const usePopupList = <T = GetAllPopupResponse>({
    popupNos,
    params,
    options,
}: UseAllPopupListParams<T>) => {
    return useQuery({
        queryKey: popupKeys.detailByPopupNos(popupNos),
        queryFn: async () => {
            const response = await popup.getPopups(popupNos, params);

            return response.data;
        },
        ...options,
    });
};

export default usePopupList;
