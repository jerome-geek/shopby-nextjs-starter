import { includes } from '@fxts/core';
import { clsx } from 'clsx';
import { useLenis } from 'lenis/react';
import { useRouter } from 'next/router';
import { overlay } from 'overlay-kit';
import type { ReactNode } from 'react';

import BottomNavigation from '@/components/layout/bottom-navigation';
import * as styles from '@/components/layout/default/index.css';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { RouteChangeOverlay, ScrollToTop } from '@/components/ui';
import { PATHS } from '@/const/paths';
import { useModalWatcher } from '@/hooks/common/useModalWatcher';
import { useSbInit, useShopbyStatistics } from '@/hooks/libs/shopby';
import { useHeaderHeight } from '@/hooks/ui';
import { usePage, useRouteChange, useScrollLock } from '@/hooks/utils';
import { isLoggedIn } from '@/utils/auth';
import { accessTokenCookie } from '@/utils/cookie';

interface LayoutProps {
    children: ReactNode;
    className?: string;
}

export const DefaultLayout = ({ children, className }: LayoutProps) => {
    const lenis = useLenis();

    useSbInit();
    useShopbyStatistics();

    useScrollLock();
    useHeaderHeight();
    useModalWatcher();

    const { isShopMainPage } = usePage();

    // NOTE : 페이지 이동 시 액세스토큰 만료 시간을 30분 연장하여 세션 유지 (로그인 상태 유지)
    // 페이지 이동 동작이 30분 동안 없을 경우 액세스토큰 쿠키 만료되어 자동 삭제 (로그아웃)
    useRouteChange(() => {
        overlay.closeAll();

        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }

        if (isLoggedIn()) {
            accessTokenCookie.update();
        }
    });

    const router = useRouter();
    const isBottomNavigationVisible = !includes(router.pathname, [
        PATHS.ORDER.SHEET,
    ]);

    return (
        <div className={clsx(styles.layout, className)}>
            <Header />

            <main className={isShopMainPage ? styles.shopMain : styles.main}>
                <div className={styles.container}>{children}</div>
            </main>

            <Footer />
            <ScrollToTop />
            <RouteChangeOverlay />
            {isBottomNavigationVisible && <BottomNavigation />}
        </div>
    );
};
