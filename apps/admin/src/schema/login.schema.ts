import { z } from 'zod';

export const loginFormSchema = z.object({
    id: z.string().min(1, '아이디를 입력해 주세요.'),
    pwd: z.string().min(1, '비밀번호를 입력해 주세요.'),
});

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
