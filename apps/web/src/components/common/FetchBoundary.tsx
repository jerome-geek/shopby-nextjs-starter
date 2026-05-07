import { Suspense } from '@suspensive/react';
import type { ReactNode } from 'react';

import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';

interface FetchBoundaryProps {
    fallback?: ReactNode;
    errorFallback?: ReactNode;
    children?: ReactNode;
}

const FetchBoundary = ({
    children,
    fallback,
    errorFallback,
}: FetchBoundaryProps) => {
    return (
        <ShopbyAsyncBoundary fallback={errorFallback}>
            <Suspense fallback={fallback}>{children}</Suspense>
        </ShopbyAsyncBoundary>
    );
};

export default FetchBoundary;
