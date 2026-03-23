/**
 * 글로벌 타입 정의
 * import 없이 프로젝트 전체에서 사용 가능
 */

/** ShopBy API 에러 응답 */
interface ShopByErrorResponse {
    /** 에러 코드 */
    code: string;
    /** 에러 메시지 */
    message: string;
    /** 상세 에러 정보 */
    details?: {
        field?: string;
        reason?: string;
    }[];
}

/** Nullable 유틸리티 타입 */
type Nullable<T> = T | null;

/** Optional 유틸리티 타입 */
type Optional<T> = T | undefined;

/** 날짜 검색 파라미터 */
interface SearchDate {
    startYmd?: string;
    endYmd?: string;
}

/** 날짜시간 검색 파라미터 */
interface SearchDateTime {
    startYmdt?: string;
    endYmdt?: string;
}

/** 페이징 파라미터 */
interface Paging {
    pageNumber?: number;
    pageSize?: number;
}

/** 페이징 응답 */
interface PageInfo {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}

/** 목록 응답 공통 타입 */
interface ItemList<T> {
    items: T[];
    totalCount: number;
}

/** 페이징된 목록 응답 */
interface PagedList<T> extends ItemList<T> {
    pageInfo: PageInfo;
}

/** 미리보기 파라미터 */
interface Preview {
    preview?: boolean;
}
