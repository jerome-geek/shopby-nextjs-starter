import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { ModalLayout } from '@/components/layout';
import * as styles from '@/components/modal/recipe-save/index.css';
import { MODAL_QUERY_KEY } from '@/const/modal';
import useRecipeMutation from '@/hooks/mutations/useRecipeMutation';
import { useCollectionList } from '@/hooks/query/shop/collection';
import { recipeKeys } from '@/hooks/queryKeys';
import { useToast } from '@/hooks/ui/useToast';
import { vars } from '@/styles/theme.css';
import { useProfile } from '@/hooks/query/member/profile';
import { includes } from '@fxts/core';

interface RecipeSaveModalProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
    recipeSno?: number;
    onAddCollection?: () => void;
}

export const RecipeSaveModal = ({
    isOpen,
    close,
    unmount,
    recipeSno,
    onAddCollection,
}: RecipeSaveModalProps) => {
    const { t } = useTranslation();
    const router = useRouter();
    const queryClient = useQueryClient();
    const { bookmarkRecipe } = useRecipeMutation();
    const { addToast } = useToast();

    const handleClose = () => {
        const newQuery = { ...router.query };
        delete newQuery[MODAL_QUERY_KEY];
        router.replace(
            { pathname: router.pathname, query: newQuery },
            undefined,
            { shallow: true },
        );
        close();
    };

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
                // queryKey: recipeKeys.detail(recipeSno, memberNo),
            });
            // queryClient.invalidateQueries({
            //     queryKey: recipeKeys.publicSearches(),
            // });

            addToast({
                variant: 'success',
                message: t("'{{title}}' 컬렉션에 저장되었습니다.", { title }),
            });
            handleClose();
        } catch (error) {
            const errorMessage = isAxiosError(error)
                ? error.response?.data?.message || error.message
                : t('저장 중 오류가 발생했습니다.');
            addToast({ message: errorMessage, variant: 'error' });
        }
    };

    return (
        <ModalLayout
            isOpen={isOpen}
            close={handleClose}
            unmount={unmount}
            title={t('레시피 저장')}
            size='small'
            width='540px'
        >
            <div className={styles.container}>
                <p className={styles.description}>
                    {t('레시피를 저장할 컬렉션을 선택하세요')}
                </p>

                <ul className={styles.collectionList}>
                    {data.map((collection) => {
                        return (
                            <li
                                key={collection.sno}
                                className={styles.collectionItem}
                            >
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
                                        handleBookmark(
                                            collection.sno,
                                            collection.title,
                                        )
                                    }
                                    disabled={bookmarkRecipe.isPending}
                                >
                                    <Plus
                                        size={24}
                                        color={vars.color.gray['40']}
                                    />
                                </button>
                            </li>
                        );
                    })}
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
        </ModalLayout>
    );
};
