import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { ProductListSearchInput } from '@/features/product/list/search-input';
import { CollectionSearchResults } from '@/features/search/components/view/collection-results';
import { SearchMobileSort } from '@/features/search/components/view/mobile-sort';
import { SearchTabNav } from '@/features/search/components/view/tab-nav';
import { Row } from '@/shared/ui/layout/flex';
import { COLLECTION_SORT_OPTIONS, type CollectionSortBy } from '@/features/recipe/constants';
import {
    COLLECTION_ORDER_QUERY_KEY,
    COLLECTION_PAGE_QUERY_KEY,
    COLLECTION_SORT_BY_QUERY_KEY,
} from '@/features/search/constants';
import useInfinitePublicCollectionSearch from '@/hooks/query/shop/collection/useInfinitePublicCollectionSearch';
import { useSearchTab } from '@/hooks/useSearchTab';
import { useResponsive } from '@/hooks/utils';
import type { OrderDirectionType } from '@/models';
import type { BookmarkedRecipeCollection } from '@/models/shop/recipe';
import * as styles from '@/pages/search/index.css';
import { vars } from '@/styles/theme.css';

type CollectionSearchViewProps = {
    collectionSortOrder: OrderDirectionType;
    collectionSortBy: CollectionSortBy;
    collectionList: BookmarkedRecipeCollection[];
    fetchNextCollectionPage: ReturnType<
        typeof useInfinitePublicCollectionSearch
    >['fetchNextPage'];
    hasNextCollectionPage: boolean;
    collectionTotalCount: number;
    currentPage: number;
    pageSize: number;
};

export const CollectionSearchView = ({
    collectionSortOrder,
    collectionSortBy,
    collectionList,
    fetchNextCollectionPage,
    hasNextCollectionPage,
    collectionTotalCount,
    currentPage,
    pageSize,
}: CollectionSearchViewProps) => {
    const { isTablet } = useResponsive();

    const router = useRouter();

    const { setTab } = useSearchTab();

    const replaceSearchQuery = useCallback(
        (patch: Record<string, string>) => {
            router.replace(
                {
                    pathname: router.pathname,
                    query: { ...router.query, ...patch },
                },
                undefined,
                { shallow: true },
            );
        },
        [router],
    );

    return (
        <div className={styles.container}>
            {isTablet ? (
                <div className={styles.mobileTopContainer}>
                    <ProductListSearchInput
                        syncKeywordFromUrl
                        onBack={() => router.back()}
                        className={styles.searchInput}
                    />
                    <SearchTabNav activeTab='collection' onTabChange={setTab} />
                    <SearchMobileSort
                        orderQueryKey={COLLECTION_ORDER_QUERY_KEY}
                        sortByQueryKey={COLLECTION_SORT_BY_QUERY_KEY}
                        pageQueryKey={COLLECTION_PAGE_QUERY_KEY}
                        sortOptions={COLLECTION_SORT_OPTIONS}
                    />
                    <div className={styles.totalCount}>
                        <span className={styles.totalCountValue}>
                            {collectionTotalCount}
                        </span>
                        개의 검색 결과
                    </div>
                </div>
            ) : (
                <aside className={styles.sideBar}>
                    <SearchTabNav activeTab='collection' onTabChange={setTab} />
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
                                {collectionTotalCount}
                            </span>
                            개의 검색 결과
                        </div>

                        <ul className={styles.sortList}>
                            {COLLECTION_SORT_OPTIONS.map((sortOption) => (
                                <li key={sortOption.id}>
                                    <button
                                        type='button'
                                        className={styles.sortListButton}
                                        data-selected={
                                            collectionSortOrder ===
                                                sortOption.order &&
                                            collectionSortBy ===
                                                sortOption.sortBy
                                                ? 'true'
                                                : undefined
                                        }
                                        onClick={() =>
                                            replaceSearchQuery({
                                                [COLLECTION_ORDER_QUERY_KEY]:
                                                    sortOption.order,
                                                [COLLECTION_SORT_BY_QUERY_KEY]:
                                                    sortOption.sortBy,
                                                [COLLECTION_PAGE_QUERY_KEY]:
                                                    '1',
                                            })
                                        }
                                    >
                                        {sortOption.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </Row>
                )}

                <CollectionSearchResults
                    collectionList={collectionList}
                    fetchNextPage={fetchNextCollectionPage}
                    hasNextPage={hasNextCollectionPage}
                    totalCount={collectionTotalCount}
                    currentPage={currentPage}
                    pageSize={pageSize}
                />
            </section>
        </div>
    );
};
