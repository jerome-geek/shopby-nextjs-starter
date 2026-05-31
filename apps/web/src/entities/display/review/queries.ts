import { isEmpty } from '@fxts/core';
import {
    infiniteQueryOptions,
    keepPreviousData,
    queryOptions,
    type InfiniteData,
    type UseInfiniteQueryOptions,
    type UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { review } from '@/entities/display/api';
import { reviewKeys } from '@/hooks/queryKeys';
import type {
    GetMyProductReviewsParams,
    GetMyProductReviewsResponse,
    GetPhotoReviewListParams,
    GetPhotoReviewListResponse,
    GetProductReviewCommentResponse,
    GetProductReviewListParams,
    GetProductReviewListResponse,
    GetProductReviewListV2Params,
    GetProductReviewListV2Response,
    GetProductReviewResponse,
    GetReviewableProductsParams,
    GetReviewableProductsResponse,
} from '@/entities/display/model/review';

/**
 * ==========================================
 * Types & Interfaces
 * ==========================================
 */
export interface UseProductReviewListParams<T = GetProductReviewListResponse> {
    productNo: number;
    searchParams: GetProductReviewListParams;
    options?: Omit<
        UseQueryOptions<
            GetProductReviewListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof reviewKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export interface UseProductReviewListV2Params<
    T = GetProductReviewListV2Response,
> {
    productNo: number;
    searchParams: GetProductReviewListV2Params;
    options?: Omit<
        UseQueryOptions<
            GetProductReviewListV2Response,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof reviewKeys)['listV2']>
        >,
        'queryKey' | 'queryFn'
    >;
}

/**
 * ==========================================
 * Query Options
 * ==========================================
 */

export const productReviewListOptions = <T = GetProductReviewListResponse>({
    productNo,
    searchParams,
    options,
}: UseProductReviewListParams<T>) => {
    return queryOptions({
        queryKey: reviewKeys.list(productNo, searchParams),
        queryFn: async () => {
            const { data } = await review.getProductReviewList(
                productNo,
                searchParams,
            );

            return data;
        },
        ...options,
    });
};

export const productReviewListV2Options = <T = GetProductReviewListV2Response>({
    productNo,
    searchParams,
    options,
}: UseProductReviewListV2Params<T>) => {
    return queryOptions({
        queryKey: reviewKeys.listV2(productNo, searchParams),
        queryFn: async () => {
            const { data } = await review.getProductReviewListV2(
                productNo,
                searchParams,
            );

            return data;
        },
        ...options,
    });
};

export interface MyReviewListOptionsParams<T = GetMyProductReviewsResponse> {
    memberNo?: number;
    searchParams: GetMyProductReviewsParams;
    options?: Omit<
        UseQueryOptions<
            GetMyProductReviewsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof reviewKeys)['myReviewedList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const myReviewListOptions = <T = GetMyProductReviewsResponse>({
    searchParams,
    options,
}: MyReviewListOptionsParams<T>) =>
    queryOptions({
        queryKey: reviewKeys.myReviewedList(searchParams),
        queryFn: async () => {
            const { data } = await review.getMyProductReviews(searchParams);
            return data;
        },
        ...options,
    });

export type InfiniteMyReviewPage = GetMyProductReviewsResponse;

export interface InfiniteMyReviewListOptionsParams {
    searchParams: GetMyProductReviewsParams;
    options?: Omit<
        UseInfiniteQueryOptions<
            InfiniteMyReviewPage,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<InfiniteMyReviewPage>,
            ReturnType<(typeof reviewKeys)['myReviewedInfiniteList']>,
            number
        >,
        'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >;
}

export const infiniteMyReviewListOptions = ({
    searchParams,
    options,
}: InfiniteMyReviewListOptionsParams) =>
    infiniteQueryOptions({
        queryKey: reviewKeys.myReviewedInfiniteList(searchParams),
        queryFn: async ({ pageParam }) => {
            const { data } = await review.getMyProductReviews({
                ...searchParams,
                pageNumber: pageParam,
            });
            return data;
        },
        initialPageParam: searchParams.pageNumber ?? 1,
        getNextPageParam: (lastPage, allPages) => {
            const loaded = allPages.reduce(
                (acc, page) => acc + (page.items?.length ?? 0),
                0,
            );
            if (loaded >= (lastPage.totalCount ?? 0)) {
                return undefined;
            }
            return allPages.length + 1;
        },
        ...options,
    });

export interface ReviewableProductListOptionsParams<
    T = GetReviewableProductsResponse,
> {
    searchParams: GetReviewableProductsParams;
    options?: Omit<
        UseQueryOptions<
            GetReviewableProductsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof reviewKeys)['myReviewableList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const reviewableProductListOptions = <
    T = GetReviewableProductsResponse,
>({
    searchParams,
    options,
}: ReviewableProductListOptionsParams<T>) =>
    queryOptions({
        queryKey: reviewKeys.myReviewableList(searchParams),
        queryFn: async () => {
            const { data } = await review.getReviewableProducts(searchParams);
            return data;
        },
        ...options,
    });

export type InfiniteReviewablePage = GetReviewableProductsResponse;

export interface InfiniteReviewableProductListOptionsParams {
    searchParams: GetReviewableProductsParams;
    options?: Omit<
        UseInfiniteQueryOptions<
            InfiniteReviewablePage,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<InfiniteReviewablePage>,
            ReturnType<(typeof reviewKeys)['myReviewableInfiniteList']>,
            number
        >,
        'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >;
}

export const infiniteReviewableProductListOptions = ({
    searchParams,
    options,
}: InfiniteReviewableProductListOptionsParams) =>
    infiniteQueryOptions({
        queryKey: reviewKeys.myReviewableInfiniteList(searchParams),
        queryFn: async ({ pageParam }) => {
            const { data } = await review.getReviewableProducts({
                ...searchParams,
                pageNumber: pageParam,
            });
            return data;
        },
        initialPageParam: searchParams.pageNumber ?? 1,
        getNextPageParam: (lastPage, allPages) => {
            const loaded = allPages.reduce(
                (acc, page) => acc + (page.items?.length ?? 0),
                0,
            );
            if (loaded >= (lastPage.totalCount ?? 0)) {
                return undefined;
            }
            return allPages.length + 1;
        },
        ...options,
    });

export interface PhotoReviewListOptionsParams<T = GetPhotoReviewListResponse> {
    productNo: number;
    searchParams?: GetPhotoReviewListParams;
    options?: Omit<
        UseQueryOptions<
            GetPhotoReviewListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof reviewKeys)['photoList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const photoReviewListOptions = <T = GetPhotoReviewListResponse>({
    productNo,
    searchParams,
    options,
}: PhotoReviewListOptionsParams<T>) =>
    queryOptions({
        queryKey: reviewKeys.photoList(productNo, searchParams),
        queryFn: async () => {
            const { data } = await review.getPhotoReviewList(
                productNo,
                searchParams,
            );
            return data;
        },
        ...options,
    });

export interface ProductReviewDetailOptionsParams<
    T = GetProductReviewResponse,
> {
    productNo: number;
    reviewNo: number;
    options?: Omit<
        UseQueryOptions<
            GetProductReviewResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof reviewKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const productReviewDetailOptions = <T = GetProductReviewResponse>({
    productNo,
    reviewNo,
    options,
}: ProductReviewDetailOptionsParams<T>) =>
    queryOptions({
        queryKey: reviewKeys.detail(productNo, reviewNo),
        queryFn: async () => {
            const { data } = await review.getProductReview(productNo, reviewNo);
            return data;
        },
        enabled: !!productNo && !!reviewNo,
        ...options,
    });

export interface ProductReviewCommentListOptionsParams<
    T = GetProductReviewCommentResponse,
> {
    productNo: number;
    reviewNo: number;
    searchParams: GetProductReviewListParams;
    options?: Omit<
        UseQueryOptions<
            GetProductReviewCommentResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof reviewKeys)['comment']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const productReviewCommentListOptions = <
    T = GetProductReviewCommentResponse,
>({
    productNo,
    reviewNo,
    searchParams,
    options,
}: ProductReviewCommentListOptionsParams<T>) =>
    queryOptions({
        queryKey: reviewKeys.comment(productNo, reviewNo, searchParams),
        queryFn: async () => {
            const { data } = await review.getProductReviewComments(
                productNo,
                reviewNo,
                searchParams,
            );
            return data;
        },
        enabled: !isEmpty(productNo),
        placeholderData: keepPreviousData,
        ...options,
    });
