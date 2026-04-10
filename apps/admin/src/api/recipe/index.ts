import type { AxiosRequestConfig } from 'axios';

import { request } from '@/api/core/request';
import { SearchRecipesParams, SearchRecipesResponse } from '@/model/recipe';

export const recipe = {
    searchRecipes: (
        params: SearchRecipesParams,
        options?: AxiosRequestConfig,
    ) => {
        return request<SearchRecipesResponse>({
            method: 'GET',
            url: '/admin/recipe/search',
            params,
            ...options,
        });
    },
};
