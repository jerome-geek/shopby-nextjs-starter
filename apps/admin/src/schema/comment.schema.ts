import { z } from 'zod';

export const addCommentBlacklistSchema = z.object({
    memberNos: z.array(z.number()).min(1, '사용자를 1명 이상 선택해 주세요.'),
    memo: z.string().optional(),
});

export type AddCommentBlacklistSchemaType = z.infer<
    typeof addCommentBlacklistSchema
>;
