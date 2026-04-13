import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import {
    BlockMemberData,
    CheckDuplicateCIParams,
    CheckDuplicateCIResponse,
    CheckDuplicateEmailParams,
    CheckDuplicateEmailResponse,
    CheckDuplicateExternalMemberData,
    CheckDuplicateExternalMemberResponse,
    CheckDuplicateIdParams,
    CheckDuplicateIdResponse,
    CheckDuplicateMemberByEmailParams,
    CheckDuplicateMemberByEmailResponse,
    CheckDuplicateMemberByMobileParams,
    CheckDuplicateMemberByMobileResponse,
    CheckDuplicateMobileNoParams,
    CheckDuplicateMobileNoResponse,
    CheckDuplicateMySelfResponse,
    CheckDuplicateNicknameParams,
    CheckDuplicateNicknameResponse,
    CheckPasswordData,
    CreateBrandMemberProfileData,
    CreateProfileData,
    CreateProfileResponse,
    DeleteProfileParams,
    FindIdByCertificationParams,
    FindIdByCertificationResponse,
    FindIdData,
    FindIdResponse,
    FindPasswordData,
    FindPasswordResponse,
    GetBlockedMembersParams,
    GetBlockedMembersResponse,
    GetDormantAccountResponse,
    GetExtraInfosParams,
    GetExtraInfosResponse,
    GetGradeResponse,
    GetMaskingAccountInfoParams,
    GetMaskingAccountInfoResponse,
    GetNonMaskingMemberData,
    GetNonMaskingMemberResponse,
    GetProfileResponse,
    ReleaseDormancyAccountData,
    ReportMemberData,
    SendUpdateIdEmailData,
    SendUpdateIdEmailResponse,
    SendUpdatePasswordEmailData,
    SignUpByOpenIdData,
    SignUpByOpenIdResponse,
    SynchronizeProfileData,
    SynchronizeProfileResponse,
    UpdateIdData,
    UpdatePasswordByCertificationKeyData,
    UpdatePasswordByCertificationNoData,
    UpdatePasswordByEmailCertificationData,
    UpdatePasswordBySMSCertificationData,
    UpdatePasswordData,
    UpdateProfileAddressData,
    UpdateProfileByCertificationData,
    UpdateProfileData,
    WithDrawByPasswordData,
} from '@/models/member/profile';

const profile = {
    /**
     * 회원정보 조회하기
     *  - 회원 정보를 조회합니다
     */
    getProfile: (options?: AxiosRequestConfig) => {
        return shopbyRequest<GetProfileResponse>({
            method: 'GET',
            url: '/profile',
            ...options,
        });
    },

    /**
     * 회원정보 수정하기
     *  - 회원정보를 수정합니다.
     *  - V1.1 - 회원의 현재 비밀번호를 입력받아 비밀번호 확인을 한 후 회원의 정보를 수정합니다. 리퀘스트는 Examples에서 확인해주세요
     */
    updateProfile: (data: UpdateProfileData, options?: AxiosRequestConfig) => {
        return shopbyRequest({
            method: 'PUT',
            url: '/profile',
            data,
            headers: {
                ...options?.headers,
                version: '1.1',
            },
        });
    },

    /**
     * 프로필 생성하기
     *  - 회원 프로필 등록 시 사용하는 API 입니다
     */
    createProfile: (data: CreateProfileData, options?: AxiosRequestConfig) => {
        return shopbyRequest<CreateProfileResponse>({
            method: 'POST',
            url: '/profile',
            data,
            ...options,
        });
    },

    /**
     * 회원 탈퇴하기
     *  - 회원 탈퇴 시 사용하는 API 입니다
     */
    deleteProfile: (
        params: DeleteProfileParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'DELETE',
            url: '/profile',
            params,
            ...options,
        });
    },

    /**
     * 프로필 주소 변경하기
     *  - 회원의 주소를 변경하는 API 입니다
     */
    updateProfileAddress: (
        data: UpdateProfileAddressData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'PUT',
            url: '/profile/address',
            data,
            ...options,
        });
    },

    /**
     * 차단된 회원 조회하기
     *  - 내가 차단한 회원의 목록을 조회합니다.
     */
    getBlockedMembers: (
        params: GetBlockedMembersParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetBlockedMembersResponse>({
            method: 'GET',
            url: '/profile/blocked-members',
            params,
            ...options,
        });
    },

    /**
     * 회원 차단하기
     *  - 회원을 차단합니다. 차단 시 즉시 차단한 회원이 작성한 상품평, 게시글, 1:1 문의 등의 내용을 차단합니다.
     */
    blockMember: (data: BlockMemberData, options?: AxiosRequestConfig) => {
        return shopbyRequest({
            method: 'POST',
            url: '/profile/blocked-members',
            data,
            ...options,
        });
    },

    /**
     *  브랜드 회원 회원가입 처리하기
     *  - 브랜드 회원의 회원 가입 처리 API입니다.
     *  - 브랜드 로그인으로 서브몰에서 최초 로그인한 회원인 경우 위 API를 호출하여 가입 완료 처리를 해야합니다.
     *  - 가입 처리시 약관 및 수신 동의 여부를 받을 수 있습니다.
     */
    createBrandMemberProfile: (
        data: CreateBrandMemberProfileData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'POST',
            url: '/profile/brand-oauth',
            data,
            ...options,
        });
    },

    /**
     * 비밀번호 변경
     *  - 회원 인증 후 비밀번호를 변경합니다. 기존에 사용중이던 비밀번호와 동일한 비밀번호로 변경할 수 없습니다
     */
    updatePasswordByCertificationNo: (
        data: UpdatePasswordByCertificationNoData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'POST',
            url: '/profile/change-password-after-cert',
            data,
            ...options,
        });
    },

    /**
     * 비밀번호 확인하기
     *  - 현재 로그인한 사용자가 맞는지 비밀번호를 한번 더 체크할 때 사용하는 API 입니다
     */
    checkPassword: (data: CheckPasswordData, options?: AxiosRequestConfig) => {
        return shopbyRequest({
            method: 'POST',
            url: '/profile/check-password',
            data,
            ...options,
        });
    },

    /**
     * 휴면 회원 조회하기
     *  - 휴면 해제 화면에 노출할 휴면 계정 정보를 조회합니다
     */
    getDormantAccount: (options?: AxiosRequestConfig) => {
        return shopbyRequest<GetDormantAccountResponse>({
            method: 'GET',
            url: '/profile/dormancy',
            ...options,
        });
    },

    /**
     * 휴면 해제하기
     *  - 회원의 휴면 상태를 해제합니다
     */
    releaseDormancyAccount: (
        data: ReleaseDormancyAccountData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'PUT',
            url: '/profile/dormancy',
            data,
            ...options,
        });
    },

    /**
     * 비밀번호 검증 후 회원 탈퇴하기
     *  - 쇼핑몰 회원일 경우 비밀번호 검증 후 회원 탈퇴합니다
     */
    withDrawByPassword: (
        data: WithDrawByPasswordData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'PUT',
            url: '/profile/expel',
            data,
            ...options,
        });
    },

    /**
     * 아이디 찾기
     *  - 회원가입시 입력한 정보로 내 아이디를 검색합니다
     *      - 운영자가 이름을 필수 항목으로 설정한 경우 회원 이름을 같이 전달해야합니다
     *      - 운영자가 인증번호 확인을 필수로 설정한 경우 인증번호를 같이 전달해야합니다
     *      - 인증번호 확인 또는 휴대폰 본인인증을 사용하지 않은 경우 아이디, 이름, 휴대폰번호, 이메일은 마스킹된 결과가 노출됩니다
     */
    findId: (data: FindIdData, options?: AxiosRequestConfig) => {
        return shopbyRequest<FindIdResponse>({
            method: 'POST',
            url: '/profile/find-id',
            data,
            ...options,
        });
    },

    /**
     * 비밀번호 찾기
     *  - 회원 정보의 이메일로 비밀번호 재설정 주소 전달
     */
    findPassword: (data: FindPasswordData, options?: AxiosRequestConfig) => {
        return shopbyRequest<FindPasswordResponse>({
            method: 'POST',
            url: '/profile/find-password',
            data,
            ...options,
        });
    },

    /**
     *  내 등급 조회하기
     *  - 내 등급 정보를 가져옵니다.
     */
    getGrade: (options?: AxiosRequestConfig) => {
        return shopbyRequest<GetGradeResponse>({
            method: 'GET',
            url: '/profile/grade',
            ...options,
        });
    },

    /**
     * 아이디 찾기 v1.1
     *  - 모바일 or 이메일 인중 후 아이디를 조회할 수 있는 API 입니다 (version 1.1)
     */
    findIdByCertification: (
        params: FindIdByCertificationParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<FindIdByCertificationResponse>({
            method: 'GET',
            url: '/profile/id',
            params,
            ...options,
        });
    },

    /**
     * 회원 아이디 변경하기
     *  - 인증 후 회원 아이디를 변경할 수 있는 API 입니다
     */
    updateId: (data: UpdateIdData, options?: AxiosRequestConfig) => {
        return shopbyRequest({
            method: 'PUT',
            url: '/profile/id',
            data,
            ...options,
        });
    },

    /**
     * 마스킹 해제된 회원정보 조회하기
     *  - 비밀번호 인증으로 마스킹 해제된 회원정보를 조회합니다 (mallName은 조회되지 않습니다)
     */
    getNonMaskingMember: (
        data: GetNonMaskingMemberData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetNonMaskingMemberResponse>({
            method: 'POST',
            url: '/profile/non-masking',
            data,
            ...options,
        });
    },

    /**
     * 오픈 아이디 회원가입 처리하기
     *  - 오픈 아이디를 사용한 회원 가입 처리입니다
     *  - 간편 로그인으로 신규 가입을 하는 회원인 경우 위 API를 호출하여 가입 완료 처리를 해야합니다
     *  - 가입 처리시 추가적인 사용자 정보를 받을 수 있습니다
     *  - 카카오싱크 회원의 경우 약관은 카카오싱크 연동과 동시에 저장되기 때문에 joinTermsAgreements는 null로 보내주시면 됩니다
     */
    signUpByOpenId: (
        data: SignUpByOpenIdData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<SignUpByOpenIdResponse>({
            method: 'POST',
            url: '/profile/openid',
            data,
            ...options,
        });
    },

    /**
     * 비밀번호 변경하기
     *  - 인증이 완료된 사용자의 비밀번호를 변경합니다 (version 1.1)
     */
    updatePassword: (
        data: UpdatePasswordData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'PUT',
            url: '/profile/password',
            data,
            ...options,
            headers: {
                ...options?.headers,
                version: '1.1',
            },
        });
    },

    /**
     * NHN KCP 본인인증으로 회원 개인정보 갱신하기
     *  - 기존에 NHN KCP 본인인증을 안 한 회원이 본인인증 진행 시 개인정보를 갱신할 수 있습니다
     *  - NHN KCP에서 보내준 본인인증 확인키를 파라미터로 보내, 회원의 이름/성별/생년월일/CI 등의 정보를 본인인증 정보로 업데이트합니다 (※ 본인인증 키는 KCP 본인확인 절차를 참고바랍니다)
     *  - 단, 만약 이미 동일한 실명으로 인증된 회원이 있을 경우 본인인증 정보가 갱신되지 않습니다
     */
    updateProfileByCertification: (
        data: UpdateProfileByCertificationData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'POST',
            url: '/profile/rename',
            data,
            ...options,
        });
    },

    /**
     * 회원 신고하기
     * 회원을 신고합니다.
     */
    reportMember: (data: ReportMemberData, options?: AxiosRequestConfig) => {
        return shopbyRequest({
            method: 'POST',
            url: '/profile/report',
            data,
            ...options,
        });
    },

    /**
     * 기존 회원을 오픈 아이디 회원으로 전환하기(카카오싱크 전용)
     *  - 기존 회원을 오픈 아이디 회원으로 전환합니다.
     *  - 오픈 아이디 회원으로 가입시, 같은 이메일을 가진 기존 일반 회원을 합칠 때 사용합니다.
     *  - 일반 회원에서 오픈 아이디 회원으로 전환이 완료되면 가입 완료 처리가 됩니다.
     *  - 전환 완료시, 기존 토큰은 만료처리되고 새로운 토큰이 발급됩니다.
     *  - 이후, ID/PW 로그인을 불가능하며 전환한 오픈 아이디 회원으로 로그인이 가능합니다.
     *  - 현재는 카카오싱크 회원만 지원합니다.
     */
    synchronizeProfile: (
        data: SynchronizeProfileData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<SynchronizeProfileResponse>({
            method: 'POST',
            url: '/profile/synchronize',
            data,
            ...options,
        });
    },

    /**
     * CI 중복확인하기
     *  - 쇼핑몰에 동일한 CI를 사용중인 회원이 있는지 확인합니다. 현재 회원이 로그인중인 경우, 엑세스 토큰을 함께 전달하면 본인을 제외하고 동일한 CI를 사용중인 회원이 있는지 확인합니다
     *  - 휴대폰 본인인증을 사용하는 경우 여러 사용자가 동일한 CI로 회원가입할 수 없습니다. 회원가입 / 수정 전 CI를 반드시 확인해주세요
     *  - ci는 특수문자를 포함하고 있기때문에, 인코딩을 한 뒤에 전달해야합니다
     */
    checkDuplicateCI: (
        params: CheckDuplicateCIParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<CheckDuplicateCIResponse>({
            method: 'GET',
            url: '/profile/ci/exists',
            params,
            ...options,
        });
    },

    /**
     * CI 일치 확인하기
     *  - 쇼핑몰 회원의 CI와 요청 CI 값이 일치하는지 확인합니다. 엑세스 토큰을 함께 전달하여 본인의 CI 값과 요청 CI를 비교하여 일치하는지 확인합니다.
     *  - 요청 CI 값은 KCP 본인인증 결과 조회하기 API Response 객체의 CI 값을 이용합니다.
     *  - CI는 특수문자를 포함하고 있기때문에, URL 인코딩 을 한 뒤에 전달해야합니다.
     */
    checkDuplicateCIMySelf: (
        params: { ci: string },
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<CheckDuplicateMySelfResponse>({
            method: 'GET',
            url: '/profile/ci/myself',
            params,
            ...options,
        });
    },

    /**
     * 해당 쇼핑몰에 이메일 중복여부 체크하기
     *  - 해당 쇼핑몰에 입력한 이메일을 가진 회원이 있는지 확인합니다. true가 회신되는 경우 이미 해당 이메일로 가입한 회원이 존재합니다. (이메일 중복 입력)
     */
    checkDuplicateEmail: (
        params: CheckDuplicateEmailParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<CheckDuplicateEmailResponse>({
            method: 'GET',
            url: '/profile/email/exist',
            params,
            ...options,
        });
    },

    /**
     * 외부회원 중복확인하기
     *  - 전달 받은 openAccessToken을 활용하여 해당 토큰에 해당하는 회원이 이미 가입되어있는지 확인합니다. 외부회원연동을 사용하는 몰에서만 사용가능합니다.
     */
    checkDuplicateExternalMember: (
        data: CheckDuplicateExternalMemberData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<CheckDuplicateExternalMemberResponse>({
            method: 'POST',
            url: '/profile/external-member/exist',
            data,
            ...options,
        });
    },

    /**
     * ID 변경 메일 발송하기
     *  - ID를 변경할 수 있는 내용을 첨부한 email을 발송하는 API 입니다
     */
    sendUpdateIdEmail: (
        data: SendUpdateIdEmailData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<SendUpdateIdEmailResponse>({
            method: 'POST',
            url: '/profile/id/email',
            data,
            ...options,
        });
    },

    /**
     * 해당 쇼핑몰에 아이디 중복여부 체크하기
     *  - 해당 쇼핑몰에 입력한 아이디로 가진 회원이 있는지 확인합니다. true가 회신되는 경우 이미 해당 아이디로 가입한 회원이 존재합니다 (아이디 중복 입력)
     */
    checkDuplicateId: (
        params: CheckDuplicateIdParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<CheckDuplicateIdResponse>({
            method: 'GET',
            url: '/profile/id/exist',
            params,
            ...options,
        });
    },

    /**
     * 회원별 추가항목 조회
     *  - 회원별 추가항목 정보를 조회합니다. 추가항목 공개여부가 Y 인 항목들만 조회가 가능합니다.
     */
    getExtraInfos: (
        params: GetExtraInfosParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetExtraInfosResponse>({
            method: 'GET',
            url: '/profile/member/extra-infos',
            params,
            ...options,
        });
    },

    /**
     * 해당 쇼핑몰에 휴대폰 번호 중복여부 확인하기
     *  - 해당 쇼핑몰에 입력한 휴대폰번호가 있는지 확인하는 API 입니다
     */
    checkDuplicateMobileNo: (
        params: CheckDuplicateMobileNoParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<CheckDuplicateMobileNoResponse>({
            method: 'GET',
            url: '/profile/mobile/exist',
            params,
            ...options,
        });
    },

    /**
     * 해당 쇼핑몰에 닉네임 중복여부 체크하기
     *  - 해당 쇼핑몰에 입력한 닉네임으로 가진 회원이 있는지 확인합니다. true가 회신되는 경우 이미 해당 닉네임으로 가입한 회원이 존재합니다.(닉네임 중복 입력)
     */
    checkDuplicateNickname: (
        params: CheckDuplicateNicknameParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<CheckDuplicateNicknameResponse>({
            method: 'GET',
            url: '/profile/nickname/exist',
            params,
            ...options,
        });
    },

    /**
     * 비밀번호 찾기를 위한 계정 조회하기
     *  - 비밀번호 찾기를 위한 계정 정보를 조회합니다. 개인정보 항목인 이름, 휴대폰번호, 이메일은 마스킹된 값으로 조회됩니다
     */
    getMaskingAccountInfo: (
        params: GetMaskingAccountInfoParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetMaskingAccountInfoResponse>({
            method: 'GET',
            url: '/profile/password/search-account',
            params,
            ...options,
        });
    },

    /**
     * 비밀번호 변경/초기화 URL의 이메일 발송하기
     *  - 비밀번호 변경 또는 초기화하는 URL을 해당 사용자의 이메일로 발송합니다
     */
    sendUpdatePasswordEmail: (
        data: SendUpdatePasswordEmailData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'PUT',
            url: '/profile/password/sending-email-with-url',
            data,
            ...options,
        });
    },

    /**
     * 해당 쇼핑몰 아이디, 이름, 이메일 검증하기
     *  - 해당 쇼핑몰에 입력한 아이디, 이름, 이메일과 동일한 회원이 있는지 여부 확인합니다. true이면 회원이 존재합니다
     */
    checkDuplicateMemberByEmail: (
        params: CheckDuplicateMemberByEmailParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<CheckDuplicateMemberByEmailResponse>({
            method: 'GET',
            url: '/profile/member/equals/with-email',
            params,
            ...options,
        });
    },

    /**
     * 해당 쇼핑몰 아이디, 이름, 휴대폰 번호 검증하기
     *  - 해당 쇼핑몰에 입력한 아이디, 이름, 휴대폰 번호와 동일한 사용자가 있는지 여부 확인합니다
     *  - true이면 회원이 존재합니다
     */
    checkDuplicateMemberByMobile: (
        params: CheckDuplicateMemberByMobileParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<CheckDuplicateMemberByMobileResponse>({
            method: 'GET',
            url: '/profile/member/equals/with-mobile',
            params,
            ...options,
        });
    },

    /**
     * 본인인증 후 비밀번호 변경하기
     *  - 로그인하지 않음 사용자의 비밀번호를 변경합니다
     *  -  본인인증 후의 단계 이므로 이전단계인 본인인증 관련 API는 본인인증 API링크 참고 바랍니다
     */
    updatePasswordByCertificationKey: (
        data: UpdatePasswordByCertificationKeyData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'PUT',
            url: '/profile/password/no-authentication/after-certification',
            data,
            ...options,
        });
    },

    /**
     * 이메일 인증 후 패스워드 변경하기
     *  - 로그인하지 않음 사용자의 비밀번호를 변경합니다
     *  - 본인인증 후의 단계 이므로 이전단계인 본인인증 관련 API는 본인인증 API링크 참고 바랍니다
     */
    updatePasswordByEmailCertification: (
        data: UpdatePasswordByEmailCertificationData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'PUT',
            url: '/profile/password/no-authentication/certificated-by-email',
            data,
            ...options,
        });
    },

    /**
     * SMS 인증 후 패스워드 변경하기
     *  - 로그인하지않은 사용자의 비밀번호를 변경합니다 (SMS 인증 사용)
     */
    updatePasswordBySMSCertification: (
        data: UpdatePasswordBySMSCertificationData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'PUT',
            url: '/profile/password/no-authentication/certificated-by-sms',
            data,
            ...options,
        });
    },
};

export default profile;
