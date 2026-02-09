import { cache } from 'react';

import { brand } from '@/api/product';

/**
 * [Server-Only] 브랜드 상세 조회하기 (캐싱 적용)
 *  - React.cache를 사용하여 중복 요청을 방지합니다.
 *  - 서버 컴포넌트에서만 사용해야 합니다.
 */
export const getCachedBrandDetail = cache(async (displayBrandNo: number) => {
    const response = await brand.getBrandDetail(displayBrandNo);
    return await response.json();
});

