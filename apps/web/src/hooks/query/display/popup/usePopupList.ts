import { useQuery } from '@tanstack/react-query';

import {
    popupListOptions,
    type PopupListOptionsParams,
} from '@/entities/display/popup/queries';
import type { GetAllPopupResponse } from '@/models/display/popup';

const usePopupList = <T = GetAllPopupResponse>(
    params: PopupListOptionsParams<T>,
) => {
    return useQuery(popupListOptions(params));
};

export default usePopupList;
