'use client';

import Link from 'next/link';
import { Grid } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { SmallCaretIcon } from '@/shared/ui/icons';
import { ProductCard } from '@/features/product/components';
import * as styles from '@/components/product-section/index.css';
import {
    useProductSectionById,
    useProductSectionProductList,
} from '@/hooks/query/display/productSection';

import 'swiper/css';
import 'swiper/css/grid';

const ProductSection = ({ sectionId }: { sectionId: string }) => {
    // MAIN_01
    const { data } = useProductSectionById({
        // sectionId: 'MAIN_01',
        sectionId,
    });
    console.log('🚀 ~ ProductSection ~ data:', data);

    const { data: productSectionProductListData } =
        useProductSectionProductList({
            sectionId,
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
        <section className={styles.section}>
            <div className={styles.header}>
                <div className={styles.titleWrapper}>
                    <h3 className={styles.title}>{data?.label}</h3>
                    {data?.promotionText && (
                        <p className={styles.subtitle}>{data?.promotionText}</p>
                    )}
                </div>
                <Link href='/' className={styles.moreLink}>
                    <SmallCaretIcon direction='right' width={16} height={16} />
                </Link>
            </div>
            <Swiper
                className={styles.swiperContainer}
                modules={[Grid]}
                grid={{
                    rows: 2,
                    fill: 'row',
                }}
                spaceBetween={12}
                slidesPerView={3.2}
                slidesOffsetBefore={16}
                slidesOffsetAfter={16}
                breakpoints={{
                    768: {
                        slidesPerView: 4.2,
                        grid: {
                            rows: 2,
                            fill: 'row',
                        },
                        slidesOffsetBefore: 0,
                        slidesOffsetAfter: 0,
                    },
                    1024: {
                        slidesPerView: 5.2,
                        grid: {
                            rows: 2,
                            fill: 'row',
                        },
                        slidesOffsetBefore: 0,
                        slidesOffsetAfter: 0,
                    },
                    1280: {
                        slidesPerView: 6.2,
                        grid: {
                            rows: 2,
                            fill: 'row',
                        },
                        slidesOffsetBefore: 0,
                        slidesOffsetAfter: 0,
                    },
                }}
            >
                {(productSectionProductListData?.products ?? []).map(
                    (product) => {
                        return (
                            <SwiperSlide key={product.productNo}>
                                <ProductCard
                                    productNo={product.productNo}
                                    productName={product.productName}
                                    imageUrlInfo={product.imageUrlInfo.map(
                                        (img) => ({
                                            imageUrlType:
                                                img.imageUrlType || 'IMAGE_URL',
                                            type:
                                                img.imageUrlType || 'IMAGE_URL',
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
                            </SwiperSlide>
                        );
                    },
                )}
            </Swiper>
        </section>
    );
};

export default ProductSection;
