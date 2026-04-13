import { z } from 'zod';

export const createCollectionExposureGroupsSchema = z.object({
    exposureLocation: z.string().min(1, '그룹 아이디를 선택해 주세요.'),
    groupName: z.string().min(1, '그룹명을 입력해 주세요.'),
    description: z.string().optional(),
    isDisplay: z.boolean(),
    collectionSno: z.number().min(1, '콜렉션을 선택해 주세요.'),
});

export type CreateCollectionExposureGroupsSchemaType = z.infer<
    typeof createCollectionExposureGroupsSchema
>;

export const updateCollectionExposureGroupsSchema = z.object({
    groupName: z.string().min(1, '그룹명을 입력해 주세요.'),
    description: z.string().optional(),
    isDisplay: z.boolean(),
    collectionSno: z.number().min(1, '콜렉션을 선택해 주세요.'),
});

export type UpdateCollectionExposureGroupsSchemaType = z.infer<
    typeof updateCollectionExposureGroupsSchema
>;
