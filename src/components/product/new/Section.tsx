import { getTranslation } from '@/i18n/server';

import { product } from '@/api/product';
import ProductSectionItem from '@/components/main/product-display/SectionItem';
import { ProductSearchParams } from '@/models/product/product';
import {
    createSectionData,
    transformProductData,
} from '@/utils/productConverter';

const NewSection = async () => {
    try {
        const { t } = await getTranslation();

        const productSearchParams: ProductSearchParams = {
            pageNumber: 1,
            pageSize: 12,
            order: {
                by: 'SALE_YMD',
                direction: 'DESC',
            },
        };

        const data = await product
            .searchProducts(productSearchParams)
            .json();

        const products = data.items.map(transformProductData);

        const sectionData = createSectionData(
            t('신상 아이템'),
            'MAIN_NEW',
            data.displayableStock,
            data.totalCount
        );

        return (
            <ProductSectionItem
                sectionData={sectionData}
                products={products}
                sectionType="NEW"
            />
        );
    } catch (error) {
        console.error('NewSection 오류 발생:', error);
        return null;
    }
};

export default NewSection;
