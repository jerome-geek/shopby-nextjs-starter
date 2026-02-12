import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { popup } from '@/api/display';
import { GetAllPopupParams, GetAllPopupResponse } from '@/models/display/popup';
import popupKeys from '@/hooks/queryKeys/popupKeys';

interface UseAllPopupListParams<T = GetAllPopupResponse> {
    popupNos: number[];
    params?: GetAllPopupParams;
    options?: Omit<
        UseQueryOptions<
            GetAllPopupResponse,
            HTTPError<ShopByErrorResponse>,
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
            const response = await popup.getPopups(popupNos, params).json();

            return response;
        },
        ...options,
    });
};

export default usePopupList;
