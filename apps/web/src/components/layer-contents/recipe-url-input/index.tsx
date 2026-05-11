import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { overlay } from 'overlay-kit';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { recipe } from '@/api/shop';
import * as styles from '@/components/layer-contents/recipe-url-input/index.css';
import { recipeKeys } from '@/hooks/queryKeys';
import { useCustomDialog } from '@/hooks/ui';
import { useToast } from '@/hooks/ui/useToast';
import { useDialog } from '@/hooks/utils';

const useRecipeUrlInputLogic = (close: () => void) => {
    const { t } = useTranslation();
    const { openAsyncDialog } = useDialog();
    const { openRecipeSave } = useCustomDialog();
    const { addToast } = useToast();
    const queryClient = useQueryClient();

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

            if (data.status === 'COMPLETED') {
                addToast({
                    message: t('이미 등록된 레시피입니다.'),
                });
                return;
            }

            const recipeSno = await openAsyncDialog<number>({
                message: data.message,
                onConfirmReturnValue: data.recipeSno,
            });

            if (recipeSno) {
                await queryClient.invalidateQueries({
                    queryKey: recipeKeys.lists(),
                });
                overlay.closeAll();
                openRecipeSave(recipeSno, true);
            }
        } catch (error) {
            console.log('🚀 ~ handleSubmit ~ error:', error);
            const errorMessage = isAxiosError(error)
                ? error.response?.data?.message || error.message
                : error instanceof Error
                ? error.message
                : t(
                      '레시피를 생성하는 중 오류가 발생하였습니다.<br/>관리자에게 문의해주세요.',
                  );

            await openAsyncDialog({
                message: errorMessage,
            });
        }
    };

    return { url, setUrl, isSubmitEnabled, handleSubmit };
};

export const RecipeUrlInputContent = ({ close }: { close: () => void }) => {
    const { t } = useTranslation();

    const { url, setUrl, isSubmitEnabled, handleSubmit } =
        useRecipeUrlInputLogic(close);

    return (
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
    );
};
