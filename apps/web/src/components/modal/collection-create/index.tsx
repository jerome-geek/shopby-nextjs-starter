import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { DefaultModalLayoutProps, ModalLayout } from '@/components/layout';
import * as styles from '@/components/modal/collection-create/index.css';
import ButtonV2 from '@/components/ui/button/v2';
import {
    InputField,
    InputFieldContainer,
    InputLabel,
    TextArea,
} from '@/components/ui/input';
import { useCollectionMutation } from '@/hooks/mutations';
import { recipeKeys } from '@/hooks/queryKeys';
import { useToast } from '@/hooks/ui';

type CollectionCreateModalProps = DefaultModalLayoutProps;

interface CollectionCreateFormData {
    title: string;
    description?: string;
}

export const CollectionCreateModal = (props: CollectionCreateModalProps) => {
    const { t } = useTranslation();

    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = useForm<CollectionCreateFormData>({
        defaultValues: {
            title: '',
            description: '',
        },
    });

    const isSubmitDisabled = !isValid || isSubmitting;

    const { addToast } = useToast();
    const {
        create: { mutate: createCollection },
    } = useCollectionMutation();

    const onSubmit = handleSubmit((data) => {
        createCollection(
            { data },
            {
                onSuccess: () => {
                    addToast({
                        message: t('새 컬렉션이 생성되었습니다.'),
                        variant: 'success',
                    });

                    queryClient.invalidateQueries({
                        queryKey: recipeKeys.collections(),
                    });

                    props.close();
                },
                onError: (error) => {
                    console.error('Create collection error:', error);
                    const message = isAxiosError(error)
                        ? (error.response?.data.message ??
                          t(
                              '컬렉션 생성에 실패했습니다.<br/>잠시 후 다시 시도해 주세요.',
                          ))
                        : t(
                              '컬렉션 생성에 실패했습니다.<br/>잠시 후 다시 시도해 주세요.',
                          );

                    addToast({
                        variant: 'error',
                        message,
                    });
                },
            },
        );
    });

    return (
        <ModalLayout
            {...props}
            title={t('새 컬렉션 만들기')}
            width='588px'
            footerButtonList={[
                <ButtonV2
                    key='collection-create-submit-button'
                    type='submit'
                    frame='solid'
                    size='large'
                    variant='primary'
                    disabled={isSubmitDisabled}
                    form='collection-create-form'
                >
                    {t('컬렉션 만들기')}
                </ButtonV2>,
            ]}
        >
            <form
                id='collection-create-form'
                onSubmit={onSubmit}
                className={styles.container}
            >
                <InputFieldContainer>
                    <InputLabel isRequired>{t('컬렉션 이름')}</InputLabel>
                    <InputField
                        placeholder={t('컬렉션 이름을 입력하세요')}
                        {...register('title', { required: true })}
                        autoFocus
                    />
                </InputFieldContainer>

                <InputFieldContainer>
                    <InputLabel>{t('컬렉션 소개')}</InputLabel>
                    <TextArea
                        placeholder={t('이 컬렉션에 대해 간단히 소개해 주세요')}
                        {...register('description')}
                        rows={3}
                    />
                </InputFieldContainer>
            </form>
        </ModalLayout>
    );
};
