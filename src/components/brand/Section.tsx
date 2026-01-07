import { filter, pipe, sortBy, toArray } from '@fxts/core';

import { productSection } from '@/api/display';
import { getCachedProductSections } from '@/api/display/productSection.server';
import BrandSectionItem from '@/components/brand/SectionItem';
import { GetProductSectionByIdResponse } from '@/models/display/productSection';

interface BrandSectionProps {
    index: number;
}

const BrandSection = async ({ index }: BrandSectionProps) => {
    try {
        const productSectionsData = await getCachedProductSections();

        const mainSections = pipe(
            productSectionsData.sections,
            filter((section) => section.sectionId.includes('BRAND_')),
            sortBy((section) => section.sectionNo),
            toArray,
        );

        const targetSection = mainSections[index];

        if (!targetSection) {
            console.error(
                `인덱스 ${index}에 해당하는 섹션을 찾을 수 없습니다.`,
            );
            return null;
        }

        const sectionId = targetSection.sectionId;

        const [productSectionData, productSectionProductListData] =
            await Promise.all([
                productSection.getProductSectionById(sectionId).json(),
                productSection
                    .getProductSectionProductsById(sectionId, {
                        by: 'ADMIN_SETTING',
                        soldout: true,
                        saleStatus: 'ONSALE',
                        pageNumber: 1,
                        pageSize: 12,
                        hasTotalCount: true,
                        hasOptionValues: false,
                        includeStopProduct: false,
                        direction: 'DESC',
                    })
                    .json(),
            ]);

        const products = productSectionProductListData.products;

        return (
            <BrandSectionItem
                sectionData={
                    productSectionData as GetProductSectionByIdResponse
                }
                products={products}
            />
        );
    } catch (error) {
        console.error('ProductSection 오류 발생:', error);
        return null;
    }
};

export default BrandSection;
