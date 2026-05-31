import { useQuery } from '@tanstack/react-query';

import {
    allPopupListOptions,
    type AllPopupListOptionsParams,
} from '@/entities/display/popup/queries';
import type { GetAllPopupResponse } from '@/entities/display/model/popup';

const useAllPopupList = <T = GetAllPopupResponse>(
    params: AllPopupListOptionsParams<T>,
) => {
    return useQuery(allPopupListOptions(params));
};

export default useAllPopupList;
