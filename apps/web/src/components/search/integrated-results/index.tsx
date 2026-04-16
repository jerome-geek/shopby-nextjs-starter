import { isEmpty } from '@fxts/core';
import { ChevronDown, ChevronRight } from 'lucide-react';
import 'swiper/css';

import { CollectionCard } from '@/components/collection/collection-card';
import FetchBoundary from '@/components/common/FetchBoundary';
import { NoResult } from '@/components/common/no-result';
import { ProductCard } from '@/components/product';
import { RecipeCard } from '@/components/recipe/card';
import { CollectionRecommendSection } from '@/components/search/collection-recommend-section';
import * as collectionStyles from '@/components/search/collection-results/index.css';
import * as styles from '@/components/search/integrated-results/index.css';
import { RecipeRecommendSection } from '@/components/search/recipe-recommend-section';
import * as recipeStyles from '@/components/search/recipe-results/index.css';
import { ShoppingRecommendSection } from '@/components/search/shopping-recommend-section';
import { ShoppingRecommendSectionSkeleton } from '@/components/search/shopping-recommend-section/skeleton';
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
    const { isTablet } = useResponsive();

    const hasMoreShopping = !isEmpty(productList) && shoppingHasNextPage;
    const hasMoreRecipe = !isEmpty(recipeList) && recipeHasNextPage;
    const hasMoreCollection = !isEmpty(collectionList) && collectionHasNextPage;

    return (
        <div className={styles.container}>
            <Column style={{ gap: isTablet ? '20px' : '24px' }}>
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
                <Column style={{ gap: isTablet ? '20px' : '24px' }}>
                    {isEmpty(productList) ? (
                        <Column style={{ gap: isTablet ? '20px' : '24px' }}>
                            <NoResult
                                className={styles.noResult}
                                text='검색 결과가 없습니다.'
                                isIconVisible={false}
                            />
                            <FetchBoundary
                                fallback={<ShoppingRecommendSectionSkeleton />}
                            >
                                <ShoppingRecommendSection
                                />
                            </FetchBoundary>
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

            {isTablet && <div className={styles.divider} />}

            <Column style={{ gap: isTablet ? '20px' : '24px' }}>
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

                <Column style={{ gap: isTablet ? '20px' : '24px' }}>
                    {isEmpty(recipeList) ? (
                        <Column style={{ gap: isTablet ? '20px' : '24px' }}>
                            <NoResult
                                className={styles.noResult}
                                text='검색 결과가 없습니다.'
                                isIconVisible={false}
                            />
                            <RecipeRecommendSection
                                enabled={isEmpty(recipeList)}
                            />
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

            {isTablet && <div className={styles.divider} />}

            <Column style={{ gap: isTablet ? '20px' : '24px' }}>
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

                <Column style={{ gap: isTablet ? '20px' : '24px' }}>
                    {isEmpty(collectionList) ? (
                        <Column style={{ gap: isTablet ? '20px' : '24px' }}>
                            <NoResult
                                className={styles.noResult}
                                text='검색 결과가 없습니다.'
                                isIconVisible={false}
                            />
                            <CollectionRecommendSection
                                enabled={isEmpty(collectionList)}
                            />
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
