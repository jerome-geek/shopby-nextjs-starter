import { useMutation } from '@tanstack/react-query';

import { collection } from '@/api/collection';
import {
    CreateCollectionExposureGroupsBody,
    CreateUserCollectionBody,
    UpdateCollectionExposureGroupsBody,
    UpdateCollectionExposureGroupsSortOrderBody,
} from '@/model/collection';

const useCollectionMutation = () => {
    return {
        createUserCollection: useMutation({
            mutationFn: async (data: CreateUserCollectionBody) =>
                await collection.createUserCollection(data),
        }),
        deleteUserCollection: useMutation({
            mutationFn: async (sno: number) =>
                await collection.deleteUserCollection(sno),
        }),
        createCollectionExposureGroups: useMutation({
            mutationFn: async (data: CreateCollectionExposureGroupsBody) =>
                await collection.createCollectionExposureGroups(data),
        }),
        deleteCollectionExposureGroups: useMutation({
            mutationFn: async (groupSno: number) =>
                await collection.deleteCollectionExposureGroups(groupSno),
        }),
        updateCollectionExposureGroups: useMutation({
            mutationFn: async ({
                groupSno,
                data,
            }: {
                groupSno: number;
                data: UpdateCollectionExposureGroupsBody;
            }) =>
                await collection.updateCollectionExposureGroups(groupSno, data),
        }),
        updateCollectionExposureGroupsSortOrder: useMutation({
            mutationFn: async (
                data: UpdateCollectionExposureGroupsSortOrderBody,
            ) => await collection.updateCollectionExposureGroupsSortOrder(data),
        }),
    };
};

export default useCollectionMutation;
