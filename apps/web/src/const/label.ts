// 적립금 지급/차감 사유 맵
export const ACCUMULATION_RESERVE_REASON_MAP = {
    PURCHASE: '구매 적립',
    SIGN_UP: '회원가입 적립',
    REVIEW: '상품평 적립',
    BIRTHDAY: '생일 적립',
    MANUAL: '관리자 수동 지급',
    REFUND: '환불 적립',
    CANCEL: '취소',
    USE: '사용',
    EXPIRATION: '만료',
} as const;

// 현금영수증 발급 목적 타입 맵
export const CASH_RECEIPT_ISSUE_PURPOSE_TYPE_MAP = {
    INCOME_DEDUCTION: '소득공제용',
    PROOF_OF_EXPENDITURE: '지출증빙용',
} as const;

// 현금영수증 발급 타입 맵
export const CASH_RECEIPT_ISSUE_TYPE_MAP = {
    MOBILE_NO: '휴대폰번호',
    CARD: '현금영수증 카드번호',
    BUSINESS_REGISTRATION_NO: '사업자등록번호',
} as const;

// 클레임 사유 맵
export const CLAIM_REASON_MAP = {
    CHANGE_MIND: '단순변심',
    DEFECT: '상품불량',
    WRONG_DELIVERY: '오배송',
    LATE_DELIVERY: '배송지연',
    ETC: '기타',
} as const;

// 클레임 상태 맵
export const CLAIM_STATUS_MAP = {
    CANCEL_REQUEST: '취소 신청',
    CANCEL_PROC_REQUEST_REFUND: '취소 환불 요청',
    CANCEL_PROC_WAITING_REFUND: '취소 환불 대기',
    CANCEL_NO_REFUND: '취소 환불 없음',
    CANCEL_DONE: '취소 완료',
    RETURN_REQUEST: '반품 신청',
    RETURN_REJECT_REQUEST: '반품 거부 요청',
    RETURN_PROC_BEFORE_RECEIVE: '반품 수거 전',
    RETURN_PROC_REQUEST_REFUND: '반품 환불 요청',
    RETURN_PROC_WAITING_REFUND: '반품 환불 대기',
    RETURN_REFUND_AMT_ADJUST_REQUESTED: '반품 환불 금액 조정 요청',
    RETURN_DONE: '반품 완료',
    EXCHANGE_REQUEST: '교환 신청',
    EXCHANGE_REJECT_REQUEST: '교환 거부 요청',
    EXCHANGE_PROC_BEFORE_RECEIVE: '교환 수거 전',
    EXCHANGE_PROC_REQUEST_PAY: '교환 결제 요청',
    EXCHANGE_PROC_WAITING: '교환 대기',
    EXCHANGE_DONE: '교환 완료',
} as const;

// 클레임 타입 맵
export const CLAIM_TYPE_MAP = {
    CANCEL: '취소',
    RETURN: '반품',
    EXCHANGE: '교환',
} as const;

// 다음 액션 맵
export const NEXT_ACTION_MAP = {
    VIEW_DELIVERY: '배송조회',
    DELIVERY_DONE: '배송완료',
    CONFIRM_ORDER: '구매확정',
    WRITE_REVIEW: '상품평작성',
    VIEW_REVIEW: '상품평조회',
} as const;

// 주문 요청 맵
export const ORDER_REQUEST_MAP = {
    ALL: '전체',
    CLAIM: '클레임 진행중',
    NORMAL: '정상',
} as const;

// 주문 상태 맵
export const ORDER_STATUS_MAP = {
    DEPOSIT_WAIT: '입금대기',
    PAY_DONE: '결제완료',
    PRODUCT_PREPARE: '상품준비중',
    DELIVERY_PREPARE: '배송준비중',
    DELIVERY_ING: '배송중',
    DELIVERY_DONE: '배송완료',
    BUY_CONFIRM: '구매확정',
    CANCEL_DONE: '취소완료',
    RETURN_DONE: '반품완료',
    EXCHANGE_DONE: '교환완료',
    PAY_WAIT: '결제대기',
    PAY_CANCEL: '결제취소',
    PAY_FAIL: '결제실패',
} as const;

// 이전 주문 상태 맵
export const PREVIOUS_ORDER_STATUS_MAP = {
    ...ORDER_STATUS_MAP,
} as const;

// 상품 문의 맵
export const PRODUCT_INQUIRY_MAP = {
    PRODUCT: '상품',
    DELIVERY: '배송',
    EXCHANGE_RETURN: '교환/반품',
    ETC: '기타',
} as const;

// 상품평 신고 사유 맵
export const PRODUCT_REVIEW_REPORT_MAP = {
    COPYRIGHT: '저작권 침해',
    DEFAMATION: '명예훼손',
    OBSCENE: '음란/선정적 내용',
    SPAM: '스팸/광고',
    ETC: '기타',
} as const;

// 샵바이 약관 이력 맵
export const SHOPBY_TERM_HISTORY_MAP = {
    CREATE: '생성',
    UPDATE: '수정',
    DELETE: '삭제',
} as const;

export const SHOPBY_JOIN_AGREEMENT_TYPE_MAP = {
    USE: '이용약관',
    PI_PROCESS: '개인정보처리방침',
    PI_COLLECTION_AND_USE_REQUIRED: '회원가입시 개인정보 수집/이용(필수)',
    PI_COLLECTION_AND_USE_OPTIONAL: '회원가입 시 개인정보 수집/이용(선택)',
    PI_PROCESS_CONSIGNMENT: '개인정보 처리/위탁',
    PI_THIRD_PARTY_PROVISION: '개인정보 제3자 제공',
    PI_14_AGE: '만 14세 이상 가입 동의',
} as const;

// 샵바이 약관 타입 맵
export const SHOPBY_TERMS_TYPE_MAP = {
    // USE: '이용약관',
    // PRIVACY: '개인정보처리방침',
    // PI_PROVISION: '개인정보 제3자 제공 동의',
    // TEENAGER: '청소년보호정책',
    // ORDER_AGE: '만 14세 이상',
    // ORDER_INFO: '결제대행서비스 이용약관',
    // EMAIL_COLLECTION: '이메일 무단수집거부',
    // MARKETING: '마케팅 활용 동의',
    // AD: '광고성 정보 수신 동의',
    // REFUND: '취소/반품/환불 규정',
    // ORDER_AGREE: '주문정보 확인 동의',

    MALL_INTRODUCTION: '쇼핑몰/회사 소개',
    USE: '이용약관',
    E_COMMERCE: '전자금융거래 이용약관',
    PI_PROCESS: '개인정보처리방침',
    PI_COLLECTION_AND_USE_REQUIRED: '개인정보 수집 및 이용 동의',
    PI_COLLECTION_AND_USE_OPTIONAL: '개인정보 수집 및 이용 동의',
    PI_PROCESS_CONSIGNMENT: '개인정보 처리/위탁',
    PI_THIRD_PARTY_PROVISION: '개인정보 제3자 제공 동의',
    PI_COLLECTION_AND_USE_FOR_GUEST_ON_ARTICLE: '개인정보 수집/이용',
    ACCESS_GUIDE: '이용안내',
    WITHDRAWAL_GUIDE: '탈퇴안내',
    PI_SELLER_PROVISION: '개인정보 제 3자 제공 동의',
    PI_COLLECTION_AND_USE_ON_ORDER: '개인정보 수집 및 이용 동의',
    ORDER_INFO_AGREE: '구매 동의',
    CLEARANCE_INFO_COLLECTION_AND_USE: '통관정보 수집/이용',
    TRANSFER_AGREE: '개인정보 국외 이전 동의',
    REGULAR_PAYMENT_USE: '정기결제(배송) 이용약관',
    AUTO_APPROVAL_USE: '자동 승인 이용약관',
    PI_LIQUOR_PURCHASE_PROVISION: '주류구매 개인정보 수집 / 이용',
    PI_RESTOCK_NOTICE: '개인정보 수집 / 이용',
    PI_14_AGE: '만 14세 이상 가입 동의',
    PI_GIFT_ACCEPT_COLLECTION_AND_USE: '선물수락 개인정보 수집 / 이용',
    MARKETING_RECEIVE: '광고성 수신 동의',
    MARKETING_INFO_USAGE: '마케팅 목적의 개인정보 수집 / 이용 동의',
} as const;
