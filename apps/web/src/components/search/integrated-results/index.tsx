import { isEmpty } from '@fxts/core';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CollectionCard } from '@/components/collection/collection-card';
import { NoResult } from '@/components/common/no-result';
import { ProductCard } from '@/components/product';
import { RecipeCard } from '@/components/recipe/card';
import * as collectionStyles from '@/components/search/collection-results/index.css';
import * as styles from '@/components/search/integrated-results/index.css';
import * as recipeStyles from '@/components/search/recipe-results/index.css';
import * as shoppingStyles from '@/components/search/shopping-results/index.css';
import { Column, Row } from '@/components/ui/layout/flex';
import { useInfiniteProductList } from '@/hooks/infiniteQuery/product/product';
import { useInfinitePublicCollectionSearch } from '@/hooks/query/shop/collection';
import { useInfinitePublicRecipeSearch } from '@/hooks/query/shop/recipe';
import { useResponsive } from '@/hooks/utils';
import type { SearchProductItem } from '@/models/product/product';
import type {
    BookmarkedRecipeCollection,
    GetRecipeDetailResponse,
} from '@/models/shop/recipe';
import { vars } from '@/styles/theme.css';

export type IntegratedViewAllTab = 'shopping' | 'recipe' | 'collection';

type IntegratedSearchResultsProps = {
    productList: SearchProductItem[];
    recipeList: GetRecipeDetailResponse[];
    collectionList: BookmarkedRecipeCollection[];
    onViewAll: (tab: IntegratedViewAllTab) => void;
    shoppingFetchNextPage: ReturnType<
        typeof useInfiniteProductList
    >['fetchNextPage'];
    shoppingHasNextPage: boolean;
    recipeFetchNextPage: ReturnType<
        typeof useInfinitePublicRecipeSearch
    >['fetchNextPage'];
    recipeHasNextPage: boolean;
    collectionFetchNextPage: ReturnType<
        typeof useInfinitePublicCollectionSearch
    >['fetchNextPage'];
    collectionHasNextPage: boolean;
};

export const IntegratedSearchResults = ({
    productList,
    recipeList,
    collectionList,
    onViewAll,
    shoppingFetchNextPage,
    shoppingHasNextPage,
    recipeFetchNextPage,
    recipeHasNextPage,
    collectionFetchNextPage,
    collectionHasNextPage,
}: IntegratedSearchResultsProps) => {
    const { isMobile } = useResponsive();

    const hasMoreShopping = !isEmpty(productList) && shoppingHasNextPage;
    const hasMoreRecipe = !isEmpty(recipeList) && recipeHasNextPage;
    const hasMoreCollection = !isEmpty(collectionList) && collectionHasNextPage;

    return (
        <div className={styles.container}>
            <Column style={{ gap: isMobile ? '20px' : '24px' }}>
                <Row justify='between'>
                    <h3 className={styles.sectionTitle}>쇼핑</h3>
                    <button
                        type='button'
                        className={styles.allViewButton}
                        onClick={() => onViewAll('shopping')}
                    >
                        전체보기{' '}
                        <ChevronRight
                            size={16}
                            strokeWidth={1.5}
                            color={vars.color.gray['60']}
                        />
                    </button>
                </Row>
                <Column style={{ gap: isMobile ? '20px' : '24px' }}>
                    {isEmpty(productList) ? (
                        <Column style={{ gap: isMobile ? '20px' : '24px' }}>
                            <NoResult
                                className={styles.noResult}
                                text='검색 결과가 없습니다.'
                                isIconVisible={false}
                            />

                            <Column gap='12px'>
                                <h3 className={styles.productSectionTitle}>
                                    이 상품은 어떠세요?
                                </h3>
                                <Swiper>
                                    <SwiperSlide>
                                        {/* <ProductCard
                                            key={product.productNo}
                                            {...product}
                                        /> */}
                                    </SwiperSlide>
                                </Swiper>
                            </Column>
                        </Column>
                    ) : (
                        <div className={shoppingStyles.productList}>
                            {productList.map((product) => (
                                <ProductCard
                                    key={product.productNo}
                                    {...product}
                                />
                            ))}
                        </div>
                    )}
                    {hasMoreShopping && (
                        <button
                            type='button'
                            className={styles.moreButton}
                            onClick={() => shoppingFetchNextPage()}
                        >
                            <ChevronDown size={16} />
                            쇼핑 더보기
                        </button>
                    )}
                </Column>
            </Column>

            {isMobile && <div className={styles.divider} />}

            <Column style={{ gap: isMobile ? '20px' : '24px' }}>
                <Row justify='between'>
                    <h3 className={styles.sectionTitle}>레시피</h3>
                    <button
                        type='button'
                        className={styles.allViewButton}
                        onClick={() => onViewAll('recipe')}
                    >
                        전체보기{' '}
                        <ChevronRight
                            size={16}
                            strokeWidth={1.5}
                            color={vars.color.gray['60']}
                        />
                    </button>
                </Row>

                <Column style={{ gap: isMobile ? '20px' : '24px' }}>
                    {isEmpty(recipeList) ? (
                        <Column style={{ gap: isMobile ? '20px' : '24px' }}>
                            <NoResult
                                className={styles.noResult}
                                text='검색 결과가 없습니다.'
                                isIconVisible={false}
                            />

                            <Column gap='12px'>
                                <h3 className={styles.productSectionTitle}>
                                    이 레시피는 어떠세요?
                                </h3>
                                <Swiper>
                                    <SwiperSlide>
                                        {/* <ProductCard
                                                 key={product.productNo}
                                                 {...product}
                                             /> */}
                                    </SwiperSlide>
                                </Swiper>
                            </Column>
                        </Column>
                    ) : (
                        <ul className={recipeStyles.recipeContainer}>
                            {recipeList.map((recipe) => (
                                <RecipeCard key={recipe.sno} recipe={recipe} />
                            ))}
                        </ul>
                    )}
                    {hasMoreRecipe && (
                        <button
                            type='button'
                            className={styles.moreButton}
                            onClick={() => recipeFetchNextPage()}
                        >
                            <ChevronDown size={16} />
                            레시피 더보기
                        </button>
                    )}
                </Column>
            </Column>

            {isMobile && <div className={styles.divider} />}

            <Column style={{ gap: isMobile ? '20px' : '24px' }}>
                <Row justify='between'>
                    <h3 className={styles.sectionTitle}>컬렉션</h3>
                    <button
                        type='button'
                        className={styles.allViewButton}
                        onClick={() => onViewAll('collection')}
                    >
                        전체보기{' '}
                        <ChevronRight
                            size={16}
                            strokeWidth={1.5}
                            color={vars.color.gray['60']}
                        />
                    </button>
                </Row>

                <Column style={{ gap: isMobile ? '20px' : '24px' }}>
                    {isEmpty(collectionList) ? (
                        <Column style={{ gap: isMobile ? '20px' : '24px' }}>
                            <NoResult
                                className={styles.noResult}
                                text='검색 결과가 없습니다.'
                                isIconVisible={false}
                            />

                            <Column gap='12px'>
                                <h3 className={styles.productSectionTitle}>
                                    이 컬렉션은 어떠세요?
                                </h3>
                                <Swiper>
                                    <SwiperSlide>
                                        {/* <ProductCard
                                                 key={product.productNo}
                                                 {...product}
                                             /> */}
                                    </SwiperSlide>
                                </Swiper>
                            </Column>
                        </Column>
                    ) : (
                        <ul className={collectionStyles.collectionContainer}>
                            {collectionList.map((collection) => (
                                <CollectionCard
                                    key={collection.sno}
                                    collection={collection}
                                />
                            ))}
                        </ul>
                    )}
                    {hasMoreCollection && (
                        <button
                            type='button'
                            className={styles.moreButton}
                            onClick={() => collectionFetchNextPage()}
                        >
                            <ChevronDown size={16} />
                            컬렉션 더보기
                        </button>
                    )}
                </Column>
            </Column>
        </div>
    );
};
