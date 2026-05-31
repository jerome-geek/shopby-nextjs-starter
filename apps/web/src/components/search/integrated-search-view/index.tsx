import { useRouter } from 'next/router';

import { ProductListSearchInput } from '@/features/product/list/search-input';
import { IntegratedSearchResults } from '@/components/search/integrated-results';
import { SearchTabNav } from '@/components/search/tab-nav';
import { Row } from '@/shared/ui/layout/flex';
import useInfiniteProductList from '@/hooks/infiniteQuery/product/product/useInfiniteProductList';
import { useInfinitePublicCollectionSearch } from '@/hooks/query/shop/collection';
import { useInfinitePublicRecipeSearch } from '@/hooks/query/shop/recipe';
import { useSearchTab } from '@/hooks/useSearchTab';
import { useResponsive } from '@/hooks/utils';
import type { SearchProductItem } from '@/models/product/product';
import type {
    BookmarkedRecipeCollection,
    GetRecipeDetailResponse,
} from '@/models/shop/recipe';
import * as styles from '@/pages/search/index.css';
import { vars } from '@/styles/theme.css';

type IntegratedSearchViewProps = {
    totalCount: number;
    productList: SearchProductItem[];
    recipeList: GetRecipeDetailResponse[];
    collectionList: BookmarkedRecipeCollection[];
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

export const IntegratedSearchView = ({
    totalCount,
    productList,
    recipeList,
    collectionList,
    shoppingFetchNextPage,
    shoppingHasNextPage,
    recipeFetchNextPage,
    recipeHasNextPage,
    collectionFetchNextPage,
    collectionHasNextPage,
}: IntegratedSearchViewProps) => {
    const { isTablet } = useResponsive();

    const router = useRouter();

    const { setTab } = useSearchTab();

    return (
        <div className={styles.container}>
            {isTablet ? (
                <div className={styles.mobileTopContainer}>
                    <ProductListSearchInput
                        syncKeywordFromUrl
                        onBack={() => router.back()}
                        className={styles.searchInput}
                    />
                    <SearchTabNav activeTab='integrated' onTabChange={setTab} />
                    <div className={styles.totalCount}>
                        <span className={styles.totalCountValue}>
                            {totalCount}
                        </span>
                        개의 검색 결과
                    </div>
                </div>
            ) : (
                <aside className={styles.sideBar}>
                    <SearchTabNav activeTab='integrated' onTabChange={setTab} />
                </aside>
            )}

            <section className={styles.contentArea}>
                {!isTablet && (
                    <Row
                        justify='between'
                        align='center'
                        style={{
                            paddingBottom: '12px',
                            borderBottom: `1px solid ${vars.color.gray['20']}`,
                        }}
                    >
                        <div className={styles.totalCount}>
                            <span className={styles.totalCountValue}>
                                {totalCount}
                            </span>
                            개의 검색 결과
                        </div>
                    </Row>
                )}

                <IntegratedSearchResults
                    productList={productList}
                    recipeList={recipeList}
                    collectionList={collectionList}
                    onViewAll={setTab}
                    shoppingFetchNextPage={shoppingFetchNextPage}
                    shoppingHasNextPage={shoppingHasNextPage}
                    recipeFetchNextPage={recipeFetchNextPage}
                    recipeHasNextPage={recipeHasNextPage}
                    collectionFetchNextPage={collectionFetchNextPage}
                    collectionHasNextPage={collectionHasNextPage}
                />
            </section>
        </div>
    );
};
