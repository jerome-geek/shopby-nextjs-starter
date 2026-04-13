import { useMutation } from '@tanstack/react-query';

import { collection } from '@/api/collection';
import {
    CreateCollectionExposureGroupsBody,
    UpdateCollectionExposureGroupsBody,
    UpdateCollectionExposureGroupsSortOrderBody,
    CreateUserCollectionBody,
} from '@/model/collection';

const useCollectionMutation = () => {
    return {
        createUserCollection: useMutation({
            mutationFn: async (data: CreateUserCollectionBody) =>
                await collection.createUserCollection(data),
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
