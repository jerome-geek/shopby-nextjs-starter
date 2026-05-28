import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { RecipeImageUpload } from '@/components/layer-contents/recipe-image-upload';
import { ModalLayout, type DefaultModalLayoutProps } from '@/shared/components/layout';
import { MODAL_QUERY_KEY } from '@/const/modal';

export const RecipeImageUploadModal = (props: DefaultModalLayoutProps) => {
    const { t } = useTranslation();
    const router = useRouter();

    const handleClose = () => {
        const newQuery = { ...router.query };

        if (newQuery[MODAL_QUERY_KEY]) {
            delete newQuery[MODAL_QUERY_KEY];
            router.replace(
                { pathname: router.pathname, query: newQuery },
                undefined,
                { shallow: true },
            );
        }

        props.close();
    };

    return (
        <ModalLayout
            {...props}
            close={handleClose}
            title={t('이미지 추가')}
            width='588px'
        >
            <RecipeImageUpload handleClose={handleClose} />
        </ModalLayout>
    );
};
