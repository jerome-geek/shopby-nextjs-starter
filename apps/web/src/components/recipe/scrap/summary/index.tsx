import { pipe, take, toArray } from '@fxts/core';
import { Bookmark, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import FetchBoundary from '@/components/common/FetchBoundary';
import { RecipeGridSection } from '@/components/recipe/grid-section';
import * as styles from '@/components/recipe/scrap/summary/index.css';
import { VerticalMoreMenu } from '@/components/ui';
import { PATHS } from '@/const/paths';
import { useCollectionMutation } from '@/hooks/mutations';
import { useProfile } from '@/hooks/query/member/profile';
import { useCollectionList } from '@/hooks/query/shop/collection';
import { useBookmark } from '@/hooks/recipe';
import { useCustomDialog } from '@/hooks/ui';
import { useDialog, useResponsive } from '@/hooks/utils';
import { vars } from '@/styles/theme.css';

/**
 * 전체 탭 레이아웃 (컬렉션, 상품, 레시피 그리드)
 */
const RecipeScrapSummary = () => {
    const { t } = useTranslation();

    const { openAsyncDialog } = useDialog();
    const { openCollectionForm, withRequiredAuth } = useCustomDialog();
    const { isMobile } = useResponsive();

    const { data: profileData } = useProfile();
    const { data: collectionListData = [] } = useCollectionList({
        options: {
            select: (data) => {
                return pipe(data, take(isMobile ? 3 : 6), toArray);
            },
        },
    });

    const { toggleCollectionBookmark } = useBookmark();

    const {
        remove: { mutateAsync: removeCollectionMutateAsync },
    } = useCollectionMutation();

    const handleEditCollection = (shareCode: string) => {
        openCollectionForm({ shareCode });
    };

    const handleDeleteCollection = async (sno: number) => {
        const isAgree = await openAsyncDialog({
            message: t('정말로 이 컬렉션을 삭제하시겠습니까?'),
            type: 'confirm',
            confirmText: t('삭제'),
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (isAgree) {
            await removeCollectionMutateAsync({
                collectionSno: sno,
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={styles.container}
        >
            {/* 컬렉션 섹션 */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>{t('컬렉션')}</h2>

                <ul className={styles.collectionGrid}>
                    {collectionListData.map((c) => (
                        <motion.li
                            key={c.sno}
                            whileHover={{ y: -8 }}
                            className={styles.collectionItem}
                        >
                            <article style={{ width: '100%', minWidth: 0 }}>
                                <Link
                                    href={PATHS.RECIPES.COLLECTIONS.replace(
                                        '[shareCode]',
                                        c.shareCode,
                                    )}
                                    className={styles.collectionCard}
                                >
                                    {c.recipeImageUrls &&
                                    c.recipeImageUrls.length > 0 ? (
                                        <div className={styles.collageGrid}>
                                            {c.recipeImageUrls
                                                .slice(0, 5)
                                                .map((url, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={url}
                                                        className={
                                                            styles.collageImage
                                                        }
                                                        alt={`${c.title} ${idx}`}
                                                    />
                                                ))}
                                        </div>
                                    ) : (
                                        <div
                                            className={
                                                styles.collagePlaceholder
                                            }
                                        >
                                            <Bookmark
                                                size={32}
                                                fill={vars.color.green['80']}
                                                color={vars.color.green['80']}
                                            />
                                        </div>
                                    )}
                                    <div className={styles.collectionInfo}>
                                        <div
                                            className={
                                                styles.collectionTitleArea
                                            }
                                        >
                                            <h3
                                                className={
                                                    styles.collectionTitle
                                                }
                                            >
                                                {c.title}
                                            </h3>
                                            <p
                                                className={
                                                    styles.collectionDesc
                                                }
                                            >
                                                {c.description}
                                            </p>
                                            <p
                                                className={
                                                    styles.collectionFooter
                                                }
                                            >
                                                By {c.memberName || t('나')} ·{' '}
                                                {c.recipeCount}
                                                {t('개')}
                                            </p>
                                        </div>

                                        <div className={styles.buttonContainer}>
                                            {profileData?.memberNo ===
                                                c.memberNo && (
                                                <VerticalMoreMenu
                                                    id={String(c.sno)}
                                                    onEdit={() =>
                                                        handleEditCollection(
                                                            c.shareCode,
                                                        )
                                                    }
                                                    onDelete={() =>
                                                        handleDeleteCollection(
                                                            c.sno,
                                                        )
                                                    }
                                                />
                                            )}
                                            <button
                                                type='button'
                                                className={
                                                    styles.bookmarkButton
                                                }
                                                onClick={withRequiredAuth(
                                                    () => {
                                                        toggleCollectionBookmark(
                                                            {
                                                                sno: c.sno,
                                                                bookmarked:
                                                                    c.bookmarked,
                                                            },
                                                        );
                                                    },
                                                )}
                                            >
                                                <Bookmark
                                                    size={24}
                                                    strokeWidth={1.5}
                                                    fill={
                                                        c.bookmarked
                                                            ? vars.color.green[
                                                                  '100'
                                                              ]
                                                            : 'none'
                                                    }
                                                    color={
                                                        c.bookmarked
                                                            ? vars.color.green[
                                                                  '100'
                                                              ]
                                                            : vars.color.gray[
                                                                  '40'
                                                              ]
                                                    }
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        </motion.li>
                    ))}
                </ul>

                <button
                    type='button'
                    className={styles.createButton}
                    onClick={() => openCollectionForm()}
                >
                    <Plus size={isMobile ? 18 : 20} />
                    <span>{t('새 컬렉션 만들기')}</span>
                </button>
            </section>

            {/* 상품 섹션 */}
            {/* <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>{t('상품')}</h2>
                    <div className={styles.viewAll}>
                        {t('전체보기')} <ChevronRight size={14} />
                    </div>
                </div>
                <div className={styles.productGrid}>
                    {MOCK_PRODUCTS.map((p) => (
                        <motion.div key={p.id} whileHover={{ y: -4 }}>
                            <div className={styles.productThumb}>
                                <img
                                    src={p.img}
                                    className={styles.productImg}
                                    alt={p.name}
                                />
                                {p.isSoldOut && (
                                    <div className={styles.soldOutOverlay}>
                                        {t('품절')}
                                    </div>
                                )}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '8px',
                                        right: '8px',
                                    }}
                                >
                                    <Bookmark
                                        size={18}
                                        fill='white'
                                        color='white'
                                    />
                                </div>
                            </div>
                            <div className={styles.productInfo}>
                                <span className={styles.brandName}>
                                    {p.brand}
                                </span>
                                <h3 className={styles.productName}>{p.name}</h3>
                                <div className={styles.priceArea}>
                                    {p.discount && (
                                        <span className={styles.discount}>
                                            {p.discount}%
                                        </span>
                                    )}
                                    <span className={styles.price}>
                                        {p.price.toLocaleString()}
                                    </span>
                                </div>
                                <div className={styles.badgeArea}>
                                    {p.badges.map((b: string) => (
                                        <span key={b} className={styles.badge}>
                                            {b}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className={styles.pagination}>
                    <span style={{ color: vars.color.black, fontWeight: 700 }}>
                        1
                    </span>
                    <span>2</span>
                    <span>3</span>
                    <ChevronRight size={14} />
                </div>
            </section> */}

            {/* 레시피 섹션 */}
            {/* TODO: 페이징처리를 위해 useQuery를 사용해서 내부적으로 skeleton보여줘야함 */}
            <FetchBoundary>
                <RecipeGridSection />
            </FetchBoundary>
        </motion.div>
    );
};

export default RecipeScrapSummary;
