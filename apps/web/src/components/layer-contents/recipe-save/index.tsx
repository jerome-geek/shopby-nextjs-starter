import { includes } from '@fxts/core';
import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/layer-contents/recipe-save/index.css';
import useRecipeMutation from '@/hooks/mutations/useRecipeMutation';
import { useProfile } from '@/hooks/query/member/profile';
import { useCollectionList } from '@/hooks/query/shop/collection';
import { recipeKeys } from '@/hooks/queryKeys';
import { useToast } from '@/hooks/ui/useToast';
import { vars } from '@/styles/theme.css';

export const RecipeSaveContent = ({
    close,
    recipeSno,
    onAddCollection,
}: {
    close: () => void;
    recipeSno?: number;
    onAddCollection?: () => void;
}) => {
    console.log('🚀 ~ RecipeSaveContent ~ recipeSno:', recipeSno);

    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const { bookmarkRecipe } = useRecipeMutation();
    const { addToast } = useToast();

    const { data: profileData } = useProfile();
    const memberNo = profileData?.memberNo || 0;

    const { data = [] } = useCollectionList();

    const handleBookmark = async (collectionSno: number, title: string) => {
        if (!recipeSno) return;

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
                {data.map((collection) => (
                    <li key={collection.sno} className={styles.collectionItem}>
                        <div className={styles.collectionInfo}>
                            <span className={styles.collectionTitle}>
                                {collection.title}
                            </span>
                            <span className={styles.collectionCount}>
                                {collection.recipeCount}개
                            </span>
                        </div>

                        <button
                            type='button'
                            className={styles.addButton}
                            onClick={() =>
                                handleBookmark(collection.sno, collection.title)
                            }
                            disabled={bookmarkRecipe.isPending}
                        >
                            <Plus size={24} color={vars.color.gray['40']} />
                        </button>
                    </li>
                ))}
            </ul>

            <div className={styles.footer}>
                <button
                    type='button'
                    className={styles.createButton}
                    onClick={onAddCollection}
                >
                    <Plus size={20} />
                    {t('새 컬렉션 만들기')}
                </button>
            </div>
        </div>
    );
};
