import { z } from 'zod';

export const productInquiryFormSchema = z.object({
    type: z.string().min(1, '상품 문의 유형을 선택해 주세요.'),
    productNo: z.number().min(1, '상품을 선택해주세요.'),
    title: z
        .string()
        .min(1, '제목을 입력해 주세요.')
        .max(50, '제목은 50자 이내로 입력해 주세요.'),
    content: z
        .string()
        .min(1, '내용을 입력해 주세요.')
        .max(1000, '내용은 1000자 이내로 입력해 주세요.'),
    email: z
        .string()
        .min(1, '이메일을 입력해주세요.')
        .email('이메일 형식이 올바르지 않습니다.'),
    secreted: z.boolean(),
    tagValues: z.array(z.number()).optional(),
});

export type ProductInquiryFormSchemaType = z.infer<
    typeof productInquiryFormSchema
>;

