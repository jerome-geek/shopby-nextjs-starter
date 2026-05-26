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
    GetRecipeDetailResponse,
    GetRecipeExposureGroupParams,
    RecipeExposureGroupResponse,
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

export interface UseRecipeDetailParams<T = GetRecipeDetailResponse> {
    sno: number;
    options?: Omit<
        UseQueryOptions<
            GetRecipeDetailResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof recipeKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const recipeDetailOptions = <T = GetRecipeDetailResponse>({
    sno,
    options,
}: UseRecipeDetailParams<T>) =>
    queryOptions({
        queryKey: recipeKeys.detail(sno),
        queryFn: async () => {
            const { data } = await recipe.getRecipeDetail(sno);

            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        placeholderData: keepPreviousData,
        ...options,
    });

export interface UseRecipeDetailSuspenseParams<T = GetRecipeDetailResponse> {
    sno: number;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetRecipeDetailResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof recipeKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const recipeDetailSuspenseOptions = <T = GetRecipeDetailResponse>({
    sno,
    options,
}: UseRecipeDetailSuspenseParams<T>) =>
    queryOptions({
        queryKey: recipeKeys.detail(sno),
        queryFn: async () => {
            const { data } = await recipe.getRecipeDetail(sno);

            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });

export interface UseRecipeExposureGroupParams<T = RecipeExposureGroupResponse> {
    groupId: string;
    searchParams?: GetRecipeExposureGroupParams;
    options?: Omit<
        UseQueryOptions<
            RecipeExposureGroupResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof recipeKeys)['exposureGroup']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const recipeExposureGroupOptions = <T = RecipeExposureGroupResponse>({
    groupId,
    searchParams,
    options,
}: UseRecipeExposureGroupParams<T>) =>
    queryOptions({
        queryKey: recipeKeys.exposureGroup(groupId, searchParams),
        queryFn: async () => {
            const { data } = await recipe.getRecipeExposureGroup(
                groupId,
                searchParams,
            );

            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });

export interface UseRecipeExposureGroupSuspenseParams<
    T = RecipeExposureGroupResponse,
> {
    groupId: string;
    searchParams?: GetRecipeExposureGroupParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            RecipeExposureGroupResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof recipeKeys)['exposureGroup']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const recipeExposureGroupSuspenseOptions = <
    T = RecipeExposureGroupResponse,
>({
    groupId,
    searchParams,
    options,
}: UseRecipeExposureGroupSuspenseParams<T>) =>
    queryOptions({
        queryKey: recipeKeys.exposureGroup(groupId, searchParams),
        queryFn: async () => {
            const { data } = await recipe.getRecipeExposureGroup(
                groupId,
                searchParams,
            );

            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
