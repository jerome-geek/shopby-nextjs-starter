'use client';

import { indexBy, map, pipe, prop, toArray } from '@fxts/core';
import { useMemo, useState, useTransition } from 'react';

import { NoResult } from '@/components/common/no-result';
import ShopbyApiErrorBoundary from '@/components/error-boundary/shopby';
import { ProductCard, ProductCardSkeleton } from '@/components/product';
import PagingV2 from '@/components/ui/paging-v2';
import { useAdditionalDiscountByProductNos } from '@/hooks/query/product/additionalDiscount';
import { useEventProductSection } from '@/hooks/suspenseQuery/display/event';
import * as styles from '@/pages/events/[eventNoOrId]/index.css';

interface EventProductSectionProps {
    eventNo: number;
    sectionNo: number;
}

interface EventProductSectionContentProps {
    eventNo: number;
    sectionNo: number;
    pageNumber: number;
    onPageClick: (page: number) => void;
}

const EventProductSectionContent = ({
    eventNo,
    sectionNo,
    pageNumber,
    onPageClick,
}: EventProductSectionContentProps) => {
    const {
        data: { products, totalCount },
    } = useEventProductSection({
        eventNo,
        sectionNo,
        searchParams: {
            pageNumber,
            pageSize: 10,
            order: 'ADMIN_SETTING',
        },
    });

    const productNos = pipe(
        products,
        map((a) => a.productNo),
        toArray,
    );

    const { data: additionalDiscountByProductNosData } =
        useAdditionalDiscountByProductNos({
            searchParams: { productNos },
            options: {
                enabled: productNos.length > 0,
            },
        });

    const productListWithAdditionalDiscount = useMemo(() => {
        const discountMap = pipe(
            additionalDiscountByProductNosData?.data ?? [],
            indexBy(prop('productNo')),
        );

        return pipe(
            products,
            map((product) => ({
                ...product,
                additionalDiscount: discountMap[product.productNo] ?? null,
            })),
            toArray,
        );
    }, [products, additionalDiscountByProductNosData]);

    if (totalCount === 0) {
        return <NoResult text='진열된 상품이 없습니다.' />;
    }

    return (
        <>
            <ul className={styles.productsSection} role='list'>
                {productListWithAdditionalDiscount.map((product) => (
                    <li key={`${sectionNo}-${product.productNo}`}>
                        <ProductCard {...product} />
                    </li>
                ))}
            </ul>

            <PagingV2
                currentPage={pageNumber}
                totalCount={totalCount}
                pageSize={10}
                onPageClick={onPageClick}
            />
        </>
    );
};

const EventProductSection = ({
    eventNo,
    sectionNo,
}: EventProductSectionProps) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [isPending, startTransition] = useTransition();

    const handlePageChange = (page: number) => {
        startTransition(() => {
            setPageNumber(page);
        });
    };

    return (
        <div
            style={{ opacity: isPending ? 0.5 : 1, transition: 'opacity 0.2s' }}
        >
            <ShopbyApiErrorBoundary
                fallback={
                    <ul className={styles.productsSection}>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <li key={i}>
                                <ProductCardSkeleton />
                            </li>
                        ))}
                    </ul>
                }
            >
                <EventProductSectionContent
                    eventNo={eventNo}
                    sectionNo={sectionNo}
                    pageNumber={pageNumber}
                    onPageClick={handlePageChange}
                />
            </ShopbyApiErrorBoundary>
        </div>
    );
};

export default EventProductSection;
