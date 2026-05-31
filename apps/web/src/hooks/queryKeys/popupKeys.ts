import type { AxiosRequestConfig } from 'axios';

import type {
    DesignPopupData,
    GetAllPopupParams,
} from '@/models/display/popup';

const popupKeys = {
    all: ['popup'] as const,

    /** 디자인 팝업 조회하기 */
    design: (data: DesignPopupData, platform?: string) =>
        [...popupKeys.all, 'design', data, platform] as const,

    /** 전체 팝업 목록 조회하기 */
    lists: () => [...popupKeys.all, 'list'] as const,
    list: (
        params?: GetAllPopupParams,
        platform?: string,
        options?: AxiosRequestConfig,
    ) => [...popupKeys.lists(), params, platform, options] as const,

    details: () => [...popupKeys.all, 'detail'] as const,
    detailByPopupNos: (popupNos: number[]) =>
        [...popupKeys.details(), 'popupNos', popupNos] as const,
    detailByPopupIds: (popupIds: string[]) =>
        [...popupKeys.details(), 'popupIds', popupIds] as const,
};

export default popupKeys;
