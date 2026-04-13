import { Bookmark, Clock, Users } from 'lucide-react';
import Link from 'next/link';

import * as styles from '@/components/recipe/recipe-card/index.css';
import { Column, Row } from '@/components/ui/layout/flex';
import { PATHS } from '@/const/paths';
import type { GetRecipeDetailResponse } from '@/models/shop/recipe';
import { vars } from '@/styles/theme.css';

const formatRecipeDurationSeconds = (durationSeconds: number): string => {
    const s = Math.max(0, Math.floor(durationSeconds));

    if (s < 60) {
        return `${s}초`;
    }
    if (s < 3600) {
        return `${Math.floor(s / 60)}분`;
    }

    return `${Math.floor(s / 3600)}시간`;
};

export interface RecipeCardProps {
    recipe: GetRecipeDetailResponse;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
    const detailHref = PATHS.RECIPES.DETAIL.replace(
        '[recipeNo]',
        String(recipe.sno),
    );

    return (
        <Link href={detailHref} className={styles.cardLink}>
            <div className={styles.recipeImageContainer}>
                <img
                    src={recipe.thumbnailUrl ?? ''}
                    alt={recipe.title}
                    className={styles.recipeImage}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '9px',
                    }}
                >
                    <Bookmark
                        size={20}
                        fill={recipe.bookmarked ? 'white' : 'none'}
                        color='white'
                    />
                </div>
            </div>
            <Column gap='8px'>
                <Column style={{ gap: '1px' }}>
                    <h3 className={styles.title}>{recipe.title}</h3>
                    <p className={styles.authorName}>{recipe.authorName}</p>
                </Column>
                <Row gap='10px' align='center'>
                    <span className={styles.timeText}>
                        <Clock size={16} color={vars.color.gray['80']} />{' '}
                        {formatRecipeDurationSeconds(
                            recipe.durationSeconds ?? 0,
                        )}
                    </span>
                    <span className={styles.amountText}>
                        <Users size={16} color={vars.color.gray['60']} />{' '}
                        {recipe.servings ?? 0}인분
                    </span>
                </Row>
            </Column>
        </Link>
    );
};
