import {
    SearchCollectionsParams,
    GetCollectionExposureGroupsParams,
} from '@/model/collection';

const collectionKeys = {
    all: ['collection'] as const,

    /** 레시피 검색 */
    searchLists: () => [...collectionKeys.all, 'search'] as const,
    searchList: (params: SearchCollectionsParams) =>
        [...collectionKeys.searchLists(), params] as const,

    /** 레시피 노출 그룹 조회 */
    lists: () => [...collectionKeys.all, 'exposureGroups'] as const,
    list: (params?: GetCollectionExposureGroupsParams) =>
        [...collectionKeys.lists(), params] as const,

    /** 레시피 노출 그룹 상세 조회 */
    details: () => [...collectionKeys.all, 'exposureGroupDetail'] as const,
    detail: (groupSno: number) =>
        [...collectionKeys.details(), groupSno] as const,
};

export default collectionKeys;
