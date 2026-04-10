import { isAxiosError } from 'axios';
import { overlay } from 'overlay-kit';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import { recipe } from '@/api/shop';
import { ModalLayout } from '@/components/layout';
import * as styles from '@/components/modal/recipe-url-input/index.css';
import { MODAL_QUERY_KEY } from '@/const/modal';
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
    const router = useRouter();
    const { openAsyncDialog } = useDialog();
    const { openRecipeSave } = useCustomDialog();

    const handleClose = () => {
        const newQuery = { ...router.query };
        delete newQuery[MODAL_QUERY_KEY];
        router.replace(
            { pathname: router.pathname, query: newQuery },
            undefined,
            { shallow: true },
        );
        close();
    };
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

            if (data.status === 'FAILED') {
                throw new Error(data.message);
            }

            const recipeSno = await openAsyncDialog<number>({
                message: data.message,
                onConfirmReturnValue: data.recipeSno,
            });

            if (recipeSno) {
                overlay.closeAll();
                openRecipeSave(recipeSno);
            }
        } catch (error) {
            console.log('🚀 ~ handleSubmit ~ error:', error);
            const errorMessage = isAxiosError(error)
                ? error.response?.data?.message || error.message
                : error instanceof Error // 일반 Error 객체인지 확인
                  ? error.message // 던진 메시지(data.message) 사용
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
            close={handleClose}
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
