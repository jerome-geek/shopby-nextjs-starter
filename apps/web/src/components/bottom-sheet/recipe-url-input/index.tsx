import { useTranslation } from 'react-i18next';

import { type DefaultBottomSheetProps, BottomSheetLayout } from '@/components/layout';
import { RecipeUrlInputContent } from '@/components/layer-contents/recipe-url-input';

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
