import { ChefHat, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/recipe/grid-section/index.css';
import { RecipeRefreshButton } from '@/features/recipe/components/refresh-button';
import type { GetRecipeDetailResponse } from '@/models/shop/recipe';

interface ProcessingCardProps {
    recipe: Pick<GetRecipeDetailResponse, 'sno' | 'title'>;
    isDetailCard?: boolean;
}

export const ProcessingCard = ({
    recipe,
    isDetailCard,
}: ProcessingCardProps) => {
    const { t } = useTranslation();

    return isDetailCard ? (
        <motion.article
            className={styles.statusCard}
            aria-busy='true'
            aria-label={t('레시피 생성 중')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className={styles.processingDetailThumbnail}>
                <div className={styles.loadingIconArea}>
                    <ChefHat size={32} className={styles.spinner} />
                    <span className={styles.processingStatusText}>
                        {t('레시피 생성 중')}
                    </span>

                    <RecipeRefreshButton
                        className={styles.processingRefreshButton}
                    />
                </div>
            </div>
        </motion.article>
    ) : (
        <motion.article
            className={styles.statusCard}
            aria-busy='true'
            aria-label={t('레시피 생성 중')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className={styles.recipeImgArea}>
                <div className={styles.processingThumbnail}>
                    <div className={styles.loadingIconArea}>
                        <ChefHat size={32} className={styles.spinner} />
                        <span className={styles.processingStatusText}>
                            {t('생성 중')}
                        </span>
                        <RecipeRefreshButton
                            className={styles.processingRefreshButton}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.productInfo}>
                <h3 className={styles.productName}>
                    {recipe.title || t('새로운 레시피')}
                </h3>
                <p className={styles.processingSubText}>
                    <Loader2 size={12} className={styles.spinner} />
                    {t('레시피 정보를 가져오고 있어요')}
                </p>
            </div>
        </motion.article>
    );
};
