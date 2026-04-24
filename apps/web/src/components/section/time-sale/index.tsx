import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { memo, useMemo } from 'react';
import { Grid } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CountdownTimer, ProductCard } from '@/components/product';
import * as styles from '@/components/section/time-sale/index.css';
import { PATHS } from '@/const/paths';
import { SORTING_TYPE_BY_STATUS } from '@/const/timeSale';
import { useProductsWithAdditionalDiscounts } from '@/entities/product/hooks/useProductsWithAdditionalDiscounts';
import { useTimeSaleSectionProducts } from '@/hooks/query/shop/timeSale';
import { useProductSectionById } from '@/hooks/suspenseQuery/display/productSection';
import type { ImageUrlType } from '@/models/product';
import { TIME_SALE_LIST_BASE_PARAMS } from '@/pages/time-sale';
import { BREAKPOINTS } from '@/styles/media';

interface TimeSaleProps {
    title?: string;
    subtitle?: string;
    type?: 'KIDS' | 'LIFE';
}

export const TimeSale = memo(
    ({
        title = '오늘만 특가',
        subtitle = '매일 오전 10시 새 업데이트',
        type = 'KIDS',
    }: TimeSaleProps) => {
        const sectionId = type === 'KIDS' ? 'TIMESALE_KIDS' : 'TIMESALE_LIFE';
        const buttonLabel =
            type === 'KIDS' ? '키즈 타임특가 더보기' : '라이프 타임특가 더보기';

        const hrefLink = `${PATHS.TIME_SALE.MAIN}?tab=${
            type === 'KIDS' ? 'kids' : 'life'
        }`;

        const { data: productSectionByIdData } = useProductSectionById({
            sectionId,
        });

        const sectionNo = productSectionByIdData?.sectionNo ?? 0;

        const { data: todayOpenData } = useTimeSaleSectionProducts({
            sectionNo,
            searchParams: {
                ...TIME_SALE_LIST_BASE_PARAMS,
                sortingType: SORTING_TYPE_BY_STATUS['today-open'],
            },
            options: { enabled: sectionNo > 0 },
        });
        const products = todayOpenData?.products ?? [];

        const { productsWithDiscounts } =
            useProductsWithAdditionalDiscounts(products);

        const filteredProducts = useMemo(() => {
            return productsWithDiscounts.map((product) => ({
                ...product,
                imageUrlInfo: product.imageUrlInfo?.map((img) => ({
                    url: img.url,
                    type: 'IMAGE_URL',
                })),
                stickerInfos:
                    product.stickerInfos?.map((sticker) => ({
                        type: sticker.type,
                        label: sticker.label,
                        name: sticker.label,
                    })) || [],
            }));
        }, [productsWithDiscounts]);

        const isEmptyProducts = filteredProducts.length === 0;

        return (
            <section className={styles.section}>
                <div className={styles.header}>
                    <div className={styles.titleWrapper}>
                        <div className={styles.titleRow}>
                            <h2 className={styles.title}>{title}</h2>
                            {!isEmptyProducts && <CountdownTimer />}
                        </div>
                        <p className={styles.subtitle}>{subtitle}</p>
                    </div>
                    <Link
                        prefetch={false}
                        href={hrefLink}
                        className={styles.viewAll}
                    >
                        전체보기
                        <svg
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                        >
                            <path
                                d='M9 18l6-6-6-6'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                    </Link>
                </div>

                {isEmptyProducts ? (
                    <div className={styles.emptyMessage}>
                        <p>오늘 시작한 타임특가 상품이 없습니다.</p>
                    </div>
                ) : (
                    <div className={styles.swiperContainer}>
                        <Swiper
                            modules={[Grid]}
                            grid={{
                                rows: 2,
                                fill: 'row',
                            }}
                            slidesPerView={3}
                            spaceBetween={4}
                            breakpoints={{
                                [BREAKPOINTS.SM]: {
                                    slidesPerView: 4.2,
                                    spaceBetween: 16,
                                    grid: {
                                        rows: 2,
                                        fill: 'row',
                                    },
                                },
                                [BREAKPOINTS.MD]: {
                                    slidesPerView: 6,
                                    spaceBetween: 16,
                                    grid: {
                                        rows: 2,
                                        fill: 'row',
                                    },
                                },
                            }}
                        >
                            {filteredProducts.map((product) => (
                                <SwiperSlide
                                    key={product.productNo}
                                    className={styles.productItem}
                                >
                                    <ProductCard
                                        productNo={product.productNo}
                                        productName={product.productName}
                                        brandName={product.brandName}
                                        brandNo={product.brandNo}
                                        salePrice={product.salePrice}
                                        immediateDiscountAmt={
                                            product.immediateDiscountAmt
                                        }
                                        additionDiscountAmt={
                                            product.additionDiscountAmt
                                        }
                                        imageUrlInfo={
                                            product.imageUrlInfo as ImageUrlType[]
                                        }
                                        stickerInfos={product.stickerInfos}
                                        likeCount={product.likeCount}
                                        liked={product.liked}
                                        reviewRating={product.reviewRating}
                                        totalReviewCount={
                                            product.totalReviewCount
                                        }
                                        additionalDiscount={
                                            product.additionalDiscount
                                        }
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}

                <Link
                    href={hrefLink}
                    className={styles.moreLink}
                    prefetch={false}
                >
                    <span>{buttonLabel}</span> <ArrowRight />
                </Link>
            </section>
        );
    },
);

TimeSale.displayName = 'TimeSale';

export default TimeSale;
