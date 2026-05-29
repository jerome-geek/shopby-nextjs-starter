import FetchBoundary from '@/shared/components/common/FetchBoundary';
import Products from '@/components/section/products/section';
import ProductsSectionSkeleton from '@/components/section/products/section/skeleton';
import {
    useProductSectionById,
    useProductSectionProductList,
} from '@/hooks/suspenseQuery/display/productSection';

const BEST_BRAND_PREFIX = 'BEST_BRAND';

interface ProductDisplayContentProps {
    type: 'KIDS' | 'LIFE';
}

const ProductDisplayContent = (props: ProductDisplayContentProps) => {
    const { type } = props;

    const bestBrandPrefix = `${type}_${BEST_BRAND_PREFIX}`;

    const { data: productSectionData } = useProductSectionById({
        sectionId: bestBrandPrefix,
    });

    const { data: productSectionProductListData } =
        useProductSectionProductList({
            sectionId: bestBrandPrefix,
            searchParams: {
                by: 'ADMIN_SETTING',
                direction: 'DESC',
                pageSize: 12,
                soldout: true,
                includeStopProduct: false,
                hasOptionValues: false,
                saleStatus: 'RESERVATION_AND_ONSALE',
            },
        });

    const products =
        productSectionProductListData.products?.map((product) => ({
            ...product,
            imageUrlInfo: product.imageUrlInfo.map((image) => ({
                type: image.imageUrlType,
                imageUrlType: image.imageUrlType,
                url: image.url,
            })),
            stickerInfos: product.stickerInfos.map((sticker) => ({
                name: sticker.label,
                type: sticker.type,
                label: sticker.label,
            })),
        })) ?? [];

    return (
        <FetchBoundary fallback={<ProductsSectionSkeleton />}>
            <Products
                title={productSectionData.label}
                description={productSectionData.sectionExplain}
                products={products}
            />
        </FetchBoundary>
    );
};

const ProductDisplay = (props: ProductDisplayContentProps) => {
    return (
        <FetchBoundary fallback={<ProductsSectionSkeleton />}>
            <ProductDisplayContent {...props} />
        </FetchBoundary>
    );
};

export default ProductDisplay;
