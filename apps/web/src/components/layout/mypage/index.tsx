import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { MypageMenuProvider, useMypageMenu } from '@/context/mypageMenu';
import { memo, type ReactNode, useEffect } from 'react';

import FetchBoundary from '@/components/common/FetchBoundary';
import LoadingWrapper from '@/components/common/loading-wrapper';
import { CSRLayout } from '@/components/layout/csr';
import { PATHS } from '@/const/paths';
import { useAuth } from '@/hooks/useAuth';
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
    const isLogin = useAuth();
    const { isMobile } = useResponsive();
    const menuList = useMypageMenu();

    const pageName = getPathTitle(router.pathname);

    useEffect(() => {
        if (isLogin !== false || !router.isReady) {
            return;
        }

        const returnUrl = router.asPath;
        void router.replace({
            pathname: PATHS.AUTH.LOGIN,
            query: { returnUrl },
        });
    }, [isLogin, router]);

    // 클라이언트 라우팅으로 proxy를 거치지 않은 경우에도 마이페이지 화면을 노출하지 않습니다.
    if (isLogin !== true) {
        return null;
    }

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
