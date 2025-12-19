import type { Options } from 'ky';

import request from '@/api/core/request';
import {
    GetMallInternationalizationSettingsResponse,
    GetMallPartnersResponse,
    GetMallResponse,
    GetSslInfoResponse,
} from '@/models/admin/mall';

const mall = {
    /**
     *  몰 정보 조회하기
     *   - 몰 정보를 조회하는 API입니다.
     *   - 몰 진입 시 전체 카테고리 조회 후 응답값을 localStorage(web), SharedPreference(android), NSUserDefaults(ios)와 같은 로컬 저장소에 두고 재사용하는 방식을 권장합니다.
     *   - expire time은 익일 0시로 설정을 권장합니다.
     *   - 카테고리는 변경 가능하므로 상품상세 API의 카테고리 번호가 로컬 저장소에는 없을 수 있습니다.
     *   - 그런 경우에는 카테고리 조회 API를 이용하여 로컬 저장소를 갱신해 주십시오.
     *   - Server Component에서 사용 시: cache()로 감싸서 사용
     *   - Client Component에서 사용 시: useQuery로 감싼 커스텀 훅 사용
     */
    getMall: (options?: Options) => {
        return request.get<GetMallResponse>('malls', {
            cache: 'force-cache',
            ...options,
        });
    },

    /**
     *  현재 몰의 다국어, 환율 설정 조회
     *   - 현재 몰의 다국어, 환율 설정 조회를 조회하는 API입니다.
     */
    getMallInternationalizationSettings: (options?: Options) => {
        return request.get<GetMallInternationalizationSettingsResponse>(
            'malls/internationalization',
            {
                cache: 'force-cache',
                ...options,
            }
        );
    },

    /**
     *  몰과 계약한 파트너 목록 조회하기
     *   - 몰과 계약한 파트너 목록을 조회하는 API입니다.
     */
    getMallPartners: (options?: Options) => {
        return request.get<GetMallPartnersResponse>('malls/partners', {
            cache: 'force-cache',
            ...options,
        });
    },

    /**
     *  현재 도메인의 보안서버정보 조회하기
     *   - 현재 도메인의 보안서버정보를 조회하는 API입니다.
     */
    getSslInfo: (options?: Options) => {
        return request.get<GetSslInfoResponse>('malls/ssl', {
            cache: 'force-cache',
            ...options,
        });
    },
};

export default mall;
