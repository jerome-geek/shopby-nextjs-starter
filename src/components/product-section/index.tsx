import ProductCard from '@/components/product/card';
import {
    useProductSectionById,
    useProductSectionProductList,
} from '@/hooks/query/display/productSection';

const ProductSection = () => {
    // MAIN_01
    const { data } = useProductSectionById({
        sectionId: 'MAIN_01',
    });
    console.log('🚀 ~ ProductSection ~ data:', data);

    const { data: productSectionProductListData } =
        useProductSectionProductList({
            sectionId: 'MAIN_01',
            searchParams: {
                by: 'ADMIN_SETTING',
                direction: 'DESC',
                soldout: false,
                saleStatus: 'RESERVATION_AND_ONSALE',
                pageNumber: 1,
                pageSize: 10,
                hasOptionValues: false,
                includeStopProduct: false,
            },
        });
    console.log(
        '🚀 ~ ProductSection ~ productSectionProductListData:',
        productSectionProductListData,
    );

    return (
        <div>
            <ul>
                {productSectionProductListData?.products.map((product) => {
                    return (
                        <li key={product.productNo}>
                            <ProductCard
                                productNo={product.productNo}
                                productName={product.productName}
                                imageUrlInfo={product.imageUrlInfo.map(
                                    (img) => ({
                                        imageUrlType:
                                            img.imageUrlType || 'IMAGE_URL',
                                        type: img.imageUrlType || 'IMAGE_URL',
                                        url: img.url,
                                    }),
                                )}
                                brandNo={product.brandNo}
                                brandName={product.brandName}
                                stickerInfos={product.stickerInfos.map(
                                    (sticker, stickerIndex) => ({
                                        no: stickerIndex + 1,
                                        name: sticker.label,
                                        label: sticker.label,
                                        type: sticker.type,
                                    }),
                                )}
                                likeCount={product.likeCount}
                                liked={product.liked}
                                reviewRating={product.reviewRating}
                                totalReviewCount={product.totalReviewCount}
                                salePrice={product.salePrice}
                                immediateDiscountAmt={
                                    product.immediateDiscountAmt
                                }
                                additionDiscountAmt={
                                    product.additionDiscountAmt
                                }
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ProductSection;
