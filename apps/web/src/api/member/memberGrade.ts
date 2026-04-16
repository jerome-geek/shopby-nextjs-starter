import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import type {
    GetMemberGradeParams,
    GetMemberGradeResponse,
} from '@/models/member/memberGrade';

const memberGrade = {
    /**
     * 회원 등급 정보 조회하기
     *  - 회원 등급 번호를 통해 회원 등급 정보를 조회하는 API 입니다.
     *  - 회원 등급 번호 미 입력 시 쇼핑몰에 등록된 모든 회원 등급 정보를 조회합니다.
     */
    getMemberGrade: (
        params: GetMemberGradeParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetMemberGradeResponse>({
            method: 'GET',
            url: '/member-grades',
            params,
            ...options,
        });
    },
};

export default memberGrade;
