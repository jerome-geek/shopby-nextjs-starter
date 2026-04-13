import type { OrderDirectionType } from '@/models';

export type RecipeSortOption = {
    id: string;
    name: string;
    order: OrderDirectionType;
};

export const RECIPE_SORT_OPTIONS: RecipeSortOption[] = [
    {
        id: 'newest',
        name: '최신순',
        order: 'ASC',
    },
    {
        id: 'oldest',
        name: '오래된순',
        order: 'DESC',
    },
];
