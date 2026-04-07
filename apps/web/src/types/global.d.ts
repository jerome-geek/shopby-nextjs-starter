/**
 * 글로벌 타입 정의
 * import 없이 프로젝트 전체에서 사용 가능
 */

/** ShopBy API 에러 응답 */
interface ShopByErrorResponse {
    code: string;
    error: string;
    message: string;
    path: string;
    result: {
        code: string;
        detail: {};
        message: string;
        time: string;
    };
    status: number;
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
    hasTotalCount?: boolean;
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
    /* (관리자전용) 미리보기 전용 플래그 값 추가 */
    preview?: boolean;
}

interface InfiniteResponse<T> {
    data: T;
    pageNumber: number;
}

interface InfiniteData<TData> {
    pages: TData[];
    pageParams: number[];
}
