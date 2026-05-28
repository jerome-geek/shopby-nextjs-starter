import { head, isEmpty, pipe, prop, toArray } from '@fxts/core';
import Link from 'next/link';
import { useMemo } from 'react';

import { NoResult } from '@/shared/components/common/no-result';
import ProductCardRow from '@/components/product/card-row';
import { PATHS } from '@/const/paths';
import { useProductsWithAdditionalDiscounts } from '@/entities/product/hooks/useProductsWithAdditionalDiscounts';
import { useEvent, useEventProductSection } from '@/hooks/suspenseQuery/display/event';
import { useResponsive } from '@/hooks/utils';

import * as styles from '@/features/event/section/components/event-section-content/index.css';

interface EventSectionContentProps {
    eventKey: string;
}

export const EventSectionContent = ({
    eventKey,
}: EventSectionContentProps) => {
    const { data: event } = useEvent({ eventKey });
    const { isMobile } = useResponsive();

    const firstSectionNo = head(event.section)?.sectionNo || 0;

    const { data: eventProductSectionData } = useEventProductSection({
        eventNo: event.eventNo,
        sectionNo: firstSectionNo,
        searchParams: {
            pageNumber: 1,
            pageSize: 2,
            order: 'ADMIN_SETTING',
        },
    });

    const products = useMemo(() => {
        if (!eventProductSectionData) return [];
        return pipe(eventProductSectionData, prop('products'), toArray);
    }, [eventProductSectionData]);

    const { productsWithDiscounts } =
        useProductsWithAdditionalDiscounts(products);

    return (
        <div className={styles.contentWrapper}>
            {isMobile ? null : (
                <div className={styles.textWrapper}>
                    <Link
                        href={PATHS.EVENTS.DETAIL.replace(
                            '[eventNo]',
                            event.id,
                        )}
                        prefetch={false}
                    >
                        <p className={styles.title}>{event.label}</p>
                    </Link>
                    <p className={styles.description}>{event.promotionText}</p>
                </div>
            )}

            {isEmpty(productsWithDiscounts) ? (
                <NoResult
                    text='진열된 상품이 없습니다.'
                    style={{ height: isMobile ? '268px' : '280px' }}
                />
            ) : (
                <ul className={styles.productList}>
                    {productsWithDiscounts.map((product) => (
                        <li
                            key={product.productNo}
                            className={styles.productItem}
                        >
                            <ProductCardRow
                                {...product}
                                isTimeSaleEnabled={false}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
