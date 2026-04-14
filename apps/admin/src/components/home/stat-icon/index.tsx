import { useMemo } from 'react';

import { ListIcon, GridIcon, FolderIcon } from '@/icons';

export const StatIcon = ({
    iconType,
}: {
    iconType: 'recipe' | 'collection' | 'recipeGroup' | 'collectionGroup';
}) => {
    const baseShellClassName =
        'flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] transition-colors duration-200 group-hover:bg-brand-600 group-hover:text-white';

    const { shellClassName, icon } = useMemo(() => {
        const shellClassName =
            'bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400';

        switch (iconType) {
            case 'recipe':
                return {
                    shellClassName,
                    icon: <ListIcon className='h-6 w-6' />,
                };
            case 'collection':
                return {
                    shellClassName,
                    icon: <GridIcon className='h-6 w-6' />,
                };
            case 'recipeGroup':
                return {
                    shellClassName,
                    icon: <FolderIcon className='h-6 w-6' />,
                };
            case 'collectionGroup':
                return {
                    shellClassName,
                    icon: <FolderIcon className='h-6 w-6' />,
                };
        }
    }, [iconType]);

    return (
        <div
            className={`${baseShellClassName} ${shellClassName} group-hover:bg-brand-500`}
        >
            <span className='group-hover:text-white'>{icon}</span>
        </div>
    );
};
