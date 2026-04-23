export const PATHS = {
    MAIN: '/',

    SHOP: {
        DISCOVERY: '/shop',
        DETAIL: '/shop/[slug]',
        KIDS: '/shop/kids',
        LIFE: '/shop/life',
    },

    AUTH: {
        LOGIN: '/login',
        TERMS: {
            MAIN: '/terms',
            DETAIL: '/terms/[termsType]/[termsNo]*',
        },
    },

    GUEST: {
        MAIN: '/guest',
        /** 비회원 배송조회 */
        LOGIN: '/guest/login',
        /** 비회원 주문 상세 */
        ORDER: {
            MAIN: '/guest/order',
            DETAIL: '/guest/order/[orderNo]',
        },
        /** 비회원 클레임 */
        CLAIMS: {
            REQUEST: '/guest/claim/request',
            CHANGE_ADDRESS: '/guest/claim/request/change-address/[orderNo]',
        },
    },

    MEMBER: {
        /** 아이디 찾기 페이지 */
        FIND_ID: '/member/find-id',
        /** 아이디 찾기 결과 페이지 */
        FIND_ID_RESULT: '/member/find-id/result',
        /** 비밀번호 찾기 페이지 (비밀번호 변경) */
        FIND_PASSWORD: '/member/find-password',
    },

    SIGNUP: {
        /** 회원가입 방법 선택 페이지 */
        REGISTER_METHOD: '/signup/register-method',
        /** 약관동의 페이지 */
        TERMS: '/signup/terms',
        /** 회원가입 정보 입력 페이지 */
        REGISTER: '/signup/register',
        /** 회원가입 완료 페이지 */
        COMPLETE: '/signup/complete',
    },

    PRODUCTS: {
        /** 전체 상품 리스트 */
        MAIN: '/products',

        /** 신상품 리스트 */
        NEW: '/products/new',

        /** 베스트 상품 리스트 */
        BEST: '/products/best',

        /** 세일 상품 리스트 */
        SALE: '/products/sale',

        /** 특정 카테고리 상품 리스트 */
        LIST: '/categories/[categoryNo]/products',

        /** 상품 상세 페이지 */
        DETAIL: '/products/[productNo]',
    },

    TIME_SALE: {
        MAIN: '/time-sale',
        DETAIL: '/time-sale/[timeSaleId]',
    },

    CATEGORIES: {
        DETAIL: (categoryNo: number) => `/categories/${categoryNo}`,
    },

    BRANDS: {
        /** 브랜드 리스트 */
        MAIN: '/brands',
        /** 브랜드 상세페이지 */
        DETAIL: '/brands/[brandNo]',
    },

    EVENTS: {
        /** 기획전 리스트 */
        MAIN: '/events',
        /** 기획전 상세페이지 */
        DETAIL: '/events/[eventNo]',
    },

    BOARDS: {
        /** 게시글 리스트 */
        MAIN: '/boards/[boardId]',
        /** 게시글 상세 페이지 */
        DETAIL: '/boards/[boardId]/[articleNo]',
    },

    /** 검색 */
    SEARCH: '/search',

    /** 장바구니 */
    CART: '/cart',

    ORDER: {
        MAIN: '/order',
        /** 주문서 작성 */
        SHEET: '/order/[orderSheetNo]',
        /** 주문완료 */
        COMPLETE: '/order/complete',
        GIFT: {
            MAIN: '/order/gift',
            /** 선물하기 주문서 작성 */
            DETAIL: '/order/gift/[orderSheetNo]',
            /** 선물하기 주문서 > 상세 정보 입력 */
            ADDRESS: '/order/gift/shipping-info/[encryptedShippingNo]',
        },
    },

    MYPAGE: {
        /** 마이페이지 메인 */
        MAIN: '/mypage',

        ORDERS: {
            /** 마이페이지 > 주문목록 */
            MAIN: '/mypage/orders',
            /** 마이페이지 > 주문상세 */
            DETAIL: '/mypage/orders/[orderNo]',
        },

        PREVIOUS_ORDERS: {
            /** 마이페이지 > 이전주문목록 */
            MAIN: '/mypage/previous-orders',
            /** 마이페이지 > 이전주문상세 */
            DETAIL: '/mypage/previous-orders/[orderNo]',
        },

        CLAIMS: {
            /** 마이페이지 > 취소/반품/교환 내역 */
            MAIN: '/mypage/claims',
            /** 마이페이지 > 취소/반품/교환 내역 신청 */
            REQUEST: '/mypage/claims/request',
            /** 마이페이지 > 취소/반품/교환 내역 상세 */
            DETAIL: '/mypage/claims/[claimNo]',
            /** 마이페이지 > 취소/반품/교환 내역 상세 > 주소 변경 */
            CHANGE_ADDRESS: '/mypage/claims/request/[claimNo]/change-address',
            // CHANGE_ADDRESS: '/mypage/claims/request/change-address/[orderNo]',
        },

        /** 마이페이지 > 쿠폰리스트 */
        COUPONS: '/mypage/coupons',

        /** 마이페이지 > 적립금 */
        ACCUMULATIONS: '/mypage/accumulations',

        /** 마이페이지 > 위시리스트 */
        WISH: '/mypage/wish',

        /** 마이페이지 > 최근 본 상품 */
        RECENT_PRODUCTS: '/mypage/recent-products',

        /** 마이페이지 > 브랜드 */
        BRANDS: '/mypage/brands',

        /** 마이페이지 > 회원탈퇴 */
        WITHDRAWAL: '/mypage/withdrawal',

        ADDRESSES: {
            /** 마이페이지 > 배송지 목록 */
            MAIN: '/mypage/addresses',
            /** 마이페이지 > 배송지 목록 > 배송지 등록 */
            REGISTER: '/mypage/addresses/register',
            /** 마이페이지 > 배송지 목록 > 배송지 수정 */
            MODIFY: '/mypage/addresses/[addressNo]',
        },

        PRODUCT_INQUIRIES: {
            /** 마이페이지 > 상품문의 리스트 */
            MAIN: '/mypage/product-inquiries',
            /** 마이페이지 > 상품문의 등록 */
            REGISTER: '/mypage/product-inquiries/register',
            /** 마이페이지 > 상품문의 수정 */
            MODIFY: '/mypage/product-inquiries/register/[inquiryNo]',
            /** @deprecated REGISTER와 동일 */
            WRITE: '/mypage/product-inquiries/register',
        },

        INQUIRIES: {
            /** 고객센터 > 1[1]문의 리스트 */
            MAIN: '/mypage/inquiries',
            /** 고객센터 > 1[1]문의 등록 */
            REGISTER: '/mypage/inquiries/register',
            /** 고객센터 > 1[1]문의 수정 */
            MODIFY: '/mypage/inquiries/register/[inquiryNo]',
            /** @deprecated REGISTER와 동일 */
            WRITE: '/mypage/inquiries/register',
        },

        REVIEWS: {
            /** 마이페이지 > 상품후기 리스트 */
            MAIN: '/mypage/reviews',
            /** 마이페이지 > 상품후기 리스트 > 후기 작성 */
            WRITE: '/mypage/reviews/write/[productNo]',
            /** 마이페이지 > 상품후기 리스트 > 후기 수정 */
            MODIFY: '/mypage/reviews/modify/[reviewNo]',
            /** 마이페이지 > 상품후기 리스트 > 후기 상세 */
            DETAIL: '/mypage/reviews/[reviewNo]',
        },

        /** 마이페이지 > 회원정보 수정 */
        EDIT: '/mypage/edit',

        CHECK_ACCOUNT: '/mypage/check-account',

        GRADE: '/mypage/grade',
    },

    SUPPORT: {
        MAIN: '/support',

        NOTICE: {
            LIST: '/support/notice',
            DETAIL: '/support/notice/[articleNo]',
        },

        FAQ: '/support/faq',
    },

    COMPANY: '/company',

    CALLBACK: {
        AUTH: '/callback/auth-callback',
        KCP_AUTH: '/callback/kcp-auth-callback',
    },

    APP: {
        AUTH: '/app/auth',
        OPEN_AUTH: '/app/open-id-sign-in',
        LOGIN_BRIDGE: '/app/login-bridge',
    },

    RECIPES: {
        MAIN: '/recipes',
        WRITE: '/recipes/write',
        DETAIL: '/recipes/[sno]',
        SCRAP: '/recipes/scrap',
        COLLECTIONS: '/recipes/collections/[shareCode]',
    },
};
