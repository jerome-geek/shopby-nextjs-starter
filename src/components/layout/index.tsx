import { clsx } from 'clsx';
import { ReactNode } from 'react';

import * as styles from './Layout.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

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
