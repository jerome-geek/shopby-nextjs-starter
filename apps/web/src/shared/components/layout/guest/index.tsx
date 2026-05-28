import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/shared/components/common/loading-wrapper';
import * as styles from '@/shared/components/layout/guest/index.css';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';

interface GuestLayoutProps {
    children: ReactNode;
    title?: string;
}

export function GuestLayout({ children, title }: GuestLayoutProps) {
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

            <ShopbyAsyncBoundary
                fallback={
                    <LoadingWrapper
                        isLoading
                        containerStyle={{
                            height: '50vh',
                        }}
                    >
                        <span />
                    </LoadingWrapper>
                }
            >
                {children}
            </ShopbyAsyncBoundary>
        </div>
    );
}
