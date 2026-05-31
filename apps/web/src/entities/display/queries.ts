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

import { productSection } from '@/entities/display/api';
import { productSectionKeys } from '@/hooks/queryKeys';
import type {
    GetProductSectionByIdResponse,
    GetProductSectionProductsParams,
    GetProductSectionProductsResponse,
    GetProductSectionResponse,
    GetProductSectionsResponse,
} from '@/entities/display/model/productSection';

export interface ProductSectionProductListParams<
    T = GetProductSectionProductsResponse,
> {
    type?: 'id' | 'no';
    sectionId: string;
    searchParams: GetProductSectionProductsParams;
    options?: Omit<
        UseQueryOptions<
            GetProductSectionProductsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productSectionKeys)['products']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export type InfiniteProductSectionPage = {
    data: GetProductSectionProductsResponse;
    pageNumber: number;
};

export interface ProductSectionInfiniteProductListParams {
    type?: 'id' | 'no';
    sectionId: string;
    searchParams: Omit<GetProductSectionProductsParams, 'pageNumber'>;
    options?: Omit<
        UseInfiniteQueryOptions<
            InfiniteProductSectionPage,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<InfiniteProductSectionPage>,
            ReturnType<(typeof productSectionKeys)['infiniteProducts']>,
            number
        >,
        'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >;
}

const createQueryFn = (
    type: 'id' | 'no',
    sectionId: string,
    searchParams: GetProductSectionProductsParams,
) => {
    return async () => {
        if (type === 'no') {
            const { data } = await productSection.getProductSectionProductsByNo(
                sectionId,
                searchParams,
            );

            return data;
        }

        const { data } = await productSection.getProductSectionProductsById(
            sectionId,
            searchParams,
        );

        return data;
    };
};

const createInfiniteQueryFn = (
    type: 'id' | 'no',
    sectionId: string,
    searchParams: Omit<GetProductSectionProductsParams, 'pageNumber'>,
) => {
    return async ({ pageParam }: { pageParam: number }) => {
        const params = {
            ...searchParams,
            pageNumber: pageParam,
        };

        if (type === 'no') {
            const { data } = await productSection.getProductSectionProductsByNo(
                sectionId,
                params,
            );

            return { data, pageNumber: pageParam };
        }

        const { data } = await productSection.getProductSectionProductsById(
            sectionId,
            params,
        );

        return { data, pageNumber: pageParam };
    };
};

export const productSectionProductListOptions = <
    T = GetProductSectionProductsResponse,
>({
    type = 'id',
    sectionId,
    searchParams,
    options,
}: ProductSectionProductListParams<T>) =>
    queryOptions({
        queryKey: productSectionKeys.products(sectionId, searchParams),
        queryFn: createQueryFn(type, sectionId, searchParams),
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
        ...options,
    });

export const productSectionInfiniteProductListOptions = ({
    type = 'id',
    sectionId,
    searchParams,
    options,
}: ProductSectionInfiniteProductListParams) =>
    infiniteQueryOptions({
        queryKey: productSectionKeys.infiniteProducts(sectionId, searchParams),
        queryFn: createInfiniteQueryFn(type, sectionId, searchParams),
        getNextPageParam: (lastPage, allPages) => {
            if (!searchParams.pageSize) {
                return;
            }

            const totalCount = lastPage.data?.productTotalCount ?? 0;

            return searchParams.pageSize * allPages.length < totalCount
                ? lastPage.pageNumber + 1
                : undefined;
        },
        initialPageParam: 1,
        placeholderData: keepPreviousData,
        ...options,
    });

export interface ProductSectionListParams<T = GetProductSectionsResponse> {
    options?: Omit<
        UseQueryOptions<
            GetProductSectionsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productSectionKeys)['lists']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const productSectionListOptions = <T = GetProductSectionsResponse>({
    options,
}: ProductSectionListParams<T> = {}) =>
    queryOptions({
        queryKey: productSectionKeys.lists(),
        queryFn: async () => {
            const { data } = await productSection.getProductSections();

            return data;
        },
        ...options,
    });

export interface ProductSectionDetailOptionsParams<
    T = GetProductSectionResponse,
> {
    sectionNo: number;
    options?: Omit<
        UseQueryOptions<
            GetProductSectionResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productSectionKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const productSectionDetailOptions = <T = GetProductSectionResponse>({
    sectionNo,
    options,
}: ProductSectionDetailOptionsParams<T>) =>
    queryOptions({
        queryKey: productSectionKeys.detail(sectionNo),
        queryFn: async () => {
            const { data } = await productSection.getProductSection(sectionNo);
            return data;
        },
        enabled: !isEmpty(sectionNo),
        ...options,
    });

export interface ProductSectionByIdOptionsParams<
    T = GetProductSectionByIdResponse,
> {
    sectionId: string;
    options?: Omit<
        UseQueryOptions<
            GetProductSectionByIdResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productSectionKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const productSectionByIdOptions = <T = GetProductSectionByIdResponse>({
    sectionId,
    options,
}: ProductSectionByIdOptionsParams<T>) =>
    queryOptions({
        queryKey: productSectionKeys.detail(sectionId),
        queryFn: async () => {
            const { data } =
                await productSection.getProductSectionById(sectionId);
            return data;
        },
        enabled: !isEmpty(sectionId),
        placeholderData: keepPreviousData,
        ...options,
    });
