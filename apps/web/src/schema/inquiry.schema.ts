import { z } from 'zod';

const isGlobalMall = process.env.NEXT_PUBLIC_LOCALE !== 'ko';

export const registerInquirySchema = z.object({
    inquiryTypeNo: z
        .number()
        .min(1, '문의 유형을 선택해주세요.'),
    email: z
        .string()
        .min(1, '이메일을 입력해주세요.')
        .email('이메일 형식이 올바르지 않습니다.'),
    mobileNo: isGlobalMall
        ? z.object({
              prefix: z.string().max(20),
              middle: z.string().optional(),
              suffix: z.string().optional(),
          })
        : z.object({
              prefix: z.string().min(1),
              middle: z.string().min(1, '휴대전화번호를 입력해주세요.').max(4),
              suffix: z.string().min(1, '휴대전화번호를 입력해주세요.').max(4),
          }),
    answerEmailSendYn: z.boolean(),
    answerSmsSendYn: z.boolean(),
    inquiryTitle: z
        .string()
        .min(1, '제목을 입력해 주세요.')
        .max(50, '제목은 50자 이내로 입력해 주세요.'),
    inquiryContent: z
        .string()
        .min(1, '내용을 입력해 주세요.')
        .max(1000, '내용은 1000자 이내로 입력해 주세요.'),
    originalFileName: z.array(z.string()).optional(),
    uploadedFileName: z.array(z.string()).optional(),
});

export type RegisterInquirySchemaType = z.infer<typeof registerInquirySchema>;
