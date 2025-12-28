import type { Options } from 'ky';
import qs from 'qs';

import { request } from '@/api/core';
import {
    GetMemberGroupParams,
    GetMemberGroupResponse,
} from '@/models/member/memberGroup';

const memberGroup = {
    /**
     * 회원 그룹 정보 조회하기
     *
     *  - 회원 그룹 번호를 통해 회원 그룹 정보를 조회하는 API 입니다.
     *  - 회원 그룹 번호 미 입력 시 쇼핑몰에 등록된 모든 그룹 정보를 조회합니다.
     */
    getMemberGroup: (params: GetMemberGroupParams, options?: Options) => {
        return request.get<GetMemberGroupResponse>('member-groups', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },
};

export default memberGroup;
