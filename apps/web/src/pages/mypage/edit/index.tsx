import { isNull } from '@fxts/core';
import { useRouter } from 'next/router';
import { useEffect, useState, type ReactNode } from 'react';

import Seo from '@/components/common/seo';
import { MypageLayout } from '@/components/layout';
import { CheckAccountForm } from '@/components/mypage/edit/check-account-form';
import { EditForm } from '@/components/mypage/edit/edit-form';
import { PATHS } from '@/const/paths';

export default function MypageEditPage() {
    const router = useRouter();

    const [password, setPassword] = useState<string | 'SOCIAL_LOGIN' | null>(
        () => {
            if (typeof window === 'undefined') {
                return null;
            }

            const url = new URL(window.location.href);
            return url.searchParams.get('token') ? 'SOCIAL_LOGIN' : null;
        },
    );

    useEffect(() => {
        const url = new URL(window.location.href);

        if (url.searchParams.get('token')) {
            router.replace(PATHS.MYPAGE.EDIT, undefined, { shallow: true });
        }
    }, [router]);

    return (
        <>
            <Seo title='회원정보 수정' noindex={true} />
            {!isNull(password) ? (
                <EditForm
                    password={password}
                    setPassword={(p) => setPassword(p)}
                />
            ) : (
                <CheckAccountForm setPassword={(p) => setPassword(p)} />
            )}
        </>
    );
}

MypageEditPage.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};
