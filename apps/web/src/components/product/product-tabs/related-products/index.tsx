import { isEmpty } from '@fxts/core';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ProductCard } from '@/components/product';
import * as styles from '@/components/product/product-tabs/related-products/index.css';
import { useRelatedProductList } from '@/hooks/query/product/product';
import { BREAKPOINTS } from '@/styles/media';

const RelatedProducts = () => {
    const router = useRouter();

    const productNo = router.query.productNo as string;

    const { data: relatedProductList } = useRelatedProductList({
        productNo: Number(productNo) || 0,
    });

    if (isEmpty(relatedProductList)) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>다른 고객이 함께 구매한 상품</h4>

            <Swiper
                slidesPerView={3}
                spaceBetween={4}
                breakpoints={{
                    [BREAKPOINTS.SM]: {
                        slidesPerView: 4,
                        spaceBetween: 15,
                    },
                }}
            >
                {relatedProductList?.map((item) => (
                    <SwiperSlide key={item.productNo}>
                        <ProductCard
                            productNo={item.productNo}
                            productName={item.productName}
                            imageUrlInfo={[
                                {
                                    imageUrlType: item.imageUrlType as
                                        | 'IMAGE_URL'
                                        | 'VIDEO_URL',
                                    url: item.imageUrl,
                                    type: item.imageUrlType as
                                        | 'IMAGE_URL'
                                        | 'VIDEO_URL',
                                },
                            ]}
                            brandNo={0}
                            brandName={''}
                            stickerInfos={item.stickers.map((sticker) => ({
                                no: sticker.no,
                                name: sticker.name,
                                label: sticker.label,
                                type: sticker.type,
                            }))}
                            likeCount={0}
                            liked={item.liked}
                            reviewRating={item.reviewRating}
                            totalReviewCount={item.totalReviewCount}
                            salePrice={item.salePrice}
                            immediateDiscountAmt={item.immediateDiscountAmt}
                            additionDiscountAmt={item.additionalDiscountAmt}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default RelatedProducts;
