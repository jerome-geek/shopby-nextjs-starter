import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { MypageMenuProvider, useMypageMenu } from '@/context/mypageMenu';
import { memo, type ReactNode } from 'react';

import FetchBoundary from '@/components/common/FetchBoundary';
import LoadingWrapper from '@/components/common/loading-wrapper';
import { CSRLayout } from '@/components/layout/csr';
import * as styles from '@/components/layout/mypage/index.css';
import { MypageSideNavigation } from '@/components/mypage/side-navigation';
import useResponsive from '@/hooks/utils/useResponsive';
import { getPathTitle } from '@/utils/path';

interface MypageLayoutProps {
    children: ReactNode;
    className?: string;
}

const MypageLayoutContent = memo(function MypageLayoutContent({
    children,
    className,
}: MypageLayoutProps) {
    const router = useRouter();
    const { isMobile } = useResponsive();
    const menuList = useMypageMenu();

    const pageName = getPathTitle(router.pathname);

    return (
        <div className={clsx(styles.container, className)}>
            {!isMobile && menuList && (
                <MypageSideNavigation menuList={menuList} />
            )}

            <section className={styles.sectionContainer}>
                {pageName && !isMobile && (
                    <div className={styles.titleContainer}>
                        <h2 className={styles.title}>{pageName}</h2>
                    </div>
                )}

                <FetchBoundary
                    fallback={
                        <LoadingWrapper isLoading={true}>
                            <span />
                        </LoadingWrapper>
                    }
                >
                    <div className={styles.content}>{children}</div>
                </FetchBoundary>
            </section>
        </div>
    );
});

export function MypageLayout(props: MypageLayoutProps) {
    return (
        <CSRLayout>
            <MypageMenuProvider>
                <MypageLayoutContent {...props} />
            </MypageMenuProvider>
        </CSRLayout>
    );
}

MypageLayout.displayName = 'MypageLayout';
