import { ReactNode } from 'react';

import { useCollectionSearch } from '../../hooks/useCollectionSearch';

interface CollectionSearchContainerProps {
    isIntegrated?: boolean;
    children: (data: ReturnType<typeof useCollectionSearch>) => ReactNode;
}

export const CollectionSearchContainer = ({
    isIntegrated = false,
    children,
}: CollectionSearchContainerProps) => {
    const data = useCollectionSearch({ isIntegrated });

    return <>{children(data)}</>;
};
