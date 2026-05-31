import { queryOptions, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { category } from '@/entities/display/api';
import { categoryKeys } from '@/hooks/queryKeys';
import type {
    GetCategoriesByManagementCodeData,
    GetCategoriesByManagementCodeResponse,
    GetCategoriesParams,
    GetCategoriesResponse,
    GetCategoryParams,
    GetCategoryResponse,
    GetNewProductCategoriesResponse,
} from '@/entities/display/model/category';

export interface CategoryDetailParams<T = GetCategoryResponse> {
    categoryNo: string | number;
    searchParams?: GetCategoryParams;
    options?: Omit<
        UseQueryOptions<
            GetCategoryResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof categoryKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const categoryDetailOptions = <T = GetCategoryResponse>({
    categoryNo,
    searchParams,
    options,
}: CategoryDetailParams<T>) =>
    queryOptions({
        queryKey: categoryKeys.detail(categoryNo, searchParams),
        queryFn: async () => {
            const { data } = await category.getCategory(
                categoryNo,
                searchParams,
            );

            return data;
        },
        ...options,
    });

export interface CategoriesByCodeParams<
    T = GetCategoriesByManagementCodeResponse,
> {
    data: GetCategoriesByManagementCodeData;
    options?: Omit<
        UseQueryOptions<
            GetCategoriesByManagementCodeResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof categoryKeys)['byCode']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const categoriesByCodeOptions = <
    T = GetCategoriesByManagementCodeResponse,
>({
    data,
    options,
}: CategoriesByCodeParams<T>) =>
    queryOptions({
        queryKey: categoryKeys.byCode(data),
        queryFn: async () => {
            const { data: responseData } =
                await category.getCategoriesByManagementCode(data);

            return responseData;
        },
        ...options,
    });

export interface CategoryAllParams<T = GetCategoriesResponse> {
    params?: GetCategoriesParams;
    options?: Omit<
        UseQueryOptions<
            GetCategoriesResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof categoryKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const categoryAllOptions = <T = GetCategoriesResponse>({
    params,
    options,
}: CategoryAllParams<T> = {}) =>
    queryOptions({
        queryKey: categoryKeys.list(params),
        queryFn: async () => {
            const { data } = await category.getCategories(params);

            return data;
        },
        ...options,
    });

export interface NewProductCategoryListParams<
    T = GetNewProductCategoriesResponse,
> {
    options?: Omit<
        UseQueryOptions<
            GetNewProductCategoriesResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof categoryKeys)['newList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const newProductCategoryListOptions = <
    T = GetNewProductCategoriesResponse,
>({
    options,
}: NewProductCategoryListParams<T> = {}) =>
    queryOptions({
        queryKey: categoryKeys.newList(),
        queryFn: async () => {
            const { data } = await category.getNewProductCategories();

            return data;
        },
        ...options,
    });
