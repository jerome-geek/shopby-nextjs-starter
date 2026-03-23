import { z } from 'zod';

const loginFormSchema = z
    .object({
        memberId: z.string().min(1, '아이디를 입력해 주세요.'),
        password: z.string().min(1, '비밀번호를 입력해 주세요.'),
        isSaved: z.boolean().optional(),
    })
    .refine((data) => data.memberId !== data.password, {
        message: '아이디와 비밀번호는 같을 수 없습니다.',
        path: ['password'],
    });

type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

export { loginFormSchema, type LoginFormSchemaType };

