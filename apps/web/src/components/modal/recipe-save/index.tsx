import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { ModalLayout } from '@/components/layout';
import * as styles from '@/components/modal/recipe-save/index.css';
import { vars } from '@/styles/theme.css';
import { useCollectionList } from '@/hooks/query/shop/collection';
import useRecipeMutation from '@/hooks/mutations/useRecipeMutation';
import { useToast } from '@/hooks/ui';
import { isAxiosError } from 'axios';

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
    const { bookmarkRecipe } = useRecipeMutation();
    const { addToast } = useToast();

    const { data = [] } = useCollectionList();

    const handleBookmark = async (collectionSno: number, title: string) => {
        if (!recipeSno) return;

        try {
            await bookmarkRecipe.mutateAsync({
                sno: recipeSno,
                data: { collectionSno },
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
        <ModalLayout
            isOpen={isOpen}
            close={close}
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
