/**
 * 전 세계 국가 코드 리스트를 동적(Async)으로 가져오는 함수입니다.
 * NEXT_PUBLIC_LOCALE이 'ko'가 아닌 경우에만 i18n-iso-countries 라이브러리를 
 * 비동기(Dynamic Import)로 로드하여 번들 사이즈를 최적화합니다.
 */
export const fetchCountryCodeList = async () => {
    // 1. 한국 몰인 경우 빈 배열 즉시 반환 (라이브러리 청크 로드 차단)
    if (process.env.NEXT_PUBLIC_LOCALE === 'ko') {
        return [];
    }

    try {
        /**
         * 동적 import()는 표준 ESM 문법으로, 린트 에러를 일으키지 않으며
         * 빌드 시 별도 JS 청크파일로 분리되어 필요 시점에만 다운로드됩니다.
         */
        const { default: countries } = await import('i18n-iso-countries');
        const { default: en } = await import('i18n-iso-countries/langs/en.json');

        countries.registerLocale(en);

        return Object.entries(
            countries.getNames('en', { select: 'official' }),
        ).map(([code, name]) => ({
            label: name as string,
            value: code,
        }));
    } catch (error) {
        // 라이브러리 로드 실패 시 빈 배열 반환
        console.error('Failed to load country code list:', error);
        return [];
    }
};
