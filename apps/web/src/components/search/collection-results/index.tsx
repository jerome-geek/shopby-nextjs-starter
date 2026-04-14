import { isEmpty } from '@fxts/core';
import { useRouter } from 'next/router';

import { CollectionCard } from '@/components/collection/collection-card';
import { NoResult } from '@/components/common/no-result';
import { ObserverTarget } from '@/components/common/observer-target';
import * as styles from '@/components/search/collection-results/index.css';
import PagingV2 from '@/components/ui/paging-v2';
import { COLLECTION_PAGE_QUERY_KEY } from '@/const/search';
import useInfinitePublicCollectionSearch from '@/hooks/query/shop/collection/useInfinitePublicCollectionSearch';
import { useResponsive } from '@/hooks/utils';
import type { BookmarkedRecipeCollection } from '@/models/shop/recipe';

type CollectionSearchResultsProps = {
    collectionList: BookmarkedRecipeCollection[];
    fetchNextPage: ReturnType<
        typeof useInfinitePublicCollectionSearch
    >['fetchNextPage'];
    hasNextPage: boolean;
    totalCount: number;
    currentPage: number;
    pageSize: number;
};

export const CollectionSearchResults = ({
    collectionList,
    fetchNextPage,
    hasNextPage,
    totalCount,
    currentPage,
    pageSize,
}: CollectionSearchResultsProps) => {
    const { isTablet } = useResponsive();

    const router = useRouter();

    return (
        <div className={styles.container}>
            {isEmpty(collectionList) ? (
                <NoResult
                    className={styles.noResult}
                    text='검색 결과가 없습니다.'
                    isIconVisible={false}
                />
            ) : (
                <div className={styles.collectionContainer}>
                    {collectionList.map((collection) => (
                        <CollectionCard
                            key={collection.sno}
                            collection={collection}
                        />
                    ))}
                </div>
            )}

            {isTablet ? (
                <ObserverTarget
                    onIntersect={() => {
                        if (hasNextPage) {
                            fetchNextPage();
                        }
                    }}
                    hasNextPage={hasNextPage}
                    totalCount={totalCount}
                />
            ) : (
                <PagingV2
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalCount={totalCount}
                    onPageClick={(pageNumber) => {
                        router.replace(
                            {
                                pathname: router.pathname,
                                query: {
                                    ...router.query,
                                    [COLLECTION_PAGE_QUERY_KEY]:
                                        String(pageNumber),
                                },
                            },
                            undefined,
                            { shallow: true },
                        );
                    }}
                />
            )}
        </div>
    );
};
