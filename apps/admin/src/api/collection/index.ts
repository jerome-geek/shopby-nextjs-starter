import { request } from '@/api/core/request';
import {
    GetCollectionExposureGroupsParams,
    CreateCollectionExposureGroupsBody,
    CreateCollectionExposureGroupsResponse,
    SearchCollectionsParams,
    SearchCollectionsResponse,
    CollectionExposureGroupResponse,
    CollectionExposureGroupDetailResponse,
    UpdateCollectionExposureGroupsResponse,
    UpdateCollectionExposureGroupsBody,
    UpdateCollectionExposureGroupsSortOrderBody,
    CreateUserCollectionBody,
} from '@/model/collection';

export const collection = {
    createUserCollection: (data: CreateUserCollectionBody) => {
        return request({
            method: 'POST',
            url: '/admin/recipe/user-collections',
            data,
        });
    },
    searchCollections: (params: SearchCollectionsParams) => {
        return request<SearchCollectionsResponse>({
            method: 'GET',
            url: '/admin/recipe/collection-search',
            params,
        });
    },
    getCollectionExposureGroups: (
        params?: GetCollectionExposureGroupsParams,
    ) => {
        return request<CollectionExposureGroupResponse>({
            method: 'GET',
            url: '/admin/recipe/exposure-collections',
            params,
        });
    },
    getCollectionExposureGroup: (groupSno: number) => {
        return request<CollectionExposureGroupDetailResponse>({
            method: 'GET',
            url: `/admin/recipe/exposure-collections/${groupSno}`,
        });
    },
    createCollectionExposureGroups: (
        data: CreateCollectionExposureGroupsBody,
    ) => {
        return request<CreateCollectionExposureGroupsResponse>({
            method: 'POST',
            url: '/admin/recipe/exposure-collections',
            data,
        });
    },
    updateCollectionExposureGroups: (
        groupSno: number,
        data: UpdateCollectionExposureGroupsBody,
    ) => {
        return request<UpdateCollectionExposureGroupsResponse>({
            method: 'PATCH',
            url: `/admin/recipe/exposure-collections/${groupSno}`,
            data,
        });
    },
    deleteCollectionExposureGroups: (groupSno: number) => {
        return request({
            method: 'DELETE',
            url: `/admin/recipe/exposure-collections/${groupSno}`,
        });
    },
    updateCollectionExposureGroupsSortOrder: (
        data: UpdateCollectionExposureGroupsSortOrderBody,
    ) => {
        return request({
            method: 'PUT',
            url: '/admin/recipe/exposure-collections/reorder',
            data,
        });
    },
};
