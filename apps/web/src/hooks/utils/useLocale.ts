import { useMemo } from 'react';
import { env } from '@/configs/env';

export const useLocale = () => {
    const locale = env.NEXT_PUBLIC_LOCALE || 'ko';

    const isKorean = useMemo(() => locale === 'ko', [locale]);
    const isJapan = useMemo(() => locale === 'ja', [locale]);
    const isEnglish = useMemo(() => locale === 'en', [locale]);

    return {
        locale,
        isKorean,
        isJapan,
        isEnglish,
    };
};

export default useLocale;
