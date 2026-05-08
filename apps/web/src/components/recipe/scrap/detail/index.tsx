import { motion, Variants } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { BookmarkIcon } from '@/components/icons';
import { RecipeCard, RecipeDetailCard } from '@/components/recipe';
import * as styles from '@/components/recipe/scrap/detail/index.css';
import { ViewToggle } from '@/components/recipe/view-toggle';
import { VerticalMoreMenu } from '@/components/ui';
import { PATHS } from '@/const/paths';
import { useCollectionMutation } from '@/hooks/mutations';
import { useProfile } from '@/hooks/query/member/profile';
import { useSharedCollection } from '@/hooks/suspenseQuery/shop/recipe';
import { useCustomDialog } from '@/hooks/ui';
import { useDialog } from '@/hooks/utils';
import { searchSerializer } from '@/shared/utils/search-params';
import { vars } from '@/styles/theme.css';

interface RecipeScrapDetailProps {
    shareCode: string;
    title: string;
}

/**
 * 스크랩 상세 레이아웃 (개별 카테고리 탭용)
 */
export const RecipeScrapDetail = ({
    shareCode,
    title,
}: RecipeScrapDetailProps) => {
    const { t } = useTranslation();

    const [viewMode, setViewMode] = useState<'grid' | 'row'>('row');

    const router = useRouter();
    const { openCollectionForm } = useCustomDialog();
    const { openAsyncDialog } = useDialog();

    const { data: profileData } = useProfile();
    const { data: sharedCollectionData } = useSharedCollection({
        shareCode,
        memberNo: profileData?.memberNo,
    });

    const {
        remove: { mutateAsync: removeCollectionMutateAsync },
    } = useCollectionMutation();

    const recipeList = sharedCollectionData?.recipes || [];
    const isEditable =
        !!profileData &&
        sharedCollectionData?.memberNo === profileData?.memberNo;
    const isRecipeListVisible = recipeList.length !== 0;

    const handleEditCollection = () => {
        if (!sharedCollectionData) return;
        openCollectionForm({ shareCode: sharedCollectionData.shareCode });
    };

    const handleDeleteCollection = async () => {
        if (!sharedCollectionData) return;

        const isAgree = await openAsyncDialog({
            message: t('정말로 이 컬렉션을 삭제하시겠습니까?'),
            type: 'confirm',
            confirmText: t('삭제'),
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (isAgree) {
            await removeCollectionMutateAsync({
                collectionSno: sharedCollectionData.sno,
            });
            router.replace(PATHS.RECIPES.SCRAP);
        }
    };

    const containerVariants: Variants = {
        initial: { opacity: 0, y: 10 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    const itemVariants: Variants = {
        initial: { opacity: 0, y: 15 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.detailContainer}
        >
            <div className={styles.detailHeader}>
                <div className={styles.detailTitleArea}>
                    <div className={styles.detailTitleContainer}>
                        <h2 className={styles.detailTitle}>
                            {t(sharedCollectionData?.title || title)}
                        </h2>
                        {isEditable && (
                            <VerticalMoreMenu
                                id={`recipe-detail-more-menu-${sharedCollectionData?.sno}`}
                                onEdit={handleEditCollection}
                                onDelete={handleDeleteCollection}
                            />
                        )}
                    </div>

                    <p className={styles.detailSubtitle}>
                        {sharedCollectionData?.description}
                    </p>

                    <p className={styles.detailMeta}>
                        {`By ${sharedCollectionData?.memberName} · ${recipeList.length}개`}
                    </p>
                </div>

                <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
            </div>

            {isRecipeListVisible ? (
                <ul
                    className={
                        viewMode === 'grid'
                            ? styles.recipeGrid
                            : styles.recipeDetailGrid
                    }
                >
                    {recipeList.map((recipe) => (
                        <li key={recipe.sno}>
                            {viewMode === 'grid' ? (
                                <RecipeCard recipe={recipe} />
                            ) : (
                                <RecipeDetailCard recipe={recipe} />
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial='initial'
                    animate='animate'
                    className={styles.emptyContainer}
                >
                    <motion.div
                        variants={itemVariants}
                        className={styles.emptyIconWrapper}
                    >
                        <BookmarkIcon
                            variant='filled'
                            fill={vars.color.green['80']}
                            strokeColor={vars.color.green['80']}
                            width={32}
                        />
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className={styles.emptyTextContainer}
                    >
                        <h3 className={styles.emptyTitle}>
                            {t('아직 담긴 레시피가 없어요')}
                        </h3>
                        <p className={styles.emptyDescription}>
                            {t('원하는 레시피를 찾아 스크랩하고')}
                            <br />
                            {t('나만의 맛있는 컬렉션을 완성해 보세요!')}
                        </p>
                    </motion.div>

                    <Link
                        href={`${PATHS.SEARCH}${searchSerializer({ keyword: '레시피', tab: 'recipe' })}`}
                        prefetch={false}
                        className={styles.primaryButton}
                    >
                        {t('탐색하러 가기')}
                    </Link>
                </motion.div>
            )}
        </motion.div>
    );
};
