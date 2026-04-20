import { Bookmark } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { VerticalMoreMenu } from '@/components/ui';
import { CalorieIcon, PeopleIcon, TimerIcon } from '@/components/icons';
import * as styles from '@/components/recipe/detail-card/index.css';
import { PATHS } from '@/const/paths';
import { useBookmark } from '@/hooks/recipe';
import { useDialog } from '@/hooks/utils';
import type { GetRecipeDetailResponse } from '@/models/shop/recipe';
import { vars } from '@/styles/theme.css';

interface RecipeDetailCardProps {
    recipe: GetRecipeDetailResponse;
}

export const RecipeDetailCard = ({ recipe }: RecipeDetailCardProps) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { openAsyncDialog } = useDialog();

    const { toggleRecipeBookmark: toggleBookmark } = useBookmark();

    const isExcludedPath = ['/', '/shop', '/kids', '/life'].includes(
        router.pathname,
    );

    const href = PATHS.RECIPES.DETAIL.replace('[recipeNo]', String(recipe.sno));

    const cookingMinutes = recipe.durationSeconds
        ? Math.floor(recipe.durationSeconds / 60)
        : 0;

    const author = recipe.authorName ?? recipe.memberName ?? '';

    const ingredients = recipe.ingredients ?? [];
    const steps = recipe.steps ?? [];

    const handleEdit = () => {
        router.push(`${PATHS.RECIPES.WRITE}?recipeNo=${recipe.sno}`);
    };

    const handleDelete = async () => {
        const isConfirmed = await openAsyncDialog({
            type: 'confirm',
            message: t('레시피를 삭제하시겠습니까?'),
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (isConfirmed) {
            toggleBookmark({
                sno: recipe.sno,
                bookmarked: true,
            });
        }
    };

    const handleBookmarkClick = async (e: MouseEvent) => {
        e.stopPropagation();

        toggleBookmark({
            sno: recipe.sno,
            bookmarked: recipe.bookmarked,
        });
    };

    return (
        <article className={styles.recipeLink}>
            <div className={styles.cardHeader}>
                <div className={styles.cardTitleArea}>
                    <div className={styles.titleRow}>
                        <Link
                            href={href}
                            prefetch={false}
                            style={{ flex: 1, minWidth: 0 }}
                        >
                            <h4 className={styles.recipeTitle}>
                                {recipe.title}
                            </h4>
                        </Link>
                        {!isExcludedPath && (
                            <VerticalMoreMenu
                                id={String(recipe.sno)}
                                onEdit={handleEdit}
                                onEditText={t('레시피 수정')}
                                onDelete={handleDelete}
                                onDeleteText={t('레시피 삭제')}
                            />
                        )}
                    </div>
                    {author && (
                        <span className={styles.recipeAuthor}>{author}</span>
                    )}
                </div>

                <button
                    className={styles.bookmarkIcon}
                    onClick={handleBookmarkClick}
                    type='button'
                    aria-label={
                        recipe.bookmarked ? '북마크 해제' : '북마크 추가'
                    }
                    aria-pressed={recipe.bookmarked}
                >
                    <Bookmark
                        size={20}
                        className={styles.bookmarkIcon}
                        fill={
                            recipe.bookmarked ? vars.color.green['100'] : 'none'
                        }
                    />
                </button>
            </div>

            <div className={styles.recipeMeta}>
                <span className={styles.iconTimerText}>
                    <TimerIcon currentColor={vars.color.gray['80']} />
                    {cookingMinutes > 0 ? `${cookingMinutes}분` : '-'}
                </span>
                <span className={styles.iconText}>
                    <PeopleIcon currentColor={vars.color.gray['60']} />
                    {recipe.servings ? `${recipe.servings}인분` : '-'}
                </span>

                <span className={styles.iconText}>
                    <CalorieIcon currentColor={vars.color.gray['60']} />
                    {!!recipe.caloriesPerServingKcal
                        ? `${recipe.caloriesPerServingKcal} kcal`
                        : '-'}
                </span>
            </div>

            <div className={styles.ingredientContent}>
                <Link href={href} prefetch={false}>
                    <div className={styles.recipeThumbArea}>
                        <img
                            src={recipe.thumbnailUrl ?? ''}
                            className={styles.recipeThumb}
                            alt={recipe.title}
                        />
                    </div>
                </Link>

                <div className={styles.ingredientContainer}>
                    <div className={styles.ingredientHeader}>
                        <h5 className={styles.ingredientTitle}>
                            요리 재료 List
                        </h5>
                        <div className={styles.infoDot}>i</div>
                    </div>

                    <ul className={styles.ingredientList}>
                        {ingredients.slice(0, 6).map((ing, i) => (
                            <li
                                key={`${recipe.sno}-ing-${i}`}
                                className={styles.ingredientListItem}
                            >
                                <span className={styles.ingredientName}>
                                    {ing.name}
                                </span>
                                {!!ing.amount && (
                                    <>
                                        <span
                                            style={{
                                                color: vars.color.gray['50'],
                                            }}
                                        >
                                            -
                                        </span>
                                        <span
                                            className={styles.ingredientAmount}
                                        >
                                            {ing.amount}
                                        </span>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>

                    {ingredients.length > 6 ? (
                        <p className={styles.moreText}>
                            {`외 ${ingredients.length - 6}개...`}
                        </p>
                    ) : null}
                </div>
            </div>

            <div className={styles.stepSection}>
                <h5 className={styles.stepTitle}>따라해봐 How to Cook</h5>
                <ul className={styles.stepList}>
                    {steps.map((step, i) => (
                        <li
                            key={`${recipe.sno}-step-${i}`}
                            className={styles.stepItem}
                        >
                            <div className={styles.stepNumber}>
                                <span>{i + 1}</span>
                            </div>
                            <p className={styles.stepText}>
                                {step.description}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
};
