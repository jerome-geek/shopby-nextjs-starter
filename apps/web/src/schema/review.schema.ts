import { z } from 'zod';

export const registerReviewSchema = z.object({
    tagValueNos: z.array(z.number().or(z.string())).optional(),
    urls: z.array(z.string()).optional(),
    rate: z
        .number()
        .min(1, '평점을 선택해 주세요.')
        .max(5, '평점은 5점 이하로 선택해 주세요.'),
    optionNo: z.number().min(1, '리뷰 작성 옵션 정보가 필요합니다.'),
    orderOptionNo: z.number().min(1, '리뷰 작성 주문옵션 정보가 필요합니다.'),
    content: z
        .string()
        .min(1, '내용을 입력해 주세요.')
        .max(1000, '내용은 1000자 이하로 입력해 주세요.'),
});

export type RegisterReviewSchemaType = z.infer<typeof registerReviewSchema>;

export const updateReviewSchema = z.object({
    tagValueNos: z.array(z.number().or(z.string())).optional(),
    urls: z.array(z.string()).optional(),
    rate: z
        .number()
        .min(1, '평점을 선택해 주세요.')
        .max(5, '평점은 5점 이하로 선택해 주세요.'),
    content: z
        .string()
        .min(1, '내용을 입력해 주세요.')
        .max(1000, '내용은 1000자 이하로 입력해 주세요.'),
});

export type UpdateReviewSchemaType = z.infer<typeof updateReviewSchema>;
