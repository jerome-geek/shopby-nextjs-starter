import Link from 'next/link';
import type { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { ThumbnailBookmarkIcon } from '@/components/icons/ThumbnailBookmarkIcon';
import { TimerIcon } from '@/components/icons/TimerIcon';
import { UsersIcon } from '@/components/icons/UsersIcon';
import * as styles from '@/components/recipe/card/index.css';
import { FailedCard } from '@/components/recipe/grid-section/failed-card';
import { ProcessingCard } from '@/components/recipe/grid-section/processing-card';
import { PATHS } from '@/const/paths';
import { useBookmark } from '@/hooks/recipe';
import type { GetRecipeDetailResponse } from '@/models/shop/recipe';

interface RecipeCardProps {
    recipe: GetRecipeDetailResponse;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
    const { t } = useTranslation();

    const { toggleRecipeBookmark } = useBookmark();

    const handleBookmarkClick = async (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        console.log(1);

        toggleRecipeBookmark({
            sno: recipe.sno,
            bookmarked: recipe.bookmarked,
        });
    };

    const cookingTime = recipe.durationSeconds
        ? Math.floor(recipe.durationSeconds / 60)
        : 0;

    if (recipe.recipeStatus === 'PROCESSING') {
        return <ProcessingCard recipe={recipe} />;
    }

    if (recipe.recipeStatus === 'FAILED') {
        return <FailedCard recipe={recipe} />;
    }

    return (
        <Link
            href={PATHS.RECIPES.DETAIL.replace('[sno]', recipe.sno.toString())}
            className={styles.recipeCard}
        >
            <div className={styles.recipeThumbWrapper}>
                <img
                    src={recipe.thumbnailUrl ?? ''}
                    alt={recipe.title}
                    className={styles.recipeThumb}
                />
                <button
                    className={styles.recipeBookmarkButton}
                    onClick={handleBookmarkClick}
                    type='button'
                    aria-label={
                        recipe.bookmarked ? t('북마크 해제') : t('북마크 추가')
                    }
                    aria-pressed={recipe.bookmarked}
                >
                    <ThumbnailBookmarkIcon
                        isActive={recipe.bookmarked}
                        width={32}
                        height={32}
                    />
                </button>
            </div>

            <div className={styles.recipeInfo}>
                <div className={styles.recipeHeader}>
                    <h3 className={styles.recipeTitle}>{recipe.title}</h3>
                    <p className={styles.recipeAuthor}>
                        {recipe.authorName ?? recipe.memberName ?? t('익명')}
                    </p>
                </div>
                <ul className={styles.recipeMeta}>
                    {cookingTime > 0 && (
                        <li className={styles.recipeTimerMetaItem}>
                            <TimerIcon aria-hidden='true' />
                            {t('{{count}}분', { count: cookingTime })}
                        </li>
                    )}
                    {(recipe.servings ?? 0) > 0 && (
                        <li className={styles.recipeServingsMetaItem}>
                            <UsersIcon aria-hidden='true' />
                            {t('{{count}}인분', { count: recipe.servings })}
                        </li>
                    )}
                </ul>
            </div>
        </Link>
    );
};
