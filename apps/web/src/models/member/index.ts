import { MemberStatsType, Sex, ShopbyJoinAgreementTypes } from '@/models';

export interface ProfileBody {
    birthday?: string;
    address?: string;
    certificated?: boolean;
    smsAgreed?: boolean;
    sex?: Sex;
    smsAuthKey?: string;
    memberName?: string;
    jibunAddress?: string;
    zipCd?: string;
    mobileNo?: string;
    pushNotificationAgreed?: boolean;
    refundBank?: string;
    currentPassword?: string;
    refundBankDepositorName?: string;
    password?: string;
    telephoneNo?: string;
    directMailAgreed?: boolean;
    joinTermsAgreements?: ShopbyJoinAgreementTypes[]; // TODO: 회원가입 API 분리시 타입 재정의 필요
    additionalInfo?: string;
    nickname?: string;
    detailAddress?: string;
    refundBankAccount?: string;
    email?: string;
    jibunDetailAddress?: string;
    firstName?: string;
    lastName?: string;
    openIdAccessToken?: string;
    ci?: string;
    recommenderId?: string;
    countryCd?: string;
    groupNo?: number;
    memberId: string;
}

export interface GetMaskingAccountInfoResponse {
    memberNo: number;
    /** 회원 상태, WAITING: 가입대기, ACTIVE: 가입완료, WITHDRAWN: 회원 탈퇴, FREEZE: 휴면, DORMANT: 휴면, PAUSED: 일시 이용정지 */
    status: Exclude<MemberStatsType, 'PENDING'>;
    /** 이름 */
    name: string;
    mobileNo: string;
    email: string;
    /** 본인인증 식별정보 유무 */
    hasCI: boolean;
}
