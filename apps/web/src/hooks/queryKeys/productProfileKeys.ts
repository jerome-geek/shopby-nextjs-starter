import type {
    GetLikeBrandsCountParams,
    GetLikeProductsParams,
    GetMemberLikeBrandListParams,
    GetRecentViewProductsParams,
} from '@/entities/product/model/profile';

const productProfileKeys = {
    all: ['productProfile'] as const,

    brands: () => [...productProfileKeys.all, 'brands'] as const,
    products: () => [...productProfileKeys.all, 'products'] as const,

    recentProduct: () => [...productProfileKeys.all, 'recentProduct'] as const,
    recentProducts: (searchParams: GetRecentViewProductsParams) =>
        [...productProfileKeys.recentProduct(), searchParams] as const,

    likeProducts: () =>
        [...productProfileKeys.all, 'products', 'like'] as const,
    likeProductList: (searchParams?: GetLikeProductsParams) =>
        [...productProfileKeys.likeProducts(), 'list', searchParams] as const,
    likeProductCount: () =>
        [...productProfileKeys.likeProducts(), 'count'] as const,

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
