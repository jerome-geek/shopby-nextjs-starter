import { useQuery } from '@tanstack/react-query';

import {
    favoriteKeywordsOptions,
    type FavoriteKeywordsOptionsParams,
} from '@/entities/product/queries';

const useFavoriteKeywords = <T = string[]>({
    size = 10,
    options,
}: FavoriteKeywordsOptionsParams<T> = {}) => {
    return useQuery(favoriteKeywordsOptions({ size, options }));
};

export default useFavoriteKeywords;
