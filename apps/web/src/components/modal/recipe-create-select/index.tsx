import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { ModalLayout } from '@/components/layout';
import { PATHS } from '@/const/paths';
import * as styles from '@/components/modal/recipe-create-select/index.css';

interface RecipeCreateSelectionProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
    onSelectAI: () => void;
}

export const RecipeCreateSelection = ({
    isOpen,
    close,
    unmount,
    onSelectAI,
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
                <Link
                    href={PATHS.RECIPES.WRITE}
                    className={styles.directButton}
                    style={{ textDecoration: 'none' }}
                    onClick={close} // 👈 이 부분을 추가하여 모달을 닫아줍니다!
                >
                    {t('직접 만들기')}
                </Link>
            </div>
        </ModalLayout>
    );
};
