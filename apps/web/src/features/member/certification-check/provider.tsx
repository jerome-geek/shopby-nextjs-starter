import { includes } from '@fxts/core';
import { useRouter } from 'next/router';
import { overlay } from 'overlay-kit';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { PATHS } from '@/const/paths';
import {
    CertificationCheckContext,
} from '@/features/member/certification-check';
import useSnsLogin from '@/features/member/hooks/useSnsLogin';
import { useMall } from '@/hooks/query/admin/mall';
import { useProfile } from '@/hooks/query/member/profile';
import { useAuth } from '@/hooks/useAuth';
import { useKcpCertification, useLocale } from '@/hooks/utils';
import useUpdateProfile from '@/hooks/utils/useUpdateProfile';
import ConfirmDialog from '@/shared/ui/dialog/confirm';

function CertificationCheckProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { t } = useTranslation();

    const { isKorean } = useLocale();

    const isLogin = useAuth();

    const { data: profileData } = useProfile({
        options: {
            enabled: !!isLogin,
        },
    });

    const router = useRouter();
    const pathname = router.pathname;

    const { openKcpAuthRegister } = useSnsLogin();

    const { updateProfile } = useUpdateProfile();

    const { data: mallData } = useMall();
    const authenticationType = mallData?.mallJoinConfig.authenticationType;

    const isAuthenticationByPhone =
        authenticationType === 'AUTHENTICATION_BY_PHONE';

    const isCertified = !!profileData?.principalCertificated;
    const dialogShownRef = useRef(false);

    const showCertificationDialog = useCallback(() => {
        overlay.open((props) => (
            <ConfirmDialog
                {...props}
                iconType='warning'
                Title={t('서비스 이용을 위해 본인인증이 필요합니다.')}
                confirm={() => {
                    openKcpAuthRegister();
                    props.close();
                }}
                close={() => {
                    dialogShownRef.current = false;
                    props.close();
                }}
            />
        ));
    }, [t, openKcpAuthRegister]);

    const value = useMemo(() => {
        return {
            isAuthenticationByPhone,
            isCertified,
            showCertificationDialog,
            authenticationType,
        };
    }, [
        isCertified,
        isAuthenticationByPhone,
        showCertificationDialog,
        authenticationType,
    ]);

    const isCertificationNeeded = useMemo(() => {
        const CERTIFICATION_FREE_ROUTES = [
            PATHS.AUTH.LOGIN,
            PATHS.AUTH.TERMS.DETAIL,
            PATHS.MEMBER.FIND_ID,
            PATHS.MEMBER.FIND_PASSWORD,
            PATHS.GUEST.LOGIN,
            PATHS.GUEST.ORDER.DETAIL,
            PATHS.GUEST.CLAIMS.REQUEST,
            PATHS.GUEST.CLAIMS.CHANGE_ADDRESS,
            PATHS.SIGNUP.TERMS,
            PATHS.SIGNUP.REGISTER_METHOD,
            PATHS.SIGNUP.REGISTER,
            PATHS.SIGNUP.COMPLETE,
        ];

        return !includes(pathname, CERTIFICATION_FREE_ROUTES);
    }, [pathname]);

    useEffect(() => {
        if (!isKorean) {
            return;
        }

        if (!isAuthenticationByPhone) {
            return;
        }

        if (!!!isLogin) {
            return;
        }

        if (!profileData) {
            return;
        }

        if (isCertified || dialogShownRef.current) {
            return;
        }

        if (isCertificationNeeded) {
            dialogShownRef.current = true;

            showCertificationDialog();
        }
    }, [
        isLogin,
        isCertified,
        isAuthenticationByPhone,
        showCertificationDialog,
        isCertificationNeeded,
        profileData,
        isKorean,
    ]);

    useKcpCertification({
        onNext: (data: { key?: string }) => {
            if (!!isLogin && isCertificationNeeded && data?.key) {
                updateProfile(data.key);
            }
        },
    });

    return (
        <CertificationCheckContext.Provider value={value}>
            {children}
        </CertificationCheckContext.Provider>
    );
}

export default CertificationCheckProvider;
