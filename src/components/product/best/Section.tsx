import { getTranslation } from '@/i18n/server';

import { product } from '@/api/product';
import ProductSectionItem from '@/components/main/product-display/SectionItem';
import { GetBestSellerProductsParams } from '@/models/product/product';
import {
    createSectionData,
    transformProductData,
} from '@/utils/productConverter';

const BestSection = async () => {
    try {
        const { t } = await getTranslation();

        const productSearchParams: GetBestSellerProductsParams = {
            pageNumber: 1,
            pageSize: 12,
        };

        const data = await product
            .getBestSellerProducts(productSearchParams)
            .json();

        const products = data.items.map(transformProductData);

        const sectionData = createSectionData(
            t('많은 사람들이 구매했어요'),
            'MAIN_BEST',
            data.displayableStock,
            data.totalCount
        );

        return (
            <ProductSectionItem
                sectionData={sectionData}
                products={products}
                sectionType="BEST"
            />
        );
    } catch (error) {
        console.error('BestSection 오류 발생:', error);
        return null;
    }
};

export default BestSection;
