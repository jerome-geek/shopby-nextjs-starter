import { includes } from '@fxts/core';
import { overlay } from 'overlay-kit';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import ConfirmDialog from '@/components/ui/dialog/confirm';
import { PATHS } from '@/const/paths';
import { CertificationCheckContext } from '@/context/certificationCheck';
import { useMall } from '@/hooks/query/admin/mall';
import { useProfile } from '@/hooks/query/member/profile';
import useSnsLogin from '@/hooks/useSnsLogin';
import { useKcpCertification, useLocale } from '@/hooks/utils';
import useUpdateProfile from '@/hooks/utils/useUpdateProfile';
import { isLoggedIn } from '@/utils/auth';

function CertificationCheckProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { t } = useTranslation();

    const { isKorean } = useLocale();

    const { data: profileData } = useProfile({
        options: {
            enabled: isLoggedIn(),
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
        };
    }, [isCertified, isAuthenticationByPhone, showCertificationDialog]);

    // 본인인증 페이지나 로그인 등 예외 페이지는 제외
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
    }, [mallData?.mallJoinConfig.authenticationType, pathname]);

    useEffect(() => {
        if (!isKorean) {
            return;
        }

        if (!isAuthenticationByPhone) {
            return;
        }

        if (!isLoggedIn()) {
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
        isCertified,
        isAuthenticationByPhone,
        showCertificationDialog,
        isCertificationNeeded,
        profileData,
        isKorean,
    ]);

    useKcpCertification({
        onNext: (data: { key?: string }) => {
            if (isLoggedIn() && isCertificationNeeded && data?.key) {
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
