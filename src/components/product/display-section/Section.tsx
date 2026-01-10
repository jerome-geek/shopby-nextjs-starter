// import { map, pipe, toArray } from '@fxts/core';

// import { productSection } from '@/api/display';
// import { product } from '@/api/product';
// import ProductSectionItem from '@/components/main/product-display/Item';
// import { GetProductSectionByIdResponse } from '@/models/display/productSection';
// import {
//     BestSellerProductItem,
//     ProductSearchParams,
//     SearchProductItem,
// } from '@/models/product/product';

// interface ProductSectionProps {
//     sectionId: string;
// }

// const transformProductData = (
//     item: BestSellerProductItem | SearchProductItem
// ) => ({
//     productNo: item.productNo,
//     productName: item.productName,
//     imageUrlInfo: item.imageUrlInfo.map((img, index) => ({
//         isMain: index === 0,
//         imageUrlType: img.imageUrlType || img.type || 'IMAGE_URL',
//         url: img.url,
//     })),
//     brandNo: item.brandNo,
//     brandName: item.brandName,
//     stickerInfos: item.stickerInfos,
//     likeCount: item.likeCount,
//     liked: item.liked,
//     reviewRating: item.reviewRating,
//     totalReviewCount: item.totalReviewCount,
//     salePrice: item.salePrice,
//     immediateDiscountAmt: item.immediateDiscountAmt,
//     additionDiscountAmt: item.additionDiscountAmt,
// });

// // 섹션 정보 생성
// const createSectionData = (
//     label: string,
//     sectionId: string,
//     displayableStock: boolean,
//     totalCount: number
// ): GetProductSectionByIdResponse => ({
//     label,
//     sectionNo: 0,
//     sectionId,
//     displayableStock,
//     leftSpaceColor: '',
//     productTotalCount: totalCount,
//     rightSpaceColor: '',
//     recommendProducts: [],
//     products: [],
//     promotionText: '',
//     displayConfig: {
//         displayHeight: 1,
//         displayType: 'LIST' as const,
//         displayWidth: 6,
//     },
//     sectionExplain: '',
//     imageUrl: '',
// });

// const ProductSection = async ({ sectionId }: ProductSectionProps) => {
//     try {
//         // 베스트 섹션인 경우
//         if (sectionId === 'MAIN_BEST') {
//             const bestSellerData = await product
//                 .getBestSellerProducts({
//                     pageNumber: 1,
//                     pageSize: 12,
//                 })
//                 .json();

//             const products = (
//                 bestSellerData.items as BestSellerProductItem[]
//             ).map(transformProductData) as any;

//             const sectionData = createSectionData(
//                 '베스트',
//                 'MAIN_BEST',
//                 bestSellerData.displayableStock,
//                 bestSellerData.totalCount
//             );

//             return (
//                 <ProductSectionItem
//                     sectionData={sectionData}
//                     sectionId={sectionId}
//                     products={products}
//                 />
//             );
//         }

//         // 신상 섹션인 경우
//         if (sectionId === 'MAIN_NEW') {
//             const productSearchParams: ProductSearchParams = {
//                 pageNumber: 1,
//                 pageSize: 12,
//                 order: {
//                     by: 'SALE_YMD',
//                     direction: 'DESC',
//                 },
//             };

//             const newProductData = await product
//                 .searchProducts(productSearchParams)
//                 .json();

//             const products = (
//                 newProductData.items as SearchProductItem[]
//             ).map(transformProductData) as any;

//             const sectionData = createSectionData(
//                 '신상',
//                 'MAIN_NEW',
//                 newProductData.displayableStock,
//                 newProductData.totalCount
//             );

//             return (
//                 <ProductSectionItem
//                     sectionData={sectionData}
//                     sectionId={sectionId}
//                     products={products}
//                 />
//             );
//         }

//         // 기존 상품 진열 조회
//         const [productSectionData, productSectionProductListData] =
//             await Promise.all([
//                 productSection.getProductSectionById(sectionId).json(),
//                 productSection
//                     .getProductSectionProductsById(sectionId, {
//                         by: 'ADMIN_SETTING',
//                         soldout: true,
//                         saleStatus: 'ONSALE',
//                         pageNumber: 1,
//                         pageSize: 30,
//                         hasTotalCount: true,
//                         hasOptionValues: false,
//                         includeStopProduct: false,
//                         direction: 'DESC',
//                     })
//                     .json(),
//             ]);

//         const products = pipe(
//             productSectionProductListData.products,
//             map((product) => ({
//                 ...product,
//             })),
//             toArray,
//         );

//         const sectionDataWithConfig =
//             productSectionData as GetProductSectionByIdResponse;

//         return (
//             <ProductSectionItem
//                 sectionData={sectionDataWithConfig}
//                 sectionId={sectionId}
//                 products={products}
//             />
//         );
//     } catch (error) {
//         console.error('ProductSection 오류 발생', error);
//         return null;
//     }
// };

// export default ProductSection;

import { filter, pipe, sortBy, toArray } from '@fxts/core';

import { productSection } from '@/api/display';
import { getCachedProductSections } from '@/api/display/productSection.server';
import ProductSectionItem from '@/components/main/product-display/SectionItem';
import { GetProductSectionByIdResponse } from '@/models/display/productSection';

interface ProductSectionProps {
    index: number;
}

const ProductSection = async ({ index }: ProductSectionProps) => {
    try {
        const productSectionsData = await getCachedProductSections()

        const mainSections = pipe(
            productSectionsData.sections,
            filter((section) => section.sectionId.includes('MAIN_')),
            sortBy((section) => section.sectionNo),
            toArray,
        );

        const targetSection = mainSections[index];

        if (!targetSection) {
            console.error(
                `인덱스 ${index}에 해당하는 섹션을 찾을 수 없습니다.`
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
            <ProductSectionItem
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

export default ProductSection;
