import qs from 'qs';
import type { Options } from 'ky';

import { request } from '@/api/core';

import {
    BlockMemberData,
    CheckDuplicateCIParams,
    CheckDuplicateCIResponse,
    CheckDuplicateEmailParams,
    CheckDuplicateEmailResponse,
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
    getProfile: (options?: Options) => {
        return request.get<GetProfileResponse>('profile', options);
    },

    /**
     * 회원정보 수정하기
     *  - 회원정보를 수정합니다.
     *  - V1.1 - 회원의 현재 비밀번호를 입력받아 비밀번호 확인을 한 후 회원의 정보를 수정합니다. 리퀘스트는 Examples에서 확인해주세요
     */
    updateProfile: (data: UpdateProfileData, options?: Options) => {
        return request.put('profile', {
            json: data,
            ...options,
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
    createProfile: (data: CreateProfileData, options?: Options) => {
        return request.post<CreateProfileResponse>('profile', {
            json: data,
            ...options,
        });
    },

    /**
     * 회원 탈퇴하기
     *  - 회원 탈퇴 시 사용하는 API 입니다
     */
    deleteProfile: (params: DeleteProfileParams, options?: Options) => {
        return request.delete('profile', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 프로필 주소 변경하기
     *  - 회원의 주소를 변경하는 API 입니다
     */
    updateProfileAddress: (
        data: UpdateProfileAddressData,
        options?: Options
    ) => {
        return request.put('profile/address', {
            json: data,
            ...options,
        });
    },

    /**
     * 차단된 회원 조회하기
     *  - 내가 차단한 회원의 목록을 조회합니다.
     */
    getBlockedMembers: (params: GetBlockedMembersParams, options?: Options) => {
        return request.get<GetBlockedMembersResponse>(
            'profile/blocked-members',
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            }
        );
    },

    /**
     * 회원 차단하기
     *  - 회원을 차단합니다. 차단 시 즉시 차단한 회원이 작성한 상품평, 게시글, 1:1 문의 등의 내용을 차단합니다.
     */
    blockMember: (data: BlockMemberData, options?: Options) => {
        return request.post('profile/blocked-members', {
            json: data,
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
        options?: Options
    ) => {
        return request.post<CreateProfileResponse>('profile/brand-oauth', {
            json: data,
            ...options,
        });
    },

    /**
     * 비밀번호 변경
     *  - 회원 인증 후 비밀번호를 변경합니다. 기존에 사용중이던 비밀번호와 동일한 비밀번호로 변경할 수 없습니다
     */
    updatePasswordByCertificationNo: (
        data: UpdatePasswordByCertificationNoData,
        options?: Options
    ) => {
        return request.post('profile/change-password-after-cert', {
            json: data,
            ...options,
        });
    },

    /**
     * 비밀번호 확인하기
     *  - 현재 로그인한 사용자가 맞는지 비밀번호를 한번 더 체크할 때 사용하는 API 입니다
     */
    checkPassword: (data: CheckPasswordData, options?: Options) => {
        return request.post('profile/check-password', {
            json: data,
            ...options,
        });
    },

    /**
     * 휴면 회원 조회하기
     *  - 휴면 해제 화면에 노출할 휴면 계정 정보를 조회합니다
     */
    getDormantAccount: (options?: Options) => {
        return request.get<GetDormantAccountResponse>('profile/dormancy', {
            ...options,
        });
    },

    /**
     * 휴면 해제하기
     *  - 회원의 휴면 상태를 해제합니다
     */
    releaseDormancyAccount: (
        data: ReleaseDormancyAccountData,
        options?: Options
    ) => {
        return request.put('profile/dormancy', {
            json: data,
            ...options,
        });
    },

    /**
     * 비밀번호 검증 후 회원 탈퇴하기
     *  - 쇼핑몰 회원일 경우 비밀번호 검증 후 회원 탈퇴합니다
     */
    withDrawByPassword: (data: WithDrawByPasswordData, options?: Options) => {
        return request.put('profile/expel', {
            json: data,
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
    findId: (data: FindIdData, options?: Options) => {
        return request.post<FindIdResponse>('profile/find-id', {
            json: data,
            ...options,
        });
    },

    /**
     * 비밀번호 찾기
     *  - 회원 정보의 이메일로 비밀번호 재설정 주소 전달
     */
    findPassword: (data: FindPasswordData, options?: Options) => {
        return request.post<FindPasswordResponse>('profile/find-password', {
            json: data,
            ...options,
        });
    },

    /**
     *  내 등급 조회하기
     *  - 내 등급 정보를 가져옵니다.
     */
    getGrade: (options?: Options) => {
        return request.get<GetGradeResponse>('profile/grade', {
            ...options,
        });
    },

    /**
     * 아이디 찾기 v1.1
     *  - 모바일 or 이메일 인중 후 아이디를 조회할 수 있는 API 입니다 (version 1.1)
     */
    findIdByCertification: (
        params: FindIdByCertificationParams,
        options?: Options
    ) => {
        return request.get<FindIdByCertificationResponse>('profile/id', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 회원 아이디 변경하기
     *  - 인증 후 회원 아이디를 변경할 수 있는 API 입니다
     */
    updateId: (data: UpdateIdData, options?: Options) => {
        return request.put('profile/id', {
            json: data,
            ...options,
        });
    },

    /**
     * 마스킹 해제된 회원정보 조회하기
     *  - 비밀번호 인증으로 마스킹 해제된 회원정보를 조회합니다 (mallName은 조회되지 않습니다)
     */
    getNonMaskingMember: (data: GetNonMaskingMemberData, options?: Options) => {
        return request.post<GetNonMaskingMemberResponse>(
            'profile/non-masking',
            {
                json: data,
                ...options,
            }
        );
    },

    /**
     * 오픈 아이디 회원가입 처리하기
     *  - 오픈 아이디를 사용한 회원 가입 처리입니다
     *  - 간편 로그인으로 신규 가입을 하는 회원인 경우 위 API를 호출하여 가입 완료 처리를 해야합니다
     *  - 가입 처리시 추가적인 사용자 정보를 받을 수 있습니다
     *  - 카카오싱크 회원의 경우 약관은 카카오싱크 연동과 동시에 저장되기 때문에 joinTermsAgreements는 null로 보내주시면 됩니다
     */
    signUpByOpenId: (data: SignUpByOpenIdData, options?: Options) => {
        return request.post<SignUpByOpenIdResponse>('profile/openid', {
            json: data,
            ...options,
        });
    },

    /**
     * 비밀번호 변경하기
     *  - 인증이 완료된 사용자의 비밀번호를 변경합니다 (version 1.1)
     */
    updatePassword: (data: UpdatePasswordData, options?: Options) => {
        return request.put('profile/password', {
            json: data,
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
        options?: Options
    ) => {
        return request.post('profile/rename', {
            json: data,
            ...options,
        });
    },

    /**
     * 회원 신고하기
     * 회원을 신고합니다.
     */
    reportMember: (data: ReportMemberData, options?: Options) => {
        return request.post('profile/report', options);
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
    synchronizeProfile: (data: SynchronizeProfileData, options?: Options) => {
        return request.post<SynchronizeProfileResponse>('profile/synchronize', {
            json: data,
            ...options,
        });
    },

    /**
     * CI 중복확인하기
     *  - 쇼핑몰에 동일한 CI를 사용중인 회원이 있는지 확인합니다. 현재 회원이 로그인중인 경우, 엑세스 토큰을 함께 전달하면 본인을 제외하고 동일한 CI를 사용중인 회원이 있는지 확인합니다
     *  - 휴대폰 본인인증을 사용하는 경우 여러 사용자가 동일한 CI로 회원가입할 수 없습니다. 회원가입 / 수정 전 CI를 반드시 확인해주세요
     *  - ci는 특수문자를 포함하고 있기때문에, 인코딩을 한 뒤에 전달해야합니다
     */
    checkDuplicateCI: (params: CheckDuplicateCIParams, options?: Options) => {
        return request.get<CheckDuplicateCIResponse>('profile/ci/exists', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * CI 일치 확인하기
     *  - 쇼핑몰 회원의 CI와 요청 CI 값이 일치하는지 확인합니다. 엑세스 토큰을 함께 전달하여 본인의 CI 값과 요청 CI를 비교하여 일치하는지 확인합니다.
     *  - 요청 CI 값은 KCP 본인인증 결과 조회하기 API Response 객체의 CI 값을 이용합니다.
     *  - CI는 특수문자를 포함하고 있기때문에, URL 인코딩 을 한 뒤에 전달해야합니다.
     */
    checkDuplicateCIMySelf: (params: { ci: string }, options?: Options) => {
        return request.get<CheckDuplicateMySelfResponse>('profile/ci/myself', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 해당 쇼핑몰에 이메일 중복여부 체크하기
     *  - 해당 쇼핑몰에 입력한 이메일을 가진 회원이 있는지 확인합니다. true가 회신되는 경우 이미 해당 이메일로 가입한 회원이 존재합니다. (이메일 중복 입력)
     */
    checkDuplicateEmail: (
        params: CheckDuplicateEmailParams,
        options?: Options
    ) => {
        return request.get<CheckDuplicateEmailResponse>('profile/email/exist', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * ID 변경 메일 발송하기
     *  - ID를 변경할 수 있는 내용을 첨부한 email을 발송하는 API 입니다
     */
    sendUpdateIdEmail: (data: SendUpdateIdEmailData, options?: Options) => {
        return request.post<SendUpdateIdEmailResponse>('profile/id/email', {
            json: data,
            ...options,
        });
    },

    /**
     * 해당 쇼핑몰에 아이디 중복여부 체크하기
     *  - 해당 쇼핑몰에 입력한 아이디로 가진 회원이 있는지 확인합니다. true가 회신되는 경우 이미 해당 아이디로 가입한 회원이 존재합니다 (아이디 중복 입력)
     */
    checkDuplicateId: (params: CheckDuplicateIdParams, options?: Options) => {
        return request.get<CheckDuplicateIdResponse>('profile/id/exist', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 해당 쇼핑몰에 휴대폰 번호 중복여부 확인하기
     *  - 해당 쇼핑몰에 입력한 휴대폰번호가 있는지 확인하는 API 입니다
     */
    checkDuplicateMobileNo: (
        params: CheckDuplicateMobileNoParams,
        options?: Options
    ) => {
        return request.get<CheckDuplicateMobileNoResponse>(
            'profile/mobile/exist',
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            }
        );
    },

    /**
     * 해당 쇼핑몰에 닉네임 중복여부 체크하기
     *  - 해당 쇼핑몰에 입력한 닉네임으로 가진 회원이 있는지 확인합니다. true가 회신되는 경우 이미 해당 닉네임으로 가입한 회원이 존재합니다.(닉네임 중복 입력)
     */
    checkDuplicateNickname: (
        params: CheckDuplicateNicknameParams,
        options?: Options
    ) => {
        return request.get<CheckDuplicateNicknameResponse>(
            'profile/nickname/exist',
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            }
        );
    },

    /**
     * 비밀번호 찾기를 위한 계정 조회하기
     *  - 비밀번호 찾기를 위한 계정 정보를 조회합니다. 개인정보 항목인 이름, 휴대폰번호, 이메일은 마스킹된 값으로 조회됩니다
     */
    getMaskingAccountInfo: (
        params: GetMaskingAccountInfoParams,
        options?: Options
    ) => {
        return request.get<GetMaskingAccountInfoResponse>(
            'profile/password/search-account',
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            }
        );
    },

    /**
     * 비밀번호 변경/초기화 URL의 이메일 발송하기
     *  - 비밀번호 변경 또는 초기화하는 URL을 해당 사용자의 이메일로 발송합니다
     */
    sendUpdatePasswordEmail: (
        data: SendUpdatePasswordEmailData,
        options?: Options
    ) => {
        return request.put('profile/password/sending-email-with-url', {
            json: data,
            ...options,
        });
    },

    /**
     * 해당 쇼핑몰 아이디, 이름, 이메일 검증하기
     *  - 해당 쇼핑몰에 입력한 아이디, 이름, 이메일과 동일한 회원이 있는지 여부 확인합니다. true이면 회원이 존재합니다
     */
    checkDuplicateMemberByEmail: (
        params: CheckDuplicateMemberByEmailParams,
        options?: Options
    ) => {
        return request.get<CheckDuplicateMemberByEmailResponse>(
            'profile/member/equals/with-email',
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            }
        );
    },

    /**
     * 해당 쇼핑몰 아이디, 이름, 휴대폰 번호 검증하기
     *  - 해당 쇼핑몰에 입력한 아이디, 이름, 휴대폰 번호와 동일한 사용자가 있는지 여부 확인합니다
     *  - true이면 회원이 존재합니다
     */
    checkDuplicateMemberByMobile: (
        params: CheckDuplicateMemberByMobileParams,
        options?: Options
    ) => {
        return request.get<CheckDuplicateMemberByMobileResponse>(
            'profile/member/equals/with-mobile',
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            }
        );
    },

    /**
     * 본인인증 후 비밀번호 변경하기
     *  - 로그인하지 않음 사용자의 비밀번호를 변경합니다
     *  -  본인인증 후의 단계 이므로 이전단계인 본인인증 관련 API는 본인인증 API링크 참고 바랍니다
     */
    updatePasswordByCertificationKey: (
        data: UpdatePasswordByCertificationKeyData,
        options?: Options
    ) => {
        return request.put(
            'profile/password/no-authentication/after-certification',
            {
                json: data,
                ...options,
            }
        );
    },

    /**
     * 이메일 인증 후 패스워드 변경하기
     *  - 로그인하지 않음 사용자의 비밀번호를 변경합니다
     *  - 본인인증 후의 단계 이므로 이전단계인 본인인증 관련 API는 본인인증 API링크 참고 바랍니다
     */
    updatePasswordByEmailCertification: (
        data: UpdatePasswordByEmailCertificationData,
        options?: Options
    ) => {
        return request.put(
            'profile/password/no-authentication/certificated-by-email',
            {
                json: data,
                ...options,
            }
        );
    },
    /**
     * SMS 인증 후 패스워드 변경하기
     *  - 로그인하지않은 사용자의 비밀번호를 변경합니다 (SMS 인증 사용)
     */
    updatePasswordBySMSCertification: (
        data: UpdatePasswordBySMSCertificationData,
        options?: Options
    ) => {
        return request.put(
            'profile/password/no-authentication/certificated-by-sms',
            {
                json: data,
                ...options,
            }
        );
    },
};

export default profile;
