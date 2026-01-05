import { cache } from 'react';

import { profile } from '@/api/member';

/**
 * [Server-Only] 회원정보 조회하기 (캐싱 적용)
 *  - React.cache를 사용하여 중복 요청을 방지합니다.
 *  - 서버 컴포넌트에서만 사용해야 합니다.
 */
export const getCachedProfile = cache(async () => {
    const response = await profile.getProfile();

    return await response.json();
});
