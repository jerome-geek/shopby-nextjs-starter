import { includes, isEmpty } from '@fxts/core';
import { useEffect } from 'react';
import { UseFormReset } from 'react-hook-form';

import { useMall } from '@/hooks/query/admin/mall';
import { useKCPCertificationResult } from '@/hooks/query/auth';
import { useProfile } from '@/hooks/query/member/profile';
import { NcpOpenIdProviderType } from '@/models';
import { SignupFormSchemaType } from '@/schema';

const useSignupInitialize = ({
    reset,
    accessToken,
    isSocialLogin,
    key,
    provider,
}: {
    reset: UseFormReset<SignupFormSchemaType>;
    accessToken: string;
    isSocialLogin: boolean;
    key: string;
    provider: NcpOpenIdProviderType;
}) => {
    const { data: mallData } = useMall();

    const { data: getSocialData } = useProfile({
        headers: {
            'Shop-By-Authorization': `Bearer ${accessToken}`,
        },
        options: {
            enabled: isSocialLogin && !isEmpty(accessToken),
        },
    });

    const { data: kcpCertificationResultData } = useKCPCertificationResult({
        key,
        options: {
            enabled: !!key,
        },
    });

    useEffect(() => {
        if (!mallData) {
            return;
        }

        reset((prev) => ({
            ...prev,
            isNicknameRequired:
                mallData.memberJoinConfig.nickname === 'REQUIRED',
            isDuplicateNickname:
                mallData.memberJoinConfig.nickname !== 'NOT_USED',
            isMobileNoRequired:
                mallData.memberJoinConfig.mobileNo === 'REQUIRED',
            isTelephoneNoRequired:
                mallData.memberJoinConfig.phoneNo === 'REQUIRED',
            isAddressRequired: mallData.memberJoinConfig.address === 'REQUIRED',
            isBirthdayRequired:
                mallData.memberJoinConfig.birthday === 'REQUIRED',
            isSexRequired: mallData.memberJoinConfig.sex === 'REQUIRED',
        }));
    }, [mallData, reset]);

    useEffect(() => {
        if (!getSocialData) {
            return;
        }

        const birthday = getSocialData.birthday?.replace(/-/g, '') ?? '';

        reset((prev) => {
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
                birthYear: birthday.slice(0, 4),
                birthMonth: birthday.slice(4, 6),
                birthDay: birthday.slice(6, 8),
            };
        });
    }, [getSocialData, provider, reset]);

    useEffect(() => {
        if (!kcpCertificationResultData) {
            return;
        }

        const birthday =
            kcpCertificationResultData.birthday?.replace(/-/g, '') ?? '';

        reset((prev) => {
            return {
                ...prev,
                memberName: kcpCertificationResultData.name || '',
                mobileNo: kcpCertificationResultData.phone ?? '',
                sex: kcpCertificationResultData.sexCode
                    ? kcpCertificationResultData.sexCode === '01'
                        ? 'M'
                        : 'F'
                    : undefined,
                birthYear: birthday.slice(0, 4),
                birthMonth: birthday.slice(4, 6),
                birthDay: birthday.slice(6, 8),
                ci: kcpCertificationResultData.ci ?? '',
            };
        });
    }, [kcpCertificationResultData, reset]);

    return {
        getSocialData,
        kcpCertificationResultData,
    };
};

export default useSignupInitialize;
