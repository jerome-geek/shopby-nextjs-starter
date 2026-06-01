import { includes, isEmpty } from '@fxts/core';
import { useContext, useEffect } from 'react';
import { UseFormReset } from 'react-hook-form';

import { useMall } from '@/hooks/query/admin/mall';
import { useKCPCertificationResult } from '@/hooks/query/auth';
import { useProfile } from '@/hooks/query/member/profile';
import type { NcpOpenIdProviderType } from '@/models';
import { SignupFormSchemaType } from '@/schema';
import { CertificationCheckContext } from '@/features/member/certification-check';

const useSignupInitialize = ({
    reset,
    accessToken,
    isSocialLogin,
    key,
    provider,
}: {
    reset: UseFormReset<SignupFormSchemaType>;
    accessToken?: string;
    isSocialLogin: boolean;
    key?: string;
    provider: NcpOpenIdProviderType;
}) => {
    const { data: mallData } = useMall();

    const value = useContext(CertificationCheckContext);

    const isAuthenticationByPhone = value?.isAuthenticationByPhone;

    const { data: getSocialData } = useProfile({
        headers: {
            'Shop-By-Authorization': `Bearer ${accessToken}`,
        },
        options: {
            enabled: isSocialLogin && !!accessToken,
        },
    });

    const { data: kcpCertificationResultData } = useKCPCertificationResult({
        key: key ?? '',
        options: {
            enabled: !!key,
        },
    });

    useEffect(() => {
        if (!mallData) {
            return;
        }

        reset(
            (prev) => ({
                ...prev,
                isNicknameRequired:
                    mallData.memberJoinConfig.nickname === 'REQUIRED',
                isDuplicateNickname:
                    mallData.memberJoinConfig.nickname !== 'NOT_USED',
                isMobileNoRequired:
                    mallData.memberJoinConfig.mobileNo === 'REQUIRED',
                isTelephoneNoRequired:
                    mallData.memberJoinConfig.phoneNo === 'REQUIRED',
                isAddressRequired:
                    mallData.memberJoinConfig.address === 'REQUIRED',
                isBirthdayRequired:
                    mallData.memberJoinConfig.birthday === 'REQUIRED',
                isSexRequired: mallData.memberJoinConfig.sex === 'REQUIRED',
            }),
            {
                keepFieldsRef: true,
            },
        );
    }, [mallData, reset]);

    useEffect(() => {
        if (!getSocialData) {
            return;
        }

        const birthday = getSocialData.birthday?.replace(/-/g, '') ?? '';

        reset(
            (prev) => {
                return {
                    ...prev,
                    providerType: getSocialData.providerType ?? undefined,
                    memberName: getSocialData.memberName || '',
                    mobileNo: getSocialData.mobileNo ?? '',
                    // NOTE: 애플,라인은 메일정보가 없으며, 구글은 마스킹되서 옴
                    email: includes(provider, ['ncp_apple', 'ncp_line'])
                        ? ''
                        : getSocialData.email ?? '',
                    sex:
                        getSocialData.sex && getSocialData.sex !== 'X'
                            ? getSocialData.sex
                            : undefined,
                    birthday: birthday?.length === 8 ? birthday : '',
                };
            },
            {
                keepFieldsRef: true,
            },
        );
    }, [getSocialData, provider, reset]);

    useEffect(() => {
        if (!kcpCertificationResultData) {
            return;
        }

        const birthday =
            kcpCertificationResultData.birthday?.replace(/-/g, '') ?? '';

        reset(
            (prev) => {
                return {
                    ...prev,
                    memberName: kcpCertificationResultData.name || '',
                    mobileNo: kcpCertificationResultData.phone ?? '',
                    sex: kcpCertificationResultData.sexCode
                        ? kcpCertificationResultData.sexCode === '01'
                            ? 'M'
                            : 'F'
                        : undefined,
                    birthday: birthday?.length === 8 ? birthday : '',
                    ci: kcpCertificationResultData.ci ?? '',
                };
            },
            {
                keepFieldsRef: true,
            },
        );
    }, [kcpCertificationResultData, reset]);

    const formValueDisabled = {
        name: isSocialLogin
            ? !!getSocialData?.memberName
            : isAuthenticationByPhone
            ? !!kcpCertificationResultData?.name
            : false,
        email: isSocialLogin
            ? !includes(provider, ['ncp_apple', 'ncp_google', 'ncp_line']) &&
              !!getSocialData?.email
            : false,
        sex: isSocialLogin
            ? getSocialData?.sex === 'F' || getSocialData?.sex === 'M'
            : isAuthenticationByPhone
            ? !!kcpCertificationResultData?.ci
            : false,
        birthday: isSocialLogin
            ? !!getSocialData?.birthday
            : isAuthenticationByPhone
            ? !!kcpCertificationResultData?.birthday
            : false,
        mobileNo: isSocialLogin
            ? !!getSocialData?.mobileNo
            : isAuthenticationByPhone
            ? !!kcpCertificationResultData?.phone
            : false,
    };

    return {
        formValueDisabled,
    };
};

export default useSignupInitialize;
