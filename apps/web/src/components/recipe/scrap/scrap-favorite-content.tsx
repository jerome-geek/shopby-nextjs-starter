import { Bookmark, Clock, LayoutGrid, List, Plus, Users } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSearchMyRecipeList } from '@/hooks/suspenseQuery/shop/recipe';
import { vars } from '@/styles/theme.css';

import * as styles from '@/pages/recipes/scrap/index.css';

// TODO: 페이징 처리
export const ScrapFavoriteContent = () => {
    const { t } = useTranslation();
    const [viewMode, setViewMode] = useState<'grid' | 'details'>('details');

    // 데이터 연동 (좋아요 한 레시피)
    const { data: searchMyRecipeListData, isLoading } = useSearchMyRecipeList({
        searchParams: { order: 'DESC', page: 1, take: 10 },
    });
    console.log(
        '🚀 ~ ScrapFavoriteContent ~ searchMyRecipeListData:',
        searchMyRecipeListData,
    );

    const recipeList = searchMyRecipeListData?.data || [];

    if (isLoading) return null;

    if (recipeList.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={{
                    padding: '100px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                    textAlign: 'center',
                }}
            >
                <div
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '20px',
                        backgroundColor: '#f2f5f1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#8da287',
                    }}
                >
                    <Bookmark size={32} />
                </div>
                <div>
                    <h3 className={styles.headingBold}>
                        {t('내가 좋아하는 레시피')}
                    </h3>
                    <p
                        className={styles.body2Regular}
                        style={{
                            color: vars.color.gray['40'],
                            marginTop: '8px',
                        }}
                    >
                        {t('아직 스크랩된 아이템이 없습니다.')}
                        <br />
                        {t('마음에 드는 레시피를 담아보세요!')}
                    </p>
                </div>
                <button
                    className={styles.primaryButton}
                    style={{
                        width: 'auto',
                        padding: '14px 32px',
                        marginTop: '20px',
                    }}
                    type='button'
                >
                    {t('탐색하러 가기')}
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.detailContainer}
        >
            <div className={styles.detailHeader}>
                <div className={styles.detailTitleArea}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        <h2 className={styles.detailTitle}>
                            {t('내가 좋아하는 레시피')}
                        </h2>
                        <button
                            type='button'
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                            }}
                        >
                            <Plus
                                size={18}
                                style={{
                                    transform: 'rotate(45deg)',
                                    color: vars.color.gray['40'],
                                }}
                            />
                        </button>
                    </div>

                    <p className={styles.detailSubtitle}>
                        제가 좋아하지만 누구에게나 추천합니다 즐거운 식사 합시다
                    </p>

                    <p className={styles.detailMeta}>By 나 · 0개</p>
                </div>

                <button
                    className={styles.viewToggle}
                    onClick={() =>
                        setViewMode((v) =>
                            v === 'details' ? 'grid' : 'details',
                        )
                    }
                    type='button'
                >
                    <motion.div
                        className={styles.toggleActiveBg}
                        initial={false}
                        animate={{ x: viewMode === 'details' ? 0 : 42 }}
                        transition={{
                            type: 'spring',
                            bounce: 0.2,
                            duration: 0.5,
                        }}
                    />
                    <div className={styles.toggleItem}>
                        <List
                            size={18}
                            color={
                                viewMode === 'details'
                                    ? vars.color.black
                                    : vars.color.gray['30']
                            }
                        />
                    </div>
                    <div className={styles.toggleItem}>
                        <LayoutGrid
                            size={18}
                            color={
                                viewMode === 'grid'
                                    ? vars.color.black
                                    : vars.color.gray['30']
                            }
                        />
                    </div>
                </button>
            </div>

            <motion.ul
                className={
                    viewMode === 'grid'
                        ? styles.recipeGrid
                        : styles.recipeDetailGrid
                }
                aria-label={t('좋아요 한 레시피 목록')}
                initial='hidden'
                animate='visible'
                variants={{
                    visible: { transition: { staggerChildren: 0.1 } },
                }}
            >
                {recipeList.map(
                    ({
                        sno,
                        thumbnailUrl,
                        title,
                        bookmarked,
                        memberName,
                        authorName,
                        durationSeconds,
                        servings,
                        caloriesPerServingKcal,
                        ingredients,
                        steps,
                    }) => (
                        <motion.li
                            key={sno}
                            className={
                                viewMode === 'grid'
                                    ? ''
                                    : styles.recipeDetailCard
                            }
                            whileHover={{ y: -4 }}
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            <Link
                                href={`/recipes/${sno}`}
                                className={styles.recipeLink}
                            >
                                <article
                                    className={
                                        viewMode === 'grid'
                                            ? ''
                                            : styles.cardContent
                                    }
                                >
                                    {viewMode === 'grid' ? (
                                        <>
                                            <div
                                                className={styles.recipeImgArea}
                                            >
                                                <img
                                                    src={thumbnailUrl || ''}
                                                    className={
                                                        styles.productImg
                                                    }
                                                    alt={title}
                                                />
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: '12px',
                                                        right: '12px',
                                                    }}
                                                >
                                                    <Bookmark
                                                        size={20}
                                                        fill={
                                                            bookmarked
                                                                ? 'white'
                                                                : 'none'
                                                        }
                                                        color='white'
                                                    />
                                                </div>
                                            </div>

                                            <div className={styles.productInfo}>
                                                <div
                                                    className={
                                                        styles.cardTitleContainer
                                                    }
                                                >
                                                    <h3
                                                        className={
                                                            styles.productName
                                                        }
                                                    >
                                                        {title}
                                                    </h3>
                                                    <span
                                                        className={
                                                            styles.brandName
                                                        }
                                                    >
                                                        {authorName ||
                                                            memberName}
                                                    </span>
                                                </div>

                                                <div
                                                    className={
                                                        styles.recipeMeta
                                                    }
                                                >
                                                    <span
                                                        className={
                                                            styles.iconText
                                                        }
                                                    >
                                                        <Clock size={12} />{' '}
                                                        {durationSeconds
                                                            ? `${Math.floor(durationSeconds / 60)}분`
                                                            : '-'}
                                                    </span>
                                                    <span
                                                        className={
                                                            styles.iconText
                                                        }
                                                    >
                                                        <Users size={12} />{' '}
                                                        {servings
                                                            ? `${servings}인분`
                                                            : '-'}
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className={styles.cardHeader}>
                                                <div
                                                    className={
                                                        styles.cardTitleArea
                                                    }
                                                >
                                                    <h3
                                                        className={
                                                            styles.recipeDetailTitle
                                                        }
                                                    >
                                                        {title}
                                                    </h3>
                                                    <span
                                                        className={
                                                            styles.recipeDetailAuthor
                                                        }
                                                    >
                                                        {authorName ||
                                                            memberName}
                                                    </span>
                                                </div>
                                                <Bookmark
                                                    size={20}
                                                    fill={
                                                        bookmarked
                                                            ? '#4a5d45'
                                                            : 'none'
                                                    }
                                                    color='#4a5d45'
                                                />
                                            </div>

                                            <div
                                                className={
                                                    styles.recipeDetailMeta
                                                }
                                            >
                                                <span
                                                    className={styles.iconText}
                                                >
                                                    <Clock size={14} />{' '}
                                                    {durationSeconds
                                                        ? `${Math.floor(durationSeconds / 60)}분`
                                                        : '-'}
                                                </span>
                                                <span
                                                    className={styles.iconText}
                                                >
                                                    <Users size={14} />{' '}
                                                    {servings
                                                        ? `${servings}인분`
                                                        : '-'}
                                                </span>
                                                {caloriesPerServingKcal && (
                                                    <span
                                                        className={
                                                            styles.iconText
                                                        }
                                                    >
                                                        <div
                                                            style={{
                                                                width: 14,
                                                                height: 14,
                                                                borderRadius:
                                                                    '50%',
                                                                border: '2px solid currentColor',
                                                            }}
                                                        />{' '}
                                                        {caloriesPerServingKcal}
                                                        kcal
                                                    </span>
                                                )}
                                            </div>

                                            <div
                                                className={
                                                    styles.ingredientSection
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.ingredientHeader
                                                    }
                                                >
                                                    <h4
                                                        className={
                                                            styles.ingredientTitle
                                                        }
                                                    >
                                                        {t('요리 재료 List')}
                                                    </h4>
                                                    <div
                                                        style={{
                                                            width: 16,
                                                            height: 16,
                                                            borderRadius: '50%',
                                                            backgroundColor:
                                                                vars.color.gray[
                                                                    '20'
                                                                ],
                                                            color: vars.color
                                                                .white,
                                                            fontSize: 10,
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            justifyContent:
                                                                'center',
                                                        }}
                                                    >
                                                        i
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        styles.ingredientContent
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.recipeDetailImgArea
                                                        }
                                                    >
                                                        <img
                                                            src={
                                                                thumbnailUrl ||
                                                                ''
                                                            }
                                                            className={
                                                                styles.recipeDetailImg
                                                            }
                                                            alt={title}
                                                        />
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.ingredientsList
                                                        }
                                                    >
                                                        {ingredients
                                                            ?.slice(0, 5)
                                                            .map((ing, i) => (
                                                                <div
                                                                    key={i}
                                                                    className={
                                                                        styles.ingredientItem
                                                                    }
                                                                >
                                                                    <span>
                                                                        ·{' '}
                                                                        {
                                                                            ing.name
                                                                        }
                                                                    </span>
                                                                    <span
                                                                        style={{
                                                                            color: vars
                                                                                .color
                                                                                .gray[
                                                                                '40'
                                                                            ],
                                                                        }}
                                                                    >
                                                                        -{' '}
                                                                        {
                                                                            ing.amount
                                                                        }
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        {(ingredients?.length ||
                                                            0) > 5 && (
                                                            <p
                                                                style={{
                                                                    fontSize: 12,
                                                                    color: vars
                                                                        .color
                                                                        .gray[
                                                                        '40'
                                                                    ],
                                                                    marginTop: 4,
                                                                }}
                                                            >
                                                                외{' '}
                                                                {ingredients!
                                                                    .length - 5}
                                                                개...
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={styles.stepSection}>
                                                <h4
                                                    className={styles.stepTitle}
                                                >
                                                    {t('따라봐 How to Cook')}
                                                </h4>
                                                <ul className={styles.stepList}>
                                                    {steps
                                                        ?.slice(0, 3)
                                                        .map((step, i) => (
                                                            <li
                                                                key={i}
                                                                className={
                                                                    styles.stepItem
                                                                }
                                                            >
                                                                <span
                                                                    className={
                                                                        styles.stepNumber
                                                                    }
                                                                >
                                                                    {i + 1}
                                                                </span>
                                                                <p
                                                                    className={
                                                                        styles.stepText
                                                                    }
                                                                >
                                                                    {
                                                                        step.description
                                                                    }
                                                                </p>
                                                            </li>
                                                        ))}
                                                    {(steps?.length || 0) >
                                                        3 && (
                                                        <p
                                                            style={{
                                                                fontSize: 12,
                                                                color: vars
                                                                    .color.gray[
                                                                    '40'
                                                                ],
                                                                marginLeft: 32,
                                                            }}
                                                        >
                                                            ...{' '}
                                                            {steps!.length - 3}
                                                            단계 더 있음
                                                        </p>
                                                    )}
                                                </ul>
                                            </div>
                                        </>
                                    )}
                                </article>
                            </Link>
                        </motion.li>
                    ),
                )}
            </motion.ul>
        </motion.div>
    );
};
