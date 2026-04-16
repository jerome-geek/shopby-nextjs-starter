import { Bookmark, Edit2, MoreVertical, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { MouseEvent, useEffect, useRef, useState } from 'react';

import * as styles from '@/components/collection/collection-recipe-card/index.css';
import { CalorieIcon, PeopleIcon, TimerIcon } from '@/components/icons';
import { PATHS } from '@/const/paths';
import { useBookmark } from '@/hooks/recipe';
import type { GetRecipeDetailResponse } from '@/models/shop/recipe';
import { vars } from '@/styles/theme.css';

interface CollectionRecipeCardProps {
    recipe: GetRecipeDetailResponse;
}

export const CollectionRecipeCard = ({ recipe }: CollectionRecipeCardProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const href = PATHS.RECIPES.DETAIL.replace('[recipeNo]', String(recipe.sno));

    const cookingMinutes = recipe.durationSeconds
        ? Math.floor(recipe.durationSeconds / 60)
        : 0;

    const author = recipe.authorName ?? recipe.memberName ?? '';

    const ingredients = recipe.ingredients ?? [];
    const steps = recipe.steps ?? [];

    const { toggleRecipeBookmark } = useBookmark();

    useEffect(() => {
        const handleClickOutside = (event: globalThis.MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    const handleBookmarkClick = async (e: MouseEvent) => {
        e.stopPropagation();

        toggleRecipeBookmark({
            sno: recipe.sno,
            bookmarked: recipe.bookmarked,
        });
    };

    const toggleMenu = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={styles.RecipeLink}>
            <article className={styles.CardContent}>
                <div className={styles.CardHeader}>
                    <div className={styles.CardTitleArea}>
                        <div className={styles.TitleRow}>
                            <Link
                                href={href}
                                prefetch={false}
                                style={{ flex: 1, minWidth: 0 }}
                            >
                                <h4 className={styles.RecipeTitle}>
                                    {recipe.title}
                                </h4>
                            </Link>

                            {/* TODO: CollectionMoreMenu 컴포넌트 대체 */}
                            <div
                                style={{ position: 'relative' }}
                                ref={menuRef}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    className={styles.MoreButton}
                                    onClick={toggleMenu}
                                    type='button'
                                    aria-label='더보기'
                                >
                                    <MoreVertical size={16} />
                                </button>

                                {/* TODO: 레시피 수정 페이지 이동 및 삭제 모달 띄우기 */}
                                <AnimatePresence>
                                    {isMenuOpen && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                scale: 0.95,
                                                y: -10,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                y: 0,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.95,
                                                y: -10,
                                            }}
                                            transition={{
                                                type: 'spring',
                                                damping: 20,
                                                stiffness: 300,
                                            }}
                                            className={styles.ActionMenu}
                                        >
                                            <button
                                                className={styles.MenuItem}
                                                type='button'
                                                onClick={() => {
                                                    /* 수정 로직 */
                                                    setIsMenuOpen(false);
                                                }}
                                            >
                                                <Edit2 size={14} /> 수정하기
                                            </button>
                                            <button
                                                className={styles.MenuItem}
                                                data-variant='danger'
                                                type='button'
                                                onClick={() => {
                                                    /* 삭제 로직 */
                                                    setIsMenuOpen(false);
                                                }}
                                            >
                                                <Trash2 size={14} /> 삭제하기
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
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
                    <h5 className={styles.StepTitle}>따라해봐 How to Cook</h5>
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
