import { useQueryClient, useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import * as styles from './index.css';
import {
    InputField,
    InputFieldContainer,
    InputLabel,
    TextArea,
} from '@/components/ui/input';
import { useCollectionMutation } from '@/hooks/mutations';
import { recipeKeys, collectionKeys } from '@/hooks/queryKeys';
import { useToast } from '@/hooks/ui';
import { collection as collectionApi } from '@/api/shop';

export interface CollectionFormData {
    title: string;
    description?: string;
}

interface CollectionFormContentProps {
    shareCode?: string;
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
    const queryClient = useQueryClient();
    const { addToast } = useToast();

    const { register, handleSubmit, setValue } =
        useFormContext<CollectionFormData>();

    // Fetch data if shareCode is provided (Edit mode)
    const { data: collectionData } = useQuery({
        queryKey: collectionKeys.detail(shareCode || ''),
        queryFn: async () => {
            const { data } = await collectionApi.getShared(shareCode!);
            return data;
        },
        enabled: !!shareCode,
        staleTime: 1000 * 60 * 5,
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
                                query.queryKey[0] === 'collections' ||
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

    return (
        <form id={formId} onSubmit={onSubmit} className={styles.container}>
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
    );
};
