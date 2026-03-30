import { filter, flatMap, head, pipe } from '@fxts/core';
import { useMemo } from 'react';

import { env } from '@/configs/env';
import { MOBILE_COUNTRY_CODE_LIST } from '@/const/form';

const useGlobal = () => {
    const locale = env.NEXT_PUBLIC_LOCALE || 'ko';

    const isKorean = useMemo(() => locale === 'ko', [locale]);
    const isJapan = useMemo(() => locale === 'ja', [locale]);
    const isEnglish = useMemo(() => locale === 'en', [locale]);

    const countryCd =
        {
            ja: 'JP' as const,
            ko: 'KR' as const,
            en: 'US' as const,
            zh: 'CN' as const,
        }[locale] || 'KR';

    const defaultMobileCountryCode = useMemo(() => {
        return (
            pipe(
                MOBILE_COUNTRY_CODE_LIST,
                filter((item) => item.value === countryCd),
                flatMap((a) => a.value),
                head,
            ) ?? 'KR'
        );
    }, [countryCd]);

    return {
        isKorean,
        isEnglish,
        isJapan,
        defaultMobileCountryCode,
        countryCd,
    };
};

export default useGlobal;
