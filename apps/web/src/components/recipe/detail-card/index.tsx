import { Bookmark, Edit2, MoreVertical, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { MouseEvent, useEffect, useRef, useState } from 'react';

import * as styles from '@/components/recipe/detail-card/index.css';
import { CalorieIcon, PeopleIcon, TimerIcon } from '@/components/icons';
import { PATHS } from '@/const/paths';
import { useBookmark } from '@/hooks/recipe';
import type { GetRecipeDetailResponse } from '@/models/shop/recipe';
import { vars } from '@/styles/theme.css';

interface RecipeDetailCardProps {
    recipe: GetRecipeDetailResponse;
}

export const RecipeDetailCard = ({ recipe }: RecipeDetailCardProps) => {
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
        <div className={styles.recipeLink}>
            <article className={styles.cardContent}>
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

                            {/* TODO: CollectionMoreMenu 컴포넌트 대체 */}
                            <div
                                style={{ position: 'relative' }}
                                ref={menuRef}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    className={styles.moreButton}
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
                                            className={styles.actionMenu}
                                        >
                                            <button
                                                className={styles.menuItem}
                                                type='button'
                                                onClick={() => {
                                                    /* 수정 로직 */
                                                    setIsMenuOpen(false);
                                                }}
                                            >
                                                <Edit2 size={14} /> 수정하기
                                            </button>
                                            <button
                                                className={styles.menuItem}
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
                            <span className={styles.recipeAuthor}>
                                {author}
                            </span>
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
                                recipe.bookmarked
                                    ? vars.color.green['100']
                                    : 'none'
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
                                                    color: vars.color.gray[
                                                        '50'
                                                    ],
                                                }}
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
        </div>
    );
};
