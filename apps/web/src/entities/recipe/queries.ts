import {
    keepPreviousData,
    queryOptions,
    type UseQueryOptions,
    type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { recipe } from '@/api/shop';
import { recipeKeys } from '@/hooks/queryKeys';
import type {
    SearchPublicRecipesParams,
    SearchRecipesParams,
    SearchRecipesResponse,
} from '@/models/shop/recipe';

export interface PublicRecipeQueryParams<T = SearchRecipesResponse> {
    searchParams: SearchPublicRecipesParams;
    options?: Omit<
        UseQueryOptions<
            SearchRecipesResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof recipeKeys)['publicSearch']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const publicRecipeQueryOptions = <T = SearchRecipesResponse>({
    searchParams,
    options,
}: PublicRecipeQueryParams<T>) =>
    queryOptions({
        queryKey: recipeKeys.publicSearch(searchParams),
        queryFn: async () => {
            const { data } = await recipe.searchPublicRecipes(searchParams);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });

export interface PublicRecipeSuspenseParams<T = SearchRecipesResponse> {
    searchParams: SearchPublicRecipesParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            SearchRecipesResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof recipeKeys)['publicSearch']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const publicRecipeSuspenseQueryOptions = <T = SearchRecipesResponse>({
    searchParams,
    options,
}: PublicRecipeSuspenseParams<T>) =>
    queryOptions({
        queryKey: recipeKeys.publicSearch(searchParams),
        queryFn: async () => {
            const { data } = await recipe.searchPublicRecipes(searchParams);

            return data;
        },
        ...options,
    });

export interface MyRecipeQueryParams<T = SearchRecipesResponse> {
    searchParams?: SearchRecipesParams;
    options?: Omit<
        UseQueryOptions<
            SearchRecipesResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof recipeKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const myRecipeQueryOptions = <T = SearchRecipesResponse>({
    searchParams,
    options,
}: MyRecipeQueryParams<T> = {}) =>
    queryOptions({
        queryKey: recipeKeys.list(searchParams),
        queryFn: async () => {
            const { data } = await recipe.searchMyRecipes(searchParams);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });

export interface MyRecipeSuspenseParams<T = SearchRecipesResponse> {
    searchParams?: SearchRecipesParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            SearchRecipesResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof recipeKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const myRecipeSuspenseQueryOptions = <T = SearchRecipesResponse>({
    searchParams,
    options,
}: MyRecipeSuspenseParams<T> = {}) =>
    queryOptions({
        queryKey: recipeKeys.list(searchParams),
        queryFn: async () => {
            const { data } = await recipe.searchMyRecipes(searchParams);

            return data;
        },
        ...options,
    });
