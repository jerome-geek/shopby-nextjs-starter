import { useMutation } from '@tanstack/react-query';

import { recipe } from '@/api/recipe';
import {
    CreateRecipeExposureGroupsBody,
    UpdateRecipeExposureGroupsBody,
    UpdateRecipeExposureGroupsSortOrderBody,
    CreateUserRecipeBody,
} from '@/model/recipe';

const useRecipeMutation = () => {
    return {
        createUserRecipe: useMutation({
            mutationFn: async (data: CreateUserRecipeBody) =>
                await recipe.createUserRecipe(data),
        }),
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
        updateRecipeExposureGroupsSortOrder: useMutation({
            mutationFn: async (data: UpdateRecipeExposureGroupsSortOrderBody) =>
                await recipe.updateRecipeExposureGroupsSortOrder(data),
        }),
    };
};

export default useRecipeMutation;
