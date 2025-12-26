import { CreateProfileData } from '@/models/member/profile';

export const SIGN_UP_TERM_LIST: {
    type: CreateProfileData['joinTermsAgreements'][number];
    label: string;
    isRequired: boolean;
    isChecked: boolean;
}[] = [
    {
        type: 'USE' as const,
        label: '이용약관',
        isRequired: true,
        isChecked: false,
    },
    // TODO: 기본약관인지 추가약관인지 확인 필요
    // {
    //     type: 'E_COMMERCE' as const,
    //     label: '전자금융 거래 이용 약관',
    //     isRequired: true,
    //     isChecked: false,
    // },
    {
        type: 'PI_COLLECTION_AND_USE_REQUIRED' as const,
        label: '개인정보 수집 및 이용동의',
        isRequired: true,
        isChecked: false,
    },
    {
        type: 'PI_14_AGE' as const,
        label: '만 14세 이상 가입 동의 약관',
        isRequired: true,
        isChecked: false,
    },
    {
        type: 'PI_COLLECTION_AND_USE_OPTIONAL' as const,
        label: '개인정보 수집 및 이용동의',
        isRequired: false,
        isChecked: false,
    },
    {
        type: 'PI_PROCESS_CONSIGNMENT' as const,
        label: '개인정보 처리/위탁에 대한 동의',
        isRequired: false,
        isChecked: false,
    },
    {
        type: 'PI_THIRD_PARTY_PROVISION' as const,
        label: '개인정보 제 3자 제공에 대한 동의',
        isRequired: false,
        isChecked: false,
    },
];

export const OPT_IN_LIST = [
    {
        type: 'smsAgreed' as const,
        label: 'SMS 수신동의',
        isRequired: false,
        isChecked: false,
    },
    {
        type: 'directMailAgreed' as const,
        label: '이메일 수신동의',
        isRequired: false,
        isChecked: false,
    },
];

export const TERMS_TITLE = {
    mall_introduction: '쇼핑몰/회사 소개',
    use: '이용약관',
    e_commerce: '전자금융거래 이용약관',
    pi_process: '개인정보처리방침',
    pi_collection_and_use_required: '개인정보 수집/이용(필수)',
    pi_collection_and_use_optional: '개인정보 수집/이용(선택)',
    pi_process_consignment: '개인정보 처리/위탁',
    pi_third_party_provision: '개인정보 제3자 제공',
    pi_collection_and_use_for_guest_on_article:
        '비회원 게시글/문의글 작성시 개인정보 수집/이용',
    access_guide: '이용안내',
    withdrawal_guide: '탈퇴안내',
    pi_seller_provision: '개인정보 판매자 제공',
    pi_collection_and_use_on_order: '회원 주문시 개인정보 수집/이용',
    order_info_agree: '주문정보 동의',
    clearance_info_collection_and_use: '통관정보 수집/이용',
    transfer_agree: '개인정보 국외 이전 동의',
    regular_payment_use: '정기결제(배송) 이용약관',
    auto_approval_use: '자동 승인 이용약관',
    pi_liquor_purchase_provision: '주류구매 개인정보 제공 동의',
    pi_restock_notice: '상품 재입고 알림 동의',
    pi_14_age: '만 14세 이상 가입 동의',
    order_default: '주문 기본 동의',
    // TODO: 아래 약관 내용 확인 필요
    personal_process_consignment: '',
    personal_third_party_provision: '',
};

export const orderTerms = {
    USE: '이용약관',
    PI_COLLECTION_AND_USE_ON_ORDER: '개인정보 이용동의',
    PI_SELLER_PROVISION: '개인정보 판매자 제공 동의',
    CLEARANCE_INFO_COLLECTION_AND_USE: '통관정보 수집 · 이용 동의',
    TRANSFER_AGREE: '개인정보 국외 이전 동의',
    ORDER_INFO_AGREE: '주문 상품 정보 동의',
    PI_LIQUOR_PURCHASE_PROVISION: '주류구매 개인정보 제공 동의',
    REGULAR_PAYMENT_USE: '정기결제(배송) 이용약관',
    AUTO_APPROVAL_USE: '자동 승인 이용약관',
    ORDER_DEFAULT: '주문 기본 동의',
};

export const orderAgreementTerms = {
    TERMS_OF_USE: '이용약관',
    PRIVACY_USAGE_AGREEMENT: '개인정보 이용동의',
    NONE_MEMBER_PRIVACY_USAGE_AGREEMENT: '비회원 개인정보 수집 · 이용 동의',
    SELLER_PRIVACY_USAGE_AGREEMENT: '개인정보 판매자 제공 동의',
    CUSTOMS_CLEARANCE_AGREEMENT: '통관정보 수집 · 이용 동의',
    OVERSEA_PRIVACY_USAGE_AGREEMENT: '개인정보 국외 이전 동의',
    ORDER_INFO_AGREE: '주문 상품 정보 동의',
    PI_LIQUOR_PURCHASE_PROVISION: '주류구매 개인정보 제공 동의',
    REGULAR_PAYMENT_USE: '정기결제(배송) 이용약관',
    AUTO_APPROVAL_USE: '자동 승인 이용약관',
};
