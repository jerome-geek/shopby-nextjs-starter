import type { Options } from 'ky';
import qs from 'qs';

import { publicRequest } from '@/api/core/request';
import {
    CompanyExistParams,
    CompanyExistResponse,
} from '@/models/member/company';

const company = {
    /**
     * 사업자회원 사업자등록번호 중복체크
     * - 사업자등록번호 중복체크하는 API 입니다.
     */
    exist: (params: CompanyExistParams, options?: Options) => {
        return publicRequest.get<CompanyExistResponse>(
            'companies/business-exist',
            {
                searchParams: qs.stringify(params),
                ...options,
            },
        );
    },
};

export default company;
