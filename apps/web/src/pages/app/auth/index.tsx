import { useSearchParams } from 'next/navigation';

import { useEffect } from 'react';

import { PATHS } from '@/const/paths';
import { useMyApp } from '@/hooks/myapp';
import { useRouter } from 'next/router';

const AppAuth = () => {
    const { isMyApp } = useMyApp();
    const router = useRouter();

    const searchParams = useSearchParams();

    useEffect(() => {
        if (!isMyApp) {
            router.replace(PATHS.MAIN);
            return;
        }
        const nextUrl = searchParams.get('next') || PATHS.MAIN;

        router.replace(nextUrl);
    }, [isMyApp, router, searchParams]);

    return (
        <div
            style={{
                height: '500px',
                position: 'relative',
            }}
        />
    );
};

export default AppAuth;
