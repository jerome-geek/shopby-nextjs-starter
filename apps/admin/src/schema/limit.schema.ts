import { z } from 'zod';

export const updateCreationLimitSchema = z.object({
    dailyLimit: z
        .number('하루 생성 가능한 레시피 수를 입력해 주세요.')
        .min(0, '하루 생성 가능한 레시피 수는 0 이상이어야 합니다.'),
    monthlyLimit: z
        .number('한달 생성 가능한 레시피 수를 입력해 주세요.')
        .min(0, '한달 생성 가능한 레시피 수는 0 이상이어야 합니다.'),
});

export type UpdateCreationLimitSchemaType = z.infer<
    typeof updateCreationLimitSchema
>;

export const createExceptionSchema = z.object({
    memberNos: z
        .array(z.number())
        .min(1, '사용자를 1명 이상 선택해 주세요.'),
    memo: z.string().optional(),
});

export type CreateExceptionSchemaType = z.infer<typeof createExceptionSchema>;
