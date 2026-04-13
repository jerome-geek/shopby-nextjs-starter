import { ReactElement, ReactNode } from 'react';

import { useAuth } from '@/hooks/useAuth';

interface CSRLayoutProps {
    children: ReactNode;
    fallback?: ReactNode;
}

/**
 * CSR 전용 페이지를 위한 레이아웃 컴포넌트
 * - Next.js의 SSR 시점에는 렌더링을 skip하고, 클라이언트에서 인증 상태(useAuth)가 확정된 후 렌더링합니다.
 * - Hydration Mismatch 에러와 로그인/비로그인 상태 간의 화면 깜빡임을 방지합니다.
 */
export const CSRLayout = ({ children, fallback = null }: CSRLayoutProps) => {
    const isLogin = useAuth();

    // 인증 상태가 null인 경우(초기 마운트/서버 렌더링 시점)에는 로딩 상태(fallback)를 유지
    if (isLogin === null) {
        return fallback;
    }

    return <>{children}</>;
};

export const getCSRLayout = (page: ReactElement) => {
    return <CSRLayout>{page}</CSRLayout>;
};
