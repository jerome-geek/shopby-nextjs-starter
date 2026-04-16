import { useTranslation } from 'react-i18next';

import { BottomSheetLayout } from '@/components/layout';
import { RecipeSaveContent } from '@/components/layer-contents/recipe-save';

interface RecipeSaveSheetProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
    recipeSno?: number;
    onAddCollection?: () => void;
}

export const RecipeSaveSheet = ({
    isOpen,
    close,
    unmount,
    recipeSno,
    onAddCollection,
}: RecipeSaveSheetProps) => {
    const { t } = useTranslation();

    return (
        <BottomSheetLayout
            isOpen={isOpen}
            close={close}
            unmount={unmount}
            title={t('레시피 저장')}
            isUnmountCondition={false}
        >
            <RecipeSaveContent
                close={close}
                recipeSno={recipeSno}
                onAddCollection={onAddCollection}
            />
        </BottomSheetLayout>
    );
};
