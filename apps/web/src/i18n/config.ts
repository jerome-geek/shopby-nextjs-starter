import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ko from './locales/ko.json';

const resources = {
    ko: {
        translation: ko,
    },
    en: {
        translation: en,
    },
};

if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
        resources,
        lng: 'ko',
        fallbackLng: 'ko',
        debug: process.env.NODE_ENV === 'development',
        interpolation: {
            escapeValue: false,
        },
        initImmediate: false,
    });
}

export default i18n;
