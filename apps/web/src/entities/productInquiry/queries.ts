import { queryOptions, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { productInquiry } from '@/api/display';
import { productInquiryKeys } from '@/hooks/queryKeys';
import type {
    GetMyProductInquiriesParams,
    GetMyProductInquiriesResponse,
    GetProductInquiriesParams,
    GetProductInquiriesResponse,
    GetProductInquiryConfigResponse,
    GetProductInquiryResponse,
} from '@/models/display/productInquiry';

export interface ProductInquiryDetailParams<T = GetProductInquiryResponse> {
    productNo: number;
    inquiryNo: number;
    options?: Omit<
        UseQueryOptions<
            GetProductInquiryResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productInquiryKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const productInquiryDetailOptions = <T = GetProductInquiryResponse>({
    productNo,
    inquiryNo,
    options,
}: ProductInquiryDetailParams<T>) =>
    queryOptions({
        queryKey: productInquiryKeys.detail(productNo, inquiryNo),
        queryFn: async () => {
            const { data } = await productInquiry.getProductInquiry(
                productNo,
                inquiryNo,
            );

            return data;
        },
        ...options,
    });

export interface ProductInquiryListParams<T = GetProductInquiriesResponse> {
    productNo: number;
    searchParams?: GetProductInquiriesParams;
    options?: Omit<
        UseQueryOptions<
            GetProductInquiriesResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productInquiryKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const productInquiryListOptions = <T = GetProductInquiriesResponse>({
    productNo,
    searchParams,
    options,
}: ProductInquiryListParams<T>) =>
    queryOptions({
        queryKey: productInquiryKeys.list(productNo, searchParams),
        queryFn: async () => {
            const { data } = await productInquiry.getProductInquiries(
                productNo,
                searchParams,
            );

            return data;
        },
        ...options,
    });

export interface MyProductInquiryListParams<
    T = GetMyProductInquiriesResponse,
> {
    searchParams: GetMyProductInquiriesParams;
    memberNo: number;
    options?: Omit<
        UseQueryOptions<
            GetMyProductInquiriesResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productInquiryKeys)['myList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const myProductInquiryListOptions = <
    T = GetMyProductInquiriesResponse,
>({
    searchParams,
    memberNo,
    options,
}: MyProductInquiryListParams<T>) =>
    queryOptions({
        queryKey: productInquiryKeys.myList(searchParams, memberNo),
        queryFn: async () => {
            const { data } =
                await productInquiry.getMyProductInquiries(searchParams);

            return data;
        },
        ...options,
    });

export interface ProductInquiryConfigParams<
    T = GetProductInquiryConfigResponse,
> {
    options?: Omit<
        UseQueryOptions<
            GetProductInquiryConfigResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productInquiryKeys)['config']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const productInquiryConfigOptions = <
    T = GetProductInquiryConfigResponse,
>({
    options,
}: ProductInquiryConfigParams<T> = {}) =>
    queryOptions({
        queryKey: productInquiryKeys.config(),
        queryFn: async () => {
            const { data } = await productInquiry.getConfig();

            return data;
        },
        staleTime: 60 * 60 * 1000,
        gcTime: 2 * 60 * 60 * 1000,
        ...options,
    });
