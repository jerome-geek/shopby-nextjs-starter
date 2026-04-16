import type { Nullable } from '@/models/common';

/** ShopBy API 에러 응답 타입 */
export interface ShopByErrorResponse {
    /** 에러 코드 */
    code: string;
    /** 에러 메시지 */
    message: string;
    /** 상세 에러 정보 (optional) */
    details?: {
        field?: string;
        reason?: string;
    }[];
}

/** ShopBy API 공통 응답 타입 */
export interface ShopByResponse<T> {
    success: boolean;
    data?: T;
    error?: ShopByErrorResponse;
}

/** 페이징 응답 타입 */
export interface PageResponse<T> {
    items: T[];
    pageInfo: {
        pageNumber: number;
        pageSize: number;
        totalCount: number;
        totalPages: number;
    };
}

/** Geek API 공통 응답 타입 (페이징 포함) */
export interface GeekResponse<T> {
    count: number;
    currentPage: number;
    data: T[];
    lastPage: number;
    nextPage: Nullable<number>;
    prevPage: Nullable<number>;
    statusCode: 'success' | 'fail';
}
