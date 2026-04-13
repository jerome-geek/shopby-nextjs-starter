import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import { ModalLayout } from '@/components/layout';
import * as styles from '@/components/modal/recipe-create-select/index.css';
import { MODAL_QUERY_KEY } from '@/const/modal';
import { useCustomDialog } from '@/hooks/ui';
import useRecipeMutation from '@/hooks/mutations/useRecipeMutation';

interface RecipeCreateSelectionProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
}

export const RecipeCreateSelection = ({
    isOpen,
    close,
    unmount,
}: RecipeCreateSelectionProps) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { openRecipeUrlInput } = useCustomDialog();

    const {
        deleteManualTempImages: {
            mutateAsync: deleteManualTempImagesMutateAsync,
        },
    } = useRecipeMutation();
    const onManualCreateClick = async () => {
        try {
            await deleteManualTempImagesMutateAsync();

            const newQuery = { ...router.query };
            delete newQuery[MODAL_QUERY_KEY];
            router.replace(
                { pathname: router.pathname, query: newQuery },
                undefined,
                { shallow: true },
            );
            // props.close();
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
