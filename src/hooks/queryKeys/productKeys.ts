import {
    GetBestSellerProductsParams,
    GetGroupManagementCodesData,
    GetProductDetailParams,
    GetProductSearchSummaryParams,
    GetProductsInfoByProductNosData,
    GetProductsShippingInfoParams,
    ProductSearchParams,
} from '@/models/product/product';
import { GetProductOptionParams } from '@/models/product/productOption';
import {
    GetLikeBrandsCountParams,
    GetLikeProductsParams,
} from '@/models/product/profile';

type ListSearchParams = ProductSearchParams | GetProductsInfoByProductNosData;

const productKeys = {
    all: ['products'] as const,

    /** 상품 리스트 조회 */
    lists: () => [...productKeys.all, 'list'] as const,
    list: (memberNo: number, searchParams: ListSearchParams) =>
        [...productKeys.lists(), memberNo, searchParams] as const,

    /** 베스트 상품 리스트 조회 */
    bestList: (memberNo: number, searchParams: GetBestSellerProductsParams) =>
        [...productKeys.lists(), 'best', memberNo, searchParams] as const,

    /** 상품 리스트 조회 (무한스크롤)) */
    infiniteList: (memberNo: number, searchParams: ProductSearchParams) =>
        [...productKeys.lists(), 'infinite', memberNo, searchParams] as const,
    infiniteBestList: (
        memberNo: number,
        searchParams: GetBestSellerProductsParams
    ) =>
        [
            ...productKeys.lists(),
            'infinite',
            'best',
            memberNo,
            searchParams,
        ] as const,

    /** 찜리스트 조회 */
    likes: () => [...productKeys.lists(), 'likes'] as const,
    like: (memberNo: number, searchParams: GetLikeProductsParams) =>
        [...productKeys.likes(), memberNo, searchParams] as const,

    /** 찜리스트 조회 (무한 스크롤)) */
    infiniteLikeList: (memberNo: number, searchParams: GetLikeProductsParams) =>
        [...productKeys.likes(), 'infinite', memberNo, searchParams] as const,
    likeCount: (memberNo: number) =>
        [...productKeys.likes(), 'count', memberNo] as const,

    /** 상품 상세 조회 */
    details: () => [...productKeys.all, 'detail'] as const,
    detail: (
        productNo: number,
        memberNo?: number,
        searchParams?: GetProductDetailParams
    ) => [...productKeys.details(), productNo, memberNo, searchParams] as const,
    detailByProductNos: (
        searchParams: GetProductsInfoByProductNosData,
        memberNo?: number
    ) => [...productKeys.details(), 'list', searchParams, memberNo] as const,

    /** 상품 옵션 조회 */
    options: () => [...productKeys.all, 'option'] as const,
    option: (
        productNo: number,
        memberNo?: number,
        searchParams?: GetProductOptionParams
    ) => [...productKeys.options(), productNo, memberNo, searchParams] as const,

    groupManagementCode: (searchParams: GetGroupManagementCodesData) =>
        [...productKeys.all, 'groupManagementCode', searchParams] as const,

    brand: () => [...productKeys.all, 'brand'] as const,
    likeBrandCountList: (searchParams: GetLikeBrandsCountParams) =>
        [...productKeys.brand(), 'likeBrandCountList', searchParams] as const,

    summary: (searchParams: GetProductSearchSummaryParams) =>
        [...productKeys.all, 'summary', searchParams] as const,

    shippingInfo: (searchParams: GetProductsShippingInfoParams) =>
        [...productKeys.all, 'shippingInfo', searchParams] as const,

    extraProducts: (productNo: number) =>
        [...productKeys.all, 'extraProducts', productNo] as const,
};

export default productKeys;
