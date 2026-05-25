import { queryOptions, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { productProfile } from '@/api/product';
import { brandKeys, productKeys, productProfileKeys } from '@/hooks/queryKeys';
import type {
    GetGuestRecentViewProductsParams,
    GetLikeBrandsCountParams,
    GetLikeBrandsCountResponse,
    GetLikeBrandsParams,
    GetLikeBrandsResponse,
    GetLikeProductsParams,
    GetLikeProductsResponse,
    GetMemberLikeBrandListParams,
    GetMemberLikeBrandListResponse,
    GetRecentViewProductsParams,
    GetRecentViewProductsResponse,
} from '@/models/product/profile';

export interface GuestRecentViewProductListOptionsParams<
    T = GetRecentViewProductsResponse,
> {
    searchParams: GetGuestRecentViewProductsParams;
    options?: Omit<
        UseQueryOptions<
            GetRecentViewProductsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            [string, { searchParams: GetGuestRecentViewProductsParams }]
        >,
        'queryKey' | 'queryFn'
    >;
}

export const guestRecentViewProductListOptions = <
    T = GetRecentViewProductsResponse,
>({
    searchParams,
    options,
}: GuestRecentViewProductListOptionsParams<T>) => {
    return queryOptions({
        queryKey: ['guestRecentViewProducts', { searchParams }] as [
            string,
            { searchParams: GetGuestRecentViewProductsParams },
        ],
        queryFn: async () => {
            const { data } =
                await productProfile.getGuestRecentViewProducts(searchParams);
            return data;
        },
        ...options,
    });
};

export interface LikeBrandCountListOptionsParams<
    T = GetLikeBrandsCountResponse,
> {
    searchParams: GetLikeBrandsCountParams;
    options?: Omit<
        UseQueryOptions<
            GetLikeBrandsCountResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['likeBrandCountList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const likeBrandCountListOptions = <T = GetLikeBrandsCountResponse>({
    searchParams,
    options,
}: LikeBrandCountListOptionsParams<T>) => {
    return queryOptions({
        queryKey: productKeys.likeBrandCountList(searchParams),
        queryFn: async () => {
            const { data } =
                await productProfile.getLikeBrandsCount(searchParams);
            return data;
        },
        ...options,
    });
};

export interface LikeBrandListOptionsParams<T = GetLikeBrandsResponse> {
    memberNo: number;
    params: GetLikeBrandsParams;
    options?: Omit<
        UseQueryOptions<
            GetLikeBrandsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof brandKeys)['likeList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const likeBrandListOptions = <T = GetLikeBrandsResponse>({
    memberNo,
    params,
    options,
}: LikeBrandListOptionsParams<T>) => {
    return queryOptions({
        queryKey: brandKeys.likeList(memberNo, params),
        queryFn: async () => {
            const { data } = await productProfile.getLikeBrands(params);
            return data;
        },
        ...options,
    });
};

export interface LikeProductCountOptionsParams<T = { likedCount: number }> {
    memberNo: number;
    options?: Omit<
        UseQueryOptions<
            { likedCount: number },
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['likeCount']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const likeProductCountOptions = <T = { likedCount: number }>({
    memberNo,
    options,
}: LikeProductCountOptionsParams<T>) => {
    return queryOptions({
        queryKey: productKeys.likeCount(memberNo),
        queryFn: async () => {
            const { data } = await productProfile.getLikeProductsCount();
            return data;
        },
        ...options,
    });
};

export interface LikeProductListOptionsParams<T = GetLikeProductsResponse> {
    searchParams: GetLikeProductsParams;
    options?: Omit<
        UseQueryOptions<
            GetLikeProductsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productProfileKeys)['likeProductList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const likeProductListOptions = <T = GetLikeProductsResponse>({
    searchParams,
    options,
}: LikeProductListOptionsParams<T>) => {
    return queryOptions({
        queryKey: productProfileKeys.likeProductList(searchParams),
        queryFn: async () => {
            const { data } = await productProfile.getLikeProducts(searchParams);
            return data;
        },
        ...options,
    });
};

export interface MemberLikeBrandListOptionsParams<
    T = GetMemberLikeBrandListResponse,
> {
    memberNo?: number;
    searchParams?: GetMemberLikeBrandListParams;
    options?: Omit<
        UseQueryOptions<
            GetMemberLikeBrandListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productProfileKeys)['likeBrandList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const memberLikeBrandListOptions = <T = GetMemberLikeBrandListResponse>({
    memberNo = 0,
    searchParams,
    options,
}: MemberLikeBrandListOptionsParams<T> = {}) => {
    return queryOptions({
        queryKey: productProfileKeys.likeBrandList(memberNo, searchParams),
        queryFn: async () => {
            const { data } =
                await productProfile.getMemberLikeBrandList(searchParams);
            return data;
        },
        ...options,
    });
};

export interface RecentViewProductListOptionsParams<
    T = GetRecentViewProductsResponse,
> {
    searchParams: GetRecentViewProductsParams;
    options?: Omit<
        UseQueryOptions<
            GetRecentViewProductsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productProfileKeys)['recentProducts']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const recentViewProductListOptions = <T = GetRecentViewProductsResponse>(
    { searchParams, options }: RecentViewProductListOptionsParams<T>,
) => {
    return queryOptions({
        queryKey: productProfileKeys.recentProducts(searchParams),
        queryFn: async () => {
            const { data } =
                await productProfile.getRecentViewProducts(searchParams);
            return data;
        },
        ...options,
    });
};
