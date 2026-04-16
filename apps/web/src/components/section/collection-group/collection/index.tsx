import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CollectionRecipeCard } from '@/components/collection/collection-recipe-card';
import * as styles from '@/components/section/collection-group/collection/index.css';
import { PATHS } from '@/const/paths';
import { useResponsive } from '@/hooks/utils/useResponsive';
import type { CollectionExposureGroupItem } from '@/models/shop/collection';
import { vars } from '@/styles/theme.css';

import 'swiper/css';

const CollectionSection = ({
    collectionGroup,
    groupNo,
}: {
    collectionGroup: CollectionExposureGroupItem;
    groupNo: number;
}) => {
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
        <section className={styles.Container}>
            <div className={styles.CollectionSectionHeader}>
                <div className={styles.CollectionSectionTitleContainer}>
                    <h3 className={styles.CollectionSectionTitle}>
                        {collectionGroup.groupName}
                    </h3>
                    <p className={styles.CollectionSectionSubTitle}>
                        {collectionGroup.description}
                    </p>
                </div>

                <Link
                    href={`${PATHS.RECIPES.COLLECTIONS.replace(
                        '[shareCode]',
                        collectionGroup.collection.shareCode,
                    )}`}
                    className={styles.DetailLink}
                >
                    전체보기
                    <ChevronRight
                        color={vars.color.gray['60']}
                        width='16'
                        height='16'
                    />
                </Link>
            </div>

            {isMobile ? (
                <div className={styles.RecipeListSwiperContainer}>
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
                                    <CollectionRecipeCard recipe={recipe} />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            ) : (
                <ul className={styles.RecipeList}>
                    {filteredRecipes.map((recipe) => {
                        return (
                            <li
                                key={recipe.sno}
                                className={styles.RecipeListItem}
                            >
                                <CollectionRecipeCard recipe={recipe} />
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
};

export default CollectionSection;
