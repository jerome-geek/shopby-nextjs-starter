'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ko from '@/i18n/ko.json';
import en from '@/i18n/en.json';
import { env } from '@/configs/env';

const getLocale = () => {
    return env.NEXT_PUBLIC_LOCALE || 'ko';
};

const locale = getLocale();

i18n.use(initReactI18next).init({
    resources: {
        ko: {
            translation: ko,
        },
        en: {
            translation: en,
        },
    },
    lng: locale,
    fallbackLng: 'ko',
    interpolation: {
        escapeValue: false, // React는 이미 XSS 방지됨
    },
    react: {
        useSuspense: false, // Next.js App Router와 호환
    },
});

export default i18n;
