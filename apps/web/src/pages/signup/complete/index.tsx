import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { AuthLayout } from '@/components/layout/auth';
import { NextPageWithLayout } from '@/pages/_app';
import * as styles from '@/pages/signup/complete/index.css';
import { Button } from '@/components/ui/button';
import { useProfile } from '@/hooks/query/member/profile';
import { isLoggedIn } from '@/utils/auth';
import { PATHS } from '@/const/paths';

import completeImage from '@/assets/register-completed.png';

const SignupComplete: NextPageWithLayout = () => {
    const { t } = useTranslation();

    const router = useRouter();

    const { data: profileData } = useProfile({
        options: {
            enabled: isLoggedIn(),
        },
    });

    return (
        <div className={styles.container}>
            <Image
                src={completeImage}
                alt='회원가입 완료'
                width={300}
                height={200}
                style={{
                    aspectRatio: '384/220',
                    width: '100%',
                    maxWidth: '384px',
                    height: 'auto',
                }}
            />

            <p className={styles.description}>
                {t('{{name}}님,', {
                    name:
                        profileData?.memberName ||
                        profileData?.nickname ||
                        '회원',
                })}
                <br />
                {t('회원가입이 완료되었습니다.')}
            </p>

            <Button
                frame='solid'
                variant='primary'
                onClick={() => router.replace(PATHS.MAIN)}
            >
                {t('둘러보기')}
            </Button>
        </div>
    );
};

SignupComplete.getLayout = (page) => (
    <AuthLayout title='회원가입 완료'>{page}</AuthLayout>
);

export default SignupComplete;
