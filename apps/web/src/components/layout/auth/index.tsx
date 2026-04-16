import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import * as styles from '@/components/layout/auth/index.css';

interface AuthLayoutProps {
    children: ReactNode;
    title?: string;
}

/**
 * 인증 관련 페이지 전용 레이아웃 래퍼
 * (상위 Layout 내부에 위치하여 스타일만 지정)
 */
export function AuthLayout({ children, title }: AuthLayoutProps) {
    const { t } = useTranslation();

    const router = useRouter();
    const pathname = router.pathname;

    return (
        <div className={styles.container} key={pathname}>
            {!!title && (
                <h1
                    className={styles.heading}
                    dangerouslySetInnerHTML={{ __html: t(title) }}
                />
            )}

            {children}
        </div>
    );
}
