import { isAxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';

import { collection } from '@/api/shop';
import {
    CreateCollectionData,
    UpdateCollectionRequest,
} from '@/models/shop/collection';
import { useToast } from '@/hooks/ui';

const useCollectionMutation = () => {
    const { t } = useTranslation();

    const { addToast } = useToast();

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
            onError: onMutationError,
        }),

        remove: useMutation({
            mutationFn: async ({ collectionSno }: { collectionSno: number }) =>
                await collection.remove(collectionSno),
            onError: onMutationError,
        }),

        bookmarkCollection: useMutation({
            mutationFn: async ({ collectionSno }: { collectionSno: number }) =>
                await collection.bookmarkCollection(collectionSno),
            onError: onMutationError,
        }),

        unBookmarkCollection: useMutation({
            mutationFn: async ({ collectionSno }: { collectionSno: number }) =>
                await collection.unBookmarkCollection(collectionSno),
            onError: onMutationError,
        }),
    };
};

export default useCollectionMutation;
