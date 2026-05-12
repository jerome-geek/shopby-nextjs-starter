import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import {
    BookmarkIcon,
    CalorieIcon,
    PeopleIcon,
    TimerIcon,
} from '@/components/icons';
import * as styles from '@/components/recipe/detail-card/index.css';
import { VerticalMoreMenu } from '@/components/ui';
import { PATHS } from '@/const/paths';
import useBookmark from '@/features/recipe/hooks/useBookmark';
import { useRecipeMutation } from '@/hooks/mutations';
import { useProfile } from '@/hooks/query/member/profile';
import { useToast } from '@/hooks/ui';
import { useDialog } from '@/hooks/utils';
import type { GetRecipeDetailResponse } from '@/models/shop/recipe';
import { vars } from '@/styles/theme.css';

interface RecipeDetailCardProps {
    recipe: GetRecipeDetailResponse;
    collectionLink?: string;
}

export const RecipeDetailCard = ({
    recipe,
    collectionLink,
}: RecipeDetailCardProps) => {
    const router = useRouter();

    const { t } = useTranslation();

    const { openAsyncDialog } = useDialog();

    const { addToast } = useToast();

    const { toggleRecipeBookmark } = useBookmark();

    const isExcludedPath = [
        PATHS.MAIN,
        PATHS.SHOP.DISCOVERY,
        PATHS.SHOP.KIDS,
        PATHS.SHOP.LIFE,
    ].includes(router.pathname);

    const { data: profileData } = useProfile();
    const memberNo = profileData?.memberNo || 0;

    const href = PATHS.RECIPES.DETAIL.replace('[sno]', String(recipe.sno));

    const cookingMinutes = recipe.durationSeconds
        ? Math.floor(recipe.durationSeconds / 60)
        : 0;

    const author = recipe.authorName ?? recipe.memberName ?? '';
    const ingredients = recipe.ingredients ?? [];
    const steps = recipe.steps ?? [];

    const stepSectionInner = (
        <>
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
                        <p className={styles.stepText}>{step.description}</p>
                    </li>
                ))}
            </ul>
        </>
    );

    const handleEdit = () => {
        router.push(`${PATHS.RECIPES.WRITE}?recipeNo=${recipe.sno}`);
    };

    const {
        deleteRecipe: { mutate: deleteRecipeMutate },
    } = useRecipeMutation();

    const handleDelete = async () => {
        const isConfirmed = await openAsyncDialog({
            type: 'confirm',
            message: t('레시피를 삭제하시겠습니까?'),
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (isConfirmed) {
            deleteRecipeMutate(
                {
                    sno: recipe.sno,
                },
                {
                    onSuccess: () => {
                        addToast({
                            variant: 'success',
                            message: '레시피가 삭제되었습니다.',
                        });
                    },
                },
            );
        }
    };

    const handleBookmarkClick = async (e: MouseEvent) => {
        e.stopPropagation();

        toggleRecipeBookmark({
            sno: recipe.sno,
            bookmarked: recipe.bookmarked,
        });
    };

    return (
        <article className={styles.recipeLink}>
            <div className={styles.cardBody}>
                <div className={styles.headerSection}>
                    <div className={styles.cardHeader}>
                        <div className={styles.cardTitleArea}>
                            <div className={styles.titleRow}>
                                <Link
                                    href={href}
                                    prefetch={false}
                                    className={styles.titleLink}
                                >
                                    <h4 className={styles.recipeTitle}>
                                        {recipe.title}
                                    </h4>
                                </Link>
                            </div>
                            {author && (
                                <span className={styles.recipeAuthor}>
                                    {author}
                                </span>
                            )}
                        </div>

                        <div className={styles.buttonContainer}>
                            <button
                                className={styles.bookmarkIcon}
                                onClick={handleBookmarkClick}
                                type='button'
                                aria-label={
                                    recipe.bookmarked
                                        ? '북마크 해제'
                                        : '북마크 추가'
                                }
                                aria-pressed={recipe.bookmarked}
                            >
                                <BookmarkIcon
                                    variant={
                                        recipe.bookmarked ? 'filled' : 'outline'
                                    }
                                    strokeColor={
                                        recipe.bookmarked
                                            ? vars.color.green['100']
                                            : vars.color.black
                                    }
                                    width={13}
                                    height={18}
                                />
                            </button>
                            {!isExcludedPath &&
                                memberNo === recipe.memberNo && (
                                    <VerticalMoreMenu
                                        id={String(recipe.sno)}
                                        onEdit={handleEdit}
                                        onEditText={t('레시피 수정')}
                                        onDelete={handleDelete}
                                        onDeleteText={t('레시피 삭제')}
                                    />
                                )}
                        </div>
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
                        </div>

                        <ul className={styles.ingredientList}>
                            {ingredients.slice(0, 6).map((ing, i) => (
                                <li
                                    key={`${recipe.sno}-ing-${i}`}
                                    className={styles.ingredientListItem}
                                >
                                    <Link
                                        href={ing.coupangProduct?.url ?? ''}
                                        target='_blank'
                                        prefetch={false}
                                    >
                                        <span className={styles.ingredientName}>
                                            {ing.name}
                                        </span>
                                    </Link>

                                    {!!ing.amount && (
                                        <>
                                            <span
                                                className={
                                                    styles.ingredientSeparator
                                                }
                                            >
                                                -
                                            </span>
                                            <span
                                                className={
                                                    styles.ingredientAmount
                                                }
                                            >
                                                {ing.amount}
                                            </span>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <hr className={styles.divider} />

            {collectionLink ? (
                <Link
                    href={collectionLink}
                    prefetch={false}
                    className={styles.stepSection}
                >
                    {stepSectionInner}
                </Link>
            ) : (
                <div className={styles.stepSection}>{stepSectionInner}</div>
            )}
        </article>
    );
};
