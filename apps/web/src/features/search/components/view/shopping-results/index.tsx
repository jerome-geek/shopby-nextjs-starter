import { isEmpty } from '@fxts/core';
import { useRouter } from 'next/router';

import { NoResult } from '@/shared/components/common/no-result';
import { ObserverTarget } from '@/shared/components/observer-target';
import { ProductCard } from '@/features/product/components';
import PagingV2 from '@/shared/ui/paging-v2';
import * as styles from '@/features/search/components/view/shopping-results/index.css';
import useInfiniteProductList from '@/hooks/infiniteQuery/product/product/useInfiniteProductList';
import { useResponsive } from '@/hooks/utils';
import type { SearchProductItem } from '@/entities/product/model/product';

type ShoppingSearchResultsProps = {
    productList: SearchProductItem[];
    fetchNextProductPage: ReturnType<
        typeof useInfiniteProductList
    >['fetchNextPage'];
    hasNextProductPage: boolean;
    productTotalCount: number;
    currentPage: number;
    pageSize: number;
};

export const ShoppingSearchResults = ({
    productList,
    fetchNextProductPage,
    hasNextProductPage,
    productTotalCount,
    currentPage,
    pageSize,
}: ShoppingSearchResultsProps) => {
    const { isTablet } = useResponsive();

    const router = useRouter();

    return (
        <div className={styles.container}>
            {isEmpty(productList) ? (
                <NoResult
                    className={styles.noResult}
                    text='검색 결과가 없습니다.'
                    isIconVisible={false}
                />
            ) : (
                <div className={styles.productList}>
                    {productList.map((product) => (
                        <ProductCard key={product.productNo} {...product} />
                    ))}
                </div>
            )}

            {isTablet ? (
                <ObserverTarget
                    onIntersect={() => {
                        if (hasNextProductPage) {
                            fetchNextProductPage();
                        }
                    }}
                    hasNextPage={hasNextProductPage}
                />
            ) : (
                <PagingV2
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalCount={productTotalCount}
                    onPageClick={(pageNumber) => {
                        router.replace(
                            {
                                pathname: router.pathname,
                                query: {
                                    ...router.query,
                                    pageNumber: String(pageNumber),
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
