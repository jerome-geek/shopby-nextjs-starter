import { z } from 'zod';

const envSchema = z.object({
    // 클라이언트 측 변수 (NEXT_PUBLIC_ 접두사 필요)
    NEXT_PUBLIC_LOCALE: z.enum(['ko', 'en']).default('ko'),
    NEXT_PUBLIC_APP_NAME: z.string().min(1),
    NEXT_PUBLIC_CLIENT_ID: z.string().min(1),

    // 서버 측 전용 변수가 있다면 여기에 추가 (접두사 없음)
    // NODE_ENV: z.enum(['development', 'production', 'test']),
});

// 검증 수행
const _env = envSchema.safeParse({
    NEXT_PUBLIC_LOCALE: process.env.NEXT_PUBLIC_LOCALE,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
});

if (!_env.success) {
    console.error('❌ 유효하지 않은 환경변수입니다:', _env.error.format());
    throw new Error('환경변수 검증 실패');
}

export const env = _env.data;
