import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/button';
import * as styles from './LanguageSwitcher.css';

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className={styles.container}>
            <Button
                type='button'
                frame='outlined'
                variant='primary'
                onClick={() => changeLanguage('ko')}
                style={{ opacity: i18n.language === 'ko' ? 1 : 0.5 }}
            >
                한국어
            </Button>
            <Button
                type='button'
                frame='outlined'
                variant='primary'
                onClick={() => changeLanguage('en')}
                style={{ opacity: i18n.language === 'en' ? 1 : 0.5 }}
            >
                English
            </Button>
        </div>
    );
}
