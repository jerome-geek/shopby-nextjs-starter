import { cache } from 'react';

import coupon from '@/api/promotion/coupon';

export const getCachedCouponSummary = cache(async () => {
    // const response = await coupon.getCouponSummary();

    // return await response.json();
    return await coupon.getCouponSummary().json();
});
