import { includes } from '@fxts/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { collection } from '@/api/shop';
import { collectionKeys, recipeKeys } from '@/hooks/queryKeys';
import { useToast } from '@/hooks/ui';
import type {
    CreateCollectionData,
    UpdateCollectionRequest,
} from '@/models/shop/collection';

const useCollectionMutation = () => {
    const { t } = useTranslation();

    const { addToast } = useToast();

    const queryClient = useQueryClient();

    const onMutationSuccess = () => {
        return queryClient.invalidateQueries({
            predicate: (query) => {
                return includes(query.queryKey[0], [
                    ...recipeKeys.all,
                    ...collectionKeys.all,
                ]);
            },
        });
    };

    const onMutationError = (error: Error) => {
        const errorMessage = isAxiosError(error)
            ? error.response?.data?.message || error.message
            : t('저장 중 오류가 발생했습니다.');
        addToast({ variant: 'error', message: errorMessage });
    };

    return {
        create: useMutation({
            mutationFn: async ({ data }: { data: CreateCollectionData }) =>
                await collection.create(data),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),

        update: useMutation({
            mutationFn: async ({
                collectionSno,
                data,
            }: {
                collectionSno: number;
                data: UpdateCollectionRequest;
            }) => await collection.update(collectionSno, data),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),

        remove: useMutation({
            mutationFn: async ({ collectionSno }: { collectionSno: number }) =>
                await collection.remove(collectionSno),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),

        bookmarkCollection: useMutation({
            mutationFn: async ({ collectionSno }: { collectionSno: number }) =>
                await collection.bookmarkCollection(collectionSno),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),

        unBookmarkCollection: useMutation({
            mutationFn: async ({ collectionSno }: { collectionSno: number }) =>
                await collection.unBookmarkCollection(collectionSno),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),
    };
};

export default useCollectionMutation;
