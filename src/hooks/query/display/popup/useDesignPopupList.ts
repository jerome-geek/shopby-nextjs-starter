import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { HTTPError } from 'ky';

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
            HTTPError<ShopByErrorResponse>,
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
            const response = await popup.getDesignPopups(data, platform).json();

            return response;
        },
        ...options,
    });
};

export default useDesignPopupList;
