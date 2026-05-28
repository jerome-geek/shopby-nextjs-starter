import { MypageMenuProvider, useMypageMenu } from '@/context/mypageMenu';
import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { memo, type ReactNode, useEffect } from 'react';

import LoadingWrapper from '@/shared/components/common/loading-wrapper';
import { CSRLayout } from '@/shared/components/layout/csr';
import * as styles from '@/shared/components/layout/mypage/index.css';
import { MypageSideNavigation } from '@/components/mypage/side-navigation';
import { PATHS } from '@/const/paths';
import { profileQueryOptions } from '@/entities/member/profile/queries';
import { useMyApp } from '@/hooks/myapp';
import { useAuth } from '@/hooks/useAuth';
import useResponsive from '@/hooks/utils/useResponsive';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';
import { Only } from '@/shared/components/only';
import { getPathTitle } from '@/utils/path';
import { SuspenseQuery } from '@suspensive/react-query';
import { isLogoutNavigationInProgress } from '@/utils/auth';

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

    const { isMyApp, handleSendLoginView } = useMyApp();
    const pageName = getPathTitle(router.pathname);

    useEffect(() => {
        if (isLogin !== false || !router.isReady) {
            return;
        }

        if (isLogoutNavigationInProgress()) {
            return;
        }

        const returnUrl = router.asPath;

        if (isMyApp) {
            handleSendLoginView({
                option: {
                    returnUrl: returnUrl,
                },
            });
            return;
        }

        void router.replace({
            pathname: PATHS.AUTH.LOGIN,
            query: { returnUrl },
        });
    }, [isLogin, router, isMyApp, handleSendLoginView]);

    // 클라이언트 상태 변경(useAuth)으로 로그아웃된 경우에는 proxy가 개입할 수 없어서
    // 화면 노출 차단은 여전히 layout 레벨에서 한 번 더 보장합니다.
    if (isLogin !== true) {
        return null;
    }

    return (
        <div className={clsx(styles.container, className)}>
            {!isMobile && menuList && (
                <MypageSideNavigation menuList={menuList} />
            )}

            <section className={styles.sectionContainer}>
                {pageName && (
                    <Only.Desktop>
                        <div className={styles.titleContainer}>
                            <h2 className={styles.title}>{pageName}</h2>
                        </div>
                    </Only.Desktop>
                )}

                <ShopbyAsyncBoundary
                    fallback={
                        <LoadingWrapper isLoading>
                            <span />
                        </LoadingWrapper>
                    }
                >
                    <SuspenseQuery {...profileQueryOptions()}>
                        {({ data }) => {
                            return (
                                <div className={styles.content}>{children}</div>
                            );
                        }}
                    </SuspenseQuery>
                </ShopbyAsyncBoundary>
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
