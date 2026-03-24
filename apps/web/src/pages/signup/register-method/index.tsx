import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetStaticProps } from 'next';

import { banner } from '@/api/display';
import SocialLoginList from '@/components/auth/social-login-list';
import FetchBoundary from '@/components/common/FetchBoundary';
import { AuthLayout } from '@/components/layout/auth';
import { BANNER_ID } from '@/const/banner';
import { bannerKeys } from '@/hooks/queryKeys';
import { useBannerList } from '@/hooks/suspenseQuery/display/banner';
import { NextPageWithLayout } from '@/pages/_app';
import * as styles from '@/pages/signup/register-method/index.css';
import { extractBannerContents } from '@/utils/shopby';

const BANNER_LIST = [BANNER_ID.REGISTER_METHOD];

const SignupRegisterMethod: NextPageWithLayout = () => {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <p className={styles.description}>
                    회원가입하면 특별한 혜택을 받을 수 있어요.
                </p>
            </div>

            <FetchBoundary fallback={<div>로딩중</div>}>
                <SignupBannerList />
            </FetchBoundary>

            <SocialLoginList isOnlySocialLoginListVisible={false} />
        </div>
    );
};

SignupRegisterMethod.getLayout = (page) => (
    <AuthLayout title='회원가입'>{page}</AuthLayout>
);

const SignupBannerList = () => {
    const { data } = useBannerList({
        type: 'id',
        banners: BANNER_LIST,
        options: {
            select: extractBannerContents,
        },
    });

    return (
        <ul className={styles.bannerList}>
            {data.map(({ bannerNo, imageUrl, nameColor, name }) => {
                return (
                    <li
                        key={`signup-banner-${bannerNo}`}
                        className={styles.bannerListItem}
                    >
                        <div>
                            <img src={imageUrl} alt={name} />
                        </div>
                        <span
                            style={{ color: nameColor }}
                            dangerouslySetInnerHTML={{ __html: name }}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient();

    try {
        // 서버에서 미리 데이터 페칭 (오류 발생 시 catch로 넘어가서 무시됨)
        await queryClient.fetchQuery({
            queryKey: bannerKeys.list(BANNER_LIST),
            queryFn: async () => {
                const { data } = await banner.getBannersByIds(BANNER_LIST);

                return data;
            },
        });
    } catch (error) {
        console.error('ISR Prefetch Error (SignupRegisterMethod):', error);
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 60, // 1분마다 갱신
    };
};

export default SignupRegisterMethod;
