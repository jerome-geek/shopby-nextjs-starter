import type { Options } from 'ky';

import { request } from '@/api/core';
import { GetMemberExtraInfoResponse } from '@/models/member/memberConfig';

const memberConfig = {
    /**
     * 회원정보 추가항목 Config 조회
     *  - 쇼핑몰 회원정보 추가항목 관련된 설정을 조회합니다
     *  - 타입종류 : 텍스트박스(TEXTBOX), 라디오버튼(RADIOBUTTON), 체크박스(CHECKBOX), 드롭다운(DROPDOWN)
     *  - 상태종류 : 필수(REQUIRED), 사용(USED), 미사용(NOT_USED)
     */
    getMemberExtraInfo: (options?: Options) => {
        return request.get<GetMemberExtraInfoResponse>(
            'config/member-extra-info',
            {
                ...options,
            }
        );
    },
};

export default memberConfig;
