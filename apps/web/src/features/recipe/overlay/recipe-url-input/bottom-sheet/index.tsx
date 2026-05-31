import { useTranslation } from 'react-i18next';

import { type DefaultBottomSheetProps, BottomSheetLayout } from '@/shared/components/layout';
import { RecipeUrlInputContent } from '@/features/recipe/overlay/recipe-url-input/content';

type RecipeUrlInputSheetProps = DefaultBottomSheetProps;

export const RecipeUrlInputSheet = ({
    isOpen,
    close,
    unmount,
}: RecipeUrlInputSheetProps) => {
    const { t } = useTranslation();

    return (
        <BottomSheetLayout
            isOpen={isOpen}
            close={close}
            unmount={unmount}
            title={t('레시피 URL 입력')}
            isUnmountCondition={false}
        >
            <RecipeUrlInputContent close={close} />
        </BottomSheetLayout>
    );
};
