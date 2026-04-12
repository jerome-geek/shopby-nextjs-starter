import { SearchRecipesParams } from '@/models/shop/recipe';

const recipeKeys = {
    all: ['recipe'] as const,

    lists: () => [...recipeKeys.all, 'list'] as const,
    list: (params?: SearchRecipesParams) =>
        [...recipeKeys.lists(), params] as const,

    details: () => [...recipeKeys.all, 'detail'] as const,
    detail: (sno: number) => [...recipeKeys.details(), sno] as const,
};

// const reviewKeys = {
//     all: ['reviews'] as const,

//     configs: () => [...reviewKeys.all, 'config'] as const,

//     lists: () => [...reviewKeys.all, 'list'] as const,
//     list: (productNo: number, searchParams: GetProductReviewListParams) =>
//         [...reviewKeys.lists(), productNo, searchParams] as const,
//     photoList: (productNo: number, searchParams?: GetPhotoReviewListParams) =>
//         [...reviewKeys.lists(), 'photo', productNo, searchParams] as const,

//     details: () => [...reviewKeys.all, 'detail'] as const,
//     detail: (productNo: number, reviewNo: number) =>
//         [...reviewKeys.details(), productNo, reviewNo] as const,

//     comments: () => [...reviewKeys.all, 'comments'] as const,
//     comment: (searchParams: GetProductReviewCommentsParams) =>
//         [...reviewKeys.comments(), searchParams] as const,

//     myReviewedLists: () => [...reviewKeys.all, 'myReviewedList'] as const,
//     myReviewedList: (searchParams: GetMyProductReviewsParams) =>
//         [...reviewKeys.myReviewedLists(), searchParams] as const,
//     myReviewedInfiniteList: (searchParams: GetMyProductReviewsParams) =>
//         [...reviewKeys.myReviewedLists(), 'infinite', searchParams] as const,

//     myReviewableLists: () => [...reviewKeys.all, 'myReviewableList'] as const,
//     myReviewableList: (searchParams: GetReviewableProductsParams) =>
//         [...reviewKeys.myReviewableLists(), searchParams] as const,
//     myReviewableInfiniteList: (searchParams: GetReviewableProductsParams) =>
//         [...reviewKeys.myReviewableLists(), 'infinite', searchParams] as const,
// };

export default recipeKeys;
