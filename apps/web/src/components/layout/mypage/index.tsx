import { clsx } from 'clsx';
import { ReactNode } from 'react';

import * as styles from '@/components/layout/mypage/index.css';

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
