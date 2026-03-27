import { includes } from '@fxts/core';
import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import BottomNavigation from '@/components/layout/bottom-navigation';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import * as styles from '@/components/layout/index.css';
import RouteChangeOverlay from '@/components/ui/route-change-overlay';
import ScrollToTop from '@/components/ui/scroll-to-top';
import { PATHS } from '@/const/paths';
import { useSbInit, useShopbyStatistics } from '@/hooks/libs/shopby';
import { useHeaderHeight } from '@/hooks/ui';
import { useScrollLock } from '@/hooks/utils';

interface LayoutProps {
    children: ReactNode;
    className?: string;
}

export function Layout({ children, className }: LayoutProps) {
    useSbInit();
    useShopbyStatistics();

    useScrollLock();
    useHeaderHeight();

    const router = useRouter();
    const isBottomNavigationVisible = !includes(router.pathname, [
        PATHS.ORDER.SHEET,
    ]);

    return (
        <div className={clsx(styles.layout, className)}>
            <Header />

            <main className={styles.main}>
                <div className={styles.container}>{children}</div>
            </main>

            <Footer />
            <ScrollToTop />
            <RouteChangeOverlay />
            {isBottomNavigationVisible && <BottomNavigation />}
        </div>
    );
}
