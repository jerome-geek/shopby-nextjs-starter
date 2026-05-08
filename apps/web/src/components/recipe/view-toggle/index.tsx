import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { Grid2X2, Row2 } from '@/components/icons';
import { useResponsive } from '@/hooks/utils';
import { vars } from '@/styles/theme.css';
import * as styles from '@/components/recipe/view-toggle/index.css';

interface ViewToggleProps {
    viewMode: 'grid' | 'row';
    onToggle: (mode: 'grid' | 'row') => void;
}

/**
 * 공통 뷰 토글 컴포넌트
 */
export const ViewToggle = ({ viewMode, onToggle }: ViewToggleProps) => {
    const { t } = useTranslation();
    const { isMobile } = useResponsive();

    return (
        <div className={styles.viewToggleArea}>
            <button
                className={styles.viewToggle}
                onClick={() => onToggle(viewMode === 'row' ? 'grid' : 'row')}
                type='button'
                aria-label={t('보기 방식 변경')}
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
    );
};
