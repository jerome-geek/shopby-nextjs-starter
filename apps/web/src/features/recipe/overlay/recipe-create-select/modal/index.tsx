import { useTranslation } from 'react-i18next';

import { type DefaultModalLayoutProps, ModalLayout } from '@/shared/components/layout';
import { RecipeCreateSelectionContent } from '@/features/recipe/overlay/recipe-create-select/content';

type RecipeCreateSelectionProps = DefaultModalLayoutProps;

export const RecipeCreateSelection = ({
    isOpen,
    close,
    unmount,
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
            <RecipeCreateSelectionContent close={close} />
        </ModalLayout>
    );
};
