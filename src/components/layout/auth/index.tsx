import { ReactNode } from 'react';
import * as styles from '@/components/layout/auth/index.css';

interface AuthLayoutProps {
    children: ReactNode;
}

/**
 * 인증 관련 페이지 전용 레이아웃 래퍼
 * (상위 Layout 내부에 위치하여 스타일만 지정)
 */
export function AuthLayout({ children }: AuthLayoutProps) {
    return <div className={styles.container}>{children}</div>;
}
