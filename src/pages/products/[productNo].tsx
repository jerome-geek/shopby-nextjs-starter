import { Suspense } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { product } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import { useSuspenseProductDetail } from '@/hooks/suspenseQuery/product';
import * as styles from './[productNo].css';
import { CURRENCY } from '@/utils/currency';
import { Clock, Star, Truck } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import { ChannelType } from '@/models';
import ProductAdditionalDiscount from '@/components/product/additionalDiscount';

interface ProductDetailViewProps {
    productNo: number;
}

function ProductDetailView({ productNo }: ProductDetailViewProps) {
    const { data: productDetail } = useSuspenseProductDetail({
        productNo,
    });

    // 임시 타임세일 변수
    const isTimeSale = true;

    if (!productDetail) return <div>상품을 찾을 수 없습니다.</div>;

    const { baseInfo, price, counter, brand } = productDetail;

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

    return (
        <div className={styles.container}>
            <div className={styles.thumbnailContainer}>
                <Swiper
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    className="mySwiper"
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
                        }}
                    >
                        <ProductAdditionalDiscount
                            type="detail"
                            productNo={productNo}
                        />
                    </div>
                )}
            </div>

            <div className={styles.content}>
                {brand && (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                        }}
                    >
                        <span className={styles.brand}>{brand.name}</span>
                    </div>
                )}

                <h1 className={styles.productName}>{baseInfo.productName}</h1>

                <div className={styles.ratingContainer}>
                    <Star
                        size={14}
                        className={styles.starIcon}
                        fill="currentColor"
                    />
                    <strong>{productDetail.reviewRate || 0}</strong>
                    <span>({counter.reviewCnt || 0})</span>
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        marginTop: '16px',
                    }}
                >
                    <div>
                        {discountRate > 0 && (
                            <div className={styles.originalPrice}>
                                {CURRENCY(price.salePrice).format()}
                            </div>
                        )}
                        <div className={styles.priceContainer}>
                            {discountRate > 0 && (
                                <div className={styles.discountRate}>
                                    {discountRate}%
                                </div>
                            )}
                            <div className={styles.finalPrice}>
                                {CURRENCY(finalPrice).format()}
                            </div>
                        </div>
                    </div>
                    <button className={styles.couponButton}>쿠폰 받기</button>
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
            </div>
        </div>
    );
}

export default function ProductDetailPage() {
    const router = useRouter();
    const { productNo } = router.query;
    const parsedProductNo = Number(productNo);

    if (!parsedProductNo) return null;

    return (
        <Suspense
            fallback={
                <div style={{ padding: '100px', textAlign: 'center' }}>
                    상품 정보를 불러오는 중입니다...
                </div>
            }
        >
            <ProductDetailView productNo={parsedProductNo} />
        </Suspense>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { productNo } = context.params || {};
    const queryClient = new QueryClient();

    const searchParams = {
        channelType: (context.query.channelType as ChannelType) || null,
        preview: context.query.preview === 'true',
    };

    if (productNo) {
        const parsedProductNo = Number(productNo);

        /**
         * prefetchQuery는 내부적으로 try-catch 처리가 되어 있어 에러가 발생해도 throw하지 않습니다.
         * 따라서 SSR 환경에서 API 호출에 실패하더라도 서버가 터지지 않고 안전하게 페이지를 내려줄 수 있습니다.
         */
        await queryClient.prefetchQuery({
            queryKey: productKeys.detail(parsedProductNo, searchParams),
            queryFn: async () => {
                const response = await product
                    .getProductDetail(parsedProductNo, searchParams)
                    .json();

                return response;
            },
        });
    }
    console.log('===========================');
    console.log(dehydrate(queryClient));
    console.log(JSON.stringify(dehydrate(queryClient)));

    return {
        props: {
            productNo,
            searchParams,
            dehydratedState: dehydrate(queryClient),
        },
    };
};
