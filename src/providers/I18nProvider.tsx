'use client';

import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/config';

export default function I18nProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        const locale = process.env.NEXT_PUBLIC_LOCALE || 'ko';
        if (i18n.language !== locale) {
            i18n.changeLanguage(locale);
        }
    }, []);

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
