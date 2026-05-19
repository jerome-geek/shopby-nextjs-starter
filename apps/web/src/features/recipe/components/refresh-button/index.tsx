import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { RefreshCw } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';

import * as styles from '@/features/recipe/components/refresh-button/index.css';
import { collectionKeys, recipeKeys } from '@/hooks/queryKeys';
import { vars } from '@/styles/theme.css';

type RecipeRefreshButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const RecipeRefreshButton = ({ ...props }: RecipeRefreshButtonProps) => {
    const queryClient = useQueryClient();

    return (
        <button
            type='button'
            {...props}
            className={clsx(styles.refreshButton, props.className)}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                queryClient.invalidateQueries({
                    queryKey: recipeKeys.all,
                    refetchType: 'all',
                });

                queryClient.invalidateQueries({
                    queryKey: collectionKeys.all,
                    refetchType: 'all',
                });
            }}
        >
            <RefreshCw
                size={18}
                style={{
                    color: vars.color.gray['70'],
                }}
            />
        </button>
    );
};
