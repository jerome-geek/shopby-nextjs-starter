import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import ko from './ko.json';
import en from './en.json';

const getLocale = () => {
    return process.env.NEXT_PUBLIC_LOCALE || 'ko';
};

const initI18next = async (lng: string) => {
    const i18nInstance = createInstance();
    await i18nInstance
        .use(
            resourcesToBackend((language: string) => {
                if (language === 'ko') return ko;
                if (language === 'en') return en;
                return ko;
            })
        )
        .init({
            lng,
            fallbackLng: 'ko',
            // react 옵션 제거 (서버에서는 불필요)
        });
    return i18nInstance;
};

export async function getTranslation(lng?: string) {
    const locale = lng || getLocale();
    const i18nextInstance = await initI18next(locale);
    return {
        t: i18nextInstance.getFixedT(locale),
        i18n: i18nextInstance,
    };
}
