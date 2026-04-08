import type { GetBrandsParams, SearchBrandsParams } from '@/models/product/brand';

import type { GetLikeBrandsParams } from '@/models/product/profile';

const brandKeys = {
    all: ['brands'] as const,

    list: (searchParams: GetBrandsParams) =>
        [...brandKeys.all, 'list', searchParams] as const,

    likeList: (memberNo: number, searchParams: GetLikeBrandsParams) =>
        [...brandKeys.all, 'likeList', memberNo, searchParams] as const,

    details: () => [...brandKeys.all, 'detail'] as const,
    detail: (displayBrandNo: number) =>
        [...brandKeys.details(), displayBrandNo] as const,

    search: (searchParams?: SearchBrandsParams) =>
        [...brandKeys.all, 'search', searchParams] as const,
};

export default brandKeys;
