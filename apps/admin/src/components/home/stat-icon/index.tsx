import { useMemo } from 'react';

import { ListIcon, GridIcon, FolderIcon } from '@/icons';

export const StatIcon = ({
    iconType,
}: {
    iconType: 'recipe' | 'collection' | 'recipeGroup' | 'collectionGroup';
}) => {
    const statIconShellClassName =
        'flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-brand-500 transition-colors duration-200 group-hover:bg-brand-600';

    const renderIcon = useMemo(() => {
        switch (iconType) {
            case 'recipe':
                return <ListIcon className='h-6 w-6 text-white' />;
            case 'collection':
                return <GridIcon className='h-6 w-6 text-white' />;
            case 'recipeGroup':
                return <FolderIcon className='h-6 w-6 text-white' />;
            case 'collectionGroup':
                return <FolderIcon className='h-6 w-6 text-white' />;
        }
    }, [iconType]);

    return <div className={statIconShellClassName}>{renderIcon}</div>;
};
