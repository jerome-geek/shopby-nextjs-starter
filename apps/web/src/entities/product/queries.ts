import {
    infiniteQueryOptions,
    queryOptions,
    type InfiniteData,
    type UseInfiniteQueryOptions,
    type UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { product, productOption } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import type {
    GetBestReviewProductsParams,
    GetBestReviewProductsResponse,
    GetBestSellerProductsParams,
    GetBestSellerProductsResponse,
    GetExtraProductsResponse,
    GetGroupManagementCodesData,
    GetProductDetailParams,
    GetProductSearchSummaryParams,
    GetProductSearchSummaryResponse,
    GetProductsInfoByProductNosData,
    GetProductsInfoByProductNosResponse,
    GetProductsShippingInfoParams,
    GetProductsShippingInfoResponse,
    GetRelatedProductsResponse,
    GroupManagementCodeResponse,
    ProductDetailResponse,
    ProductSearchParams,
    ProductsSearchResponse,
} from '@/models/product/product';
import type {
    GetProductOptionParams,
    ProductOptionResponse,
} from '@/models/product/productOption';

export interface ProductListOptionsParams<T = ProductsSearchResponse> {
    searchParams: ProductSearchParams;
    memberNo?: number;
    options?: Omit<
        UseQueryOptions<
            ProductsSearchResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const productListOptions = <T = ProductsSearchResponse>({
    searchParams,
    memberNo = 0,
    options,
}: ProductListOptionsParams<T>) => {
    return queryOptions({
        queryKey: productKeys.list(memberNo, searchParams),
        queryFn: async () => {
            const { data } = await product.searchProducts(searchParams);
            return data;
        },
        ...options,
    });
};

export interface BestSellerProductListOptionsParams<
    T = GetBestSellerProductsResponse,
> {
    searchParams: GetBestSellerProductsParams;
    memberNo?: number;
    options?: Omit<
        UseQueryOptions<
            GetBestSellerProductsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['bestList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const bestSellerProductListOptions = <T = GetBestSellerProductsResponse>(
    { searchParams, memberNo = 0, options }: BestSellerProductListOptionsParams<T>,
) => {
    return queryOptions({
        queryKey: productKeys.bestList(memberNo, searchParams),
        queryFn: async () => {
            const { data } = await product.getBestSellerProducts(searchParams);
            return data;
        },
        ...options,
    });
};

export interface BestReviewProductListOptionsParams<
    T = GetBestReviewProductsResponse,
> {
    searchParams: GetBestReviewProductsParams;
    memberNo?: number;
    options?: Omit<
        UseQueryOptions<
            GetBestReviewProductsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['bestReviewList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const bestReviewProductListOptions = <T = GetBestReviewProductsResponse>(
    {
        searchParams,
        memberNo = 0,
        options,
    }: BestReviewProductListOptionsParams<T>,
) => {
    return queryOptions({
        queryKey: productKeys.bestReviewList(memberNo, searchParams),
        queryFn: async () => {
            const { data } = await product.getBestReviewProducts(searchParams);
            return data;
        },
        ...options,
    });
};

export type InfiniteBestSellerPage = {
    data: GetBestSellerProductsResponse;
    pageNumber: number;
};

export interface InfiniteBestSellerProductListOptionsParams {
    searchParams: GetBestSellerProductsParams;
    memberNo?: number;
    options?: Omit<
        UseInfiniteQueryOptions<
            InfiniteBestSellerPage,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<InfiniteBestSellerPage>,
            InfiniteBestSellerPage,
            ReturnType<(typeof productKeys)['infiniteBestList']>,
            number
        >,
        'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >;
}

export const infiniteBestSellerProductListOptions = ({
    searchParams,
    memberNo = 0,
    options,
}: InfiniteBestSellerProductListOptionsParams) => {
    return infiniteQueryOptions({
        queryKey: productKeys.infiniteBestList(memberNo, searchParams),
        queryFn: async ({ pageParam }) => {
            const { data } = await product.getBestSellerProducts({
                ...searchParams,
                pageNumber: pageParam,
            });
            return { data, pageNumber: pageParam };
        },
        getNextPageParam: (lastPage, allPages) => {
            if (!searchParams.pageSize) return;
            const totalCount = lastPage.data?.totalCount ?? 0;
            return searchParams.pageSize * allPages.length < totalCount
                ? lastPage.pageNumber + 1
                : undefined;
        },
        initialPageParam: 1,
        ...options,
    });
};

export interface ProductDetailOptionsParams<T = ProductDetailResponse> {
    productNo: number;
    searchParams?: GetProductDetailParams;
    options?: Omit<
        UseQueryOptions<
            ProductDetailResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const productDetailOptions = <T = ProductDetailResponse>({
    productNo,
    searchParams,
    options,
}: ProductDetailOptionsParams<T>) => {
    return queryOptions({
        queryKey: productKeys.detail(productNo, searchParams),
        queryFn: async () => {
            const { data } = await product.getProductDetail(
                productNo,
                searchParams,
            );
            return data;
        },
        ...options,
    });
};

export interface ProductsInfoByProductNosOptionsParams<
    T = GetProductsInfoByProductNosResponse,
> {
    searchParams: GetProductsInfoByProductNosData;
    memberNo?: number;
    options?: Omit<
        UseQueryOptions<
            GetProductsInfoByProductNosResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['detailByProductNos']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const productsInfoByProductNosOptions = <
    T = GetProductsInfoByProductNosResponse,
>({
    searchParams,
    memberNo,
    options,
}: ProductsInfoByProductNosOptionsParams<T>) => {
    return queryOptions({
        queryKey: productKeys.detailByProductNos(searchParams, memberNo),
        queryFn: async () => {
            const { data } =
                await product.getProductsInfoByProductNos(searchParams);
            return data;
        },
        ...options,
    });
};

export interface ProductListByProductNosOptionsParams<
    T = GetProductsInfoByProductNosResponse,
> {
    searchParams: GetProductsInfoByProductNosData;
    options?: Omit<
        UseQueryOptions<
            GetProductsInfoByProductNosResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const productListByProductNosOptions = <
    T = GetProductsInfoByProductNosResponse,
>({
    searchParams,
    options,
}: ProductListByProductNosOptionsParams<T>) => {
    return queryOptions({
        queryKey: productKeys.list(0, searchParams),
        queryFn: async () => {
            const { data } =
                await product.getProductsInfoByProductNos(searchParams);
            return data;
        },
        ...options,
    });
};

export interface ProductOptionListOptionsParams<T = ProductOptionResponse> {
    productNo: number;
    memberNo?: number;
    searchParams?: GetProductOptionParams;
    options?: Omit<
        UseQueryOptions<
            ProductOptionResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['option']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const productOptionListOptions = <T = ProductOptionResponse>({
    productNo,
    memberNo = 0,
    searchParams,
    options,
}: ProductOptionListOptionsParams<T>) => {
    return queryOptions({
        queryKey: productKeys.option(productNo, memberNo, searchParams),
        queryFn: async () => {
            const { data } = await productOption.getProductOption(
                productNo,
                searchParams,
            );
            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
};

export interface ProductSearchSummaryOptionsParams<
    T = GetProductSearchSummaryResponse,
> {
    searchParams: GetProductSearchSummaryParams;
    options?: Omit<
        UseQueryOptions<
            GetProductSearchSummaryResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['summary']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const productSearchSummaryOptions = <T = GetProductSearchSummaryResponse>(
    { searchParams, options }: ProductSearchSummaryOptionsParams<T>,
) => {
    return queryOptions({
        queryKey: productKeys.summary(searchParams),
        queryFn: async () => {
            const { data } =
                await product.getProductSearchSummary(searchParams);
            return data;
        },
        ...options,
    });
};

export interface ProductShippingInfoOptionsParams<
    T = GetProductsShippingInfoResponse,
> {
    searchParams: GetProductsShippingInfoParams;
    options?: Omit<
        UseQueryOptions<
            GetProductsShippingInfoResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['shippingInfo']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const productShippingInfoOptions = <T = GetProductsShippingInfoResponse>(
    { searchParams, options }: ProductShippingInfoOptionsParams<T>,
) => {
    return queryOptions({
        queryKey: productKeys.shippingInfo(searchParams),
        queryFn: async () => {
            const { data } =
                await product.getProductsShippingInfo(searchParams);
            return data;
        },
        ...options,
    });
};

export interface ExtraProductListOptionsParams<T = GetExtraProductsResponse> {
    productNo: number;
    options?: Omit<
        UseQueryOptions<
            GetExtraProductsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['extraProducts']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const extraProductListOptions = <T = GetExtraProductsResponse>({
    productNo,
    options,
}: ExtraProductListOptionsParams<T>) => {
    return queryOptions({
        queryKey: productKeys.extraProducts(productNo),
        queryFn: async () => {
            const { data } = await product.getExtraProducts(productNo);
            return data;
        },
        ...options,
    });
};

export interface RelatedProductListOptionsParams<T = GetRelatedProductsResponse> {
    productNo: number;
    options?: Omit<
        UseQueryOptions<
            GetRelatedProductsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['relatedProducts']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const relatedProductListOptions = <T = GetRelatedProductsResponse>({
    productNo,
    options,
}: RelatedProductListOptionsParams<T>) => {
    return queryOptions({
        queryKey: productKeys.relatedProducts(productNo),
        queryFn: async () => {
            const { data } = await product.getRelatedProducts(productNo);
            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
};

export interface FavoriteKeywordsOptionsParams<T = string[]> {
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

export const favoriteKeywordsOptions = <T = string[]>({
    size = 10,
    options,
}: FavoriteKeywordsOptionsParams<T> = {}) => {
    return queryOptions({
        queryKey: ['favoriteKeywords', { size }] as [
            string,
            { size: number },
        ],
        queryFn: async () => {
            const { data } = await product.getFavoriteKeywords({ size });
            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        ...options,
    });
};

export interface GroupManagementCodeOptionsParams<
    T = GroupManagementCodeResponse,
> {
    searchParams: GetGroupManagementCodesData;
    options?: Omit<
        UseQueryOptions<
            GroupManagementCodeResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['groupManagementCode']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const groupManagementCodeOptions = <T = GroupManagementCodeResponse>({
    searchParams,
    options,
}: GroupManagementCodeOptionsParams<T>) => {
    return queryOptions({
        queryKey: productKeys.groupManagementCode(searchParams),
        queryFn: async () => {
            const { data } =
                await product.getGroupManagementCodes(searchParams);
            return data;
        },
        ...options,
    });
};
