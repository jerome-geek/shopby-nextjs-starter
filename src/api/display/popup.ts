import type { Options } from 'ky';
import qs from 'qs';

import { request } from '@/api/core/request';
import {
    DesignPopupData,
    GetAllPopupParams,
    GetAllPopupResponse,
    GetDesignPopupResponse,
    GetPopupsByIdParams,
} from '@/models/display/popup';

const popup = {
    /**
     * 디자인 팝업 조회하기
     *  - 노출페이지 설정에서 개별설정으로 선택한 경우만 해당됩니다
     *  - 노출 URL 및 파라미터 조건이 있는 경우에만 필터링 후 가져옵니다
     */
    getDesignPopups: (
        data: DesignPopupData,
        platform: string,
        options?: Options,
    ) => {
        return request.post<GetDesignPopupResponse>('/design-popups', {
            json: data,
            headers: {
                platform,
            },
            ...options,
        });
    },

    /**
     * 전체 팝업 목록 조회하기
     *  - 전체 팝업 목록 조회하는 API입니다
     *  - 1일 캐시하여 사용하고 있습니다. (cached)
     */
    getAllPopups: (
        params?: GetAllPopupParams,
        platform?: string,
        options?: Options,
    ) => {
        return request.get<GetAllPopupResponse>('/display/popups', {
            searchParams: qs.stringify(params),
            headers: {
                platform,
            },
            ...options,
        });
    },

    /**
     * 팝업 목록 조회하기
     *  - 팝업 번호로 전체 팝업 목록 조회하는 API입니다
     */
    getPopups: (
        popupNos: number[],
        params?: GetAllPopupParams,
        options?: Options,
    ) => {
        return request.get<GetAllPopupResponse>(`/display/popups/${popupNos}`, {
            searchParams: qs.stringify(params),
            ...options,
        });
    },

    /**
     * 팝업 목록 ID로 조회하기
     *  - 팝업 ID로 전체 팝업 목록 조회하는 API입니다
     */
    getPopupsById: (
        popupIds: string[],
        params?: GetPopupsByIdParams,
        options?: Options,
    ) => {
        return request.get<GetAllPopupResponse>(
            `/display/popups/ids/${popupIds}`,
            {
                searchParams: qs.stringify(params),
                ...options,
            },
        );
    },
};

export default popup;
