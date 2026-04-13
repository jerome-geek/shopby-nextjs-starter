import { useMutation } from '@tanstack/react-query';

import { collection } from '@/api/shop';
import {
    CreateCollectionRequest,
    UpdateCollectionRequest,
} from '@/models/shop/collection';

const useCollectionMutation = () => {
    return {
        create: useMutation({
            mutationFn: async ({ data }: { data: CreateCollectionRequest }) =>
                await collection.create(data),
        }),

        update: useMutation({
            mutationFn: async ({
                collectionSno,
                data,
            }: {
                collectionSno: number;
                data: UpdateCollectionRequest;
            }) => await collection.update(collectionSno, data),
        }),

        remove: useMutation({
            mutationFn: async ({ collectionSno }: { collectionSno: number }) =>
                await collection.remove(collectionSno),
        }),

        bookmarkCollection: useMutation({
            mutationFn: async ({ collectionSno }: { collectionSno: number }) =>
                await collection.bookmarkCollection(collectionSno),
        }),

        unBookmarkCollection: useMutation({
            mutationFn: async ({ collectionSno }: { collectionSno: number }) =>
                await collection.unBookmarkCollection(collectionSno),
        }),
    };
};

export default useCollectionMutation;
