import { ReactNode } from 'react';

import { Header } from './header';
import { Footer } from './footer';
import * as styles from './Layout.css';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />
        </div>
    );
}
