import { useEffect, useState } from 'react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { MypageLayout } from '@/components/layout';
import { CheckAccountForm } from '@/components/mypage/edit/check-account-form';
import { EditForm } from '@/components/mypage/edit/edit-form';
import { profile } from '@/api/member';
import { PATHS } from '@/const/paths';
import { profileKeys } from '@/hooks/queryKeys';

export const MypageEdit = ({
    isAuthenticated,
}: {
    isAuthenticated?: boolean;
}) => {
    const router = useRouter();

    const token = router.query.token as string;

    useEffect(() => {
        if (isAuthenticated && token) {
            router.replace({
                pathname: PATHS.MYPAGE.EDIT,
                query: {},
            });
        }
    }, [token, isAuthenticated]);

    const [password, setPassword] = useState<string | 'SOCIAL_LOGIN'>(() =>
        isAuthenticated ? 'SOCIAL_LOGIN' : '',
    );

    return !!password ? (
        <EditForm password={password} setPassword={setPassword} />
    ) : (
        <CheckAccountForm setPassword={setPassword} />
    );
};

MypageEdit.getLayout = (page: React.ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};

export default MypageEdit;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const queryClient = new QueryClient();

    const token = query.token as string;

    if (!token) {
        return {
            props: {},
        };
    }

    try {
        const headers = {
            'Shop-By-Authorization': `Bearer ${token}`,
        };

        const profileData = await queryClient.fetchQuery({
            queryKey: profileKeys.getProfile({}),
            queryFn: async () => {
                const { data } = await profile.getProfile({
                    headers,
                });

                return data;
            },
        });

        if (profileData.providerType) {
            return {
                props: {
                    isAuthenticated: true,
                    dehydratedState: dehydrate(queryClient),
                },
            };
        }
    } catch {
        return {
            props: {},
        };
    }

    return {
        props: {},
    };
};
