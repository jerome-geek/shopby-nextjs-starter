import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { parseAsString, useQueryStates } from 'nuqs';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import * as styles from '@/features/recipe/overlay/collection-form/content/index.css';
import { CollectionFormSkeleton } from '@/features/recipe/overlay/collection-form/content/skeleton';
import {
    InputField,
    InputFieldContainer,
    InputLabel,
} from '@/shared/ui/input';
import { MODAL_QUERY_KEY } from '@/const/modal';
import { useCollectionMutation } from '@/hooks/mutations';
import { useSharedCollection } from '@/hooks/query/shop/collection';
import { useToast } from '@/hooks/ui';
import { useResponsive } from '@/hooks/utils';
import { TextArea } from '@/shared/components/form';

export interface CollectionFormData {
    title: string;
    description?: string;
}

interface CollectionFormContentProps {
    shareCode: string;
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
    formId?: string;
}

export const CollectionFormContent = ({
    shareCode,
    onSuccess,
    onError,
    formId = 'collection-form',
}: CollectionFormContentProps) => {
    const { t } = useTranslation();

    const { addToast } = useToast();

    const { isMobile } = useResponsive();

    const queryClient = useQueryClient();

    const { register, handleSubmit, setValue } =
        useFormContext<CollectionFormData>();

    const [, setModalQuery] = useQueryStates(
        {
            [MODAL_QUERY_KEY]: parseAsString,
            recipeSno: parseAsString,
        },
        { history: 'replace', shallow: true },
    );

    const { data: collectionData, isLoading: isCollectionLoading } =
        useSharedCollection({
            shareCode,
            options: {
                enabled: !!shareCode,
            },
        });

    const {
        create: { mutate: createCollection },
        update: { mutate: updateCollection },
    } = useCollectionMutation();

    // Populate form values when edit data is loaded
    useEffect(() => {
        if (collectionData) {
            setValue('title', collectionData.title);
            setValue('description', collectionData.description || '');
        }
    }, [collectionData, setValue]);

    const onSubmit = handleSubmit((data) => {
        if (shareCode && collectionData) {
            // Update mode
            updateCollection(
                { collectionSno: collectionData.sno, data },
                {
                    onSuccess: () => {
                        addToast({
                            message: t('컬렉션이 수정되었습니다.'),
                            variant: 'success',
                        });
                        // collectionKeys.list(),
                        // Invalidate related queries
                        // queryClient.invalidateQueries({
                        //     queryKey: collectionKeys.detail(shareCode),
                        // });
                        // queryClient.invalidateQueries({
                        //     queryKey: recipeKeys.collections(),
                        // });

                        queryClient.invalidateQueries({
                            predicate: (query) =>
                                query.queryKey[0] === 'collection' ||
                                query.queryKey[0] === 'recipe',
                        });

                        onSuccess?.();
                    },
                    onError: (error) => {
                        onMutationError(
                            error,
                            t('컬렉션 수정에 실패했습니다.'),
                        );
                        onError?.(error);
                    },
                },
            );
        } else {
            // Create mode
            createCollection(
                { data },
                {
                    onSuccess: () => {
                        addToast({
                            message: t('새 컬렉션이 생성되었습니다.'),
                            variant: 'success',
                        });

                        // queryClient.invalidateQueries({
                        //     queryKey: recipeKeys.collections(),
                        // });
                        queryClient.invalidateQueries({
                            predicate: (query) =>
                                query.queryKey[0] === 'collection' ||
                                query.queryKey[0] === 'recipe',
                        });

                        onSuccess?.();
                    },
                    onError: (error) => {
                        onMutationError(
                            error,
                            t('컬렉션 생성에 실패했습니다.'),
                        );
                        onError?.(error);
                    },
                },
            );
        }
    });

    const onMutationError = (error: unknown, fallbackMessage: string) => {
        console.error('Collection mutation error:', error);
        const message = isAxiosError(error)
            ? (error.response?.data.message ?? fallbackMessage)
            : fallbackMessage;

        addToast({
            variant: 'error',
            message,
        });
    };

    if (shareCode && isCollectionLoading) {
        return <CollectionFormSkeleton />;
    }

    return (
        <form id={formId} onSubmit={onSubmit} className={styles.container}>
            <InputFieldContainer>
                <InputLabel isRequired>{t('컬렉션 이름')}</InputLabel>
                <InputField
                    placeholder={t('컬렉션 이름을 입력하세요')}
                    {...register('title', { required: true })}
                    autoFocus={!isMobile}
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
    );
};
