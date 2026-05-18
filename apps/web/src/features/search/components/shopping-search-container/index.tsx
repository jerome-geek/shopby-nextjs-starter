import { ReactNode } from 'react';

import { useShoppingSearch } from '@/features/search/hooks/useShoppingSearch';

interface ShoppingSearchContainerProps {
    isIntegrated?: boolean;
    children: (data: ReturnType<typeof useShoppingSearch>) => ReactNode;
}

export const ShoppingSearchContainer = ({
    isIntegrated = false,
    children,
}: ShoppingSearchContainerProps) => {
    const data = useShoppingSearch({ isIntegrated });

    return <>{children(data)}</>;
};
