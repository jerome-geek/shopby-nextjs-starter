import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import FetchBoundary from '@/shared/components/common/FetchBoundary';
import {
    CollectionFormContent,
    CollectionFormData,
} from '@/components/layer-contents/collection-form';
import { CollectionFormSkeleton } from '@/components/layer-contents/collection-form/skeleton';
import { DefaultModalLayoutProps, ModalLayout } from '@/shared/components/layout';
import ButtonV2 from '@/shared/ui/button/v2';

interface CollectionFormModalProps extends DefaultModalLayoutProps {
    shareCode: string;
}

export const CollectionFormModal = (props: CollectionFormModalProps) => {
    const { t } = useTranslation();
    const { shareCode } = props;

    const formMethods = useForm<CollectionFormData>({
        defaultValues: {
            title: '',
            description: '',
        },
        mode: 'onChange',
    });

    const {
        formState: { isSubmitting, isValid },
    } = formMethods;

    const isSubmitDisabled = !isValid || isSubmitting;
    const isEdit = !!shareCode;

    return (
        <ModalLayout
            {...props}
            title={isEdit ? t('컬렉션 수정하기') : t('새 컬렉션 만들기')}
            width='588px'
            footerButtonList={[
                <ButtonV2
                    key='collection-form-submit-button'
                    type='submit'
                    frame='solid'
                    size='large'
                    variant='primary'
                    disabled={isSubmitDisabled}
                    form='collection-form'
                >
                    {isEdit ? t('수정 완료') : t('컬렉션 만들기')}
                </ButtonV2>,
            ]}
        >
            <FormProvider {...formMethods}>
                <FetchBoundary fallback={<CollectionFormSkeleton />}>
                    <CollectionFormContent
                        shareCode={shareCode}
                        onSuccess={props.close}
                    />
                </FetchBoundary>
            </FormProvider>
        </ModalLayout>
    );
};
