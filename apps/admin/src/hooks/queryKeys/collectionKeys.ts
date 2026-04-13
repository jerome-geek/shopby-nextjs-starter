import {
    SearchCollectionsParams,
    GetCollectionExposureGroupsParams,
} from '@/model/collection';

const collectionKeys = {
    all: ['collection'] as const,

    /** 컬렉션 검색 */
    lists: () => [...collectionKeys.all, 'search'] as const,
    list: (params: SearchCollectionsParams) =>
        [...collectionKeys.lists(), params] as const,

    /** 컬렉션 노출 그룹 조회 */
    groupLists: () => [...collectionKeys.all, 'exposureGroups'] as const,
    groupList: (params?: GetCollectionExposureGroupsParams) =>
        [...collectionKeys.groupLists(), params] as const,

    /** 컬렉션 노출 그룹 상세 조회 */
    groupDetails: () => [...collectionKeys.all, 'exposureGroupDetail'] as const,
    groupDetail: (groupSno: number) =>
        [...collectionKeys.groupDetails(), groupSno] as const,
};

export default collectionKeys;
