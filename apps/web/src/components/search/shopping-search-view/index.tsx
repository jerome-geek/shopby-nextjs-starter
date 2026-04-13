import { useRouter } from 'next/router';

import { ProductListFilter } from '@/components/product-list/filter';
import { MobileFilter } from '@/components/product-list/mobile-filter';
import { ProductListSearchInput } from '@/components/product-list/search-input';
import { SearchTabNav } from '@/components/search/tab-nav';
import { ShoppingSearchResults } from '@/components/search/shopping-results';
import { Row } from '@/components/ui/layout/flex';
import { SORT_OPTIONS } from '@/const/product';
import useInfiniteProductList from '@/hooks/query/product/product/useInfiniteProductList';
import { useSearchTab } from '@/hooks/useSearchTab';
import { useResponsive } from '@/hooks/utils';
import * as styles from '@/pages/search/index.css';
import { vars } from '@/styles/theme.css';
import type { SearchProductItem } from '@/models/product/product';

type ShoppingSearchViewProps = {
    mainCategoryNo: number;
    selectedSortOptionId: string;
    productList: SearchProductItem[];
    fetchNextProductPage: ReturnType<
        typeof useInfiniteProductList
    >['fetchNextPage'];
    hasNextProductPage: boolean;
    productTotalCount: number;
    currentPage: number;
    pageSize: number;
};

export const ShoppingSearchView = ({
    mainCategoryNo,
    selectedSortOptionId,
    productList,
    fetchNextProductPage,
    hasNextProductPage,
    productTotalCount,
    currentPage,
    pageSize,
}: ShoppingSearchViewProps) => {
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
                    />
                    <SearchTabNav activeTab='shopping' onTabChange={setTab} />
                    <MobileFilter categoryNo={mainCategoryNo} />
                    <div className={styles.totalCount}>
                        <span className={styles.totalCountValue}>
                            {productTotalCount}
                        </span>
                        개의 검색 결과
                    </div>
                </div>
            ) : (
                <aside className={styles.sideBar}>
                    <SearchTabNav activeTab='shopping' onTabChange={setTab} />
                    <ProductListFilter categoryNo={mainCategoryNo} />
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
                                {productTotalCount}
                            </span>
                            개의 검색 결과
                        </div>

                        <ul className={styles.sortList}>
                            {SORT_OPTIONS.map((sortOption) => (
                                <li key={sortOption.id}>
                                    <button
                                        type='button'
                                        className={styles.sortListButton}
                                        data-selected={
                                            selectedSortOptionId ===
                                            sortOption.id
                                                ? 'true'
                                                : undefined
                                        }
                                        onClick={() => {
                                            router.replace(
                                                {
                                                    pathname: router.pathname,
                                                    query: {
                                                        ...router.query,
                                                        pageNumber: '1',
                                                        by: sortOption.by,
                                                        direction:
                                                            sortOption.direction,
                                                    },
                                                },
                                                undefined,
                                                { shallow: true },
                                            );
                                        }}
                                    >
                                        {sortOption.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </Row>
                )}

                <ShoppingSearchResults
                    productList={productList}
                    fetchNextProductPage={fetchNextProductPage}
                    hasNextProductPage={hasNextProductPage}
                    productTotalCount={productTotalCount}
                    currentPage={currentPage}
                    pageSize={pageSize}
                />
            </section>
        </div>
    );
};
