import { AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import * as styles from '@/features/recipe/components/view/grid-section/index.css';
import type { GetRecipeDetailResponse } from '@/models/shop/recipe';
import { vars } from '@/styles/theme.css';

interface FailedCardProps {
    recipe: Pick<GetRecipeDetailResponse, 'sno' | 'title' | 'failureReason'>;
}

export const FailedCard = ({ recipe }: FailedCardProps) => {
    const { t } = useTranslation();

    return (
        <motion.article
            className={styles.statusCard}
            aria-label={t('레시피 분석 실패')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className={styles.recipeImgArea}>
                <div className={styles.failedThumbnail}>
                    <div className={styles.loadingIconArea}>
                        <AlertCircle
                            size={32}
                            color={vars.color.pink['80']}
                            strokeWidth={1.5}
                        />
                        <span className={styles.failedStatusText}>
                            {t('분석 실패')}
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.productInfo}>
                <h3 className={styles.productName}>
                    {recipe.title || t('분석을 완료하지 못했어요')}
                </h3>
                {recipe.failureReason ? (
                    <p className={styles.failedReasonText}>
                        {recipe.failureReason}
                    </p>
                ) : (
                    <p className={styles.brandName}>
                        {t('다시 시도하거나 URL을 확인해주세요.')}
                    </p>
                )}
            </div>
        </motion.article>
    );
};
