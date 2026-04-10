import { isAxiosError } from 'axios';
import { overlay } from 'overlay-kit';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { recipe } from '@/api/shop';
import { ModalLayout } from '@/components/layout';
import * as styles from '@/components/modal/recipe-url-input/index.css';
import { useCustomDialog } from '@/hooks/ui';
import { useDialog } from '@/hooks/utils';

interface RecipeUrlInputProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
}

export const RecipeUrlInput = ({
    isOpen,
    close,
    unmount,
}: RecipeUrlInputProps) => {
    const { t } = useTranslation();
    const { openAsyncDialog } = useDialog();
    const { openRecipeSave } = useCustomDialog();
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { data } = await recipe.createRecipe({ url });

            const recipeSno = await openAsyncDialog<number>({
                message: data.message,
                onConfirmReturnValue: data.recipeSno,
            });

            if (recipeSno) {
                overlay.closeAll();
                openRecipeSave(recipeSno);
            }
        } catch (error) {
            const errorMessage = isAxiosError(error)
                ? error.response?.data?.message || error.message
                : t(
                      '레시피를 생성하는 중 오류가 발생하였습니다.<br/>관리자에게 문의해주세요.',
                  );

            await openAsyncDialog({
                message: errorMessage,
            });
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
