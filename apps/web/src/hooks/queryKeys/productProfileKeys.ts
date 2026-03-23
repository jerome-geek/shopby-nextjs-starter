import {
    GetLikeBrandsCountParams,
    GetLikeProductsParams,
    GetMemberLikeBrandListParams,
    GetRecentViewProductsParams,
} from '@/models/product/profile';

const productProfileKeys = {
    all: ['productProfile'] as const,

    brands: () => [...productProfileKeys.all, 'brands'] as const,
    products: () => [...productProfileKeys.all, 'products'] as const,

    recentProduct: () => [...productProfileKeys.all, 'recentProduct'] as const,
    recentProducts: (
        memberNo: number,
        searchParams: GetRecentViewProductsParams,
    ) =>
        [
            ...productProfileKeys.recentProduct(),
            memberNo,
            searchParams,
        ] as const,

    likeProducts: () =>
        [...productProfileKeys.all, 'products', 'like'] as const,
    likeProductList: (
        memberNo?: number,
        searchParams?: GetLikeProductsParams,
    ) =>
        [
            ...productProfileKeys.likeProducts(),
            'list',
            memberNo,
            searchParams,
        ] as const,
    likeProductCount: (memberNo?: number) =>
        [...productProfileKeys.likeProducts(), 'count', memberNo] as const,

    likeBrands: () => [...productProfileKeys.brands(), 'like'] as const,
    likeBrandList: (
        memberNo?: number,
        searchParams?: GetMemberLikeBrandListParams,
    ) =>
        [
            ...productProfileKeys.likeBrands(),
            'list',
            memberNo,
            searchParams,
        ] as const,
    likeBrandCount: (
        searchParams: GetLikeBrandsCountParams,
        memberNo?: number,
    ) =>
        [
            ...productProfileKeys.all,
            'brands',
            'like',
            'count',
            memberNo,
            searchParams,
        ] as const,
};

export default productProfileKeys;
