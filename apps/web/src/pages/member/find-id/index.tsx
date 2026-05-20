import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { AuthLayout } from '@/components/layout';
import Seo from '@/components/common/seo';
import { PATHS } from '@/const/paths';
import { FindIdForm } from '@/features/member/find-id/components/find-id-form';
import { useMyApp } from '@/hooks/myapp';
import { NextPageWithLayout } from '@/pages/_app';
import * as styles from '@/pages/member/find-id/index.css';

const FindIdPage: NextPageWithLayout = () => {
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

    return (
        <div className={styles.container}>
            <Seo title='아이디 찾기' noindex />
            <FindIdForm />

            <div className={styles.linkContainer}>
                <Link
                    href={PATHS.MEMBER.FIND_PASSWORD}
                    prefetch={false}
                    className={styles.link}
                >
                    {t('비밀번호 찾기')}
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

FindIdPage.getLayout = (page) => (
    <AuthLayout title='아이디 찾기'>{page}</AuthLayout>
);

export default FindIdPage;
