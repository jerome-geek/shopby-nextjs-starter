import { useQuery } from '@tanstack/react-query';

import {
    boardCategoryListOptions,
    type UseBoardCategoryListParams,
} from '@/entities/manage/board/queries';
import type { GetCategoriesResponse } from '@/models/manage/board';

const useBoardCategoryList = <T = GetCategoriesResponse>(
    params: UseBoardCategoryListParams<T>,
) => useQuery(boardCategoryListOptions(params));

export default useBoardCategoryList;
