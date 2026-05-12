import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthLayout } from '@/components/layout';
import { PATHS } from '@/const/paths';
import { AccountStep } from '@/features/member/find-password/components/account-step';
import { CertificationStep } from '@/features/member/find-password/components/certification-step';
import { PasswordStep } from '@/features/member/find-password/components/password-step';
import type {
    FindPasswordMethod,
    FindPasswordStep,
    IssuedInfo,
    VerifiedInfo,
} from '@/features/member/find-password/types';
import { useMyApp } from '@/hooks/myapp';
import { NextPageWithLayout } from '@/pages/_app';
import * as styles from '@/pages/member/find-password/index.css';

const FindPasswordPage: NextPageWithLayout = () => {
    const { t } = useTranslation();
    const { isMyApp, handleSendLoginView } = useMyApp();

    const handleLoginClick = (e: React.MouseEvent) => {
        if (isMyApp) {
            e.preventDefault();
            handleSendLoginView({
                option: {
                    returnUrl: PATHS.MAIN,
                },
            });
        }
    };

    const [step, setStep] = useState<FindPasswordStep>('IDLE');
    const [findMethod, setFindMethod] = useState<FindPasswordMethod>('EMAIL');
    const [issuedInfo, setIssuedInfo] = useState<IssuedInfo | null>(null);
    const [verifiedInfo, setVerifiedInfo] = useState<VerifiedInfo | null>(null);

    return (
        <div className={styles.container}>
            {step === 'IDLE' && (
                <AccountStep
                    findMethod={findMethod}
                    onFindMethodChange={setFindMethod}
                    onCertified={(info) => {
                        setIssuedInfo(info);
                        setStep('SENT');
                    }}
                />
            )}

            {step === 'SENT' && issuedInfo && (
                <CertificationStep
                    findMethod={findMethod}
                    issuedInfo={issuedInfo}
                    onVerified={(info) => {
                        setVerifiedInfo(info);
                        setStep('VERIFIED');
                    }}
                    onReset={() => {
                        setIssuedInfo(null);
                        setStep('IDLE');
                    }}
                />
            )}

            {step === 'VERIFIED' && verifiedInfo && (
                <PasswordStep verifiedInfo={verifiedInfo} />
            )}

            <div className={styles.linkContainer}>
                <Link
                    href={PATHS.MEMBER.FIND_ID}
                    prefetch={false}
                    className={styles.link}
                >
                    {t('아이디 찾기')}
                </Link>
                <Link
                    href={PATHS.AUTH.LOGIN}
                    prefetch={false}
                    className={styles.link}
                    data-color='muted'
                    onClick={handleLoginClick}
                >
                    {t('로그인하기')}
                </Link>
            </div>
        </div>
    );
};

FindPasswordPage.getLayout = (page) => (
    <AuthLayout title='비밀번호 찾기'>{page}</AuthLayout>
);

export default FindPasswordPage;
