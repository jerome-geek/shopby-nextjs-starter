import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ModalLayout } from '@/components/layout';
import * as styles from '@/components/modal/recipe-url-input/index.css';

interface RecipeUrlInputProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
    onSubmit: (url: string) => void;
}

export const RecipeUrlInput = ({
    isOpen,
    close,
    unmount,
    onSubmit,
}: RecipeUrlInputProps) => {
    const { t } = useTranslation();
    const [url, setUrl] = useState('');

    const isValidUrl = (string: string) => {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    };

    const isSubmitEnabled = url.length > 0 && isValidUrl(url);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitEnabled) {
            onSubmit(url);
        }
    };

    return (
        <ModalLayout
            isOpen={isOpen}
            close={close}
            unmount={unmount}
            title={t('레시피 URL 입력')}
            size='small'
            width='480px'
        >
            <form onSubmit={handleSubmit} className={styles.container}>
                <div className={styles.inputWrapper}>
                    <p className={styles.description}>
                        {t('레시피가 있는 웹페이지 URL을 입력해 주세요.')}
                    </p>
                    <input
                        type='text'
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder={t('https://example.com/recipe')}
                        className={styles.input}
                        autoFocus
                    />
                </div>
                <button
                    type='submit'
                    disabled={!isSubmitEnabled}
                    className={styles.submitButton}
                >
                    {t('레시피 가져오기')}
                </button>
            </form>
        </ModalLayout>
    );
};
