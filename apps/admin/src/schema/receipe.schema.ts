import { z } from 'zod';

export const createRecipeExposureGroupsSchema = z.object({
    exposureLocation: z.string().min(1, '그룹 아이디를 선택해 주세요.'),
    groupName: z.string().min(1, '그룹명을 입력해 주세요.'),
    description: z.string().optional(),
    isDisplay: z.boolean(),
    recipeSnos: z.array(z.number()).min(1, '레시피를 선택해 주세요.'),
});

export type CreateRecipeExposureGroupsSchemaType = z.infer<
    typeof createRecipeExposureGroupsSchema
>;

export const updateRecipeExposureGroupsSchema = z.object({
    groupName: z.string().min(1, '그룹명을 입력해 주세요.'),
    description: z.string().optional(),
    isDisplay: z.boolean(),
});

export type UpdateRecipeExposureGroupsSchemaType = z.infer<
    typeof updateRecipeExposureGroupsSchema
>;
