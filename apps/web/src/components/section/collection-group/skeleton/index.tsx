import { Swiper, SwiperSlide } from 'swiper/react';

import * as recipeDetailCardStyle from '@/components/recipe/detail-card/index.css';
import * as collectionSectionStyle from '@/components/section/collection-group/collection/index.css';
import { useResponsive } from '@/hooks/utils/useResponsive';
import Skeleton from '@/components/ui/Skeleton/Skeleton';

import 'swiper/css';

const CollectionSectionSkeleton = () => {
    const { isMobile, isTablet } = useResponsive();

    const skeletonCards = Array.from({
        length: isMobile ? 4 : isTablet ? 2 : 3,
    });

    const CardSkeleton = ({ index }: { index: number }) => (
        <article
            className={recipeDetailCardStyle.recipeLink}
            aria-hidden='true'
        >
            <div className={recipeDetailCardStyle.cardHeader}>
                <div className={recipeDetailCardStyle.cardTitleArea}>
                    <Skeleton
                        width='75%'
                        height={16}
                        style={{ borderRadius: 8 }}
                    />
                    <Skeleton
                        width='45%'
                        height={14}
                        style={{ borderRadius: 8 }}
                    />
                </div>
                <Skeleton width={20} height={20} circle />
            </div>

            <div className={recipeDetailCardStyle.recipeMeta}>
                <span className={recipeDetailCardStyle.iconTimerText}>
                    <Skeleton
                        width={14}
                        height={14}
                        style={{ borderRadius: 4 }}
                    />
                    <Skeleton
                        width={44}
                        height={14}
                        style={{ borderRadius: 999 }}
                    />
                </span>
                <span className={recipeDetailCardStyle.iconText}>
                    <Skeleton
                        width={14}
                        height={14}
                        style={{ borderRadius: 4 }}
                    />
                    <Skeleton
                        width={44}
                        height={14}
                        style={{ borderRadius: 999 }}
                    />
                </span>
                <span className={recipeDetailCardStyle.iconText}>
                    <Skeleton
                        width={14}
                        height={14}
                        style={{ borderRadius: 4 }}
                    />
                    <Skeleton
                        width={52}
                        height={14}
                        style={{ borderRadius: 999 }}
                    />
                </span>
            </div>

            <div className={recipeDetailCardStyle.ingredientContent}>
                <div className={recipeDetailCardStyle.recipeThumbArea}>
                    <Skeleton
                        width='100%'
                        height='100%'
                        style={{ borderRadius: 8 }}
                    />
                </div>

                <div
                    className={
                        recipeDetailCardStyle.ingredientContainer
                    }
                >
                    <div
                        className={
                            recipeDetailCardStyle.ingredientHeader
                        }
                    >
                        <Skeleton
                            width={92}
                            height={14}
                            style={{ borderRadius: 6 }}
                        />
                        <Skeleton width={13} height={13} circle />
                    </div>

                    <ul
                        className={recipeDetailCardStyle.ingredientList}
                    >
                        {Array.from({ length: 6 }).map((_, i) => (
                            <li
                                key={`${index}-ing-${i}`}
                                className={
                                    recipeDetailCardStyle.ingredientListItem
                                }
                                style={{ gap: 8 }}
                            >
                                <Skeleton
                                    width={i % 2 === 0 ? '70%' : '60%'}
                                    height={14}
                                    style={{ borderRadius: 8 }}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className={recipeDetailCardStyle.stepSection}>
                <Skeleton
                    width={140}
                    height={14}
                    style={{ borderRadius: 6 }}
                />
                <ul className={recipeDetailCardStyle.stepList}>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <li
                            key={`${index}-step-${i}`}
                            className={recipeDetailCardStyle.stepItem}
                        >
                            <Skeleton width={20} height={20} circle />
                            <Skeleton
                                width={i === 0 ? '80%' : '70%'}
                                height={14}
                                style={{ borderRadius: 6 }}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );

    return (
        <section className={collectionSectionStyle.container} aria-busy='true'>
            <div className={collectionSectionStyle.collectionSectionHeader}>
                <div
                    className={
                        collectionSectionStyle.collectionSectionTitleContainer
                    }
                >
                    <Skeleton
                        width={140}
                        height={22}
                        style={{ borderRadius: 8 }}
                    />
                    <Skeleton
                        width={200}
                        height={18}
                        style={{ borderRadius: 8 }}
                    />
                </div>
                <Skeleton
                    width={76}
                    height={18}
                    style={{ borderRadius: 999 }}
                />
            </div>

            {isMobile ? (
                <div
                    className={
                        collectionSectionStyle.recipeListSwiperContainer
                    }
                >
                    <Swiper
                        slidesPerView={1.2}
                        spaceBetween={12}
                        style={{ width: '100%', padding: '0 20px' }}
                    >
                        {skeletonCards.map((_, index) => (
                            <SwiperSlide key={index} style={{ height: 'auto' }}>
                                <CardSkeleton index={index} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ) : (
                <ul className={collectionSectionStyle.recipeList}>
                    {skeletonCards.map((_, index) => (
                        <li
                            key={index}
                            className={collectionSectionStyle.recipeListItem}
                        >
                            <CardSkeleton index={index} />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default CollectionSectionSkeleton;
