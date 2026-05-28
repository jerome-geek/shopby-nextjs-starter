import { isEmpty } from '@fxts/core';

import { NoResult } from '@/shared/components/common/no-result';
import Seo from '@/shared/components/common/seo';
import { ProductCard } from '@/components/product';
import { Column } from '@/shared/ui/layout/flex';
import PagingV2 from '@/shared/ui/paging-v2';
import { useNewProductParams } from '@/entities/products/new/hooks/useNewProductParams';
import { ProductCardSkeleton } from '@/features/products/best/components/product-card-skeleton';
import { NewCategoryFilter } from '@/features/products/new/components/category-filter';
import { NewProductListContainer } from '@/features/products/new/components/product-list-container';
import { useCategoryAll } from '@/hooks/query/display/category';
import { useResponsive } from '@/hooks/utils';
import * as styles from '@/pages/products/new/index.css';
import { ObserverTarget } from '@/shared/components/observer-target';
import { Only } from '@/shared/components/only';

const NewProductsPage = () => {
    const { isMobile } = useResponsive();
    const [queryParams, setQueryParams] = useNewProductParams();

    const { data: categoryData } = useCategoryAll();
    const mainCategoryNo =
        categoryData?.multiLevelCategories?.[0]?.categoryNo ?? 0;
    const selectedCategory =
        queryParams.categoryNo && queryParams.categoryNo > 0
            ? queryParams.categoryNo
            : mainCategoryNo;

    return (
        <div className={styles.container}>
            <Seo title='신상품' />
            <Column>
                <Column style={{ gap: isMobile ? '20px' : '32px' }}>
                    <Only.Desktop>
                        <h1 className={styles.title}>신상품</h1>
                    </Only.Desktop>

                    <NewCategoryFilter
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
                <NewProductListContainer
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
                                        {products.map((product) => (
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
                </NewProductListContainer>
            )}
        </div>
    );
};

export default NewProductsPage;
