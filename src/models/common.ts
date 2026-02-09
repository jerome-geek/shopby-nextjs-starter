/** 날짜 검색 파라미터 */
export interface SearchDate {
    startYmd?: string;
    endYmd?: string;
}

/** 날짜시간 검색 파라미터 */
export interface SearchDateTime {
    startYmdt?: string;
    endYmdt?: string;
}

/** 페이징 파라미터 */
export interface Paging {
    pageNumber?: number;
    pageSize?: number;
}

/** 페이징 응답 */
export interface PageInfo {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}

/** Nullable 유틸 타입 */
export type Nullable<T> = T | null;
