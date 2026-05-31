import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import FetchBoundary from '@/shared/components/common/FetchBoundary';
import {
    CollectionFormContent,
    CollectionFormData,
} from '@/features/recipe/overlay/collection-form/content';
import { CollectionFormSkeleton } from '@/features/recipe/overlay/collection-form/content/skeleton';
import {
    BottomSheetLayout,
    DefaultBottomSheetProps,
} from '@/shared/components/layout';
import ButtonV2 from '@/shared/ui/button/v2';

interface CollectionFormSheetProps extends DefaultBottomSheetProps {
    shareCode: string;
}

export const CollectionFormSheet = ({
    isOpen,
    close,
    unmount,
    shareCode,
}: CollectionFormSheetProps) => {
    const { t } = useTranslation();

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
        <BottomSheetLayout
            isOpen={isOpen}
            close={close}
            unmount={unmount}
            title={isEdit ? t('컬렉션 수정하기') : t('새 컬렉션 만들기')}
            isUnmountCondition={false}
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
                        onSuccess={close}
                    />
                </FetchBoundary>
            </FormProvider>
        </BottomSheetLayout>
    );
};
