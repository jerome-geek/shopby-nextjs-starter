import { useContext, useEffect, useState } from 'react';
import { UseFormReset } from 'react-hook-form';

import { CertificationCheckContext } from '@/context/certificationCheck';
import { useMall } from '@/hooks/query/admin/mall';
import { GetProfileResponse } from '@/models/member/profile';
import { UpdateProfileSchemaType } from '@/schema/profile.schema';
import { useGlobal } from '@/hooks/utils';

const useEditInitialize = ({
    reset,
    profileData,
}: {
    reset: UseFormReset<UpdateProfileSchemaType>;
    profileData: GetProfileResponse;
}) => {
    const { data: mallData } = useMall();

    const { isKorean } = useGlobal();

    const value = useContext(CertificationCheckContext);

    const isAuthenticationByPhone =
        value?.authenticationType === 'AUTHENTICATION_BY_PHONE';
    const isAuthenticationByEmail =
        value?.authenticationType === 'AUTHENTICATION_BY_EMAIL';

    const isMobileAuth = profileData.certificationType === 'MOBILE';
    const isSocialLogin = !!profileData.providerType;

    const isLine = profileData.providerType === 'LINE';
    const isApple = profileData.providerType === 'APPLE';
    const isGoogle = profileData.providerType === 'GOOGLE';

    const [isCertificated, setIsCertificated] = useState(
        isKorean
            ? !!profileData.principalCertificated &&
                  isMobileAuth &&
                  profileData.sex !== 'X'
            : false,
    );

    useEffect(() => {
        if (!mallData) {
            return;
        }

        reset(
            (prev) => ({
                ...prev,
                isNicknameRequired:
                    mallData.memberJoinConfig.nickname === 'REQUIRED',
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

    const formValueDisabled = {
        name: isAuthenticationByPhone && isCertificated,
        mobileNo: isAuthenticationByPhone && isCertificated,
        email:
            (isSocialLogin && !isLine && !isApple && !isGoogle) ||
            // (isAuthenticationByEmail && !isEmailReauthRequested),
            isAuthenticationByEmail,
        birthday: isAuthenticationByPhone && isCertificated,
        sex: isAuthenticationByPhone && isCertificated,
    };

    return {
        isSocialLogin,
        formValueDisabled,
    };
};

export default useEditInitialize;
