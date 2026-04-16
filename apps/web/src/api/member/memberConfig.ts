import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import type { GetMemberExtraInfoResponse } from '@/models/member/memberConfig';

const memberConfig = {
    /**
     * 회원정보 추가항목 Config 조회
     *  - 쇼핑몰 회원정보 추가항목 관련된 설정을 조회합니다
     *  - 타입종류 : 텍스트박스(TEXTBOX), 라디오버튼(RADIOBUTTON), 체크박스(CHECKBOX), 드롭다운(DROPDOWN)
     *  - 상태종류 : 필수(REQUIRED), 사용(USED), 미사용(NOT_USED)
     */
    getMemberExtraInfo: (options?: AxiosRequestConfig) => {
        return shopbyRequest<GetMemberExtraInfoResponse>({
            method: 'GET',
            url: '/config/member-extra-info',
            ...options,
        });
    },
};

export default memberConfig;
