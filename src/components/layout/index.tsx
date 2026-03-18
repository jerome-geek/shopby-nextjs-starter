import { clsx } from 'clsx';
import { ReactNode } from 'react';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { BottomNav } from '@/components/layout/bottom-navigation';
import * as styles from '@/components/layout/index.css';
import ScrollToTop from '@/components/ui/scroll-to-top';

interface LayoutProps {
    children: ReactNode;
    className?: string;
}

export function Layout({ children, className }: LayoutProps) {
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
