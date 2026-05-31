import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { RecipeDetailCard } from '@/features/recipe/components/view/detail-card';
import * as styles from '@/features/section/components/collection-group/collection/index.css';
import { PATHS } from '@/const/paths';
import { useResponsive } from '@/hooks/utils/useResponsive';
import type { CollectionExposureGroupItem } from '@/models/shop/collection';
import { vars } from '@/styles/theme.css';

import 'swiper/css';

interface CollectionSectionProps {
    collectionGroup: CollectionExposureGroupItem;
}

const CollectionSection = ({ collectionGroup }: CollectionSectionProps) => {
    const { isMobile, isTablet } = useResponsive();

    const filteredRecipes = useMemo(
        () =>
            collectionGroup.collection.recipes?.slice(
                0,
                isMobile ? 4 : isTablet ? 2 : 3,
            ) ?? [],
        [collectionGroup.collection.recipes, isMobile, isTablet],
    );

    return (
        <section className={styles.container}>
            <div className={styles.collectionSectionHeader}>
                <div className={styles.collectionSectionTitleContainer}>
                    <h3 className={styles.collectionSectionTitle}>
                        {collectionGroup.groupName}
                    </h3>
                    <p className={styles.collectionSectionSubTitle}>
                        {collectionGroup.description}
                    </p>
                </div>

                <Link
                    href={`${PATHS.RECIPES.COLLECTIONS.replace(
                        '[shareCode]',
                        collectionGroup.collection.shareCode,
                    )}`}
                    className={styles.detailLink}
                >
                    <span>전체보기</span>
                    <ChevronRight
                        color={vars.color.gray['60']}
                        width='16'
                        height='16'
                    />
                </Link>
            </div>

            {isMobile ? (
                <div className={styles.recipeListSwiperContainer}>
                    <Swiper
                        slidesPerView={1.2}
                        spaceBetween={12}
                        style={{
                            width: '100%',
                            padding: '0 20px',
                        }}
                    >
                        {filteredRecipes.map((recipe) => {
                            return (
                                <SwiperSlide
                                    key={recipe.sno}
                                    style={{
                                        height: 'auto',
                                    }}
                                >
                                    <RecipeDetailCard
                                        recipe={recipe}
                                        collectionLink={`${PATHS.RECIPES.COLLECTIONS.replace(
                                            '[shareCode]',
                                            collectionGroup.collection
                                                .shareCode,
                                        )}`}
                                    />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            ) : (
                <ul className={styles.recipeList}>
                    {filteredRecipes.map((recipe) => {
                        return (
                            <li
                                key={recipe.sno}
                                className={styles.recipeListItem}
                            >
                                <RecipeDetailCard
                                    recipe={recipe}
                                    collectionLink={`${PATHS.RECIPES.COLLECTIONS.replace(
                                        '[shareCode]',
                                        collectionGroup.collection.shareCode,
                                    )}`}
                                />
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
};

export default CollectionSection;
