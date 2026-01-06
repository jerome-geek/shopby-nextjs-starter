import { cache } from 'react';

import { event } from '@/api/display';
import type {
    GetEventByIdParams,
    GetEventProductDisplaySectionParams,
    GetEventResponse,
    GetEventProductDisplaySectionResponse,
} from '@/models/display/event';

/**
 * [Server-Only] 기획전 ID로 상세 조회하기 (캐싱 적용)
 *  - React.cache를 사용하여 중복 요청을 방지합니다.
 *  - 서버 컴포넌트에서만 사용해야 합니다.
 */
export const getCachedEventById = cache(
    async (
        eventId: string,
        params?: GetEventByIdParams
    ): Promise<GetEventResponse> => {
        const response = await event.getEventById(eventId, params);
        return await response.json();
    }
);

/**
 * [Server-Only] 기획전 상품진열 상품 조회 (캐싱 적용)
 *  - React.cache를 사용하여 중복 요청을 방지합니다.
 *  - 서버 컴포넌트에서만 사용해야 합니다.
 */
export const getCachedEventProductDisplaySection = cache(
    async (
        eventNo: number,
        sectionNo: number,
        params?: GetEventProductDisplaySectionParams
    ): Promise<GetEventProductDisplaySectionResponse> => {
        const response = await event.getEventProductDisplaySection(
            eventNo,
            sectionNo,
            params
        );
        return await response.json();
    }
);

