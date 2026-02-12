import { clsx } from 'clsx';
import { ReactNode } from 'react';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import * as styles from './Layout.css';

interface LayoutProps {
    children: ReactNode;
    className?: string;
}

export function Layout({ children, className }: LayoutProps) {
    return (
        <div className={clsx(styles.layout, className)}>
            <Header />

            <main className={styles.main}>{children}</main>

            <Footer />
        </div>
    );
}
