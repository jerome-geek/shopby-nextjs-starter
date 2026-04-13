import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';

const couponIssue = {
    /**
     * 쿠폰 발급하기
     *  - 기프트 쿠폰만 사용 처리 가능하며, 기프트 쿠폰 사용 처리 시 혜택이 지급됩니다. (예, 적립금)
     */
    useGiftCoupon: (couponIssueNo: number, options?: AxiosRequestConfig) => {
        return shopbyRequest({
            method: 'POST',
            url: `/coupons/issues/${couponIssueNo}/use`,
            ...options,
        });
    },
};

export default couponIssue;
