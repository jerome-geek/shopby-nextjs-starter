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
        <ShopbyAsyncBoundary fallback={fallback} errorFallback={errorFallback}>
            {children}
        </ShopbyAsyncBoundary>
    );
};

export default FetchBoundary;
