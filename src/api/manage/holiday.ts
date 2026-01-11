import type { Options } from 'ky';
import qs from 'qs';

import { publicRequest } from '@/api/core/request';
import { GetHolidayParams, GetHolidayResponse } from '@/models/manage/holiday';

/**
 * 요청한 달에 해당하는 공휴일 조회하기
 *  - 해당 연도와 월에 존재하는 공휴일을 조회하는 API입니다.
 */
const holiday = {
    getHoliday: (params: GetHolidayParams, options?: Options) => {
        return publicRequest.get<GetHolidayResponse>('holiday', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },
};

export default holiday;
