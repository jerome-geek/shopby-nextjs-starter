import { getRequestConfig } from 'next-intl/server';

// 환경변수에서 locale 가져오기 (기본값: ko)
// 도메인별 배포 시 환경변수로 설정
const getLocale = () => {
    return process.env.NEXT_PUBLIC_LOCALE || 'ko';
};

export default getRequestConfig(async () => {
    const locale = getLocale();

    return {
        locale,
        messages: (await import(`./i18n/${locale}.json`)).default,
    };
});
