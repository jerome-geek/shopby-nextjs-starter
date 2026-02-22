import {
    GetMyProductReviewsParams,
    GetPhotoReviewListParams,
    GetProductReviewCommentsParams,
    GetReviewableProductsParams,
    GetProductReviewListParams,
} from '@/models/display/review';

const reviewKeys = {
    all: ['reviews'] as const,

    configs: () => [...reviewKeys.all, 'config'] as const,

    lists: () => [...reviewKeys.all, 'list'] as const,
    list: (productNo: number, searchParams: GetProductReviewListParams) =>
        [...reviewKeys.lists(), productNo, searchParams] as const,
    photoList: (productNo: number, searchParams?: GetPhotoReviewListParams) =>
        [...reviewKeys.lists(), 'photo', productNo, searchParams] as const,

    details: () => [...reviewKeys.all, 'detail'] as const,
    detail: (productNo: number, reviewNo: number) =>
        [...reviewKeys.details(), productNo, reviewNo] as const,

    comments: () => [...reviewKeys.all, 'comments'] as const,
    comment: (searchParams: GetProductReviewCommentsParams) =>
        [...reviewKeys.comments(), searchParams] as const,

    myReviewedLists: () => [...reviewKeys.all, 'myReviewedList'] as const,
    myReviewedList: (
        memberNo: number,
        searchParams: GetMyProductReviewsParams,
    ) => [...reviewKeys.lists(), memberNo, searchParams] as const,
    myReviewedInfiniteList: (
        memberNo: number,
        searchParams: GetMyProductReviewsParams,
    ) => [...reviewKeys.lists(), 'infinite', memberNo, searchParams] as const,

    myReviewableLists: () => [...reviewKeys.all, 'myReviewableList'] as const,
    myReviewableList: (
        memberNo: number,
        searchParams: GetReviewableProductsParams,
    ) => [...reviewKeys.lists(), memberNo, searchParams] as const,
    myReviewableInfiniteList: (
        memberNo: number,
        searchParams: GetReviewableProductsParams,
    ) => [...reviewKeys.lists(), 'infinite', memberNo, searchParams] as const,
};

export default reviewKeys;
