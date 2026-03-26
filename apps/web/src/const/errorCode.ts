export const ERROR_CODE = {
    CANT_PURCHASE_OPTION: {
        VALUE: 'PPVE0001',
        MESSAGE: '구매불가한 옵션이 포함되어 있습니다.',
    },
    CANT_CART: {
        VALUE: 'PPVE0002',
        MESSAGE: '장바구니 담기 불가능한 상품입니다.',
    },
    OUT_OF_STOCK: {
        VALUE: 'PPVE0011',
        MESSAGE: '선택하신 옵션의 재고가 부족합니다.',
    },
    REQUIRE_ACCOUNT_INFO: {
        VALUE: 'O8001',
    },
};

export const errorCode = {
    O3336: '인증이 먼저 진행되어야 합니다',
    O3338: '인증이 먼저 진행되어야 합니다',
    PPVE0011: '구매불가한 옵션이 포함되어 있습니다.',
    PPVE0001: '구매불가한 옵션이 포함되어 있습니다.',
    PPVE0002: '장바구니 담기 불가능한 상품입니다.',
    O8001: '무통장 입금 시 거래할 계좌의 정보(은행코드, 계좌번호, 예금주명)가 필요합니다.',
};

/**
 * 샵바이에서 사용하는 오류코드 및 메시지
 *  - 참고: https://workspace-help.nhn-commerce.com/recommendedcontents/faq/error_order
 */
export const ORDER_ERROR_CODE = {
    NEED_AUTH: {
        CODES: ['O3336', 'O3338'],
        MESSAGE: '인증이 먼저 진행되어야 합니다.',
    },
    NEED_CERTIFICATION: {
        CODES: ['O0037'],
        MESSAGE: '성인 인증된 회원만 구매 가능합니다.',
    },
    SOLD_OUT: {
        CODES: ['PPVE0011', 'PPVE0020'],
        MESSAGE: '품절된 상품이 포함되어 있습니다.',
    },
    INVALID_PRODUCT: {
        CODES: ['PPVE0019'],
        MESSAGE: '구매불가한 상품입니다.',
    },
};

const CART_ERROR_CODE = {
    INVALID_OPTION: {
        CODES: ['PPVE0001'],
        MESSAGE: '구매불가한 옵션이 포함되어 있습니다.',
    },
    INVALID_PRODUCT: {
        CODES: ['PPVE0002'],
        MESSAGE: '장바구니 담기 불가능한 상품입니다.',
    },
    OUT_OF_STOCK: {
        CODES: ['PPVE0011'],
        MESSAGE: '선택하신 옵션의 재고가 부족합니다.',
    },
};

export const PROMOTION_ERROR_CODE = {};

export const CLAIM_ERROR_CODE = {};
