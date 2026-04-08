import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { popup } from '@/api/display';
import popupKeys from '@/hooks/queryKeys/popupKeys';
import {
    DesignPopupData,
    GetDesignPopupResponse,
} from '@/models/display/popup';

interface UseDesignPopupListParams<T = GetDesignPopupResponse> {
    data: DesignPopupData;
    platform: string;
    options?: Omit<
        UseQueryOptions<
            GetDesignPopupResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof popupKeys)['design']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useDesignPopupList = <T = GetDesignPopupResponse>({
    data,
    platform,
    options,
}: UseDesignPopupListParams<T>) => {
    return useQuery({
        queryKey: popupKeys.design(data, platform),
        queryFn: async () => {
            const response = await popup.getDesignPopups(data, platform);

            return response.data;
        },
        ...options,
    });
};

export default useDesignPopupList;
