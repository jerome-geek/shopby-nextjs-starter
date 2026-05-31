import { useTranslation } from 'react-i18next';

import { type DefaultModalLayoutProps, ModalLayout } from '@/shared/components/layout';
import { RecipeUrlInputContent } from '@/features/recipe/overlay/recipe-url-input/content';

type RecipeUrlInputProps = DefaultModalLayoutProps;

export const RecipeUrlInput = ({
    isOpen,
    close,
    unmount,
}: RecipeUrlInputProps) => {
    const { t } = useTranslation();

    return (
        <ModalLayout
            isOpen={isOpen}
            close={close}
            unmount={unmount}
            title={t('레시피 URL 입력')}
            size='small'
            width='480px'
        >
            <RecipeUrlInputContent close={close} />
        </ModalLayout>
    );
};
