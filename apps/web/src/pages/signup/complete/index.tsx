import { SuspenseQuery } from '@suspensive/react-query';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { AuthLayout } from '@/components/layout';
import { Skeleton } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import { useProfile } from '@/hooks/query/member/profile';
import { bannerListOptions } from '@/hooks/suspenseQuery/display/banner';
import { useAuth } from '@/hooks/useAuth';
import { NextPageWithLayout } from '@/pages/_app';
import * as styles from '@/pages/signup/complete/index.css';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';
import { extractBannerContentsByAccountIndex } from '@/utils/shopby';

const SignupCompleteSkeleton = () => (
    <>
        <Skeleton className={styles.bannerImage} />
        <div
            className={styles.description}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
            }}
        >
            <Skeleton width='150px' height='24px' />
            <Skeleton width='200px' height='24px' />
        </div>
        <Skeleton width='100%' height='48px' />
    </>
);

const SignupComplete: NextPageWithLayout = () => {
    const { t } = useTranslation();

    const router = useRouter();

    const isLogin = useAuth();

    const { data: profileData } = useProfile({
        options: {
            enabled: !!isLogin,
        },
    });

    return (
        <div className={styles.container}>
            <ShopbyAsyncBoundary fallback={<SignupCompleteSkeleton />}>
                <SuspenseQuery
                    {...bannerListOptions({
                        type: 'id',
                        banners: ['SIGNUP-COMPLETE'],
                        options: {
                            select: (data) =>
                                extractBannerContentsByAccountIndex(data, 0),
                        },
                    })}
                >
                    {({ data }) => {
                        return (
                            <>
                                <img
                                    src={data[0].imageUrl}
                                    alt='회원가입 완료'
                                    width={300}
                                    height={200}
                                    className={styles.bannerImage}
                                />
                                <p
                                    className={styles.description}
                                    dangerouslySetInnerHTML={{
                                        __html: t(data[0].name, {
                                            name:
                                                profileData?.memberName ||
                                                profileData?.nickname ||
                                                '회원',
                                        }),
                                    }}
                                    style={{
                                        color: data[0].nameColor,
                                    }}
                                />

                                <Button
                                    frame='solid'
                                    variant='primary'
                                    onClick={() =>
                                        router.replace(
                                            data[0].landingUrl || PATHS.MAIN,
                                        )
                                    }
                                >
                                    {t(data[0].description)}
                                </Button>
                            </>
                        );
                    }}
                </SuspenseQuery>
            </ShopbyAsyncBoundary>
        </div>
    );
};

SignupComplete.getLayout = (page) => (
    <AuthLayout title='회원가입 완료'>{page}</AuthLayout>
);

export default SignupComplete;
