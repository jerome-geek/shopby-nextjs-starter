import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { board } from '@/api/manage';
import { boardKeys } from '@/hooks/queryKeys';
import { GetCategoriesResponse } from '@/models/manage/board';

interface UseBoardCategoryListParams<T = GetCategoriesResponse> {
    boardNo: string;
    options?: Omit<
        UseQueryOptions<
            GetCategoriesResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof boardKeys)['category']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useBoardCategoryList = <T = GetCategoriesResponse>({
    boardNo,
    options,
}: UseBoardCategoryListParams<T>) => {
    return useQuery({
        queryKey: boardKeys.category(boardNo),
        queryFn: async () => {
            const { data } = await board.getCategories(boardNo);

            return data;
        },
        staleTime: 1000 * 60 * 100,
        gcTime: 1000 * 60 * 100,
        ...options,
    });
};

export default useBoardCategoryList;
