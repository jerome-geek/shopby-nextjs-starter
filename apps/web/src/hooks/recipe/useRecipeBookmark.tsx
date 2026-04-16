import { includes } from '@fxts/core';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useCollectionMutation, useRecipeMutation } from '@/hooks/mutations';
import { collectionKeys, recipeKeys } from '@/hooks/queryKeys';
import { useCustomDialog, useToast } from '@/hooks/ui';
import { useAuth } from '@/hooks/useAuth';
import type { BookmarkedRecipeCollection } from '@/models/shop/recipe';

const useRecipeBookmark = () => {
    const { t } = useTranslation();

    const isLogin = useAuth();

    const queryClient = useQueryClient();

    const { openLoginDialog, openRecipeSave } = useCustomDialog();

    const { addToast } = useToast();

    const {
        unBookmarkRecipe: { mutate: unBookmarkRecipeMutate },
    } = useRecipeMutation();
    const {
        bookmarkCollection: { mutate: bookmarkCollectionMutate },
        unBookmarkCollection: { mutate: unBookmarkCollectionMutate },
    } = useCollectionMutation();

    const toggleRecipeBookmark = useCallback(
        ({ sno, bookmarked }: { sno: number; bookmarked: boolean }) => {
            if (!isLogin) {
                openLoginDialog();
                return;
            }

            if (bookmarked) {
                unBookmarkRecipeMutate(
                    { sno },
                    {
                        onSuccess: () => {
                            queryClient.invalidateQueries({
                                predicate: (query) =>
                                    includes(query.queryKey[0], [
                                        ...recipeKeys.all,
                                    ]),
                            });

                            addToast({
                                message: t('북마크를 취소했습니다.'),
                                variant: 'success',
                            });
                        },
                    },
                );
            } else {
                openRecipeSave();
            }
        },
        [
            t,
            addToast,
            isLogin,
            openLoginDialog,
            openRecipeSave,
            queryClient,
            unBookmarkRecipeMutate,
        ],
    );

    const toggleCollectionBookmark = useCallback(
        (collection: BookmarkedRecipeCollection) => {
            if (!isLogin) {
                openLoginDialog();
                return;
            }

            if (collection.bookmarked) {
                unBookmarkCollectionMutate(
                    { collectionSno: collection.sno },
                    {
                        onSuccess: () => {
                            queryClient.invalidateQueries({
                                queryKey: collectionKeys.publicSearches(),
                            });
                            addToast({
                                message: t('북마크를 취소했습니다.'),
                                variant: 'success',
                            });
                        },
                    },
                );
            } else {
                bookmarkCollectionMutate(
                    { collectionSno: collection.sno },
                    {
                        onSuccess: () => {
                            queryClient.invalidateQueries({
                                queryKey: collectionKeys.publicSearches(),
                            });
                            addToast({
                                message: t('북마크를 추가했습니다.'),
                                variant: 'success',
                            });
                        },
                    },
                );
            }
        },
        [
            t,
            addToast,
            isLogin,
            openLoginDialog,
            queryClient,
            bookmarkCollectionMutate,
            unBookmarkCollectionMutate,
        ],
    );

    return {
        toggleRecipeBookmark,
        toggleCollectionBookmark,
    };
};

export default useRecipeBookmark;
