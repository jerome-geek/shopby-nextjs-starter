import { Bookmark } from 'lucide-react';
import Link from 'next/link';
import { MouseEvent } from 'react';

import * as styles from '@/components/collection/collection-recipe-card/index.css';
import { PATHS } from '@/const/paths';
import { useRecipeBookmark } from '@/hooks/recipe';
import type { GetRecipeDetailResponse } from '@/models/shop/recipe';
import { vars } from '@/styles/theme.css';

import { CalorieIcon, PeopleIcon, TimerIcon } from '@/components/icons';

export const CollectionRecipeCard = ({
    recipe,
}: {
    recipe: GetRecipeDetailResponse;
}) => {
    const href = PATHS.RECIPES.DETAIL.replace('[recipeNo]', String(recipe.sno));

    const cookingMinutes = recipe.durationSeconds
        ? Math.floor(recipe.durationSeconds / 60)
        : 0;

    const author = recipe.authorName ?? recipe.memberName ?? '';

    const ingredients = recipe.ingredients ?? [];
    const steps = recipe.steps ?? [];

    const { toggleRecipeBookmark } = useRecipeBookmark();

    const handleBookmarkClick = async (e: MouseEvent) => {
        e.stopPropagation();

        toggleRecipeBookmark({
            sno: recipe.sno,
            bookmarked: recipe.bookmarked,
        });
    };

    return (
        <div className={styles.RecipeLink}>
            <article className={styles.CardContent}>
                <div className={styles.CardHeader}>
                    <div className={styles.CardTitleArea}>
                        <Link href={href} prefetch={false}>
                            <h4 className={styles.RecipeTitle}>
                                {recipe.title}
                            </h4>
                        </Link>
                        {author && (
                            <span className={styles.RecipeAuthor}>
                                {author}
                            </span>
                        )}
                    </div>

                    <button
                        className={styles.BookmarkIcon}
                        onClick={handleBookmarkClick}
                        type='button'
                        aria-label={
                            recipe.bookmarked ? '북마크 해제' : '북마크 추가'
                        }
                        aria-pressed={recipe.bookmarked}
                    >
                        <Bookmark
                            size={20}
                            className={styles.BookmarkIcon}
                            fill={
                                recipe.bookmarked
                                    ? vars.color.green['100']
                                    : 'none'
                            }
                        />
                    </button>
                </div>

                <div className={styles.RecipeMeta}>
                    <span className={styles.IconTimerText}>
                        <TimerIcon currentColor={vars.color.gray['80']} />
                        {cookingMinutes > 0 ? `${cookingMinutes}분` : '-'}
                    </span>
                    <span className={styles.IconText}>
                        <PeopleIcon currentColor={vars.color.gray['60']} />
                        {recipe.servings ? `${recipe.servings}인분` : '-'}
                    </span>

                    <span className={styles.IconText}>
                        <CalorieIcon currentColor={vars.color.gray['60']} />
                        {!!recipe.caloriesPerServingKcal
                            ? `${recipe.caloriesPerServingKcal} kcal`
                            : '-'}
                    </span>
                </div>

                <div className={styles.IngredientContent}>
                    <Link href={href} prefetch={false}>
                        <div className={styles.RecipeThumbArea}>
                            <img
                                src={recipe.thumbnailUrl ?? ''}
                                className={styles.RecipeThumb}
                                alt={recipe.title}
                            />
                        </div>
                    </Link>

                    <div className={styles.IngredientContainer}>
                        <div className={styles.IngredientHeader}>
                            <h5 className={styles.IngredientTitle}>
                                요리 재료 List
                            </h5>
                            <div className={styles.InfoDot}>i</div>
                        </div>

                        <ul className={styles.IngredientList}>
                            {ingredients.slice(0, 6).map((ing, i) => (
                                <li
                                    key={`${recipe.sno}-ing-${i}`}
                                    className={styles.IngredientListItem}
                                >
                                    <span className={styles.IngredientName}>
                                        {ing.name}
                                    </span>
                                    {!!ing.amount && (
                                        <>
                                            <span
                                                style={{
                                                    color: vars.color.gray[
                                                        '50'
                                                    ],
                                                }}
                                            >
                                                -
                                            </span>
                                            <span
                                                className={
                                                    styles.IngredientAmount
                                                }
                                            >
                                                {ing.amount}
                                            </span>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {ingredients.length > 6 ? (
                            <p className={styles.MoreText}>
                                {`외 ${ingredients.length - 6}개...`}
                            </p>
                        ) : null}
                    </div>
                </div>

                <div className={styles.StepSection}>
                    <h5 className={styles.StepTitle}>따라봐 How to Cook</h5>
                    <ul className={styles.StepList}>
                        {steps.map((step, i) => (
                            <li
                                key={`${recipe.sno}-step-${i}`}
                                className={styles.StepItem}
                            >
                                <div className={styles.StepNumber}>
                                    <span>{i + 1}</span>
                                </div>
                                <p className={styles.StepText}>
                                    {step.description}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </article>
        </div>
    );
};
