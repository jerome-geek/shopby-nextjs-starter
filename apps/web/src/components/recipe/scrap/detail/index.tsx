import { Bookmark } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
    CollectionMoreMenu,
    CollectionRecipeCard,
} from '@/components/collection';
import { Grid2X2, Row2 } from '@/components/icons';
import { RecipeCard } from '@/components/recipe/card';
import { PATHS } from '@/const/paths';
import { useCollectionMutation } from '@/hooks/mutations';
import { useProfile } from '@/hooks/query/member/profile';
import { useSharedCollection } from '@/hooks/suspenseQuery/shop/recipe';
import { useCustomDialog } from '@/hooks/ui';
import { useDialog, useResponsive } from '@/hooks/utils';
import * as styles from '@/pages/recipes/scrap/index.css';
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

    if (!isRecipeListVisible) {
        return (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={{
                    padding: '100px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                    textAlign: 'center',
                }}
            >
                <div
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '20px',
                        backgroundColor: '#f2f5f1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#8da287',
                    }}
                >
                    <Bookmark size={32} />
                </div>
                <div>
                    <h3 className={styles.headingBold}>{t(title)}</h3>
                    <p
                        className={styles.body2Regular}
                        style={{
                            color: vars.color.gray['40'],
                            marginTop: '8px',
                        }}
                    >
                        {t('아직 스크랩된 아이템이 없습니다.')}
                        <br />
                        {t('마음에 드는 레시피를 담아보세요!')}
                    </p>
                </div>
                <button
                    className={styles.primaryButton}
                    style={{
                        width: 'auto',
                        padding: '14px 32px',
                        marginTop: '20px',
                    }}
                    type='button'
                >
                    {t('탐색하러 가기')}
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.detailContainer}
        >
            <div className={styles.detailHeader}>
                <div className={styles.detailTitleArea}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        <h2 className={styles.detailTitle}>
                            {t(sharedCollectionData?.title || title)}
                        </h2>
                        {isEditable && (
                            <CollectionMoreMenu
                                onEdit={handleEditCollection}
                                onDelete={handleDeleteCollection}
                            />
                        )}
                    </div>

                    <p className={styles.detailSubtitle}>
                        {sharedCollectionData?.description}
                    </p>

                    <p className={styles.detailMeta}>
                        By {sharedCollectionData?.memberName} ·{' '}
                        {recipeList.length}개
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
                            <CollectionRecipeCard recipe={recipe} />
                        )}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};
