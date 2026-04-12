import { useMutation } from '@tanstack/react-query';

import { recipe } from '@/api/recipe';
import { CreateRecipeExposureGroupsBody } from '@/model/recipe';

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
    };
};

export default useRecipeMutation;
