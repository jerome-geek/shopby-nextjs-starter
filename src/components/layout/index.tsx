import { clsx } from 'clsx';
import { ReactNode } from 'react';

import { BottomNav } from '@/components/layout/bottom-navigation';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import * as styles from '@/components/layout/index.css';
import ScrollToTop from '@/components/ui/scroll-to-top';
import { useSbInit, useShopbyStatistics } from '@/hooks/libs/shopby';

interface LayoutProps {
    children: ReactNode;
    className?: string;
}

export function Layout({ children, className }: LayoutProps) {
    useSbInit();
    useShopbyStatistics();

    return (
        <div className={clsx(styles.layout, className)}>
            <Header />

            <main className={styles.main}>
                <div className={styles.container}>{children}</div>
            </main>

            <Footer />
            <ScrollToTop />
            <BottomNav />
        </div>
    );
}
