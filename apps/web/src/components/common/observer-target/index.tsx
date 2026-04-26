'use client';

import { useEffect, useRef } from 'react';

import * as styles from '@/components/common/observer-target/index.css';

interface ObserverTargetProps {
    hasNextPage?: boolean;
    totalCount?: number;
    onIntersect: () => void;
    rootMargin?: string;
}

export const ObserverTarget = ({
    hasNextPage,
    totalCount,
    onIntersect,
    rootMargin = '200px',
}: ObserverTargetProps) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) {
            return;
        }

        if (typeof IntersectionObserver === 'undefined') {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (!entry?.isIntersecting) {
                    return;
                }
                onIntersect();
            },
            { rootMargin },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [onIntersect, rootMargin]);

    if (hasNextPage === false) {
        return <div className={styles.endMessage} />;
    }

    return <div ref={ref} className={styles.target} aria-hidden='true' />;
};
