import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import type { GetHolidayParams, GetHolidayResponse } from '@/models/manage/holiday';

/**
 * 요청한 달에 해당하는 공휴일 조회하기
 *  - 해당 연도와 월에 존재하는 공휴일을 조회하는 API입니다.
 */
const holiday = {
    getHoliday: (params: GetHolidayParams, options?: AxiosRequestConfig) => {
        return shopbyRequest<GetHolidayResponse>({
            method: 'GET',
            url: '/holiday',
            params,
            ...options,
        });
    },
};

export default holiday;
