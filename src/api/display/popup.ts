import type { AxiosRequestConfig } from 'axios';
import qs from 'qs';

import { shopbyRequest } from '@/api/core/request';
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
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetDesignPopupResponse>({
            method: 'POST',
            url: '/design-popups',
            data,
            headers: {
                platform,
                ...options?.headers,
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
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetAllPopupResponse>({
            method: 'GET',
            url: '/display/popups',
            params,
            headers: {
                platform,
                ...options?.headers,
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
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'GET',
            url: `/display/popups/${popupNos}`,
            params,
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
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'GET',
            url: `/display/popups/ids/${popupIds}`,
            params,
            ...options,
        });
    },
};

export default popup;
