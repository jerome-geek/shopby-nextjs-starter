import { isEmpty } from '@fxts/core';

import { NoResult } from '@/shared/components/common/no-result';
import Seo from '@/shared/components/common/seo';
import { ProductCard } from '@/components/product';
import { Column } from '@/shared/ui/layout/flex';
import PagingV2 from '@/shared/ui/paging-v2';
import { useBestProductParams } from '@/entities/products/best/hooks/useBestProductParams';
import { BestCategoryFilter } from '@/features/products/best/components/category-filter';
import { ProductCardSkeleton } from '@/features/products/best/components/product-card-skeleton';
import { BestProductListContainer } from '@/features/products/best/components/product-list-container';
import { useCategoryAll } from '@/hooks/query/display/category';
import { useResponsive } from '@/hooks/utils';
import * as styles from '@/pages/products/best/index.css';
import { ObserverTarget } from '@/shared/components/observer-target';
import { Only } from '@/shared/components/only';

const BestProductsPage = () => {
    const { isMobile } = useResponsive();
    const [queryParams, setQueryParams] = useBestProductParams();

    const { data: categoryData } = useCategoryAll();
    const mainCategoryNo =
        categoryData?.multiLevelCategories?.[0]?.categoryNo ?? 0;
    const selectedCategory =
        queryParams.categoryNo && queryParams.categoryNo > 0
            ? queryParams.categoryNo
            : mainCategoryNo;

    return (
        <div className={styles.container}>
            <Seo title='베스트 랭킹' />
            <Column>
                <Column style={{ gap: isMobile ? '20px' : '32px' }}>
                    <Only.Desktop>
                        <h1 className={styles.title}>베스트 랭킹</h1>
                    </Only.Desktop>

                    <BestCategoryFilter
                        selectedCategory={selectedCategory}
                        mainCategoryNo={mainCategoryNo}
                        onSelect={(categoryNo) =>
                            setQueryParams({ categoryNo, pageNumber: 1 })
                        }
                    />
                </Column>

                <div className={styles.border} />
            </Column>

            {!!categoryData && (
                <BestProductListContainer
                    selectedCategory={selectedCategory}
                    renderSkeleton={() => (
                        <div className={styles.productGrid}>
                            {Array.from({ length: queryParams.pageSize }).map(
                                (_, i) => (
                                    <ProductCardSkeleton key={i} />
                                ),
                            )}
                        </div>
                    )}
                >
                    {({
                        products,
                        totalCount,
                        hasNextPage,
                        fetchNextPage,
                        pageNumber,
                    }) => (
                        <>
                            {isEmpty(products) ? (
                                <NoResult title={'등록된 상품이 없습니다.'} />
                            ) : (
                                <Column
                                    style={{ gap: isMobile ? '0' : '60px' }}
                                >
                                    <div className={styles.productGrid}>
                                        {products.map((product, index) => (
                                            <ProductCard
                                                key={product.productNo}
                                                productNo={product.productNo}
                                                productName={
                                                    product.productName
                                                }
                                                imageUrlInfo={
                                                    product.imageUrlInfo
                                                }
                                                brandNo={product.brandNo}
                                                brandName={product.brandName}
                                                stickerInfos={
                                                    product.stickerInfos
                                                }
                                                likeCount={product.likeCount}
                                                liked={product.liked}
                                                reviewRating={
                                                    product.reviewRating
                                                }
                                                totalReviewCount={
                                                    product.totalReviewCount
                                                }
                                                salePrice={product.salePrice}
                                                immediateDiscountAmt={
                                                    product.immediateDiscountAmt
                                                }
                                                additionDiscountAmt={
                                                    product.additionDiscountAmt
                                                }
                                                additionalDiscount={
                                                    product.additionalDiscount
                                                }
                                                rank={
                                                    isMobile
                                                        ? index + 1
                                                        : (pageNumber - 1) *
                                                              queryParams.pageSize +
                                                          index +
                                                          1
                                                }
                                            />
                                        ))}
                                    </div>

                                    <Only.Mobile>
                                        <ObserverTarget
                                            onIntersect={() => {
                                                if (hasNextPage) {
                                                    fetchNextPage?.();
                                                }
                                            }}
                                            hasNextPage={hasNextPage || false}
                                        />
                                    </Only.Mobile>

                                    <Only.Desktop>
                                        <PagingV2
                                            currentPage={pageNumber}
                                            totalCount={totalCount}
                                            pageSize={queryParams.pageSize}
                                            onPageClick={(page) =>
                                                setQueryParams(
                                                    { pageNumber: page },
                                                    { scroll: true },
                                                )
                                            }
                                        />
                                    </Only.Desktop>
                                </Column>
                            )}
                        </>
                    )}
                </BestProductListContainer>
            )}
        </div>
    );
};

export default BestProductsPage;
