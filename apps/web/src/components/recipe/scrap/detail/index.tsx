import { Bookmark } from 'lucide-react';
import { motion, Variants } from 'motion/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Grid2X2, Row2 } from '@/components/icons';
import { RecipeCard, RecipeDetailCard } from '@/components/recipe';
import * as styles from '@/components/recipe/scrap/detail/index.css';
import { VerticalMoreMenu } from '@/components/ui';
import { PATHS } from '@/const/paths';
import { useCollectionMutation } from '@/hooks/mutations';
import { useProfile } from '@/hooks/query/member/profile';
import { useSharedCollection } from '@/hooks/suspenseQuery/shop/recipe';
import { useCustomDialog } from '@/hooks/ui';
import { useDialog, useResponsive } from '@/hooks/utils';
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

    const { isMobile } = useResponsive();

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

                <div className={styles.viewToggleArea}>
                    <button
                        className={styles.viewToggle}
                        onClick={() =>
                            setViewMode((v) => (v === 'row' ? 'grid' : 'row'))
                        }
                        type='button'
                    >
                        <motion.div
                            className={styles.toggleActiveBg}
                            initial={false}
                            animate={{
                                x: viewMode === 'row' ? 0 : isMobile ? 26 : 38,
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 40,
                            }}
                        />
                        <div className={styles.toggleItem}>
                            <Row2
                                width={isMobile ? 16 : 24}
                                height={isMobile ? 16 : 24}
                                strokeColor={
                                    viewMode === 'row'
                                        ? vars.color.white
                                        : vars.color.gray['20']
                                }
                                strokeWidth={1}
                                fillColor={
                                    viewMode === 'row'
                                        ? vars.color.black
                                        : vars.color.gray['50']
                                }
                            />
                        </div>
                        <div className={styles.toggleItem}>
                            <Grid2X2
                                width={isMobile ? 16 : 24}
                                height={isMobile ? 16 : 24}
                                strokeColor={
                                    viewMode === 'grid'
                                        ? vars.color.white
                                        : vars.color.gray['20']
                                }
                                strokeWidth={1.5}
                                fillColor={
                                    viewMode === 'grid'
                                        ? vars.color.black
                                        : vars.color.gray['50']
                                }
                            />
                        </div>
                    </button>
                </div>
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
                        <Bookmark size={32} />
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        style={{ textAlign: 'center' }}
                    >
                        <h3
                            className={styles.headingBold}
                            style={{
                                fontSize: '20px',
                                letterSpacing: '-0.02em',
                            }}
                        >
                            {t('아직 담긴 레시피가 없어요')}
                        </h3>
                        <p
                            className={styles.body2Regular}
                            style={{
                                color: vars.color.gray['40'],
                                marginTop: '12px',
                                lineHeight: '1.6',
                            }}
                        >
                            {t('원하는 레시피를 찾아 스크랩하고')}
                            <br />
                            {t('나만의 맛있는 컬렉션을 완성해 보세요!')}
                        </p>
                    </motion.div>

                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={styles.primaryButton}
                        style={{
                            width: 'auto',
                            padding: '16px 40px',
                            marginTop: '12px',
                            borderRadius: '16px',
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
                        }}
                        type='button'
                        // TODO:어떤 페이지로 이동할지 체크 필요
                        onClick={() => router.push(PATHS.RECIPES.MAIN)}
                    >
                        {t('탐색하러 가기')}
                    </motion.button>
                </motion.div>
            )}
        </motion.div>
    );
};
