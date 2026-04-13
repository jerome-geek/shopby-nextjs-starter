import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

import { useAuth } from '@/hooks/useAuth';

interface AuthGuardLayoutProps {
    children: ReactNode;
    fallback?: ReactNode;
}

/**
 * 인증이 필요한 페이지를 보호하는 가드 컴포넌트
 * - 비로그인 상태일 경우 로그인 페이지로 리다이렉트합니다.
 * - CSRLayout 내부에서 사용하는 것을 권장합니다.
 *
 * @example
 * <CSRLayout>
 *   <AuthGuardLayout>
 *     <MyProtectedPage />
 *   </AuthGuardLayout>
 * </CSRLayout>
 */
export const AuthGuardLayout = ({
    children,
    fallback = null,
}: AuthGuardLayoutProps) => {
    const isLogin = useAuth();
    const router = useRouter();

    useEffect(() => {
        // 인증 확인 후 비로그인 상태임이 판명되면 리다이렉트
        if (isLogin === false) {
            const returnUrl = encodeURIComponent(router.asPath);
            router.replace(`/login?returnUrl=${returnUrl}`);
        }
    }, [isLogin, router]);

    // 로그인이 아니거나 아직 확인 중일 때는 내용을 숨김
    if (!isLogin) {
        return fallback;
    }

    return <>{children}</>;
};
