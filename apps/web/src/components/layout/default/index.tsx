import { includes } from '@fxts/core';
import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { overlay } from 'overlay-kit';
import type { ReactNode } from 'react';

import { BottomNavigation } from '@/components/layout/bottom-navigation';
import * as styles from '@/components/layout/default/index.css';
import { Header } from '@/components/layout/header';
import { RouteChangeOverlay, ScrollToTop } from '@/components/ui';
import { PATHS } from '@/const/paths';
import { Popup } from '@/features/popup/components';
import { useRouteScroll } from '@/features/scroll';
import { useModalWatcher } from '@/hooks/common/useModalWatcher';
import { useSbInit, useShopbyStatistics } from '@/hooks/libs/shopby';
import { useHeaderHeight } from '@/hooks/ui';
import { useAuth } from '@/hooks/useAuth';
import { usePage, useRouteChange, useScrollLock } from '@/hooks/utils';
import { Footer } from '@/shared/components/layout/footer';
import { accessTokenCookie } from '@/utils/cookie';

interface LayoutProps {
    children: ReactNode;
    className?: string;
}

export const DefaultLayout = ({ children, className }: LayoutProps) => {
    useSbInit();
    useShopbyStatistics();

    useScrollLock();
    useHeaderHeight();
    useModalWatcher();
    useRouteScroll();

    const isLogin = useAuth();
    useRouteChange(() => {
        overlay.closeAll();

        if (isLogin) {
            accessTokenCookie.update();
        }
    });

    const { isShopMainPage, isCallbackPage, isMyAppBridgePage } = usePage();

    const router = useRouter();
    const isBottomNavigationVisible = !includes(router.pathname, [
        PATHS.ORDER.SHEET,
    ]);

    if (isCallbackPage || isMyAppBridgePage) {
        return <>{children}</>;
    }

    return (
        <div className={clsx(styles.layout, className)}>
            <Header />

            <main className={isShopMainPage ? styles.shopMain : styles.main}>
                <div className={styles.container}>{children}</div>
            </main>

            <Footer />

            <ScrollToTop />
            <RouteChangeOverlay />
            <Popup />

            {isBottomNavigationVisible && <BottomNavigation />}
        </div>
    );
};
