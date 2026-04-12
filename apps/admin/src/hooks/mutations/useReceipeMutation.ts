import { useMutation } from '@tanstack/react-query';

import { recipe } from '@/api/recipe';
import { CreateRecipeExposureGroupsBody } from '@/model/recipe';

const useRecipeMutation = () => {
    return {
        createRecipeExposureGroups: useMutation({
            mutationFn: async (data: CreateRecipeExposureGroupsBody) =>
                await recipe.createRecipeExposureGroups(data),
        }),
    };
};

export default useRecipeMutation;
