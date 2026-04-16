import type { ReactNode } from 'react';
import { Suspense } from '@suspensive/react';

import ShopbyApiErrorBoundary from '@/components/error-boundary/shopby';

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
        <ShopbyApiErrorBoundary fallback={errorFallback}>
            <Suspense fallback={fallback}>{children}</Suspense>
        </ShopbyApiErrorBoundary>
    );
};

export default FetchBoundary;
