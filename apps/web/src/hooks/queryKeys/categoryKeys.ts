import type {
    GetCategoriesByManagementCodeData,
    GetCategoriesParams,
    GetCategoryParams,
} from '@/models/display/category';

const categoryKeys = {
    all: ['category'] as const,

    byCodes: () => [...categoryKeys.all, 'byCode'] as const,
    byCode: (data: GetCategoriesByManagementCodeData) =>
        [...categoryKeys.byCodes(), data] as const,

    lists: () => [...categoryKeys.all, 'list'] as const,
    list: (params?: GetCategoriesParams) =>
        [...categoryKeys.lists(), params] as const,

    newList: () => [...categoryKeys.lists(), 'new'] as const,
    '1depthList': () => [...categoryKeys.lists(), '1depth'] as const,
    listByManagementCode: (managementCode: string) =>
        [...categoryKeys.lists(), managementCode] as const,

    details: () => [...categoryKeys.all, 'detail'] as const,
    detail: (categoryNo: string | number, searchParams?: GetCategoryParams) =>
        [
            ...categoryKeys.all,
            'detail',
            String(categoryNo),
            searchParams,
        ] as const,
};

export default categoryKeys;
