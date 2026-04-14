import type { OrderDirectionType } from '@/models';

export type SearchSortOption<TSortBy extends string> = {
    id: string;
    name: string;
    order: OrderDirectionType;
    sortBy: TSortBy;
};

export type RecipeSortBy = 'LATEST' | 'BOOKMARK_COUNT' | 'LIKE_COUNT';
export type CollectionSortBy = 'LATEST' | 'BOOKMARK_COUNT';

export const RECIPE_SORT_OPTIONS: SearchSortOption<RecipeSortBy>[] = [
    {
        id: 'newest',
        name: '최신순',
        order: 'DESC',
        sortBy: 'LATEST',
    },
    {
        id: 'bookmarks',
        name: '북마크순',
        order: 'DESC',
        sortBy: 'BOOKMARK_COUNT',
    },
    {
        id: 'likes',
        name: '좋아요순',
        order: 'DESC',
        sortBy: 'LIKE_COUNT',
    },
];

export const COLLECTION_SORT_OPTIONS: SearchSortOption<CollectionSortBy>[] = [
    {
        id: 'newest',
        name: '최신순',
        order: 'DESC',
        sortBy: 'LATEST',
    },
    {
        id: 'bookmarks',
        name: '북마크순',
        order: 'DESC',
        sortBy: 'BOOKMARK_COUNT',
    },
];
