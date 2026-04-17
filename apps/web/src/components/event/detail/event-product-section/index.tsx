import ProductCard from '@/components/product/card';
import { useEventProductSection } from '@/hooks/suspenseQuery/display/event';
import { GetEventProductDisplaySectionParams } from '@/models/display';

interface EventProductSectionProps {
    eventNo: number;
    sectionNo: number;
    searchParams: GetEventProductDisplaySectionParams;
}

const EventProductSection = ({
    eventNo,
    sectionNo,
    searchParams,
}: EventProductSectionProps) => {
    const { data } = useEventProductSection({
        eventNo,
        sectionNo,
        searchParams,
    });

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
