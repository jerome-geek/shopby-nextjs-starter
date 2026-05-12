import { useTranslation } from 'react-i18next';

import { useCustomDialog } from '@/features/dialog';
import { useCollectionMutation, useRecipeMutation } from '@/hooks/mutations';
import { useToast } from '@/hooks/ui';

const useBookmark = () => {
    const { t } = useTranslation();

    const { openRecipeSave, withRequiredAuth } = useCustomDialog();

    const { addToast } = useToast();

    const {
        unBookmarkRecipe: { mutate: unBookmarkRecipeMutate },
    } = useRecipeMutation();
    const {
        bookmarkCollection: { mutate: bookmarkCollectionMutate },
        unBookmarkCollection: { mutate: unBookmarkCollectionMutate },
    } = useCollectionMutation();

    const toggleRecipeBookmark = withRequiredAuth(
        ({ sno, bookmarked }: { sno: number; bookmarked: boolean }) => {
            if (bookmarked) {
                unBookmarkRecipeMutate(
                    { sno },
                    {
                        onSuccess: () => {
                            addToast({
                                message: t('북마크를 취소했습니다.'),
                                variant: 'success',
                            });
                        },
                    },
                );
            } else {
                openRecipeSave(sno);
            }
        },
    );

    const toggleCollectionBookmark = withRequiredAuth(
        ({ sno, bookmarked }: { sno: number; bookmarked: boolean }) => {
            if (bookmarked) {
                unBookmarkCollectionMutate(
                    { collectionSno: sno },
                    {
                        onSuccess: () => {
                            addToast({
                                message: t('북마크를 취소했습니다.'),
                                variant: 'success',
                            });
                        },
                    },
                );
            } else {
                bookmarkCollectionMutate(
                    { collectionSno: sno },
                    {
                        onSuccess: () => {
                            addToast({
                                message: t('북마크를 추가했습니다.'),
                                variant: 'success',
                            });
                        },
                    },
                );
            }
        },
    );

    return {
        toggleRecipeBookmark,
        toggleCollectionBookmark,
    };
};

export default useBookmark;
