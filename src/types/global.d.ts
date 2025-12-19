declare global {
    type Language = 'KO' | 'EN' | 'JA' | 'ZH';

    type Currency = 'KRW' | 'USD' | 'JPY' | 'CNY';

    type Nullable<T> = null | T;

    interface Sort {
        /** 정렬 기준 (추천순: RECOMMEND, 등록일순: REGISTER_YMDT, 평점순: RATING, 베스트리뷰순: BEST_REVIEW) */
        orderBy?: 'RECOMMEND' | 'REGISTER_YMDT' | 'RATING' | 'BEST_REVIEW';
        /** (오름차순: ASC, 내림차순: DESC) */
        orderDirection?: 'ASC' | 'DESC';
    }

    interface Paging {
        pageNumber: number;
        pageSize: number;
        hasTotalCount?: boolean;
    }

    interface NewPaging {
        /** 페이지 번호 (default: 1) */
        page: number;
        /** 한 페이지당 노출 수 (default: 10) */
        size: number;
        /** 목록 카운트 포함 여부 (default: false) */
        hasTotalCount: boolean;
    }

    interface SearchDate {
        startYmd: string;
        endYmd: string;
    }

    interface SearchDateTime {
        startYmdt: string;
        endYmdt: string;
    }

    interface ItemList<T> {
        totalCount: number;
        items: T[];
    }

    interface ShopByErrorResponse {
        code: string;
        error: string;
        message: string;
        path: string;
        result: {
            code: string;
            detail: any;
            message: string;
            time: string;
        };
        status: number;
    }

    interface InitialState<T> {
        loading: boolean;
        // loading: 'idle' | 'pending' | 'succeeded' | 'failed'
        data: T;
        error: any;
    }

    interface Tab {
        key: string;
        name: string;
        isActive: boolean;
    }

    interface InfiniteResponse<T> {
        data: T;
        pageNumber: number;
    }

    interface InfiniteData<TData> {
        pages: TData[];
        pageParams: number[];
    }

    interface Preview {
        /* (관리자전용) 미리보기 전용 플래그 값 추가 */
        preview?: boolean;
    }

    // API 응답 타입
    interface ApiResponse<T = any> {
        success: boolean;
        data: T;
        message?: string;
        error?: string;
    }

    // 페이지네이션 타입
    interface PaginationParams {
        page: number;
        limit: number;
    }

    interface PaginatedResponse<T> {
        items: T[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }

    // 사용자 관련 타입
    type UserRole = 'admin' | 'user' | 'guest';

    interface User {
        id: string;
        email: string;
        name: string;
        role: UserRole;
        createdAt: string;
        updatedAt: string;
    }

    // 인증 관련 타입
    interface AuthTokens {
        accessToken: string;
        refreshToken: string;
    }

    interface LoginRequest {
        email: string;
        password: string;
    }

    interface LoginResponse extends AuthTokens {
        user: User;
    }

    // 쇼핑몰 관련 타입
    interface Product {
        id: string;
        name: string;
        price: number;
        description?: string;
        images: string[];
        category: string;
        inStock: boolean;
    }

    interface Category {
        id: string;
        name: string;
        slug: string;
        parentId?: string;
    }

    // UI 관련 타입
    type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
    type ButtonSize = 'sm' | 'md' | 'lg';

    interface Theme {
        mode: 'light' | 'dark';
        primary: string;
        secondary: string;
        background: string;
        text: string;
    }

    // 전역 상태 타입
    interface GlobalState {
        theme: Theme;
        language: 'ko' | 'en';
        sidebar: {
            isOpen: boolean;
            width: number;
        };
    }

    // 유틸리티 타입
    type DeepPartial<T> = {
        [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
    };

    type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

    type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
}

export {};
