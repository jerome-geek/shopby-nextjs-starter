import { useTranslation } from 'react-i18next';

import { ModalLayout } from '@/components/layout';
import { RecipeSaveContent } from '@/components/layer-contents/recipe-save';

interface RecipeSaveModalProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
    recipeSno?: number;
    onAddCollection?: () => void;
}

export const RecipeSaveModal = ({
    isOpen,
    close,
    unmount,
    recipeSno,
    onAddCollection,
}: RecipeSaveModalProps) => {
    const { t } = useTranslation();

    return (
        <ModalLayout
            isOpen={isOpen}
            close={close}
            unmount={unmount}
            title={t('레시피 저장')}
            size='small'
            width='540px'
        >
            <RecipeSaveContent
                close={close}
                recipeSno={recipeSno}
                onAddCollection={onAddCollection}
            />
        </ModalLayout>
    );
};
