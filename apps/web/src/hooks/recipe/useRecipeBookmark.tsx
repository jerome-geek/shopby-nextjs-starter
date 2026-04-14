import { includes } from '@fxts/core';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useRecipeMutation } from '@/hooks/mutations';
import { recipeKeys } from '@/hooks/queryKeys';
import { useCustomDialog, useToast } from '@/hooks/ui';
import { useAuth } from '@/hooks/useAuth';

const useRecipeBookmark = () => {
    const { t } = useTranslation();

    const isLogin = useAuth();

    const queryClient = useQueryClient();

    const { openLoginDialog, openRecipeSave } = useCustomDialog();

    const { addToast } = useToast();

    const {
        unBookmarkRecipe: { mutate: unBookmarkRecipeMutate },
    } = useRecipeMutation();

    const onBookmarkToggle = useCallback(
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

    return {
        onBookmarkToggle,
    };
};

export default useRecipeBookmark;
