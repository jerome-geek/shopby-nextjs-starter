import { QueryClient } from '@tanstack/react-query';
import { Star, Truck } from 'lucide-react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Suspense, useMemo, useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { product } from '@/api/product';
import ProductAdditionalDiscount from '@/components/product/additionalDiscount';
import PhotoReview from '@/components/product/photoReview';
import ProductTabs from '@/components/product/productTabs';
import { useProductDetail } from '@/hooks/suspenseQuery/product';
import { ChannelType } from '@/models';
import * as styles from '@/pages/products/[productNo].css';
import { CURRENCY } from '@/utils/currency';

import { BookmarkIcon } from '@/components/icons/BookmarkIcon';
import useProductLike from '@/hooks/useProductLike';
import 'swiper/css';
import 'swiper/css/pagination';
import { filter, pipe, join } from '@fxts/core';

interface ProductDetailViewProps {
    productNo: number;
    searchParams: {
        channelType?: ChannelType;
        preview?: boolean;
    };
}

function ProductDetailView({
    productNo,
    searchParams,
}: ProductDetailViewProps) {
    const [paginationEl, setPaginationEl] = useState<HTMLElement | null>(null);

    const { data: productDetailData } = useProductDetail({
        productNo,
        searchParams,
    });

    // 임시 타임세일 변수
    const isTimeSale = true;

    const { baseInfo, price, counter, brand } = productDetailData;

    const productContent = useMemo(() => {
        if (!productDetailData) {
            return '';
        }

        const {
            contentHeader = '',
            content = '',
            contentFooter = '',
        } = productDetailData.baseInfo;

        return pipe(
            [contentHeader, content, contentFooter],
            filter((a) => !!a),
            join(''),
        );
    }, [productDetailData]);

    const discountRate = Math.round(
        ((price.salePrice -
            (price.immediateDiscountAmt || 0) -
            (price.additionDiscountAmt || 0)) /
            price.salePrice) *
            100,
    );
    const finalPrice =
        price.salePrice -
        (price.immediateDiscountAmt || 0) -
        (price.additionDiscountAmt || 0);

    const { onLikeButtonClick } = useProductLike();

    return (
        <div className={styles.container}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                }}
            >
                <div className={styles.thumbnailContainer}>
                    <div className={styles.imageWrapper}>
                        <Swiper
                            modules={[Pagination]}
                            pagination={{
                                clickable: true,
                                el: paginationEl,
                                renderBullet: (index, className) => {
                                    return `<span class="${className} ${styles.bullet}"></span>`;
                                },
                            }}
                            className={styles.swiperContainer}
                        >
                            {baseInfo.imageUrlInfo?.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={image.url}
                                        alt={`${baseInfo.productName} - ${index + 1}`}
                                        className={styles.thumbnail}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {isTimeSale && (
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    zIndex: 10,
                                    width: '100%',
                                }}
                            >
                                <ProductAdditionalDiscount
                                    type="detail"
                                    productNo={productNo}
                                />
                            </div>
                        )}
                    </div>

                    <div
                        ref={setPaginationEl}
                        className={styles.paginationContainer}
                    />
                </div>

                <div className={styles.content}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '4px',
                                }}
                            >
                                {brand && (
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <span className={styles.brand}>
                                            {brand.name}
                                        </span>
                                    </div>
                                )}

                                <h1 className={styles.productName}>
                                    {baseInfo.productName}
                                </h1>
                                {baseInfo.promotionText && (
                                    <p className={styles.promotionText}>
                                        {baseInfo.promotionText}
                                    </p>
                                )}
                            </div>

                            <div className={styles.ratingContainer}>
                                <Star
                                    size={14}
                                    fill="#E2808F"
                                    stroke="#E2808F"
                                />
                                <strong className={styles.reviewRate}>
                                    {productDetailData.reviewRate || 0}
                                </strong>
                                <span className={styles.reviewCount}>
                                    ({counter.reviewCnt || 0})
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onLikeButtonClick(
                                productNo,
                                productDetailData.liked,
                            )}
                        >
                            <BookmarkIcon isActive={productDetailData.liked} />
                        </button>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2px',
                            }}
                        >
                            {discountRate > 0 && (
                                <span className={styles.originalPrice}>
                                    {CURRENCY(price.salePrice).format()}
                                </span>
                            )}
                            <div className={styles.priceContainer}>
                                {discountRate > 0 && (
                                    <span className={styles.discountRate}>
                                        {discountRate}%
                                    </span>
                                )}
                                <span className={styles.finalPrice}>
                                    {CURRENCY(finalPrice).format()}
                                </span>
                            </div>
                        </div>
                        <button className={styles.couponButton}>
                            쿠폰 받기
                        </button>
                    </div>

                    <div className={styles.deliveryBox}>
                        <div className={styles.deliveryTitle}>
                            <Truck size={18} />
                            지금 주문하면 내일 받을 수 있어요
                        </div>
                        <div className={styles.badgeList}>
                            <span
                                className={`${styles.badge} ${styles.badgeActive}`}
                            >
                                무료배송
                            </span>
                            <span
                                className={`${styles.badge} ${styles.badgeActive}`}
                            >
                                빠른배송
                            </span>
                        </div>
                    </div>

                    <PhotoReview images={baseInfo.imageUrlInfo} />

                    <ProductTabs
                        reviewCount={counter.reviewCnt || 0}
                        inquiryCount={counter.inquiryCnt || 0}
                        productContent={productContent}
                    />
                </div>
            </div>
        </div>
    );
}

export default function ProductDetailPage({
    productNo,
    searchParams,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Suspense
            fallback={
                <div style={{ padding: '100px', textAlign: 'center' }}>
                    상품 정보를 불러오는 중입니다...
                </div>
            }
        >
            <ProductDetailView
                productNo={productNo}
                searchParams={searchParams}
            />
        </Suspense>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();

    const productNo = Number(context.params?.productNo) || 0;
    if (!productNo) {
        return { notFound: true };
    }

    const searchParams = {
        channelType: (context.query.channelType as ChannelType) || null,
        preview: context.query.preview === 'true',
    };

    // await queryClient.prefetchQuery({
    //     queryKey: productKeys.detail(productNo, searchParams),
    //     queryFn: async () => {
    //         try {
    //             const response = await product
    //                 .getProductDetail(productNo, searchParams)
    //                 ;

    //             return response;
    //         } catch (error) {
    //             console.log('🚀 ~ getServerSideProps ~ error:', error);
    //         }
    //     },
    // });
    try {
        const response = await product.getProductDetail(
            productNo,
            searchParams,
        );
        console.log('🚀 ~ getServerSideProps ~ response:', response);
    } catch (error) {
        console.log('🚀 ~ getServerSideProps ~ error:', error);
    }

    return {
        props: {
            productNo,
            searchParams,
            // dehydratedState: dehydrate(queryClient),
        },
    };
};
