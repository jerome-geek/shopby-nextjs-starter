import { useTranslation } from 'react-i18next';

import { ModalLayout } from '@/components/layout';
import * as styles from '@/components/modal/recipe-create-select/index.css';

interface RecipeCreateSelectionProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
    onSelectAI: () => void;
    onSelectDirect: () => void;
}

export const RecipeCreateSelection = ({
    isOpen,
    close,
    unmount,
    onSelectAI,
    onSelectDirect,
}: RecipeCreateSelectionProps) => {
    const { t } = useTranslation();

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
                    onClick={onSelectAI}
                >
                    {t('AI로 만들기')}
                </button>
                <button
                    type='button'
                    className={styles.directButton}
                    onClick={onSelectDirect}
                >
                    {t('직접 만들기')}
                </button>
            </div>
        </ModalLayout>
    );
};
