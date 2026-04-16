import { join } from '@fxts/core';
import type { AxiosRequestConfig } from 'axios';
import qs from 'qs';

import { shopbyRequest } from '@/api/core/request';
import type {
    GetBannerExtraInfosParams,
    GetBannerExtraInfosResponse,
    GetBannersByIdsResponse,
    GetBannersResponse,
} from '@/models/display/banner';

const banner = {
    /**
     * 배너 추가 정보 조회하기
     *  - 배너의 추가 정보를 조회하는 API 입니다.
     *   - 배너 섹션 번호 또는 배너 번호 리스트로 조회 가능합니다.
     *   - 두 값을 모두 입력하는 경우, 배너 섹션 번호를 조회됩니다.
     */
    getBannerExtraInfos: (
        params: GetBannerExtraInfosParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetBannerExtraInfosResponse>({
            method: 'GET',
            url: 'display/banners/extraInfos',
            params,
            ...options,
        });
    },

    /**
     * 배너목록 조회하기(Code)
     *  - 코드 정보들로 배너들을 조회하는 API입니다
     */
    getBanners: (
        bannerSectionCodes: string[],
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetBannersResponse>({
            method: 'GET',
            url: `display/banners/${join(',', bannerSectionCodes)}`,
            ...options,
        });
    },

    /**
     * 배너목록 조회하기(ID)
     *  - ID 정보로 배너들을 조회하는 API입니다
     */
    getBannersByIds: (
        bannerSectionIds: string[],
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetBannersByIdsResponse>({
            method: 'GET',
            url: `display/banners/id/${join(',', bannerSectionIds)}`,
            ...options,
        });
    },
};

export default banner;
