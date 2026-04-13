import type { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';

import ProductCard from '@/components/product/card';
import { useEventProductSection } from '@/hooks/query/display/event';

interface EventProductSectionProps {
    eventNo: number;
    sectionNo: number;
    setSectionList: Dispatch<SetStateAction<number[]>>;
}

const EventProductSection = ({
    eventNo,
    sectionNo,
    setSectionList,
}: EventProductSectionProps) => {
    const { data } = useEventProductSection({
        eventNo,
        sectionNo,
        searchParams: {
            pageNumber: 1,
            pageSize: 30,
            order: 'ADMIN_SETTING',
            saleStatus: 'RESERVATION_AND_ONSALE',
            includeStopProduct: true,
        },
    });

    useEffect(() => {
        if (!data || data.products.length === 0) {
            return;
        }
        setSectionList((prev) => {
            if (prev.includes(sectionNo)) {
                return prev;
            }
            return [...prev, sectionNo];
        });
    }, [data, sectionNo, setSectionList]);

    if (!data || data.products.length === 0) {
        return null;
    }

    return data.products.map((product) => (
        <li key={`${sectionNo}-${product.productNo}`}>
            <ProductCard {...product} />
        </li>
    ));
};

export default EventProductSection;
