import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import type {
    CompanyExistParams,
    CompanyExistResponse,
} from '@/models/member/company';

const company = {
    /**
     * 사업자회원 사업자등록번호 중복체크
     * - 사업자등록번호 중복체크하는 API 입니다.
     */
    exist: (params: CompanyExistParams, options?: AxiosRequestConfig) => {
        return shopbyRequest<CompanyExistResponse>({
            method: 'GET',
            url: '/companies/business-exist',
            params,
            ...options,
        });
    },
};

export default company;
