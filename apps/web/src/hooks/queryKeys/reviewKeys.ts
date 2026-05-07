import type {
    GetMyProductReviewsParams,
    GetPhotoReviewListParams,
    GetProductReviewCommentsParams,
    GetProductReviewListParams,
    GetProductReviewListV2Params,
    GetReviewableProductsParams,
} from '@/models/display/review';

const reviewKeys = {
    all: ['reviews'] as const,

    configs: () => [...reviewKeys.all, 'config'] as const,

    lists: () => [...reviewKeys.all, 'list'] as const,
    list: (productNo: number, searchParams: GetProductReviewListParams) =>
        [...reviewKeys.lists(), productNo, searchParams] as const,
    listV2: (productNo: number, searchParams: GetProductReviewListV2Params) =>
        [...reviewKeys.lists(), 'v2', productNo, searchParams] as const,
    photoList: (productNo: number, searchParams?: GetPhotoReviewListParams) =>
        [...reviewKeys.lists(), 'photo', productNo, searchParams] as const,

    details: () => [...reviewKeys.all, 'detail'] as const,
    detail: (productNo: number, reviewNo: number) =>
        [...reviewKeys.details(), productNo, reviewNo] as const,

    comments: () => [...reviewKeys.all, 'comments'] as const,
    comment: (
        productNo: number,
        reviewNo: number,
        searchParams: GetProductReviewCommentsParams,
    ) => [...reviewKeys.comments(), productNo, reviewNo, searchParams] as const,

    myReviewedLists: () => [...reviewKeys.all, 'myReviewedList'] as const,
    myReviewedList: (searchParams: GetMyProductReviewsParams) =>
        [...reviewKeys.myReviewedLists(), searchParams] as const,
    myReviewedInfiniteList: (searchParams: GetMyProductReviewsParams) =>
        [...reviewKeys.myReviewedLists(), 'infinite', searchParams] as const,

    myReviewableLists: () => [...reviewKeys.all, 'myReviewableList'] as const,
    myReviewableList: (searchParams: GetReviewableProductsParams) =>
        [...reviewKeys.myReviewableLists(), searchParams] as const,
    myReviewableInfiniteList: (searchParams: GetReviewableProductsParams) =>
        [...reviewKeys.myReviewableLists(), 'infinite', searchParams] as const,
};

export default reviewKeys;
