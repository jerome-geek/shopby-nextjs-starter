import { includes } from '@fxts/core';
import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { Plus } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/layer-contents/recipe-save/index.css';
import useRecipeMutation from '@/hooks/mutations/useRecipeMutation';
import { useProfile } from '@/hooks/query/member/profile';
import { useCollectionList } from '@/hooks/query/shop/collection';
import { recipeKeys } from '@/hooks/queryKeys';
import { useToast } from '@/hooks/ui/useToast';
import { useResponsive } from '@/hooks/utils';
import { vars } from '@/styles/theme.css';

interface RecipeSaveContentProps {
    close: () => void;
    recipeSno?: number;
    onAddCollection?: () => void;
}

export const RecipeSaveContent = ({
    close,
    recipeSno,
    onAddCollection,
}: RecipeSaveContentProps) => {
    const { t } = useTranslation();

    const { isMobile } = useResponsive();

    const { addToast } = useToast();

    const queryClient = useQueryClient();
    const { bookmarkRecipe } = useRecipeMutation();

    const { data: profileData } = useProfile();
    const memberNo = profileData?.memberNo || 0;

    const { data = [] } = useCollectionList();

    const collectionList = useMemo(() => {
        return data.filter((a) => a.memberNo === memberNo);
    }, [data, memberNo]);

    const handleBookmark = async (collectionSno: number, title: string) => {
        if (!recipeSno) {
            return;
        }

        try {
            await bookmarkRecipe.mutateAsync({
                sno: recipeSno,
                data: { collectionSno },
            });

            queryClient.invalidateQueries({
                predicate: (query) => {
                    return includes(query.queryKey[0], [
                        ...recipeKeys.detail(recipeSno, memberNo),
                        ...recipeKeys.publicSearches(),
                    ]);
                },
            });

            addToast({
                variant: 'success',
                message: t("'{{title}}' 컬렉션에 저장되었습니다.", { title }),
            });

            close();
        } catch (error) {
            const errorMessage = isAxiosError(error)
                ? error.response?.data?.message || error.message
                : t('저장 중 오류가 발생했습니다.');
            addToast({ message: errorMessage, variant: 'error' });
        }
    };

    return (
        <div className={styles.container}>
            <p className={styles.description}>
                {t('레시피를 저장할 컬렉션을 선택하세요')}
            </p>

            <ul className={styles.collectionList}>
                {collectionList.map((collection) => {
                    return (
                        <li key={collection.sno}>
                            <button
                                type='button'
                                className={styles.collectionItem}
                                onClick={() =>
                                    handleBookmark(
                                        collection.sno,
                                        collection.title,
                                    )
                                }
                                disabled={bookmarkRecipe.isPending}
                            >
                                <div className={styles.collectionInfo}>
                                    <span className={styles.collectionTitle}>
                                        {collection.title}
                                    </span>
                                    <span className={styles.collectionCount}>
                                        {collection.recipeCount}개
                                    </span>
                                </div>

                                <div className={styles.addButton}>
                                    <Plus
                                        size={24}
                                        color={vars.color.gray['40']}
                                    />
                                </div>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
