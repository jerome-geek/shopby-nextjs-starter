import { useQuery } from '@tanstack/react-query';

import {
    designPopupListOptions,
    type DesignPopupListOptionsParams,
} from '@/entities/display/popup/queries';
import type { GetDesignPopupResponse } from '@/models/display/popup';

const useDesignPopupList = <T = GetDesignPopupResponse>(
    params: DesignPopupListOptionsParams<T>,
) => {
    return useQuery(designPopupListOptions(params));
};

export default useDesignPopupList;
