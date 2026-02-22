import {
    AuthType,
    CountryCdType,
    CouponIssueType,
    DiscountType,
    EvaluationCondition,
    EvaluationDetailCondition,
    MemberStatsType,
    MemberType,
    ProviderType,
    ReportType,
    Sex,
    ShopbyJoinAgreementTypes,
    SupplyType,
} from '@/models';

type JoinTermsAgreement =
    | 'USE'
    | 'PI_COLLECTION_AND_USE_REQUIRED'
    | 'PI_COLLECTION_AND_USE_OPTIONAL'
    | 'PI_PROCESS_CONSIGNMENT'
    | 'PI_THIRD_PARTY_PROVISION'
    | 'PI_14_AGE';

export interface GetProfileResponse {
    /** 광고 우편물(DM) 수신 거부 일시 (nullable) */
    directMailDisagreeYmdt: Nullable<string>;
    /** 회사명 (nullable) */
    businessName: Nullable<string>;
    /** 거주 국가 (nullable) */
    countryCd: Nullable<CountryCdType>;
    /** 우편번호 (nullable) */
    zipCd: Nullable<string>;
    /** 회원 등급 이미지 (nullable) */
    memberGradeImageUrl: Nullable<string>;
    /** 광고 우편물(DM) 수신 동의 일시 (nullable) */
    directMailAgreeYmdt: Nullable<string>;
    /** 광고 우편물(DM) 수신 동의 여부 */
    directMailAgreed: boolean;
    /** 추가 정보 - jsonString 형태, server api 조회 시 additionalInfo 로 바이 패스 해줍니다. (nullable) */
    additionalInfo?: Nullable<string>;
    /** 가입 일시 */
    joinYmdt: string;
    /** (국내, 해외 겸용) 국내: 군/구, 해외: 주 (nullable) */
    state: Nullable<string>;
    /** 회원 아이디 */
    memberId: string;
    /** 최근 접속 시간 (nullable) */
    lastLoginYmdt: Nullable<string>;
    /** 인증 타입 (nullable) */
    certificationType: Nullable<Exclude<AuthType, 'NONE'>>;
    /** 연동된 SNS 리스트 (nullable) */
    providerTypes: Nullable<ProviderType[]>;
    /** 단문메시지서비스(SMS) 동의 여부 */
    smsAgreed: boolean;
    /** 도로명 주소 (지번 주소) (nullable) */
    jibunAddress: Nullable<string>;
    /** 단문메시지서비스(SNS) 동의 일시 (nullable) */
    smsAgreeYmdt: Nullable<string>;
    /** 환불 계좌 은행 (nullable) */
    refundBank: Nullable<string>;
    /** 회원 번호 */
    memberNo: number;
    /** 환불 계좌 예금주명 (nullable) */
    refundBankDepositorName: Nullable<string>;
    /** 일반 전화 번호 (nullable) */
    telephoneNo: Nullable<string>;
    customTermsAgreement?: Nullable<
        {
            /** 동의 여부 (nullable) */
            isAgree?: Nullable<boolean>;
            /** 동의 일시 */
            updateYmdt: string;
            /** 추가 동의 항목 번호 (nullable) */
            customTermsNo?: Nullable<number>;
        }[]
    >;
    /** 환불 계좌 번호 */
    refundBankAccount: Nullable<string>;
    /** 회원 추가항목 정보 */
    extraInfo: {
        /** 추가항목 옵션 번호 목록 */
        extraInfoOptionNos: (boolean | string | number)[];
        /** 추가항목 옵션 텍스트 답변 내용 */
        extraInfoOptionTextContent: string;
        /** 추가항목 번호 */
        extraInfoNo: number;
    }[];
    /** 회원 그룹 이름 (nullable) */
    memberGroupNames: Nullable<string>;
    /** 생년월일. yyyyMMdd (nullable) */
    birthday: Nullable<string>;
    /** 쇼핑몰 이름 (nullable) */
    mallName: Nullable<string>;
    /** 성 (nullable) */
    lastName: Nullable<string>;
    /** 이름 (nullable) */
    firstName: Nullable<string>;
    /** (국내, 해외 겸용) 도시 (nullable) */
    city: Nullable<string>;
    /** 회원 상태 */
    memberStatus: MemberStatsType;
    /** 회원 이름 (nullable) */
    memberName: Nullable<string>;
    /** 마지막 연동 SNS (nullable) */
    providerType: Nullable<ProviderType>;
    /** 인증 여부 */
    principalCertificated: boolean;
    /** 마지막 접속 IP (nullable) */
    lastLoginIp: Nullable<string>;
    /** 닉네임 (nullable) */
    nickname: Nullable<string>;
    /** 회원 그룹 */
    memberGroups: {
        /** 그룹 이름 */
        memberGroupName: string;
        /** 그룹 설명 */
        memberGroupDescription: string;
        /** 그룹 번호 */
        memberGroupNo: number;
    }[];
    /** 추천한 회원 아이디 */
    recommender: Nullable<string>;
    /** 이메일 주소 (nullable) */
    email?: string;
    /** 선택 동의 항목 상세 */
    agreedTermsInfos: CustomTermsAgreement[];
    /** 도로명 주소 상세 (지번 주소) (nullable)  */
    jibunDetailAddress: Nullable<string>;
    /** 선택 동의 항목 */
    agreedTerms: string[];
    /** 도로명 주소 (nullable) */
    address: Nullable<string>;
    /** 성인 인증 여부 */
    adultCertificated: boolean;
    /** 국제전화번호 코드  */
    mobileCountryCode: Nullable<string>;
    /** 성인 인증 일시 (nullable) */
    adultCertificatedYmdt: Nullable<string>;
    /** 성별(F, M) (이관된 회원의 경우 'X'로 들어오는 경우가 있음)(nullable) */
    sex: Nullable<Sex | 'X'>;
    /** 가입 경로(nullable) */
    joinTypeName: Nullable<string>;
    /** 핸드폰 번호 (nullable) */
    mobileNo: Nullable<string>;
    /** 단문메시지서비스(SNS) 거부 일시 (nullable) */
    smsDisagreeYmdt: Nullable<string>;
    /** 로그인 횟수 (nullable) */
    loginCount: Nullable<number>;
    /** 회원 등급 이름 (nullable) */
    memberGradeName: Nullable<string>;
    /** 회원 등급 번호 */
    memberGradeNo: Nullable<number>;
    /** 사업자 등록번호 (nullable) */
    registrationNo: Nullable<string>;
    /** Open Id Key (nullable) */
    oauthIdNo: Nullable<string>;
    /** 도로명 주소 상세 (nullable) */
    detailAddress: Nullable<string>;
    /** 회원 구분 */
    memberType: MemberType;
}

interface CustomTermsAgreement {
    /** 동의 일시 */
    agreementYmdt: string;
    /** 추가 동의 항목 번호 (nullable) */
    customTermsNo?: Nullable<number>;
    /** 동의 타입 */
    termsType:
        | 'MALL_INTRODUCTION'
        | 'USE'
        | 'E_COMMERCE'
        | 'PI_PROCESS'
        | 'PI_COLLECTION_AND_USE_REQUIRED'
        | 'PI_COLLECTION_AND_USE_OPTIONAL'
        | 'PI_PROCESS_CONSIGNMENT'
        | 'PI_THIRD_PARTY_PROVISION'
        | 'PI_COLLECTION_AND_USE_FOR_GUEST_ON_ARTICLE'
        | 'ACCESS_GUIDE'
        | 'WITHDRAWAL_GUIDE'
        | 'PI_SELLER_PROVISION'
        | 'PI_COLLECTION_AND_USE_ON_ORDER'
        | 'ORDER_INFO_AGREE'
        | 'CLEARANCE_INFO_COLLECTION_AND_USE'
        | 'TRANSFER_AGREE';
}

export type CreateProfileResponse = GetProfileResponse;
export interface UpdateProfileData {
    /** 생년월일. yyyyMMdd (nullable) */
    birthday?: string;
    /** 성 (nullable) */
    lastName?: string;
    /** (국내, 해외 겸용) 도시 (nullable) */
    city?: string;
    /** 회사명 (nullable) */
    businessName?: string;
    /** 거주 국가 (nullable) */
    countryCd?: string;
    /** SMS 인증번호 (nullable) */
    smsAuthKey?: string;
    /** 회원 이름 (nullable) */
    memberName?: string;
    /** 우편번호 (nullable) */
    zipCd?: string;
    /** 푸쉬앱 알람 동의 여부 (nullable) */
    pushNotificationAgreed?: boolean;
    /** 비밀번호 (nullable) */
    password?: string;
    /** 이메일 알람 동의 여부 (nullable) */
    directMailAgreed?: boolean;
    /** 추가 정보 - jsonString 형태, server api 조회 시 additionalInfo 로 바이 패스 해줍니다. (nullable) */
    additionalInfo?: string;
    /** 회원 닉네임 (nullable) */
    nickname?: string;
    /** 가입시 동의한 추가 선택 동의 항목 (nullable) */
    customTermsNos?: (boolean | string | number)[];
    /** (국내, 해외 겸용) 국내: 군/구, 해외: 주' (nullable) */
    state?: string;
    /** 이메일 주소 (nullable) */
    email?: string;
    /** 지번 주소 상세 (nullable) */
    jibunDetailAddress?: string;
    /** 도로명 주소 (nullable) */
    address?: string;
    /** 국제전화번호 코드 (nullable) */
    mobileCountryCode?: string;
    /** 인증확인 여부 (nullable) */
    certificated?: boolean;
    /** SMS 알림 동의 여부 (nullable) */
    smsAgreed?: boolean;
    /** 성별 (F:여성/M:남성) (nullable) */
    sex?: Sex;
    /** 지번 주소 (nullable) */
    jibunAddress?: string;
    /** 핸드폰 번호 (nullable) */
    mobileNo?: string;
    /** 환불 계좌 은행 (nullable) */
    refundBank?: string;
    /** 현재 비밀번호 (nullable) */
    currentPassword?: string;
    /** 이름 (nullable) */
    firstName?: string;
    /** 환불 계좌 예금주명 (nullable) */
    refundBankDepositorName?: string;
    /** 전화번호 (nullable) */
    telephoneNo?: string;
    /** 가입시 동의한 선택 동의 항목 */
    joinTermsAgreements?: ShopbyJoinAgreementTypes[];
    /** 도로명주소 상세 (nullable) */
    detailAddress?: string;
    /** 환불 계좌번호 (nullable) */
    refundBankAccount?: string;
    /** 회원 추가항목 목록 */
    extraInfo?: {
        /** 추가항목 옵션 번호 목록 */
        extraInfoOptionNos: (boolean | string | number)[];
        /** 추가항목 옵션 텍스트 답변 내용 */
        extraInfoOptionTextContent?: Nullable<string>;
        /** 추가항목 번호 */
        extraInfoNo: number;
    }[];
}

export interface CreateProfileData {
    /** 생년월일. yyyyMMdd (nullable) */
    birthday?: string;
    /** 성 (nullable) */
    lastName?: string;
    /** (국내, 해외 겸용) 도시 (nullable) */
    city?: string;
    /** 사업자 회원 회사명 (nullable) */
    businessName?: string;
    /** 거주 국가 (nullable) */
    countryCd?: string;
    /** 이름(nullable 하고 firstName, lastName 으로 대체 가능) (nullable) */
    memberName?: string;
    /** 우편번호 (nullable) */
    zipCd?: string;
    /** 푸시 알림 수신 동의 여부 (nullable) */
    pushNotificationAgreed?: boolean;
    /** 비밀번호 */
    password: string;
    /** 추천인 아이디 (nullable) */
    recommenderId?: string;
    /** 관계사 회원 회사번호 (nullable) */
    companyNo?: number;
    /** 이메일 알림 수신 동의 여부 (nullable) */
    directMailAgreed?: boolean;
    /** 추가 정보(JSON) (nullable) */
    additionalInfo?: string;
    /** 닉네임 (nullable) */
    nickname?: string;
    /** 가입시 동의한 추가 선택 동의 항목 (nullable) */
    customTermsNos?: (boolean | string | number)[];
    /** (국내, 해외 겸용) 국내: 군/구, 해외: 주 (nullable) */
    state?: string;
    /** 그룹 번호 (nullable) */
    groupNo?: string;
    /** 이메일 (nullable) */
    email?: string;
    /** 회원 아이디 */
    memberId: string;
    /** 지번주소 상세 (nullable) */
    jibunDetailAddress?: string;
    /** 도로명주소 (nullable) */
    address?: string;
    /** 국제전화번호 코드 (nullable) */
    mobileCountryCode?: string;
    /** 유저가 회원가입 시, 점유인증 했는지 여부 (이메일 or 휴대폰 SMS로 인증번호 발송하여 인증하는 방식을 의미. NHN KCP 휴대폰 본인인증과는 별개) (nullable) */
    certificated?: boolean;
    /** 본인인증 정보 (CI), 이미 NHN KCP 본인인증을 진행한 경우, CI 값 필수입력 (nullable) */
    ci?: string;
    /** SMS 알림 수신 동의 여부 (nullable) */
    smsAgreed?: boolean;
    /** 성별 */
    sex?: Sex;
    /** 지번주소 (nullable) */
    jibunAddress?: string;
    /** openId 액세스 토큰 (nullable) */
    openIdAccessToken?: string;
    /** 휴대폰번호(필수 권장) (nullable) */
    mobileNo?: string;
    /** 이름(성) (nullable) */
    firstName?: string;
    /** 전화번호 (nullable) */
    telephoneNo?: string;
    /** 사업자 회원 사업자등록번호 (nullable) */
    registrationNo?: string;
    /** 가입시 동의한 선택 동의 항목 */
    joinTermsAgreements: JoinTermsAgreement[];
    /** 도로명주소 상세 (nullable) */
    detailAddress?: string;
    /** 회원 추가항목 목록 */
    extraInfo?: {
        /** 추가항목 옵션 번호 목록 */
        extraInfoOptionNos: (boolean | string | number)[];
        /** 추가항목 옵션 텍스트 답변 내용 */
        extraInfoOptionTextContent: string;
        /** 추가항목 번호 */
        extraInfoNo: number;
    }[];
}

export interface DeleteProfileParams {
    /** 탈퇴 사유 */
    reason?: string;
}

export interface UpdateProfileAddressData {
    /** (국내, 해외 겸용) 도시 (nullable) */
    city?: string;
    /** 도로명 주소 (nullable) */
    streetAddress?: string;
    /** 거주 국가 (nullable) */
    countryCode?: string;
    /** 지번 주소 (nullable) */
    jibunAddress?: string;
    /** 우편번호 (nullable) */
    zipCd?: string;
    /** (국내, 해외 겸용) 국내: 군/구, 해외: 주 (nullable) */
    state?: string;
    /** 지번 상세 주소 (nullable) */
    jibunAddressDetail?: string;
    /** 도로명 상세 주소 (nullable) */
    streetAddressDetail?: string;
}

export type GetBlockedMembersParams = Paging;

export interface GetBlockedMembersResponse {
    /** 개수 */
    totalCount: number;
    /** 차단된 사용자 */
    items: {
        /** 차단된 회원 번호  */
        blockedMemberNo: number;
    }[];
}

export interface BlockMemberData {
    /** 차단 대상 회원 번호 */
    blockedMemberNo: number;
}

export interface CreateBrandMemberProfileData {
    /** 선택 동의 항목 (nullable) */
    joinTermsAgreements?: ShopbyJoinAgreementTypes[];
    /** 이메일 알림 수신 동의 여부 (nullable) */
    directMainAgreed?: boolean;
    /** SMS 알림 수신 동의 여부 (nullable) */
    smsAgreed?: boolean;
    /**푸시 알림 수신 동의 여부 (nullable) */
    pushNotificationAgreed?: boolean;
}

export interface CreateBrandMemberProfileResponse extends Omit<
    CreateProfileResponse,
    | 'extraInfo'
    | 'memberGradeNo'
    | 'pushNotificationDisagreeYmdt'
    | 'smsDisagreeYmdt'
    | 'memberGradeImageUrl'
    | 'certificationType'
    | 'recommender'
    | 'registrationNo'
    | 'customTermsAgreement'
    | 'directMailDisagreeYmdt'
> {}

export interface UpdatePasswordByCertificationNoData {
    /** 비밀번호 찾기 방법 */
    findMethod: Exclude<AuthType, 'NONE'>;
    /** 인증번호 */
    certificationNumber: string;
    /** 변경할 비밀번호 */
    newPassword: string;
    /** 본인인증 키 */
    key: string;
    /** 아이디 */
    memberId: string;
}

export interface CheckPasswordData {
    /** 비밀번호 */
    password: string;
}

export interface CheckPasswordResponse {
    message: string;
    key: string;
}

export interface GetDormantAccountResponse {
    /** 최근 접속 일시(nullable) */
    lastLoginDateTime: Nullable<string>;
    /** joinDateTime으로 대체됨. 가입 일시 */
    joinDate: string;
    /** dormantDateTime으로 대체됨. 휴면 전환 일시 */
    dormantDate: string;
    /** 가입 일시 */
    signUpDateTime: string;
    /** 휴면 전환 일시 */
    dormantDateTime: string;
    /** 이름 (nullable) */
    memberName: Nullable<string>;
}

export interface ReleaseDormancyAccountData {
    /** 인증 번호 */
    certificationNumber: string;
    /** 휴대폰 번호 */
    mobileNo: string;
    /** 인증 타입 */
    authType: AuthType;
    /** 이메일 주소 */
    email: string;
}

export interface WithDrawByPasswordData {
    /** 탈퇴 사유 (nullable) */
    reason?: Nullable<string>;
    /** 비밀번호 (Mall 회원의 경우만 필수) (nullable) */
    password?: Nullable<string>;
}

export interface FindIdData {
    /** 성 (nullable) */
    lastName?: string;
    /** 이름 (nullable) */
    firstName?: string;
    /** 아이디 찾기 방법 */
    findMethod: AuthType;
    /** 인증번호 (nullable) */
    certificationNo?: string;
    /** 이름 (nullable) */
    memberName?: string;
    /** 휴대폰번호 */
    mobileNo?: string;
    /** 이메일 주소 */
    email?: string;
    /** 본인인증 키 */
    key?: string;
}

export interface FindIdInfo {
    /** 이름 */
    memberName: string;
    /** 가입일시 */
    joinYmdt: string;
    /** 휴대폰번호 */
    mobileNo: string;
    /** 아이디 혹은 오픈아이디 타입 */
    id: string;
    /** 이메일주소 */
    email: string;
    /** 회원 상태, WAITING: 가입대기, ACTIVE: 가입완료, WITHDRAWN: 회원 탈퇴, FREEZE: 휴면, DORMANT: 휴면, PAUSED: 일시 이용정지,  PENDING: 승인대기 */
    status: MemberStatsType;
}

export type FindIdResponse = FindIdInfo[];

export interface FindPasswordData {
    /** 비밀번호 변경 화면 uri */
    uri: string;
    /** 추가로 전달할 내용 (nullable) */
    content?: string;
    /** 회원 ID */
    memberId: string;
}

export interface FindPasswordResponse {
    /** 휴대전화 번호 */
    mobileNo: string;
    /** 패스워드 변경 메일 수신 이메일 */
    email: string;
}

export interface GetGradeResponse {
    /** 등급 이미지 URL */
    memberGradeImageUrl?: string;
    /** 적립금 자동지급 */
    reserveAutoSupplying: {
        /** 적립금 자동지급 적립금액 */
        amount: number;
        /** 적립금 자동지급 사용여부 */
        used: boolean;
        /** 적립금 자동지급 유형 */
        type: SupplyType;
    };
    /** 회원 등급 평가 조건 */
    evaluationCondition: {
        /** 최소 구매 금액 */
        minimumPayment: number;
        /** 최소 구매 횟수 */
        minimumCount: number;
    };
    /** 회원 등급에 발급된 쿠폰 */
    coupons: {
        /** 쿠폰 발급 유형 */
        issueType: CouponIssueType;
        /** 최대 할인금액 (정률할인시) */
        maximumDiscountAmount: number;
        /** 쿠폰 이름 */
        couponName: string;
        /** 할인률 (정률할인시) */
        discountPercent: number;
        /** 할인금액 (정액할인시) */
        discountAmount: number;
        /** 쿠폰 할인 유형 */
        discountType: DiscountType;
        /** 쿠폰 번호 */
        couponNo: number;
    }[];
    /** 등급 설명 */
    description: string;
    /** 등급명 */
    label: string;
    /** 적립금 혜택 */
    reserveBenefit: {
        /** 적립금 혜택 적립률 */
        reserveRate: number;
        /** 적립금 혜택 사용여부 */
        used: boolean;
    };
}

export interface FindIdByCertificationParams {
    /** 법인번호 */
    companyNo?: number;
    /** 이름 (쇼핑몰 회원가입 정보 설정에서 회원명을 사용함 또는 필수로 지정한 경우 필수입력) */
    memberName?: string;
    /** 휴대전화 번호 (SMS 인증 찾기로 인증번호 전송시 입력) */
    mobileNo?: string;
    /** 이메일 (이메일 찾기로 인증번호 전송시 입력) */
    email?: string;
    /** CI */
    ci?: string;
    /** 인증번호 */
    certificationNumber?: string;
}

export interface FindIdByCertification {
    /** 회원명 */
    memberName: string;
    /** 가입일 */
    joinYmdt: string;
    /** 휴대전화 번호 */
    mobileNo: string;
    /** 아이디 */
    id: string;
    /** 이메일 */
    email: string;
    /** 회원 상태 (대기: WAITING, 가입완료: ACTIVE, 휴면: FREEZE or DORMANT, 이용정지: PAUSED */
    status: MemberStatsType;
}

export type FindIdByCertificationResponse = FindIdByCertification[];

export interface UpdateIdData {
    /** 이메일 변경 여부 ( true : 이메일 변경 함 (이메일 주소로 newMemberId값으로 변경) , false : 이메일 변경 안함) */
    updatesEmail: boolean;
    /** 회원 ID */
    currentMemberId: string;
    /** 변경할 회원 ID */
    newMemberId: string;
    /** 인증번호 */
    certificationNumber: string;
}

export interface GetNextGradeResponse {
    /** 회원 등급 평가 조건 */
    gradeEvaluationConfig?: GradeEvaluationConfig;
    /** 현재 등급 번호 */
    currentGradeNo: number;
    /** 다음 등급 번호 */
    nextGradeNo: number;
    /** 현재 실적 */
    currentPerformance: CurrentPerformance;
    /** 다음 예상 등급 평가일 (nullable) */
    nextGradeEvaluationDate?: string;
}

export interface GradeEvaluationConfig {
    /** 회원 등급 평가 조건 */
    evaluationCondition?: EvaluationCondition;
    /** 회원 등급 평가 기간 */
    evaluationPeriod: number;
    /** 회원 등급 유지 조정일 */
    dayOfAdjustment: number;
    /** 회원 등급 유지 기간 */
    validPeriod: number;
    /** 회원 등급 평가 상세 조건 */
    evaluationDetailCondition?: EvaluationDetailCondition;
}

export interface CurrentPerformance {
    orderAmount: number;
    orderCount: number;
}

export interface GetNonMaskingMemberData {
    /** 비밀번호 */
    password: string;
}

export type GetNonMaskingMemberResponse = Omit<GetProfileResponse, 'mallName'>;

export interface SignUpByOpenIdData {
    /** 생년월일 (nullable) */
    birthday?: string;
    /** 성 (nullable) */
    lastName?: string;
    /** 도로명주소 (nullable) */
    address?: string;
    /** 국제전화번호 코드 (nullable) */
    mobileCountryCode?: string;
    /** 인증확인 여부 (nullable) */
    certificated?: boolean;
    /** (국내, 해외 겸용) 도시 (nullable) */
    city?: string;
    /** SMS 알림 수신 동의 여부 (nullable) */
    smsAgreed?: boolean;
    /** 성별 (nullable) */
    sex?: string;
    /** 지번주소 (nullable) */
    jibunAddress?: string;
    /** 이름 (nullable) */
    memberName?: string;
    /** 우편번호 (nullable) */
    zipCd?: string;
    /** 휴대폰번호 (nullable) */
    mobileNo?: string;
    /** 푸시 알림 수신 동의 여부 (nullable) */
    pushNotificationAgreed?: boolean;
    /** 이름 (nullable) */
    firstName?: string;
    /** 전화번호 (nullable) */
    telephoneNo?: string;
    /** 선택 동의 항목 (nullable) */
    joinTermsAgreements?: ShopbyJoinAgreementTypes[];
    /** 이메일 알림 수신 동의 여부 (nullable) */
    directMailAgreed?: boolean;
    /** 닉네임 (nullable) */
    nickname?: string;
    /** 도로명주소 상세 (nullable) */
    detailAddress?: string;
    /** 추가 선택 동의 항목 (nullable) */
    customTermsNos?: number[];
    /** (국내, 해외 겸용) 국내: 군/구, 해외: 주 (nullable) */
    state?: string;
    /** 이메일 (nullable) */
    email?: string;
    /** 지번주소 상세 (nullable) */
    jibunDetailAddress?: string;
}

export interface SignUpByOpenIdResponse {
    /** 생년월일 (nullable) */
    birthday: Nullable<string>;
    /** 쇼핑몰 이름 */
    mallName: Nullable<string>;
    /** (국내, 해외 겸용) 도시 (nullable) */
    city: Nullable<string>;
    /** 거주 국가 (nullable) */
    countryCd: Nullable<string>;
    /** 회원 상태 */
    memberStatus: Nullable<string>;
    /** 회원 이름 (nullable) */
    memberName: Nullable<string>;
    /** 우편번호 (nullable) */
    zipCd: Nullable<string>;
    /** 푸시 알림 동의 여부 */
    pushNotificationAgreed: Nullable<boolean>;
    /** 본인인증 여부 */
    principalCertificated: Nullable<boolean>;
    /** 마지막으로 연동된 외부 IDP(nullable) */
    providerType: Nullable<string>;
    /** 최근 접속 IP(nullable) */
    lastLoginIp: Nullable<string>;
    /** 이메일 알림 동의 일시 */
    directMailAgreeYmdt: string;
    /** 이메일 알림 동의 여부 */
    directMailAgreed: boolean;
    /** 추가정보(nullable) */
    additionalInfo: Nullable<string>;
    /** 닉네임 (nullable) */
    nickname: Nullable<string>;
    /** 그룹 목록 */
    memberGroups: {
        /** 그룹 이름 */
        memberGroupName: string;
        /** 그룹 설명 */
        memberGroupDescription: string;
        /** 그룹 번호 */
        memberGroupNo: number;
    }[];
    /** 가입일시01-25 14:54) */
    joinYmdt: string;
    /** (국내, 해외 겸용) 국내: 군/구, 해외: 주 (nullable) */
    state: Nullable<string>;
    /** 이메일 (nullable) */
    email: Nullable<string>;
    /** 선택 동의 항목 정보 */
    agreedTermsInfos: {
        /** 동의일시 */
        agreementYmdt: string;
        /** 추가 동의 항목 번호 (nullable) */
        customTermsNo: Nullable<string>;
        /** 선택 동의 유형 */
        termsType: ShopbyJoinAgreementTypes;
    }[];
    /** 지번주소 상세 (nullable) */
    jibunDetailAddress: Nullable<string>;
    /** 회원 아이디 (nullable) */
    memberId: Nullable<string>;
    /** @deprecated 선택 동의 항목 정보 */
    agreedTerms: string;
    /** 최근 접속시각 */
    lastLoginYmdt: string;
    /** 도로명주소 (nullable) */
    address: Nullable<string>;
    /** 성인인증 여부 */
    adultCertificated: boolean;
    /** SMS 알림 동의 여부 */
    smsAgreed: boolean;
    /** 성인인증 일시 */
    adultCertificatedYmdt: string;
    /** 성별 (nullable) */
    sex: Nullable<string>;
    /** 연동된 간편로그인 서비스 */
    providerTypes: ProviderType[];
    /** 가입 경로 (nullable) */
    joinTypeName: Nullable<string>;
    /** 지번주소 (nullable) */
    jibunAddress: Nullable<string>;
    /** SMS 알림 동의 일시 */
    smsAgreeYmdt: string;
    /** 휴대폰번호 (nullable) */
    mobileNo: Nullable<string>;
    /** 로그인 횟수 */
    loginCount: number;
    /** 환불 계좌 은행 (nullable) */
    refundBank: Nullable<string>;
    /** 회원번호 */
    memberNo: number;
    /** 환불 계좌 예금주명 (nullable) */
    refundBankDepositorName: Nullable<string>;
    /** 등급 이름 */
    memberGradeName: string;
    /** 전화번호 (nullable) */
    telephoneNo: Nullable<string>;
    /** IDP 아이디 (nullable) */
    oauthIdNo: Nullable<string>;
    /** 도로명주소 상세 (nullable) */
    detailAddress: Nullable<string>;
    /** 푸시 알림 동의 일시 */
    pushNotificationAgreeYmdt: string;
    /** 회원 유형 */
    memberType: string;
    /** 환불 계좌번호 (nullable) */
    refundBankAccount: Nullable<string>;
    /** 전체 그룹 이름(, 로 구분) */
    memberGroupNames: string;
}

export interface UpdatePasswordData {
    /** 변경할 비밀번호 (willChangeNextTime true이면 넣지 않아도 됨) (nullable) */
    newPassword?: string;
    /** 다음에 변경 여부 */
    willChangeNextTime: boolean;
    /** 기존 비밀번호 */
    currentPassword: string;
}

export interface UpdateProfileByCertificationData {
    /** 본인인증 확인 키 */
    key: string;
}

export interface ReportMemberData {
    /** 신고 타입 */
    accusedMemberNo: number;
    /** 신고 대상 번호 */
    reportType: ReportType;
    /** 신고 내용 */
    reportReason: string;
}
export interface SynchronizeProfileData {
    /** 비밀번호 */
    password: string;
    /** 회원 아이디 */
    id: string;
}

export interface SynchronizeProfileResponse {
    /** 액세스 토큰 만료시간 */
    expiresIn: number;
    /** 리프레시 토큰 만료시간 (nullable) */
    refreshTokenExpiresIn: Nullable<number>;
    /** 액세스 토큰 */
    accessToken: string;
    /** 토큰 타입 (nullable) */
    tokenType: Nullable<string>;
    /** 리프레시 토큰 (nullable) */
    refreshToken: Nullable<string>;
}

export interface CheckDuplicateCIParams {
    /** CI */
    ci: string;
}

export interface CheckDuplicateCIResponse {
    /** 존재 여부, true면 중복 */
    exist: boolean;
    /** 회원 상태 (대기: WAITING, 가입완료: ACTIVE, 휴면: FREEZE or DORMANT, 이용정지: PAUSED, 탈퇴 : WITHDRAWN) (nullable) */
    status: Nullable<Exclude<MemberStatsType, 'PENDING'>>;
}

export interface CheckDuplicateMySelfResponse {
    /** 일치 여부, true면 일치 */
    matched: boolean;
}

export interface CheckDuplicateEmailParams {
    /** 회원 이메일 주소 */
    email: string;
    /** 회원유형 리스트 (기본 - 쇼핑몰 회원(MALL) */
    memberTypes?: MemberType | 'PAYCO'; // 페이코 회원
}

export interface CheckDuplicateEmailResponse {
    /** 존재 여부, true면 중복 */
    exist: boolean;
    /** 회원 상태 (대기: WAITING, 가입완료: ACTIVE, 휴면: FREEZE or DORMANT, 이용정지: PAUSED, 탈퇴 : WITHDRAWN) (nullable) */
    status: Nullable<MemberStatsType>;
}

export interface CheckDuplicateExternalMemberData {
    /** IdP(Identity Provider, 아이디 제공자) 엑세스 토큰 */
    openAccessToken: string;
}

export interface CheckDuplicateExternalMemberResponse {
    /** 메일 발송 대상 이메일^|true */
    result: string;
}

export interface CheckDuplicateExternalEmailParams {
    /** IdP(Identity Provider, 아이디 제공자) 엑세스 토큰 */
    openAccessToken: string;
}

export interface CheckDuplicateExternalEmailResponse {
    /** 메일 발송 대상 이메일 */
    result: string;
}

export interface SendUpdateIdEmailData {
    /** 아이디 변경 화면 url */
    url: string;
}

export interface SendUpdateIdEmailResponse {
    /** 메일 발송 대상 이메일 */
    result: string;
}

export interface CheckDuplicateIdParams {
    /** 회원 ID */
    memberId: string;
}
export interface CheckDuplicateIdResponse {
    /** 존재 여부, true면 중복 */
    exist: boolean;
    /** 회원 상태 (대기: WAITING, 가입완료: ACTIVE, 휴면: FREEZE or DORMANT, 이용정지: PAUSED, 탈퇴 : WITHDRAWN) (nullable) */
    status: Nullable<MemberStatsType>;
}

export interface GetExtraInfosParams {
    /** 회원번호 목록  */
    memberNos: number[];
}

export interface GetExtraInfosResponse {
    memberSummaryExtraInfos: MemberSummaryExtraInfo[];
}

export interface MemberSummaryExtraInfo {
    /** 회원 추가항목 목록 */
    memberExtraInfos: MemberExtraInfo[];
    /** 회원 번호 */
    memberNo: number;
}

export interface MemberExtraInfo {
    /** 추가항목 명 */
    extraInfoName: string;
    /** 추가항목 텍스트 내용 */
    extraInfoTextContent?: string;
    /** 추가항목 옵션 목록 */
    extraInfoOptionNames: string[];
}

export interface CheckDuplicateMobileNoParams {
    /** 휴대전화 번호  */
    mobileNo: string;
}

export interface CheckDuplicateMobileNoResponse {
    /** 번호 존재 여부, true면 중복 */
    mobileNoExist: boolean;
    /** 해당 휴대폰 번호로 등록되어있는 마스킹된 회원 ID */
    memberId: string;
    status: MemberStatsType;
}

export interface CheckDuplicateMobileNoResponse {
    /** 번호 존재 여부, true면 중복 */
    mobileNoExist: boolean;
    /** 해당 휴대폰 번호로 등록되어있는 마스킹된 회원 ID */
    memberId: string;
}

export interface CheckDuplicateNicknameParams {
    /** 회원 닉네임 */
    nickname: string;
}

export interface CheckDuplicateNicknameResponse {
    /** 존재 여부 */
    exist: boolean;
    /** 회원 상태 (nullable) */
    status: Nullable<MemberStatsType>;
}

export interface GetMaskingAccountInfoParams {
    /** 검색할 회원 아이디 */
    memberId: string;
}

export interface GetMaskingAccountInfoResponse {
    /** 회원번호 */
    memberNo: number;
    /** 본인인증 식별정보 유무 */
    hasCI: boolean;
    /** 이름 */
    name: string;
    /** 휴대폰번호 */
    mobileNo: string;
    /** 이메일 */
    email: string;
    /** 회원 상태, WAITING: 가입대기, ACTIVE: 가입완료, WITHDRAWN: 회원 탈퇴, FREEZE: 휴면, DORMANT: 휴면, PAUSED: 일시 이용정지 */
    status: MemberStatsType;
}

export interface SendUpdatePasswordEmailData {
    /** 추가로 전달할 내용(nullable) */
    content?: string;
    /** 비밀번호 변경 화면 uri */
    url: string;
    /** 회원 ID */
    memberId: string;
}

export interface CheckDuplicateMemberByEmailParams {
    /** 아이디 */
    memberId: string;
    /** 이름 */
    memberName: string;
    /** 이메일 */
    email: string;
}

export interface CheckDuplicateMemberByEmailResponse {
    /** 존재 여부, true면 중복 */
    exist: boolean;
    /** 회원 상태 (대기: WAITING, 가입완료: ACTIVE, 휴면: FREEZE or DORMANT, 이용정지: PAUSED, 탈퇴 : WITHDRAWN) (nullable) */
    status: Nullable<MemberStatsType>;
}

export interface CheckDuplicateMemberByMobileParams {
    /** 아이디 */
    memberId: string;
    /** 이름 */
    memberName: string;
    /** 휴대폰 번호 */
    mobileNo: string;
}

export interface CheckDuplicateMemberByMobileResponse {
    /** 존재 여부, true면 중복 */
    exist: boolean;
    /** 회원 상태 (대기: WAITING, 가입완료: ACTIVE, 휴면: FREEZE or DORMANT, 이용정지: PAUSED, 탈퇴 : WITHDRAWN) (nullable) */
    status: Nullable<MemberStatsType>;
}

export interface UpdatePasswordByCertificationKeyData {
    /** 변경할 비밀번호 */
    newPassword: string;
    /** 본인인증 키 */
    key: string;
}

export interface UpdatePasswordByEmailCertificationData {
    /** 인증번호 */
    certificationNumber: string;
    /** 변경할 비밀번호 */
    newPassword: string;
    /** 변경 대상 아이디 */
    memberId: string;
}

export interface UpdatePasswordBySMSCertificationData {
    /** 인증번호 */
    certificationNumber: string;
    /** 변경할 비밀번호 */
    newPassword: string;
    /** 변경 대상 아이디 */
    memberId: string;
}
