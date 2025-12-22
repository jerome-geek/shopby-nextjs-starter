'use client';

import { useEffect, useMemo, useRef } from 'react';

import ProductCard from '@/components/Product/Card';
import { useInfiniteProductList } from '@/hooks/infiniteQueries/product/product';
import {
    ProductSearchParams,
    ProductsSearchResponse,
} from '@/models/product/product';
import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';

interface NewProductListProps {
    searchParams: ProductSearchParams;
    initialData: {
        data: ProductsSearchResponse;
        pageNumber: number;
    }[];
}

export default function NewProductList({
    searchParams,
    initialData,
}: NewProductListProps) {
    const {
        data: infiniteProductListData,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteProductList({
        searchParams,
        initialPageParam: searchParams.pageNumber || 1,
        options: {
            initialData: {
                pages: initialData.map((item) => ({
                    data: item.data,
                    pageNumber: item.pageNumber,
                })),
                pageParams: initialData.map((item) => item.pageNumber),
            },
        },
    });

    // TODO: PC인 경우 별도 처리 필요
    const productList = useMemo(() => {
        // if (isMobile) {
        //     return (
        //         infiniteProductListData?.pages?.flatMap((a) => a.data.items) ??
        //         []
        //     );
        // }

        // return productListData?.items ?? [];
        return (
            infiniteProductListData?.pages?.flatMap(
                (page) => page.data.items
            ) ?? []
        );
    }, [infiniteProductListData]);

    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    hasNextPage &&
                    !isFetchingNextPage
                ) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <>
            <ul
                className={css({
                    display: 'grid',
                    gridTemplateColumns: {
                        base: 'repeat(2, 1fr)', // 모바일: 2열
                        lg: 'repeat(4, 1fr)', // 웹: 4열 (원하는 열 수로 변경 가능)
                    },
                    gap: { base: '12px', lg: '16px' },
                    padding: { base: '16px', lg: '24px' },
                })}
            >
                {productList.map((item) => {
                    return (
                        <li key={item.productNo}>
                            <ProductCard
                                productNo={item.productNo}
                                productName={item.productName}
                                imageUrlInfo={item.imageUrlInfo}
                                brandNo={item.brandNo}
                                brandName={item.brandName}
                                stickerInfos={item.stickerInfos}
                                likeCount={item.likeCount}
                                liked={item.liked}
                                reviewRating={item.reviewRating}
                                totalReviewCount={item.totalReviewCount}
                                salePrice={item.salePrice}
                                immediateDiscountAmt={item.immediateDiscountAmt}
                                additionDiscountAmt={item.additionDiscountAmt}
                            />
                        </li>
                    );
                })}
            </ul>
            {hasNextPage && (
                <div
                    className={css({
                        display: 'flex',
                        justifyContent: 'center',
                        paddingY: '24px',
                    })}
                >
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className={css({
                            paddingX: '24px',
                            paddingY: '12px',
                            backgroundColor: token('colors.gray90'),
                            color: token('colors.white'),
                            borderRadius: '4px',
                            fontSize: '1.4rem',
                            fontWeight: '500',
                            cursor: isFetchingNextPage
                                ? 'not-allowed'
                                : 'pointer',
                            opacity: isFetchingNextPage ? 0.6 : 1,
                            _hover: {
                                backgroundColor: token('colors.gray80'),
                            },
                        })}
                    >
                        {isFetchingNextPage ? '로딩 중...' : '더보기'}
                    </button>
                </div>
            )}
        </>
    );
}
