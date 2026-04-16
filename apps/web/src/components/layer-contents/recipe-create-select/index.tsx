import { useTranslation } from 'react-i18next';

import * as styles from '@/components/layer-contents/recipe-create-select/index.css';
import { useRecipeMutation } from '@/hooks/mutations';
import { useCustomDialog } from '@/hooks/ui';

const useRecipeCreateSelectionHandlers = (close: () => void) => {
    const { openRecipeUrlInput, openRecipeImageUpload } = useCustomDialog();
    const {
        deleteManualTempImages: {
            mutateAsync: deleteManualTempImagesMutateAsync,
        },
    } = useRecipeMutation();

    const onAiClick = () => {
        close();
        openRecipeUrlInput();
    };

    const onManualClick = async () => {
        try {
            await deleteManualTempImagesMutateAsync();
            openRecipeImageUpload();
            close();
        } catch (error) {
            console.error(error);
        }
    };

    return { onAiClick, onManualClick };
};

export const RecipeCreateSelectionContent = ({
    close,
}: {
    close: () => void;
}) => {
    const { t } = useTranslation();
    const { onAiClick, onManualClick } = useRecipeCreateSelectionHandlers(close);

    return (
        <div className={styles.container}>
            <button
                type='button'
                className={styles.aiButton}
                onClick={onAiClick}
            >
                {t('AI로 만들기')}
            </button>
            <button
                type='button'
                className={styles.directButton}
                onClick={onManualClick}
            >
                {t('직접 만들기')}
            </button>
        </div>
    );
};
