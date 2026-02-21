import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { product } from '@/api/product';

interface UseFavoriteKeywordsParams<T = string[]> {
    size?: number;
    options?: Omit<
        UseQueryOptions<
            string[],
            AxiosError<ShopByErrorResponse>,
            T,
            [string, { size: number }]
        >,
        'queryKey' | 'queryFn'
    >;
}

const useFavoriteKeywords = <T = string[]>({
    size = 10,
    options,
}: UseFavoriteKeywordsParams<T>) => {
    return useQuery({
        queryKey: ['favoriteKeywords', { size }],
        queryFn: async () => {
            const { data } = await product.getFavoriteKeywords({ size });

            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        ...options,
    });
};

export default useFavoriteKeywords;
