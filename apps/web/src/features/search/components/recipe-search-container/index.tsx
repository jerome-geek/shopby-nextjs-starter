import { ReactNode } from 'react';

import { useRecipeSearch } from '../../hooks/useRecipeSearch';

interface RecipeSearchContainerProps {
    isIntegrated?: boolean;
    children: (data: ReturnType<typeof useRecipeSearch>) => ReactNode;
}

export const RecipeSearchContainer = ({
    isIntegrated = false,
    children,
}: RecipeSearchContainerProps) => {
    const data = useRecipeSearch({ isIntegrated });

    return <>{children(data)}</>;
};
