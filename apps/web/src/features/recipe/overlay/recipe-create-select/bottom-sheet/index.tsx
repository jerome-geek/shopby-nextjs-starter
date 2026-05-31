import { useTranslation } from 'react-i18next';

import { type DefaultBottomSheetProps, BottomSheetLayout } from '@/shared/components/layout';
import { RecipeCreateSelectionContent } from '@/features/recipe/overlay/recipe-create-select/content';

type RecipeCreateSelectionSheetProps = DefaultBottomSheetProps;

export const RecipeCreateSelectionSheet = ({
    isOpen,
    close,
    unmount,
}: RecipeCreateSelectionSheetProps) => {
    const { t } = useTranslation();

    return (
        <BottomSheetLayout
            isOpen={isOpen}
            close={close}
            unmount={unmount}
            title={t('레시피 만들기')}
            isUnmountCondition={false}
        >
            <RecipeCreateSelectionContent close={close} />
        </BottomSheetLayout>
    );
};
