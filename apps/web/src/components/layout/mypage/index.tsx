import { clsx } from 'clsx';
import { ReactNode } from 'react';

import { BottomNav } from '@/components/layout/bottom-navigation';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import * as styles from '@/components/layout/mypage/index.css';
import ScrollToTop from '@/components/ui/scroll-to-top';
import { useSbInit, useShopbyStatistics } from '@/hooks/libs/shopby';
import { useHeaderHeight } from '@/hooks/ui';

interface MypageLayoutProps {
    children: ReactNode;
    className?: string;
}

export function MypageLayout({ children, className }: MypageLayoutProps) {
    return (
        <section className={clsx(styles.layout, className)}>
            <article className={styles.article}>{children}</article>
        </section>
    );
}
