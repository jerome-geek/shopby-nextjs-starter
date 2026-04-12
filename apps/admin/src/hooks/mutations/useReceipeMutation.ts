import { useMutation } from '@tanstack/react-query';

import { recipe } from '@/api/recipe';
import {
    CreateRecipeExposureGroupsBody,
    UpdateRecipeExposureGroupsBody,
} from '@/model/recipe';

const useRecipeMutation = () => {
    return {
        createRecipeExposureGroups: useMutation({
            mutationFn: async (data: CreateRecipeExposureGroupsBody) =>
                await recipe.createRecipeExposureGroups(data),
        }),
        deleteRecipeExposureGroups: useMutation({
            mutationFn: async (groupSno: number) =>
                await recipe.deleteRecipeExposureGroups(groupSno),
        }),
        updateRecipeExposureGroups: useMutation({
            mutationFn: async ({
                groupSno,
                data,
            }: {
                groupSno: number;
                data: UpdateRecipeExposureGroupsBody;
            }) => await recipe.updateRecipeExposureGroups(groupSno, data),
        }),
    };
};

export default useRecipeMutation;
