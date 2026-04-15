import { useTranslation } from 'react-i18next';

import { type DefaultModalLayoutProps, ModalLayout } from '@/components/layout';
import * as styles from '@/components/modal/recipe-create-select/index.css';
import { useRecipeMutation } from '@/hooks/mutations';
import { useCustomDialog } from '@/hooks/ui';

type RecipeCreateSelectionProps = DefaultModalLayoutProps;

export const RecipeCreateSelection = ({
    isOpen,
    close,
    unmount,
}: RecipeCreateSelectionProps) => {
    const { t } = useTranslation();

    const { openRecipeUrlInput, openRecipeImageUpload } = useCustomDialog();

    const {
        deleteManualTempImages: {
            mutateAsync: deleteManualTempImagesMutateAsync,
        },
    } = useRecipeMutation();

    const onManualCreateClick = async () => {
        try {
            await deleteManualTempImagesMutateAsync();

            openRecipeImageUpload();
            close();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ModalLayout
            isOpen={isOpen}
            close={close}
            unmount={unmount}
            title={t('레시피 만들기')}
            size='small'
            width='540px'
        >
            <div className={styles.container}>
                <button
                    type='button'
                    className={styles.aiButton}
                    onClick={() => {
                        close();
                        openRecipeUrlInput();
                    }}
                >
                    {t('AI로 만들기')}
                </button>
                <button
                    type='button'
                    className={styles.directButton}
                    onClick={onManualCreateClick}
                >
                    {t('직접 만들기')}
                </button>
            </div>
        </ModalLayout>
    );
};
